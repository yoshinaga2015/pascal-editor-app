'use client'

import {
  Editor,
  type SidebarTab,
  useI18n,
  ViewerToolbarLeft,
  ViewerToolbarRight,
} from '@pascal-app/editor'
import Link from 'next/link'
import type { ComponentType } from 'react'
import { useMemo } from 'react'

const PROJECT_ID = 'local-editor'

function LocalEditorBanner() {
  const { t } = useI18n()

  return (
    <div className="pointer-events-none absolute top-3 left-1/2 z-40 -translate-x-1/2">
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border/60 bg-background/90 px-4 py-1.5 text-xs shadow-sm backdrop-blur">
        <span className="text-muted-foreground">{t('home.localBanner')}</span>
        <Link className="font-medium text-foreground hover:underline" href="/scenes">
          {t('home.openRecent')}
        </Link>
        <span aria-hidden className="text-muted-foreground">
          ·
        </span>
        <Link className="font-medium text-foreground hover:underline" href="/scenes">
          {t('home.createNew')}
        </Link>
      </div>
    </div>
  )
}

export default function Home() {
  const { t } = useI18n()

  const sidebarTabs = useMemo(
    (): (SidebarTab & { component: ComponentType })[] => [
      {
        id: 'site',
        label: t('sidebarTab.scene'),
        component: () => null,
      },
    ],
    [t],
  )

  return (
    <div className="relative h-screen w-screen">
      {PROJECT_ID === 'local-editor' && <LocalEditorBanner />}
      <Editor
        layoutVersion="v2"
        projectId={PROJECT_ID}
        sidebarTabs={sidebarTabs}
        viewerToolbarLeft={<ViewerToolbarLeft />}
        viewerToolbarRight={<ViewerToolbarRight />}
      />
    </div>
  )
}
