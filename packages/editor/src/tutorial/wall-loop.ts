import type { WallNode } from '@pascal-app/core/schema'
import { tutorialPointKey } from './geometry-keys'

function vertexKey(start: [number, number]): string {
  return tutorialPointKey(start[0], start[1])
}

/**
 * MVP: straight walls only (no curve). Returns whether walls form a single
 * closed cycle (every junction degree 2, one connected component).
 */
export function wallsFormSimpleClosedLoop(walls: WallNode[]): boolean {
  if (walls.length < 3) {
    return false
  }

  for (const w of walls) {
    const curve = w.curveOffset
    if (typeof curve === 'number' && Math.abs(curve) > 1e-6) {
      return false
    }
  }

  const degrees = new Map<string, number>()
  const adj = new Map<string, Set<string>>()

  const addEdge = (a: string, b: string) => {
    degrees.set(a, (degrees.get(a) ?? 0) + 1)
    degrees.set(b, (degrees.get(b) ?? 0) + 1)
    if (!adj.has(a)) adj.set(a, new Set())
    if (!adj.has(b)) adj.set(b, new Set())
    adj.get(a)!.add(b)
    adj.get(b)!.add(a)
  }

  for (const wall of walls) {
    const k0 = vertexKey(wall.start)
    const k1 = vertexKey(wall.end)
    if (k0 === k1) {
      return false
    }
    addEdge(k0, k1)
  }

  for (const d of degrees.values()) {
    if (d !== 2) {
      return false
    }
  }

  const firstWall = walls[0]
  if (!firstWall) {
    return false
  }

  const startV = vertexKey(firstWall.start)
  const visited = new Set<string>()
  const stack = [startV]
  while (stack.length) {
    const v = stack.pop()!
    if (visited.has(v)) continue
    visited.add(v)
    for (const n of adj.get(v) ?? []) {
      if (!visited.has(n)) {
        stack.push(n)
      }
    }
  }

  if (visited.size !== degrees.size) {
    return false
  }

  return walls.length === visited.size
}
