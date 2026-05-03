'use client'

import { emitter } from '@pascal-app/core'
import Image from 'next/image'
import { useI18n } from './../../../i18n'
import { ActionButton } from './action-button'

export function CameraActions({ hideOrbit = false }: { hideOrbit?: boolean }) {
  const { t } = useI18n()
  const goToTopView = () => {
    emitter.emit('camera-controls:top-view')
  }

  const orbitCW = () => {
    emitter.emit('camera-controls:orbit-cw')
  }

  const orbitCCW = () => {
    emitter.emit('camera-controls:orbit-ccw')
  }

  return (
    <div className="flex items-center gap-1">
      {!hideOrbit && (
        <>
          {/* Orbit CCW */}
          <ActionButton
            className="group hover:bg-white/5"
            label={t('overlay.orbitLeft')}
            onClick={orbitCCW}
            size="icon"
            variant="ghost"
          >
            <Image
              alt={t('overlay.orbitLeft')}
              className="h-[28px] w-[28px] -scale-x-100 object-contain opacity-70 transition-opacity group-hover:opacity-100"
              height={28}
              src="/icons/rotate.png"
              width={28}
            />
          </ActionButton>

          {/* Orbit CW */}
          <ActionButton
            className="group hover:bg-white/5"
            label={t('overlay.orbitRight')}
            onClick={orbitCW}
            size="icon"
            variant="ghost"
          >
            <Image
              alt={t('overlay.orbitRight')}
              className="h-[28px] w-[28px] object-contain opacity-70 transition-opacity group-hover:opacity-100"
              height={28}
              src="/icons/rotate.png"
              width={28}
            />
          </ActionButton>
        </>
      )}

      {/* Top View */}
      <ActionButton
        className="group hover:bg-white/5"
        label={t('overlay.topView')}
        onClick={goToTopView}
        size="icon"
        variant="ghost"
      >
        <Image
          alt={t('overlay.topView')}
          className="h-[28px] w-[28px] object-contain opacity-70 transition-opacity group-hover:opacity-100"
          height={28}
          src="/icons/topview.png"
          width={28}
        />
      </ActionButton>
    </div>
  )
}
