export type Locale = 'ja' | 'en'

export const SUPPORTED_LOCALES: Locale[] = ['ja', 'en']

export const DEFAULT_LOCALE: Locale = 'ja'

export const LOCALE_STORAGE_KEY = 'pascal-editor-locale'

/** Flat message keys — prefer dot notation */
export const ja: Record<string, string> = {
  // Language UI
  'language.switch': '言語',
  'language.ja': '日本語',
  'language.en': 'English',

  // Viewer toolbar
  'viewMode.3d': '3D',
  'viewMode.2d': '2D',
  'viewMode.split': '分割',
  'toolbar.expandSidebar': 'サイドバーを展開',
  'toolbar.collapseSidebar': 'サイドバーを折りたたむ',
  'toolbar.walkthrough': 'ウォークスルー',
  'toolbar.metric': 'メートル法 (m)',
  'toolbar.imperial': 'ヤード・ポンド法 (ft)',
  'toolbar.dark': 'ダーク',
  'toolbar.light': 'ライト',
  'levelMode.stack': '積み重ね',
  'levelMode.exploded': '分解',
  'levelMode.solo': '単独',
  'levelMode.tooltip': '階層: {mode}',
  'levelMode.manual': '手動',
  'gridSnap.tooltip': 'グリッドスナップ: {step}',
  'wallMode.fullHeight': 'フル高さ',
  'wallMode.cutaway': 'カットアウェイ',
  'wallMode.low': 'ロー',
  'wallMode.tooltip': '壁: {mode}',
  'camera.perspective': 'パース',
  'camera.orthographic': '平行投影',
  'toolbar.preview': 'プレビュー',
  'toolbar.previewTooltip': 'プレビューモード',

  // Viewer overlay / breadcrumbs
  'overlay.untitled': '無題',
  'overlay.site': '敷地',
  'overlay.building': '建物',
  'overlay.levelNamed': '{name}',
  'overlay.levelNumber': '階層 {n}',
  'overlay.levelsHeading': '階層',
  'overlay.themeToggle': 'テーマを切り替え',
  'overlay.scansVisible': 'スキャン: 表示',
  'overlay.scansHidden': 'スキャン: 非表示',
  'overlay.scansAlt': 'スキャン',
  'overlay.guidesVisible': 'ガイド: 表示',
  'overlay.guidesHidden': 'ガイド: 非表示',
  'overlay.guidesAlt': 'ガイド',
  'overlay.cameraLabel': 'カメラ: {mode}',
  'overlay.levelsLabel': '階層: {mode}',
  'overlay.wallsLabel': '壁: {mode}',
  'overlay.orbitLeft': '左にオービット',
  'overlay.orbitRight': '右にオービット',
  'overlay.topView': 'トップビュー',

  // Default node names (when node has no custom name)
  'nodes.wall': '壁',
  'nodes.fence': 'フェンス',
  'nodes.item': 'アイテム',
  'nodes.slab': 'スラブ',
  'nodes.ceiling': '天井',
  'nodes.roof': '屋根',
  'nodes.roofSegment': '屋根セグメント',

  // Sidebar — site panel
  'sidebar.structure': '構造',
  'sidebar.furnish': 'インテリア',
  'sidebar.zones': 'ゾーン',
  'sidebar.selectLevelContent': 'コンテンツを表示する階層を選択してください',
  'sidebar.noZones': 'この階層にゾーンはありません。',
  'sidebar.addZone': '追加',
  'sidebar.noElements': 'この階層に要素はありません',
  'sidebar.objectsSelected': '{count} 個選択中',
  'sidebar.clearSelection': '選択を解除',

  // Structure tools
  'tools.wall': '壁',
  'tools.slab': 'スラブ',
  'tools.ceiling': '天井',
  'tools.roof': '切妻屋根',
  'tools.stair': '階段',
  'tools.door': 'ドア',
  'tools.window': '窓',
  'tools.fence': 'フェンス',
  'tools.zone': 'ゾーン',
  'tools.spawn': 'スポーン地点',

  // Editor crash / sidebar chrome
  'crash.title': 'シーンの描画に失敗しました',
  'crash.description':
    'シーンを再試行するか、アプリ全体を再読み込みせずにホームに戻ることができます。',
  'crash.reload': 'エディタを再読み込み',
  'crash.backHome': 'ホームへ',

  // Camera hints
  'cameraHint.pan': 'パン',
  'cameraHint.rotate': '回転',
  'cameraHint.zoom': 'ズーム',
  'cameraHint.dismiss': '閉じる',
  'cameraHint.sectionAria': 'カメラ操作のヒント',

  // Shortcut key labels
  'shortcut.leftClick': '左クリック',
  'shortcut.middleClick': '中クリック',
  'shortcut.rightClick': '右クリック',
  'shortcut.scroll': 'ホイール',
  'shortcut.space': 'スペース',

  // Home banner (apps/editor)
  'home.localBanner': 'ローカル編集 — シーンは保存されません。',
  'home.openRecent': '最近のシーンを開く',
  'home.createNew': '新規作成',

  // Scenes list (apps/editor)
  'scenes.navHome': 'ホーム',
  'scenes.navScenes': 'シーン',
  'scenes.title': 'あなたのシーン',
  'scenes.subtitleEmpty': 'シーンがまだありません。作成して始めましょう。',
  'scenes.subtitleCount': '{count} 件のシーン',
  'scenes.emptyHint': '保存したシーンはまだありません。',
  'scenes.noThumbnail': 'サムネイルなし',
  'scenes.nodesCount': '{count} ノード',
  'scenes.createButton': '新しいシーンを作成',
  'scenes.creating': '作成中…',

  // Scene 404
  'scene404.code': '404',
  'scene404.title': 'シーンが見つかりません',
  'scene404.description': 'ID「{id}」のシーンは見つかりませんでした。',
  'scene404.browse': 'シーン一覧へ',
  'scene404.backEditor': 'エディタへ戻る',

  // Sidebar tab label override (home passes Scene)
  'sidebarTab.scene': 'シーン',
}

