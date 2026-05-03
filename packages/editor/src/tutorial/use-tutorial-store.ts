import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TutorialPersistedState = {
  active: boolean
  /** Scene / document key — compared with Editor prop to abandon stale sessions */
  sceneKey: string | null
  chapterIndex: number
  completedAt: number | null
  skippedAt: number | null
}

type TutorialStore = TutorialPersistedState & {
  celebrationPending: boolean
  beginTutorial: (sceneKey: string | null) => void
  abandonTutorial: () => void
  setChapterIndex: (index: number) => void
  markCompleted: () => void
  skipTutorial: () => void
  acknowledgeCelebration: () => void
  /** Call when host loads a different scene while tutorial was active */
  syncSceneKey: (sceneKey: string | null) => void
}

const initialPersisted: TutorialPersistedState = {
  active: false,
  sceneKey: null,
  chapterIndex: 0,
  completedAt: null,
  skippedAt: null,
}

export const useTutorialStore = create<TutorialStore>()(
  persist(
    (set, get) => ({
      ...initialPersisted,
      celebrationPending: false,

      beginTutorial: (sceneKey) =>
        set({
          active: true,
          sceneKey: sceneKey ?? 'local',
          chapterIndex: 0,
          skippedAt: null,
          celebrationPending: false,
        }),

      abandonTutorial: () =>
        set({
          active: false,
          chapterIndex: 0,
          celebrationPending: false,
        }),

      setChapterIndex: (index) => set({ chapterIndex: index }),

      markCompleted: () =>
        set({
          active: false,
          chapterIndex: 0,
          completedAt: Date.now(),
          celebrationPending: true,
        }),

      skipTutorial: () =>
        set({
          active: false,
          chapterIndex: 0,
          skippedAt: Date.now(),
          celebrationPending: false,
        }),

      acknowledgeCelebration: () => set({ celebrationPending: false }),

      syncSceneKey: (sceneKey) => {
        const { active, sceneKey: prev } = get()
        if (!active || prev === null || sceneKey === null) {
          return
        }
        if (prev !== sceneKey) {
          set({
            active: false,
            chapterIndex: 0,
            celebrationPending: false,
          })
        }
      },
    }),
    {
      name: 'pascal-tutorial-first-room',
      partialize: (s) => ({
        active: s.active,
        sceneKey: s.sceneKey,
        chapterIndex: s.chapterIndex,
        completedAt: s.completedAt,
        skippedAt: s.skippedAt,
      }),
    },
  ),
)
