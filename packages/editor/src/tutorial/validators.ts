import type { AnyNode, WallNode } from '@pascal-app/core/schema'
import { TUTORIAL_MIN_SITE_AREA, TUTORIAL_MINIMAL_MVP } from './constants'
import { tutorialPointKey } from './geometry-keys'
import type { TutorialValidationContext } from './types'
import { wallsFormSimpleClosedLoop } from './wall-loop'

export type MilestoneResult = { ok: true } | { ok: false; reasonKey: string }

function ok(): MilestoneResult {
  return { ok: true }
}

function fail(reasonKey: string): MilestoneResult {
  return { ok: false, reasonKey }
}

function getSiteFromRoots(nodes: Record<string, unknown>, rootNodeIds: string[]) {
  for (const rid of rootNodeIds) {
    const n = nodes[rid]
    if (n && typeof n === 'object' && (n as { type?: string }).type === 'site') {
      return n as Record<string, unknown>
    }
  }
  return null
}

function polygonPoints(site: Record<string, unknown>): [number, number][] {
  const poly = site.polygon as Record<string, unknown> | undefined
  const pts = poly?.points
  if (!Array.isArray(pts)) {
    return []
  }
  return pts.filter(
    (p): p is [number, number] =>
      Array.isArray(p) &&
      p.length >= 2 &&
      typeof p[0] === 'number' &&
      typeof p[1] === 'number',
  ) as [number, number][]
}

function isPolygonClosed(points: [number, number][]): boolean {
  if (points.length < 3) {
    return false
  }
  const p0 = points[0]!
  const pL = points[points.length - 1]!
  // Explicit duplicate closing vertex (first === last), common in GIS payloads.
  if (tutorialPointKey(p0[0], p0[1]) === tutorialPointKey(pL[0], pL[1])) {
    return true
  }
  // PolygonEditor renders a closing edge from last → first but does not duplicate
  // the first vertex in stored points. Require at least four corners so the tutorial
  // seed (three-point open chain) still fails.
  return points.length >= 4
}

/** Vertices for shoelace area: drop redundant trailing duplicate if present */
function ringVerticesForArea(points: [number, number][]): [number, number][] {
  if (points.length < 3) {
    return points
  }
  const p0 = points[0]!
  const pL = points[points.length - 1]!
  if (tutorialPointKey(p0[0], p0[1]) === tutorialPointKey(pL[0], pL[1])) {
    return points.slice(0, -1)
  }
  return points
}

function polygonSignedArea(points: [number, number][]): number {
  if (points.length < 3) {
    return 0
  }
  const verts = ringVerticesForArea(points)
  if (verts.length < 3) {
    return 0
  }
  const closed = [...verts, verts[0]!]
  let sum = 0
  for (let i = 0; i < closed.length - 1; i++) {
    const [x1, y1] = closed[i]!
    const [x2, y2] = closed[i + 1]!
    sum += x1 * y2 - x2 * y1
  }
  return sum / 2
}

export function validateClosedSite(ctx: TutorialValidationContext): MilestoneResult {
  const site = getSiteFromRoots(ctx.nodes, ctx.rootNodeIds)
  if (!site) {
    return fail('tutorial.validation.siteMissing')
  }
  const points = polygonPoints(site)
  if (points.length < 3) {
    return fail('tutorial.validation.sitePointsFew')
  }
  if (!isPolygonClosed(points)) {
    return fail('tutorial.validation.siteNotClosed')
  }
  const area = Math.abs(polygonSignedArea(points))
  if (area < TUTORIAL_MIN_SITE_AREA) {
    return fail('tutorial.validation.siteTooSmall')
  }
  return ok()
}

export function validateBuildingAndLevel(ctx: TutorialValidationContext): MilestoneResult {
  const site = getSiteFromRoots(ctx.nodes, ctx.rootNodeIds)
  if (!site) {
    return fail('tutorial.validation.siteMissing')
  }
  const children = site.children
  if (!Array.isArray(children) || children.length === 0) {
    return fail('tutorial.validation.buildingMissing')
  }
  const nodes = ctx.nodes as Record<string, AnyNode>
  let building: AnyNode | null = null
  for (const cid of children) {
    if (typeof cid !== 'string') {
      continue
    }
    const n = nodes[cid]
    if (n?.type === 'building') {
      building = n
      break
    }
  }
  if (!building) {
    return fail('tutorial.validation.buildingMissing')
  }
  const bc = building.children
  if (!Array.isArray(bc) || bc.length === 0) {
    return fail('tutorial.validation.levelMissing')
  }
  let hasLevel = false
  for (const lid of bc) {
    if (typeof lid !== 'string') {
      continue
    }
    if (nodes[lid]?.type === 'level') {
      hasLevel = true
      break
    }
  }
  if (!hasLevel) {
    return fail('tutorial.validation.levelMissing')
  }
  if (!ctx.levelId || !nodes[ctx.levelId] || nodes[ctx.levelId]?.type !== 'level') {
    return fail('tutorial.validation.selectLevel')
  }
  return ok()
}

