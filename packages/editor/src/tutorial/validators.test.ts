// @ts-expect-error — bun:test is provided by the Bun runtime.
import { describe, expect, test } from 'bun:test'
import type { AnyNode } from '@pascal-app/core/schema'
import { BuildingNode, LevelNode, SpawnNode, WallNode } from '@pascal-app/core/schema'
import { createTutorialSeedGraph } from './seed-graph'
import {
  validateBuildingAndLevel,
  validateClosedRoomWalls,
  validateClosedSite,
  validateSpawn,
  validateWalkthrough,
} from './validators'
import { wallsFormSimpleClosedLoop } from './wall-loop'

function tutorialSeedGraph() {
  return createTutorialSeedGraph()
}

describe('tutorial validators', () => {
  test('seed graph: property line open → site milestone fails', () => {
    const graph = tutorialSeedGraph()
    const nodes = graph.nodes as Record<string, AnyNode>
    const res = validateClosedSite({
      nodes,
      rootNodeIds: graph.rootNodeIds,
      buildingId: null,
      levelId: null,
      isFirstPersonMode: false,
    })
    expect(res.ok).toBe(false)
    if (!res.ok) {
      expect(res.reasonKey).toBe('tutorial.validation.siteNotClosed')
    }
  })

  test('closed rectangle site passes area check', () => {
    const level = LevelNode.parse({
      id: 'level_t',
      parentId: 'building_t',
      level: 0,
      children: [],
    })
    const building = BuildingNode.parse({
      id: 'building_t',
      parentId: 'site_t',
      children: [level.id],
    })
    const site = {
      object: 'node',
      id: 'site_t',
      type: 'site',
      parentId: null,
      visible: true,
      metadata: {},
      children: [building.id],
      polygon: {
        type: 'polygon',
        points: [
          [0, 0],
          [10, 0],
          [10, 10],
          [0, 10],
          [0, 0],
        ],
      },
    } as unknown as AnyNode
    const nodes: Record<string, AnyNode> = {
      [site.id]: site,
      [building.id]: building,
      [level.id]: level,
    }
    const ok = validateClosedSite({
      nodes,
      rootNodeIds: [site.id],
      buildingId: building.id,
      levelId: level.id,
      isFirstPersonMode: false,
    })
    expect(ok.ok).toBe(true)
  })

  test('rectangle site without duplicate closing vertex passes (editor convention)', () => {
    const level = LevelNode.parse({
      id: 'level_impl',
      parentId: 'building_impl',
      level: 0,
      children: [],
    })
    const building = BuildingNode.parse({
      id: 'building_impl',
      parentId: 'site_impl',
      children: [level.id],
    })
    const site = {
      object: 'node',
      id: 'site_impl',
      type: 'site',
      parentId: null,
      visible: true,
      metadata: {},
      children: [building.id],
      polygon: {
        type: 'polygon',
        points: [
          [0, 0],
          [12, 0],
          [12, 10],
          [0, 10],
        ],
      },
    } as unknown as AnyNode
    const nodes: Record<string, AnyNode> = {
      [site.id]: site,
      [building.id]: building,
      [level.id]: level,
    }
    const ok = validateClosedSite({
      nodes,
      rootNodeIds: [site.id],
      buildingId: building.id,
      levelId: level.id,
      isFirstPersonMode: false,
    })
    expect(ok.ok).toBe(true)
  })

  test('building + selected level passes G2', () => {
    const level = LevelNode.parse({
      id: 'level_g2',
      parentId: 'building_g2',
      level: 0,
      children: [],
    })
    const building = BuildingNode.parse({
      id: 'building_g2',
      parentId: 'site_g2',
      children: [level.id],
    })
    const site = {
      object: 'node',
      id: 'site_g2',
      type: 'site',
      parentId: null,
      visible: true,
      metadata: {},
      children: [building.id],
      polygon: {
        type: 'polygon',
        points: [
          [0, 0],
          [10, 0],
          [10, 10],
          [0, 10],
          [0, 0],
        ],
      },
    } as unknown as AnyNode
    const nodes: Record<string, AnyNode> = {
      [site.id]: site,
      [building.id]: building,
      [level.id]: level,
    }
    const res = validateBuildingAndLevel({
      nodes,
      rootNodeIds: [site.id],
      buildingId: building.id,
      levelId: level.id,
      isFirstPersonMode: false,
    })
    expect(res.ok).toBe(true)
  })

  test('four walls square forms closed loop', () => {
    const wallA = WallNode.parse({ parentId: 'level_wallloop', start: [0, 0], end: [4, 0] })
    const wallB = WallNode.parse({ parentId: 'level_wallloop', start: [4, 0], end: [4, 4] })
    const wallC = WallNode.parse({ parentId: 'level_wallloop', start: [4, 4], end: [0, 4] })
    const wallD = WallNode.parse({ parentId: 'level_wallloop', start: [0, 4], end: [0, 0] })
    const walls = [wallA, wallB, wallC, wallD]
    expect(wallsFormSimpleClosedLoop(walls)).toBe(true)
    expect(
      validateClosedRoomWalls({
        nodes: {} as Record<string, unknown>,
        rootNodeIds: [],
        buildingId: null,
        levelId: null,
        isFirstPersonMode: false,
      }).ok,
    ).toBe(false)

    const level = LevelNode.parse({
      id: 'level_wallloop',
      parentId: 'building_wallloop',
      level: 0,
      children: walls.map((w) => w.id),
    })
    const nodes: Record<string, AnyNode> = {
      level_wallloop: level,
      ...Object.fromEntries(walls.map((w) => [w.id, w])),
    }
    const res = validateClosedRoomWalls({
      nodes,
      rootNodeIds: [],
      buildingId: null,
      levelId: 'level_wallloop',
      isFirstPersonMode: false,
    })
    expect(res.ok).toBe(true)
  })

  test('open polyline walls fail closed loop', () => {
    const walls = [
      WallNode.parse({ parentId: 'lvl', start: [0, 0], end: [4, 0] }),
      WallNode.parse({ parentId: 'lvl', start: [4, 0], end: [4, 4] }),
      WallNode.parse({ parentId: 'lvl', start: [4, 4], end: [0, 4] }),
    ]
    expect(wallsFormSimpleClosedLoop(walls)).toBe(false)
  })

  test('T junction fails closed loop', () => {
    const walls = [
      WallNode.parse({ parentId: 'lvl', start: [0, 0], end: [4, 0] }),
      WallNode.parse({ parentId: 'lvl', start: [4, 0], end: [4, 4] }),
      WallNode.parse({ parentId: 'lvl', start: [4, 4], end: [0, 4] }),
      WallNode.parse({ parentId: 'lvl', start: [4, 0], end: [6, 0] }),
    ]
    expect(wallsFormSimpleClosedLoop(walls)).toBe(false)
  })

  test('spawn on level validates', () => {
    const spawn = SpawnNode.parse({
      parentId: 'level_spawntest',
      position: [1, 0.5, 1],
    })
    const level = LevelNode.parse({
      id: 'level_spawntest',
      parentId: 'building_sp',
      level: 0,
      children: [spawn.id],
    })
    const nodes: Record<string, AnyNode> = {
      level_spawntest: level,
      [spawn.id]: spawn,
    }
    const res = validateSpawn({
      nodes,
      rootNodeIds: [],
      buildingId: null,
      levelId: 'level_spawntest',
      isFirstPersonMode: false,
    })
    expect(res.ok).toBe(true)
  })

  test('walkthrough requires first-person flag', () => {
    const spawn = SpawnNode.parse({
      parentId: 'level_walktest',
      position: [1, 0.5, 1],
    })
    const level = LevelNode.parse({
      id: 'level_walktest',
      parentId: 'building_w',
      level: 0,
      children: [spawn.id],
    })
    const nodes: Record<string, AnyNode> = {
      level_walktest: level,
      [spawn.id]: spawn,
    }
    expect(
      validateWalkthrough({
        nodes,
        rootNodeIds: [],
        buildingId: null,
        levelId: 'level_walktest',
        isFirstPersonMode: false,
      }).ok,
    ).toBe(false)
    expect(
      validateWalkthrough({
        nodes,
        rootNodeIds: [],
        buildingId: null,
        levelId: 'level_walktest',
        isFirstPersonMode: true,
      }).ok,
    ).toBe(true)
  })

  test('spawn + walkthrough ok when levelId cleared but single spawn infers level', () => {
    const spawn = SpawnNode.parse({
      parentId: 'level_infer',
      position: [1, 0.5, 1],
    })
    const level = LevelNode.parse({
      id: 'level_infer',
      parentId: 'building_infer',
      level: 0,
      children: [spawn.id],
    })
    const building = BuildingNode.parse({
      id: 'building_infer',
      parentId: 'site_infer',
      children: [level.id],
    })
    const site = {
      object: 'node',
      id: 'site_infer',
      type: 'site',
      parentId: null,
      visible: true,
      metadata: {},
      children: [building.id],
      polygon: { type: 'polygon', points: [] },
    } as unknown as AnyNode
    const nodes: Record<string, AnyNode> = {
      [site.id]: site,
      [building.id]: building,
      [level.id]: level,
      [spawn.id]: spawn,
    }
    expect(
      validateSpawn({
        nodes,
        rootNodeIds: [site.id],
        buildingId: building.id,
        levelId: null,
        isFirstPersonMode: false,
      }).ok,
    ).toBe(true)
    expect(
      validateWalkthrough({
        nodes,
        rootNodeIds: [site.id],
        buildingId: building.id,
        levelId: null,
        isFirstPersonMode: true,
      }).ok,
    ).toBe(true)
  })
})