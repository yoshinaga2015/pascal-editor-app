'use client'

import { CreateSceneButton } from '@/components/save-button'
import { useI18n } from '@pascal-app/editor'
import Link from 'next/link'
import type { SceneMeta } from '@/components/scene-loader'

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleString(locale === 'ja' ? 'ja-JP' : 'en-US')
  } catch {
    return iso
  }
}

export function ScenesView({ scenes }: { scenes: SceneMeta[] }) {
  const { locale, t } = useI18n()

  const subtitle =
    scenes.length === 0
      ? t('scenes.subtitleEmpty')
      : t('scenes.subtitleCount', {
          count: scenes.length,
          s: scenes.length === 1 ? '' : 's',
        })

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-border border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
          <nav className="flex items-center gap-4 text-sm">
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="/"
            >
              {t('scenes.navHome')}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium text-foreground">{t('scenes.navScenes')}</span>
          </nav>
          <CreateSceneButton label={t('scenes.createButton')} />
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-2 font-bold text-3xl">{t('scenes.title')}</h1>
        <p className="mb-8 text-muted-foreground text-sm">{subtitle}</p>

        {scenes.length === 0 ? (
          <div className="rounded-xl border border-border/60 border-dashed bg-background p-12 text-center">
            <p className="text-muted-foreground text-sm">{t('scenes.emptyHint')}</p>
            <div className="mt-4 flex justify-center">
              <CreateSceneButton label={t('scenes.createButton')} />
            </div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scenes.map((scene) => (
              <li key={scene.id}>
                <Link
                  className="group block rounded-xl border border-border/60 bg-background p-4 transition-colors hover:border-border hover:bg-accent/30"
                  href={`/scene/${scene.id}`}
                >
                  <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-accent/30">
                    {scene.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt={scene.name}
                        className="h-full w-full object-cover"
                        src={scene.thumbnailUrl}
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs">{t('scenes.noThumbnail')}</span>
                    )}
                  </div>
                  <div className="mt-3">
                    <h2 className="truncate font-semibold text-sm group-hover:text-foreground">
                      {scene.name}
                    </h2>
                    <div className="mt-1 flex items-center justify-between text-muted-foreground text-xs">
                      <span>{t('scenes.nodesCount', { count: scene.nodeCount })}</span>
                      <time dateTime={scene.updatedAt}>
                        {formatDate(scene.updatedAt, locale)}
                      </time>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