export const en: Record<string, string> = {
  'language.switch': 'Language',
  'language.ja': '日本語',
  'language.en': 'English',

  'viewMode.3d': '3D',
  'viewMode.2d': '2D',
  'viewMode.split': 'Split',
  'toolbar.expandSidebar': 'Expand sidebar',
  'toolbar.collapseSidebar': 'Collapse sidebar',
  'toolbar.walkthrough': 'Walkthrough',
  'toolbar.metric': 'Metric (m)',
  'toolbar.imperial': 'Imperial (ft)',
  'toolbar.dark': 'Dark',
  'toolbar.light': 'Light',
  'levelMode.stack': 'Stack',
  'levelMode.exploded': 'Exploded',
  'levelMode.solo': 'Solo',
  'levelMode.tooltip': 'Levels: {mode}',
  'levelMode.manual': 'Manual',
  'gridSnap.tooltip': 'Grid snap: {step}',
  'wallMode.fullHeight': 'Full height',
  'wallMode.cutaway': 'Cutaway',
  'wallMode.low': 'Low',
  'wallMode.tooltip': 'Walls: {mode}',
  'camera.perspective': 'Perspective',
  'camera.orthographic': 'Orthographic',
  'toolbar.preview': 'Preview',
  'toolbar.previewTooltip': 'Preview mode',

  'overlay.untitled': 'Untitled',
  'overlay.site': 'Site',
  'overlay.building': 'Building',
  'overlay.levelNamed': '{name}',
  'overlay.levelNumber': 'Level {n}',
  'overlay.levelsHeading': 'Levels',
  'overlay.themeToggle': 'Toggle theme',
  'overlay.scansVisible': 'Scans: Visible',
  'overlay.scansHidden': 'Scans: Hidden',
  'overlay.scansAlt': 'Scans',
  'overlay.guidesVisible': 'Guides: Visible',
  'overlay.guidesHidden': 'Guides: Hidden',
  'overlay.guidesAlt': 'Guides',
  'overlay.cameraLabel': 'Camera: {mode}',
  'overlay.levelsLabel': 'Levels: {mode}',
  'overlay.wallsLabel': 'Walls: {mode}',
  'overlay.orbitLeft': 'Orbit left',
  'overlay.orbitRight': 'Orbit right',
  'overlay.topView': 'Top view',

  'nodes.wall': 'Wall',
  'nodes.fence': 'Fence',
  'nodes.item': 'Item',
  'nodes.slab': 'Slab',
  'nodes.ceiling': 'Ceiling',
  'nodes.roof': 'Roof',
  'nodes.roofSegment': 'Roof Segment',

  'sidebar.structure': 'Structure',
  'sidebar.furnish': 'Furnish',
  'sidebar.zones': 'Zones',
  'sidebar.selectLevelContent': 'Select a level to view content',
  'sidebar.noZones': 'No zones on this level.',
  'sidebar.addZone': 'Add one',
  'sidebar.noElements': 'No elements on this level',
  'sidebar.objectsSelected': '{count} objects selected',
  'sidebar.clearSelection': 'Clear selection',

  'tools.wall': 'Wall',
  'tools.slab': 'Slab',
  'tools.ceiling': 'Ceiling',
  'tools.roof': 'Gable Roof',
  'tools.stair': 'Stairs',
  'tools.door': 'Door',
  'tools.window': 'Window',
  'tools.fence': 'Fence',
  'tools.zone': 'Zone',
  'tools.spawn': 'Spawn Point',

  'crash.title': 'The editor scene failed to render',
  'crash.description':
    'You can retry the scene or return home without reloading the whole app shell.',
  'crash.reload': 'Reload editor',
  'crash.backHome': 'Back to home',

  'cameraHint.pan': 'Pan',
  'cameraHint.rotate': 'Rotate',
  'cameraHint.zoom': 'Zoom',
  'cameraHint.dismiss': 'Dismiss',
  'cameraHint.sectionAria': 'Camera controls hint',

  'shortcut.leftClick': 'Left click',
  'shortcut.middleClick': 'Middle click',
  'shortcut.rightClick': 'Right click',
  'shortcut.scroll': 'Scroll wheel',
  'shortcut.space': 'Space',

  'home.localBanner': 'Local editor — scenes are not saved.',
  'home.openRecent': 'Open recent scenes',
  'home.createNew': 'Create new',

  'scenes.navHome': 'Home',
  'scenes.navScenes': 'Scenes',
  'scenes.title': 'Your scenes',
  'scenes.subtitleEmpty': 'No scenes yet. Create one to get started.',
  'scenes.subtitleCount': '{count} scene{s}',
  'scenes.emptyHint': "You haven't saved any scenes yet.",
  'scenes.noThumbnail': 'No thumbnail',
  'scenes.nodesCount': '{count} nodes',
  'scenes.createButton': 'Create new scene',
  'scenes.creating': 'Creating…',

  'scene404.code': '404',
  'scene404.title': 'Scene not found',
  'scene404.description': "We couldn't find a scene with id {id}.",
  'scene404.browse': 'Browse scenes',
  'scene404.backEditor': 'Back to editor',

  'sidebarTab.scene': 'Scene',
}

export function getMessages(locale: Locale): Record<string, string> {
  return locale === 'ja' ? ja : en
}
