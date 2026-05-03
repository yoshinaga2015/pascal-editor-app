'use client'

import { useScene } from '@pascal-app/core'
import { useViewer } from '@pascal-app/viewer'
import { GripVertical } from 'lucide-react'
import { motion } from 'motion/react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useI18n } from '../i18n'
import { applySceneGraphToEditor } from '../lib/scene'
import useEditor from '../store/use-editor'
import { Button } from '../components/ui/primitives/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/primitives/dialog'
import { cn } from '../lib/utils'
import { TUTORIAL_CHAPTERS } from './chapters'
import { TUTORIAL_MINIMAL_MVP } from './constants'
import { createTutorialSeedGraph } from './seed-graph'
import type { TutorialChecklistKey, TutorialValidationContext } from './types'
import { useTutorialStore } from './use-tutorial-store'

const SPOTLIGHT_CLASSES = [
  'tutorial-spotlight-active',
  'relative',
  'z-[1]',
  'rounded-lg',
  'ring-4',
  'ring-amber-400',
  'ring-offset-2',
  'ring-offset-background',
  'shadow-[0_0_24px_rgba(251,191,36,0.45)]',
] as const

function offerStorageKey(sceneKey: string) {
  return `pascal-tutorial-offer-dismissed:${sceneKey}`
}

const PANEL_POS_STORAGE_KEY = 'pascal-tutorial-panel-pos:v1'
const PANEL_POS_ESTIMATE_W = 512
const PANEL_POS_ESTIMATE_H = 400

function loadStoredPanelPosition(): { x: number; y: number } | null {
  if (typeof window === 'undefined') {
    return null
  }
  try {
    const raw = localStorage.getItem(PANEL_POS_STORAGE_KEY)
    if (!raw) {
      return null
    }
    const value = JSON.parse(raw) as { x?: unknown; y?: unknown }
    if (typeof value.x === 'number' && typeof value.y === 'number') {
      return { x: value.x, y: value.y }
    }
  } catch {
    /* ignore */
  }
  return null
}

function saveStoredPanelPosition(pos: { x: number; y: number }) {
  try {
    localStorage.setItem(PANEL_POS_STORAGE_KEY, JSON.stringify(pos))
  } catch {
    /* ignore */
  }
}

function clampPanelPosition(x: number, y: number, panelW: number, panelH: number) {
  const margin = 8
  const iw = typeof window !== 'undefined' ? window.innerWidth : 1024
  const ih = typeof window !== 'undefined' ? window.innerHeight : 768
  const w = Math.max(panelW, 1)
  const h = Math.max(panelH, 1)
  const maxX = Math.max(margin, iw - w - margin)
  const maxY = Math.max(margin, ih - h - margin)
  return {
    x: Math.min(maxX, Math.max(margin, x)),
    y: Math.min(maxY, Math.max(margin, y)),
  }
}

/** Split on blank lines so spacing uses tight gap-y, not full empty-line height (pre-line). */
function TutorialChapterBody({ text }: { text: string }) {
  const blocks = text
    .split(/\n\n/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0)
  return (
    <div className="mt-1 space-y-1 text-muted-foreground text-xs leading-relaxed">
      {blocks.map((block, index) => (
        <p key={index} className="whitespace-pre-line">
          {block}
        </p>
      ))}
    </div>
  )
}

function defaultPanelBottomRight(panelW: number, panelH: number) {
  const margin = 24
  if (typeof window === 'undefined') {
    return { x: margin, y: margin }
  }
  return clampPanelPosition(
    window.innerWidth - panelW - margin,
    window.innerHeight - panelH - margin,
    panelW,
    panelH,
  )
}

export function TutorialRoot({
  tutorialSceneKey,
  tutorialOfferOnMount,
}: {
  tutorialSceneKey?: string | null
  tutorialOfferOnMount?: boolean
}) {
  const syncSceneKey = useTutorialStore((s) => s.syncSceneKey)

  useEffect(() => {
    syncSceneKey(tutorialSceneKey ?? null)
  }, [tutorialSceneKey, syncSceneKey])

  return (
    <>
      <TutorialOfferBanner sceneKey={tutorialSceneKey} enabled={Boolean(tutorialOfferOnMount)} />
      <TutorialOverlayPanel />
      <TutorialCelebrationLayer />
    </>
  )
}

