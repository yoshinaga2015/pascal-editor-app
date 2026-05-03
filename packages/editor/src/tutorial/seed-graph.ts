import { BuildingNode, LevelNode } from '@pascal-app/core/schema'

export type TutorialSeedGraph = {
  nodes: Record<string, unknown>
  rootNodeIds: string[]
}

const SITE_ID = 'site_tutorialseed'
const BUILDING_ID = 'building_tutorialseed'
const LEVEL_ID = 'level_tutorialseed'

/**
 * Minimal tutorial seed: open property polygon (not closed), building + empty level.
 * User completes G1 by closing/extending the polygon in site edit mode.
 *
 * Uses a flat graph shape consistent with persisted scenes (`site.children` are ids).
 */
export function createTutorialSeedGraph(): TutorialSeedGraph {
  const level = LevelNode.parse({
    id: LEVEL_ID,
    parentId: BUILDING_ID,
    level: 0,
    children: [],
  })

  const building = BuildingNode.parse({
    id: BUILDING_ID,
    parentId: SITE_ID,
    children: [level.id],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  })

  const site = {
    object: 'node',
    id: SITE_ID,
    type: 'site',
    parentId: null,
    visible: true,
    metadata: {},
    children: [BUILDING_ID],
    polygon: {
      type: 'polygon',
      points: [
        [0, 0],
        [12, 0],
        [12, 10],
      ],
    },
  }

  return {
    nodes: {
      [SITE_ID]: site,
      [BUILDING_ID]: building,
      [LEVEL_ID]: level,
    },
    rootNodeIds: [SITE_ID],
  }
}
