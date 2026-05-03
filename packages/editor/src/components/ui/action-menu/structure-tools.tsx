'use client'

import NextImage from 'next/image'
import { useContextualTools } from '../../../hooks/use-contextual-tools'

import { cn } from '../../../lib/utils'
import { useI18n } from '../../../i18n'
import useEditor, {
  type CatalogCategory,
  type StructureTool,
  type Tool,
} from '../../../store/use-editor'
import { ActionButton } from './action-button'

export type ToolConfig = {
  id: StructureTool
  iconSrc: string
  labelKey: string
  catalogCategory?: CatalogCategory
}

export const tools: ToolConfig[] = [
  { id: 'wall', iconSrc: '/icons/wall.png', labelKey: 'tools.wall' },
  // { id: 'room', iconSrc: '/icons/room.png', labelKey: '...' },
  { id: 'slab', iconSrc: '/icons/floor.png', labelKey: 'tools.slab' },
  { id: 'ceiling', iconSrc: '/icons/ceiling.png', labelKey: 'tools.ceiling' },
  { id: 'roof', iconSrc: '/icons/roof.png', labelKey: 'tools.roof' },
  { id: 'stair', iconSrc: '/icons/stairs.png', labelKey: 'tools.stair' },
  { id: 'door', iconSrc: '/icons/door.png', labelKey: 'tools.door' },
  { id: 'window', iconSrc: '/icons/window.png', labelKey: 'tools.window' },
  { id: 'fence', iconSrc: '/icons/fence.png', labelKey: 'tools.fence' },
  { id: 'zone', iconSrc: '/icons/zone.png', labelKey: 'tools.zone' },
  { id: 'spawn', iconSrc: '/icons/site.png', labelKey: 'tools.spawn' },
]

export function StructureTools() {
  const { t } = useI18n()
  const activeTool = useEditor((state) => state.tool)
  const catalogCategory = useEditor((state) => state.catalogCategory)
  const structureLayer = useEditor((state) => state.structureLayer)
  const setTool = useEditor((state) => state.setTool)
  const setCatalogCategory = useEditor((state) => state.setCatalogCategory)

  const contextualTools = useContextualTools()

  // Filter tools based on structureLayer
  const visibleTools =
    structureLayer === 'zones'
      ? tools.filter((t) => t.id === 'zone')
      : tools.filter((t) => t.id !== 'zone')

  const hasActiveTool = visibleTools.some(
    (t) =>
      activeTool === t.id && (t.catalogCategory ? catalogCategory === t.catalogCategory : true),
  )

  return (
    <div className="flex items-center gap-1.5 px-1">
      {visibleTools.map((tool, index) => {
        // For item tools with catalog category, check both tool and category match
        const isActive =
          activeTool === tool.id &&
          (tool.catalogCategory ? catalogCategory === tool.catalogCategory : true)

        const isContextual = contextualTools.includes(tool.id)

        const label = t(tool.labelKey)

        const tutorialTarget =
          tool.id === 'wall'
            ? 'tutorial-tool-wall'
            : tool.id === 'slab'
              ? 'tutorial-tool-slab'
              : tool.id === 'door'
                ? 'tutorial-tool-door'
                : tool.id === 'spawn'
                  ? 'tutorial-tool-spawn'
                  : undefined

        return (
          <ActionButton
            className={cn(
              'rounded-lg duration-300',
              isActive
                ? 'z-10 scale-110 bg-black/40 hover:bg-black/40'
                : 'scale-95 bg-transparent opacity-60 grayscale hover:bg-black/20 hover:opacity-100 hover:grayscale-0',
            )}
            key={`${tool.id}-${tool.catalogCategory ?? index}`}
            label={label}
            onClick={() => {
              if (!isActive) {
                setTool(tool.id)
                setCatalogCategory(tool.catalogCategory ?? null)

                // Automatically switch to build mode if we select a tool
                if (useEditor.getState().mode !== 'build') {
                  useEditor.getState().setMode('build')
                }
              }
            }}
            size="icon"
            variant="ghost"
            {...(tutorialTarget ? { 'data-tutorial-target': tutorialTarget } : {})}
          >
            <NextImage
              alt={label}
              className="size-full object-contain"
              height={28}
              src={tool.iconSrc}
              width={28}
            />
          </ActionButton>
        )
      })}
    </div>
  )
}
