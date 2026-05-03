import type { MilestoneResult } from './validators'

export type TutorialSpotlightTarget =
  | 'tutorial-site-edit'
  | 'tutorial-structure-build'
  | 'tutorial-tool-wall'
  | 'tutorial-tool-slab'
  | 'tutorial-tool-door'
  | 'tutorial-tool-spawn'
  | 'tutorial-walkthrough'
  | 'tutorial-view-mode'
  | null

export type TutorialChapterDefinition = {
  id: string
  milestoneKey: TutorialChecklistKey
  titleKey: string
  bodyKey: string
  recoveryHintKey: string
  spotlightTarget: TutorialSpotlightTarget
  /** Returns whether this milestone is satisfied */
  validate: (ctx: TutorialValidationContext) => MilestoneResult
}

export type TutorialChecklistKey =
  | 'intro'
  | 'site'
  | 'building'
  | 'walls'
  | 'slab'
  | 'opening'
  | 'spawn'
  | 'walk'
  | 'floorplan'

/** Mirrors editor ViewMode — kept literal here to avoid circular imports */
export type TutorialViewMode = '3d' | '2d' | 'split'

export type TutorialValidationContext = {
  nodes: Record<string, unknown>
  rootNodeIds: string[]
  buildingId: string | null
  levelId: string | null
  isFirstPersonMode: boolean
  viewMode: TutorialViewMode
}