function TutorialOfferBanner({
  sceneKey,
  enabled,
}: {
  sceneKey?: string | null
  enabled: boolean
}) {
  const { t } = useI18n()
  const completedAt = useTutorialStore((s) => s.completedAt)
  const active = useTutorialStore((s) => s.active)
  const beginTutorial = useTutorialStore((s) => s.beginTutorial)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!sceneKey || typeof window === 'undefined') {
      return
    }
    setDismissed(sessionStorage.getItem(offerStorageKey(sceneKey)) === '1')
  }, [sceneKey])

  const show =
    enabled &&
    sceneKey &&
    !completedAt &&
    !active &&
    !dismissed

  const handleStart = () => {
    if (!sceneKey) {
      return
    }
    beginTutorial(sceneKey)
    applySceneGraphToEditor(createTutorialSeedGraph())
  }

  const handleDismiss = () => {
    if (sceneKey && typeof window !== 'undefined') {
      sessionStorage.setItem(offerStorageKey(sceneKey), '1')
    }
    setDismissed(true)
  }

  if (!show) {
    return null
  }

  return (
    <div className="pointer-events-none fixed top-4 left-1/2 z-[38] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2">
      <div className="pointer-events-auto rounded-xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur-md">
        <p className="font-medium text-foreground text-sm">{t('tutorial.offer.title')}</p>
        <p className="mt-1 text-muted-foreground text-xs">{t('tutorial.offer.body')}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={handleStart} size="sm" type="button">
            {t('tutorial.offer.start')}
          </Button>
          <Button onClick={handleDismiss} size="sm" type="button" variant="ghost">
            {t('tutorial.offer.dismiss')}
          </Button>
        </div>
      </div>
    </div>
  )
}

