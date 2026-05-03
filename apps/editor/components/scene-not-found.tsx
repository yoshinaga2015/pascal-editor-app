'use client'

import { useI18n } from '@pascal-app/editor'
import Link from 'next/link'

export function SceneNotFound({ id }: { id: string }) {
  const { t } = useI18n()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background p-6 text-center shadow-xl">
        <p className="font-mono text-muted-foreground text-xs uppercase tracking-wide">
          {t('scene404.code')}
        </p>
        <h1 className="mt-2 font-semibold text-lg">{t('scene404.title')}</h1>
        <p className="mt-2 text-muted-foreground text-sm">{t('scene404.description', { id })}</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Link
            className="rounded-md border border-border bg-accent px-3 py-2 font-medium text-sm hover:bg-accent/80"
            href="/scenes"
          >
            {t('scene404.browse')}
          </Link>
          <Link
            className="rounded-md border border-border bg-background px-3 py-2 font-medium text-sm hover:bg-accent/40"
            href="/"
          >
            {t('scene404.backEditor')}
          </Link>
        </div>
      </div>
    </div>
  )
}