function childIds(node: Record<string, unknown>): string[] {
  const ch = node.children
  if (!Array.isArray(ch)) {
    return []
  }
  return ch.filter((c): c is string => typeof c === 'string')
}

export function getWallsOnLevel(
  nodes: Record<string, AnyNode>,
  levelId: string,
): WallNode[] {
  const level = nodes[levelId]
  if (!level || level.type !== 'level') {
    return []
  }
  const walls: WallNode[] = []
  for (const cid of childIds(level as Record<string, unknown>)) {
    const n = nodes[cid]
    if (n?.type === 'wall') {
      walls.push(n as WallNode)
    }
  }
  return walls
}

export function validateClosedRoomWalls(ctx: TutorialValidationContext): MilestoneResult {
  if (!ctx.levelId) {
    return fail('tutorial.validation.selectLevel')
  }
  const nodes = ctx.nodes as Record<string, AnyNode>
  const walls = getWallsOnLevel(nodes, ctx.levelId)
  if (walls.length < 3) {
    return fail('tutorial.validation.wallsTooFew')
  }
  if (!wallsFormSimpleClosedLoop(walls)) {
    return fail('tutorial.validation.wallsNotClosedLoop')
  }
  return ok()
}

export function validateSlab(ctx: TutorialValidationContext): MilestoneResult {
  if (TUTORIAL_MINIMAL_MVP) {
    return ok()
  }
  if (!ctx.levelId) {
    return fail('tutorial.validation.selectLevel')
  }
  const nodes = ctx.nodes as Record<string, AnyNode>
  const level = nodes[ctx.levelId]
  if (!level || level.type !== 'level') {
    return fail('tutorial.validation.levelMissing')
  }
  for (const cid of childIds(level as Record<string, unknown>)) {
    if (nodes[cid]?.type === 'slab') {
      return ok()
    }
  }
  return fail('tutorial.validation.slabMissing')
}

function resolveLevelIdLocal(node: AnyNode, nodes: Record<string, AnyNode>): string {
  let current: AnyNode | undefined = node
  while (current) {
    if (current.type === 'level') {
      return current.id
    }
    if (current.parentId) {
      current = nodes[current.parentId]
    } else {
      break
    }
  }
  return 'default'
}

export function validateOpening(ctx: TutorialValidationContext): MilestoneResult {
  if (TUTORIAL_MINIMAL_MVP) {
    return ok()
  }
  if (!ctx.levelId) {
    return fail('tutorial.validation.selectLevel')
  }
  const nodes = ctx.nodes as Record<string, AnyNode>
  const level = nodes[ctx.levelId]
  if (!level || level.type !== 'level') {
    return fail('tutorial.validation.levelMissing')
  }
  for (const cid of childIds(level as Record<string, unknown>)) {
    const n = nodes[cid]
    if (n?.type === 'door') {
      return ok()
    }
    if (n?.type === 'wall') {
      for (const wid of childIds(n as Record<string, unknown>)) {
        if (nodes[wid]?.type === 'door') {
          return ok()
        }
      }
    }
  }
  return fail('tutorial.validation.openingMissing')
}

function effectiveTutorialLevelId(ctx: TutorialValidationContext): string | null {
  const nodes = ctx.nodes as Record<string, AnyNode>
  if (ctx.levelId && nodes[ctx.levelId]?.type === 'level') {
    return ctx.levelId
  }
  const spawns = Object.values(nodes).filter((n): n is AnyNode => n?.type === 'spawn')
  if (spawns.length !== 1) {
    return null
  }
  const lid = resolveLevelIdLocal(spawns[0]!, nodes)
  if (lid === 'default') {
    return null
  }
  return nodes[lid]?.type === 'level' ? lid : null
}

export function validateSpawn(ctx: TutorialValidationContext): MilestoneResult {
  const nodes = ctx.nodes as Record<string, AnyNode>
  const effectiveLevelId = effectiveTutorialLevelId(ctx)
  if (!effectiveLevelId) {
    return fail('tutorial.validation.selectLevel')
  }
  for (const id of Object.keys(nodes)) {
    const n = nodes[id]
    if (n?.type !== 'spawn') {
      continue
    }
    const lid = resolveLevelIdLocal(n, nodes)
    if (lid === effectiveLevelId) {
      return ok()
    }
  }
  return fail('tutorial.validation.spawnMissing')
}

export function validateWalkthrough(ctx: TutorialValidationContext): MilestoneResult {
  const spawn = validateSpawn(ctx)
  if (!spawn.ok) {
    return spawn
  }
  if (!ctx.isFirstPersonMode) {
    return fail('tutorial.validation.walkthroughNotStarted')
  }
  return ok()
}

export function validateIntro(): MilestoneResult {
  return ok()
}