function TutorialCelebrationLayer() {
  const { t } = useI18n()
  const celebrationPending = useTutorialStore((s) => s.celebrationPending)
  const acknowledgeCelebration = useTutorialStore((s) => s.acknowledgeCelebration)

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          acknowledgeCelebration()
        }
      }}
      open={celebrationPending}
    >
      <DialogContent className="max-w-md border-emerald-500/30 bg-background">
        <DialogHeader>
          <DialogTitle>{t('tutorial.celebration.title')}</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm">{t('tutorial.celebration.body')}</p>
        <DialogFooter>
          <Button
            onClick={() => acknowledgeCelebration()}
            type="button"
            variant="default"
          >
            {t('tutorial.celebration.cta')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function TutorialOverlayPanel() {
  const { t } = useI18n()
  const nodes = useScene((s) => s.nodes)
  const rootNodeIds = useScene((s) => s.rootNodeIds)
  const buildingId = useViewer((s) => s.selection.buildingId)
  const levelId = useViewer((s) => s.selection.levelId)
  const isFirstPersonMode = useEditor((s) => s.isFirstPersonMode)
  const viewMode = useEditor((s) => s.viewMode)

  const active = useTutorialStore((s) => s.active)
  const chapterIndex = useTutorialStore((s) => s.chapterIndex)
  const setChapterIndex = useTutorialStore((s) => s.setChapterIndex)
  const abandonTutorial = useTutorialStore((s) => s.abandonTutorial)
  const skipTutorial = useTutorialStore((s) => s.skipTutorial)
  const markCompleted = useTutorialStore((s) => s.markCompleted)

  const [skipOpen, setSkipOpen] = useState(false)
  const [abortOpen, setAbortOpen] = useState(false)

  const ctx: TutorialValidationContext = useMemo(
    () => ({
      nodes: nodes as Record<string, unknown>,
      rootNodeIds,
      buildingId,
      levelId,
      isFirstPersonMode,
      viewMode,
    }),
    [nodes, rootNodeIds, buildingId, levelId, isFirstPersonMode, viewMode],
  )

  const lastIndex = TUTORIAL_CHAPTERS.length - 1
  const safeChapterIndex = Math.min(Math.max(0, chapterIndex), lastIndex)
  const chapter = TUTORIAL_CHAPTERS[safeChapterIndex]!

  const validation = useMemo(() => chapter.validate(ctx), [chapter, ctx])

  useEffect(() => {
    const target = chapter.spotlightTarget
    if (!(active && target)) {
      return
    }
    const el = document.querySelector(`[data-tutorial-target="${target}"]`)
    if (!(el instanceof HTMLElement)) {
      return
    }
    el.scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: 'nearest' })
    el.classList.add(...SPOTLIGHT_CLASSES)
    return () => {
      el.classList.remove(...SPOTLIGHT_CLASSES)
    }
  }, [active, chapter.spotlightTarget, chapterIndex])

  const handleNext = () => {
    if (!validation.ok) {
      return
    }
    if (chapterIndex >= lastIndex) {
      markCompleted()
      return
    }
    setChapterIndex(chapterIndex + 1)
  }

  const checklistRows: { key: TutorialChecklistKey; labelKey: string; skipped?: boolean }[] =
    useMemo(
      () => [
        { key: 'intro', labelKey: 'tutorial.checklist.intro' },
        { key: 'site', labelKey: 'tutorial.checklist.site' },
        { key: 'building', labelKey: 'tutorial.checklist.building' },
        { key: 'walls', labelKey: 'tutorial.checklist.walls' },
        {
          key: 'slab',
          labelKey: TUTORIAL_MINIMAL_MVP
            ? 'tutorial.checklist.slabSkipped'
            : 'tutorial.checklist.slab',
          skipped: TUTORIAL_MINIMAL_MVP,
        },
        {
          key: 'opening',
          labelKey: TUTORIAL_MINIMAL_MVP
            ? 'tutorial.checklist.openingSkipped'
            : 'tutorial.checklist.opening',
          skipped: TUTORIAL_MINIMAL_MVP,
        },
        { key: 'spawn', labelKey: 'tutorial.checklist.spawn' },
        { key: 'walk', labelKey: 'tutorial.checklist.walk' },
        { key: 'floorplan', labelKey: 'tutorial.checklist.floorplan' },
      ],
      [],
    )

  const rowDone = useCallback(
    (idx: number) => {
      if (idx < chapterIndex) {
        return true
      }
      if (idx > chapterIndex) {
        return false
      }
      return validation.ok
    },
    [chapterIndex, validation.ok],
  )

  const panelRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    pointerId: number
    sx: number
    sy: number
    ox: number
    oy: number
  } | null>(null)
  const [panelPos, setPanelPos] = useState({ x: 24, y: 80 })
  const panelPosRef = useRef(panelPos)
  panelPosRef.current = panelPos

  const measurePanelSize = useCallback(() => {
    const el = panelRef.current
    const iw = typeof window !== 'undefined' ? window.innerWidth : PANEL_POS_ESTIMATE_W + 48
    const w = Math.max(240, el?.offsetWidth ?? Math.min(PANEL_POS_ESTIMATE_W, iw - 16))
    const h = Math.max(160, el?.offsetHeight ?? PANEL_POS_ESTIMATE_H)
    return { w, h }
  }, [])

  const clampPos = useCallback(
    (x: number, y: number) => {
      const { w, h } = measurePanelSize()
      return clampPanelPosition(x, y, w, h)
    },
    [measurePanelSize],
  )

  useLayoutEffect(() => {
    if (!active || typeof window === 'undefined') {
      return
    }
    const iw = window.innerWidth
    const estW = Math.min(PANEL_POS_ESTIMATE_W, iw - 16)
    const estH = PANEL_POS_ESTIMATE_H
    const stored = loadStoredPanelPosition()
    setPanelPos(
      stored
        ? clampPanelPosition(stored.x, stored.y, estW, estH)
        : defaultPanelBottomRight(estW, estH),
    )
  }, [active])

  useEffect(() => {
    if (!active || typeof window === 'undefined') {
      return
    }
    const onResize = () => {
      setPanelPos((p) => clampPos(p.x, p.y))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active, clampPos])

  useEffect(() => {
    if (!active) {
      return
    }
    const el = panelRef.current
    if (!el || typeof ResizeObserver === 'undefined') {
      return
    }
    const ro = new ResizeObserver(() => {
      setPanelPos((p) => clampPos(p.x, p.y))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [active, clampPos])

  const handleDragPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) {
      return
    }
    e.preventDefault()
    const p = panelPosRef.current
    dragRef.current = {
      pointerId: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      ox: p.x,
      oy: p.y,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const handleDragPointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const d = dragRef.current
      if (!d || e.pointerId !== d.pointerId) {
        return
      }
      const nx = d.ox + (e.clientX - d.sx)
      const ny = d.oy + (e.clientY - d.sy)
      setPanelPos(clampPos(nx, ny))
    },
    [clampPos],
  )

  const handleDragPointerEnd = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const d = dragRef.current
      if (!d || e.pointerId !== d.pointerId) {
        return
      }
      dragRef.current = null
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
      setPanelPos((prev) => {
        const next = clampPos(prev.x, prev.y)
        saveStoredPanelPosition(next)
        return next
      })
    },
    [clampPos],
  )

  if (!active) {
    return null
  }

  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        aria-labelledby="tutorial-panel-title"
        className="pointer-events-auto fixed z-[36] w-[min(32rem,calc(100vw-1rem))] rounded-2xl border border-border/80 bg-background/95 shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0 }}
        ref={panelRef}
        role="region"
        style={{ left: panelPos.x, top: panelPos.y }}
        transition={{ duration: 0.18 }}
      >
        <div className="flex max-h-[min(70vh,520px)] flex-col gap-3 p-4">
          <div className="flex items-start gap-2">
            <button
              aria-label={t('tutorial.panel.dragHandleAria')}
              className="-ml-1 mt-0.5 shrink-0 cursor-grab touch-none rounded-md p-1.5 text-muted-foreground select-none hover:bg-muted/70 hover:text-foreground active:cursor-grabbing"
              onPointerCancel={handleDragPointerEnd}
              onPointerDown={handleDragPointerDown}
              onPointerMove={handleDragPointerMove}
              onPointerUp={handleDragPointerEnd}
              title={t('tutorial.panel.dragHint')}
              type="button"
            >
              <GripVertical aria-hidden className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-foreground text-sm" id="tutorial-panel-title">
                {t('tutorial.panel.title')}
              </h2>
              <p className="text-muted-foreground text-xs">{t('tutorial.panel.subtitle')}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button
                className="text-muted-foreground text-xs"
                onClick={() => setAbortOpen(true)}
                size="sm"
                type="button"
                variant="ghost"
              >
                {t('tutorial.abort')}
              </Button>
              <Button
                className="text-muted-foreground text-xs"
                onClick={() => setSkipOpen(true)}
                size="sm"
                type="button"
                variant="ghost"
              >
                {t('tutorial.skip')}
              </Button>
            </div>
          </div>

          <div
            aria-live="polite"
            className="rounded-lg bg-muted/40 px-3 py-2"
            role="status"
          >
            <p className="font-medium text-foreground text-sm">{t(chapter.titleKey)}</p>
            <TutorialChapterBody text={t(chapter.bodyKey)} />
            {!validation.ok && (
              <div className="mt-2 space-y-2 border-border border-l-2 border-l-amber-500 pl-2">
                <p className="font-medium text-amber-800 text-xs dark:text-amber-200">
                  {t(validation.reasonKey)}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed whitespace-pre-line">
                  {t(chapter.recoveryHintKey)}
                </p>
              </div>
            )}
          </div>

          <details className="rounded-lg border border-border/60 bg-background/60">
            <summary className="cursor-pointer px-3 py-2 font-medium text-muted-foreground text-xs">
              {t('tutorial.checklist.toggle')}
            </summary>
            <ul className="space-y-1 px-3 pb-3">
              {checklistRows.map((row, idx) => (
                <li
                  className={cn(
                    'flex items-center gap-2 text-xs',
                    rowDone(idx) ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground',
                    row.skipped && 'italic opacity-80',
                  )}
                  key={row.key}
                >
                  <span aria-hidden>{rowDone(idx) ? '✓' : '○'}</span>
                  <span>{t(row.labelKey)}</span>
                </li>
              ))}
            </ul>
          </details>

          <div className="flex justify-end gap-2 border-border border-t pt-2">
            <Button disabled={!validation.ok} onClick={handleNext} type="button">
              {chapterIndex >= lastIndex ? t('tutorial.finish') : t('tutorial.next')}
            </Button>
          </div>
        </div>
      </motion.div>

      <Dialog onOpenChange={setAbortOpen} open={abortOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t('tutorial.abortTitle')}</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">{t('tutorial.abortBody')}</p>
          <DialogFooter className="gap-2">
            <Button onClick={() => setAbortOpen(false)} type="button" variant="outline">
              {t('tutorial.cancel')}
            </Button>
            <Button
              onClick={() => {
                abandonTutorial()
                setAbortOpen(false)
              }}
              type="button"
              variant="destructive"
            >
              {t('tutorial.abortConfirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog onOpenChange={setSkipOpen} open={skipOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t('tutorial.skipTitle')}</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">{t('tutorial.skipBody')}</p>
          <DialogFooter className="gap-2">
            <Button onClick={() => setSkipOpen(false)} type="button" variant="outline">
              {t('tutorial.cancel')}
            </Button>
            <Button
              onClick={() => {
                skipTutorial()
                setSkipOpen(false)
              }}
              type="button"
              variant="secondary"
            >
              {t('tutorial.skipConfirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
