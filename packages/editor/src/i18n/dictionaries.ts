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
  'toolbar.walkthroughTooltip': '一人称視点でシーン内を歩いて確認します（ストリートビュー）',
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
  'nodes.slab': '床スラブ',
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
  'tools.slab': '床スラブ',
  'tools.ceiling': '天井',
  'tools.roof': '切妻屋根',
  'tools.stair': '階段',
  'tools.door': 'ドア',
  'tools.window': '窓',
  'tools.fence': 'フェンス',
  'tools.zone': 'ゾーン',
  'tools.spawn': 'スポーン位置',

  // Bottom toolbar — control modes (select / build / furnish …)
  'controls.select': '選択',
  'controls.boxSelect': '矩形選択',
  'controls.siteEditEnter': '敷地を編集',
  'controls.siteEditExit': '敷地編集を終了',
  'controls.siteEditUnavailable': '敷地編集は地面の階のみ利用できます',
  'controls.build': '構築',
  'controls.materialPaint': 'マテリアルペイント',
  'controls.furnish': 'インテリア配置',
  'controls.zoneLayer': 'ゾーン',
  'controls.delete': '削除',

  // Furnish catalog row (bottom toolbar)
  'furnish.furniture': '家具',
  'furnish.appliance': '家電',
  'furnish.kitchen': 'キッチン',
  'furnish.bathroom': 'バスルーム',
  'furnish.outdoor': '屋外',

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
  'sidebarTab.settings': '設定',

  // First-person / walkthrough overlay
  'walkthrough.exit': 'ストリートビューを終了',
  'walkthrough.spawnHint':
    'ウォークスルーの開始位置を決めるには、「スポーン位置」ツールでマーカーを置いてください。',
  'walkthrough.move': '移動',
  'walkthrough.jump': 'ジャンプ',
  'walkthrough.sprint': 'ダッシュ',
  'walkthrough.lookAround': 'クリックで視点を動かす',

  // View toggles (guides / scans toolbar)
  'viewToggles.uploadAria': 'スキャンまたはガイド画像をアップロード',
  'viewToggles.guideSettingsAria': 'ガイド画像の設定',
  'viewToggles.scanSettingsAria': 'スキャンの設定',
  'viewToggles.deleteGuideAria': 'ガイド画像を削除',
  'viewToggles.deleteScanAria': 'スキャンを削除',
  'viewToggles.guideImagesTitle': 'ガイド画像',
  'viewToggles.scansTitle': 'スキャン',
  'viewToggles.guideImagesCount': 'この階層にガイド画像が {count} 枚あります',
  'viewToggles.scansCount': 'この階層にスキャンが {count} 件あります',
  'viewToggles.guideImageNamed': 'ガイド画像 {n}',
  'viewToggles.scanNamed': 'スキャン {n}',
  'viewToggles.noGuidesYet': 'この階層にはまだガイド画像がありません。',
  'viewToggles.noScansYet': 'この階層にはまだスキャンがありません。',

  'common.opacity': '不透明度',

  // Site panel & tree
  'sitePanel.cameraSnapshotTitle': 'カメラスナップショット',
  'sitePanel.viewSnapshot': 'スナップショットを表示',
  'sitePanel.takeSnapshot': 'スナップショットを撮る',
  'sitePanel.updateSnapshot': 'スナップショットを更新',
  'sitePanel.clearSnapshot': 'スナップショットを削除',
  'sitePanel.hide': '非表示',
  'sitePanel.show': '表示',
  'sitePanel.duplicateLevelTitle': '階層を複製',
  'sitePanel.duplicateLevelOptionsTitle': 'オプション付きで複製',
  'sitePanel.duplicateLevelMenu': '複製',
  'sitePanel.duplicateLevelWithOptions': 'オプション付きで複製…',
  'sitePanel.deleteLevelTitle': '階層を削除',
  'sitePanel.deleteGroundLevelBlocked': '地面の階層は削除できません',
  'sitePanel.delete': '削除',
  'sitePanel.noBuildingsYet': '建物がまだありません',
  'sitePanel.propertyLine': 'プロパティライン',
  'sitePanel.area': '面積',
  'sitePanel.perimeter': '周長',
  'sitePanel.addPoint': '頂点を追加',
  'sitePanel.deleteReferenceAria': '削除',
  'sitePanel.defaultGuideName': 'ガイド画像',
  'sitePanel.defaultScanName': '3Dスキャン',
  'sitePanel.zoneWithArea': 'ゾーン（{area} m²）',

  // Tutorial — 「最初の一室」プロジェクト（できるだけやさしい日本語）
  'tutorial.panel.title': '最初の一室をつくる',
  'tutorial.panel.subtitle': 'うまくいったら「次へ」で進みます。',
  'tutorial.panel.dragHandleAria': 'チュートリアルパネルをドラッグして移動',
  'tutorial.panel.dragHint': 'ここをドラッグして画面内の好きな位置へ移動できます。',
  'tutorial.next': '次へ',
  'tutorial.finish': 'チュートリアルを完了',
  'tutorial.abort': '中断',
  'tutorial.skip': 'スキップ',
  'tutorial.abortTitle': 'チュートリアルを中断しますか？',
  'tutorial.abortBody': '進捗は保存されません。また設定からいつでも開始できます。',
  'tutorial.abortConfirm': '中断する',
  'tutorial.skipTitle': 'チュートリアルをスキップしますか？',
  'tutorial.skipBody': 'ガイドを終了します。後から設定から再開できます。',
  'tutorial.skipConfirm': 'スキップする',
  'tutorial.cancel': 'キャンセル',
  'tutorial.checklist.toggle': 'やることリスト',
  'tutorial.checklist.intro': 'はじめに',
  'tutorial.checklist.site': '土地の形を線で囲む',
  'tutorial.checklist.building': '建物と、壁を置く階を選ぶ',
  'tutorial.checklist.walls': '壁で部屋をかこむ',
  'tutorial.checklist.slab': '床スラブを敷く',
  'tutorial.checklist.slabSkipped': '床スラブを敷く',
  'tutorial.checklist.opening': 'ドアや出入口',
  'tutorial.checklist.openingSkipped': 'ドアや出入口',
  'tutorial.checklist.spawn': 'スポーン位置を置く',
  'tutorial.checklist.walk': '歩いて確かめる',
  'tutorial.checklist.floorplan': '2Dや分割で平面を見る',
  'tutorial.offer.title': 'ガイド付きで最初の一室をつくりますか？',
  'tutorial.offer.body':
    'だいたい 10〜20 分です。土地の形から壁・床スラブ・出入口、スポーン位置、部屋内のウォークスルー、平面（2D／分割）の確認まで、ながれで試せます。',
  'tutorial.offer.start': 'チュートリアルを開始',
  'tutorial.offer.dismiss': '閉じる',
  'tutorial.celebration.title': 'おつかれさまでした！',
  'tutorial.celebration.body':
    '壁と床スラブで部屋をそろえ、出入口とスポーン位置を置き、ウォークスルーと平面表示まで確認できました。',
  'tutorial.celebration.cta': '閉じる',
  'tutorial.settings.section': 'チュートリアル',
  'tutorial.settings.description': 'いちばんかんたんな状態からやり直してから、説明にそって進みます。',
  'tutorial.settings.start': '「最初の一室」チュートリアルを開始',
  'tutorial.chapters.intro.title': 'ねらい：かんたんな部屋を一つつくる',
  'tutorial.chapters.intro.body':
    'このガイドでは、土地を線で囲み→壁で一室→床スラブと出入口→スポーン位置→ウォークスルー→2D／分割での確認、の順で進みます。「次へ」でチュートリアルを開始しましょう。',
  'tutorial.chapters.intro.hint':
    '「次へ」でステップ1に進みます。',
  'tutorial.chapters.site.title': 'ステップ1：土地の形を線で囲む',
  'tutorial.chapters.site.body':
    '敷地を編集すると、3Dビューに土地の境界を示す緑の線が現れます。この線で形をかこみ、一周していればよく、どこが土地か分かればOKです。最初は四角で大丈夫です。\n\n線や角が見切れたり届きにくいときは、右ドラッグで視点を回転させるか、Space+ドラッグ（中ボタンでも可）で画面をずらしてください。',
  'tutorial.chapters.site.hint':
    '【やり方ヒント】\n0. 画面下で「敷地」を選び、「敷地を編集」を押します。\n1. 緑の線の角をドラッグして動かします。角が足りないときは、敷地を編集中にサイドバーから「頂点を追加」できます。\n2. 四角なら角が 4 つあればOKです。緑の線が角どうしでつながって見えれば大丈夫です。丸くする必要はありません。\n3. かこんだ内側が、だいたい庭の一部くらいの広さ（目安：2m×2m より大きめ）になるまで広げてください。',
  'tutorial.chapters.building.title': 'ステップ2：建物と「いまいじる階」を決める',
  'tutorial.chapters.building.body':
    '左の一覧に「建物」と「1階」のような階の名前が出ていて、その階が選ばれている状態にしてください。ここで決めた階に、そのあと壁などが置かれます。',
  'tutorial.chapters.building.hint':
    '画面下で「構築」（壁などを置くモード）を選んでから、左の一覧で「階」の名前をもう一度クリックして選び直してみてください。',
  'tutorial.chapters.walls.title': 'ステップ3：壁で部屋をかこむ',
  'tutorial.chapters.walls.body':
    '壁の道具ではまっすぐな壁だけ使います。部屋のまわりが壁だけでつながって、とびらのない箱みたいになるイメージです。どこかで切れたり、変なとげが出たりしているとだめです。',
  'tutorial.chapters.walls.hint': '壁の数が足りないか、どこかでちぎれています。',
  'tutorial.chapters.slab.title': 'ステップ4：床スラブを敷く',
  'tutorial.chapters.slab.body':
    '画面下で「床スラブ」を選び、さきほど壁でかこんだ部屋の内側をおおってください。水平な床のかたまりがひとつ置ければ十分です。',
  'tutorial.chapters.slab.hint': '部屋の内側が床スラブでおおわれているか確認してください。',
  'tutorial.chapters.opening.title': 'ステップ5：出入口をつくる',
  'tutorial.chapters.opening.body':
    '画面下で「ドア」を選び、壁をまたいで出入りできるようにひとつ置いてください。',
  'tutorial.chapters.opening.hint': 'この階にドア（または壁に開いた出入口）があるか確認してください。',
  'tutorial.chapters.spawn.title': 'ステップ6：スポーン位置を置く',
  'tutorial.chapters.spawn.body':
    'スポーン位置は、ウォークスルー開始時の立ち位置・向きのもとになります。画面下で「スポーン位置」を選び、壁でかこんだ部屋の内側にマーカーを 1 つ置いてください。\n\n外に置くと、ウォークスルーではドアを開けられないため、部屋の中に入れないことがあります。',
  'tutorial.chapters.spawn.hint': 'この階にスポーン位置がありません。',
  'tutorial.chapters.walk.title': 'ステップ7：自分の目線で部屋の中を歩いてみる',
  'tutorial.chapters.walk.body':
    '画面上の「ウォークスルー」（または歩いてみる機能）を開き、さきほどつくった部屋の中を実際に歩いて確かめてください。\n\nEsc でウォークスルーを終了してから、「次へ」でステップ8に進んでください。',
  'tutorial.chapters.walk.hint': 'いちばんはじめに、歩いてみるモードをオンにしてください。',
  'tutorial.chapters.floorplan.title': 'ステップ8：2Dや分割で平面を確認する',
  'tutorial.chapters.floorplan.body':
    '画面上部の表示モードで「2D」または「分割」を選び、さきほどつくった部屋を平面図としても確認してください。「分割」は 2D と 3D を並べて表示します。\n\nウォークスルーを終えてから試してください。',
  'tutorial.chapters.floorplan.hint':
    'ツールバー左側の 3D／2D／分割 の並びから、「2D」または「分割」を選んでください。ウォークスルーを終えていない場合は Esc を押してください。',
  'tutorial.validation.siteMissing':
    '土地まわりのデータが見つかりません。設定からチュートリアルをやり直してみてください。',
  'tutorial.validation.sitePointsFew':
    'まわりの線の「角」の数が足りません。四角なら角が 4 つある状態をめざしてください。敷地を編集中にサイドバーから「頂点を追加」でも増やせます。',
  'tutorial.validation.siteNotClosed':
    '線がまだちゃんとつながっていません（どこかで切れている状態です）。角が 3 つだけだとそうなりやすいです。四角なら角を 4 つそろえてください。',
  'tutorial.validation.siteTooSmall':
    'かこんだ内側がまだ狭すぎます。角を動かして、もう少し広くしてください（目安：2m×2m より大きめ）。',
  'tutorial.validation.buildingMissing':
    '「建物」の項目がありません。左の一覧か、チュートリアルのやり直しを確認してください。',
  'tutorial.validation.levelMissing': '「階」の項目がありません（1階など）。',
  'tutorial.validation.selectLevel':
    '左の一覧で、いまいじりたい階（たとえば 1階）をクリックして選んでください。',
  'tutorial.validation.wallsTooFew': '壁の枚数が足りません（かんたんな部屋でも、最低でも壁が 3 枚必要です）。',
  'tutorial.validation.wallsNotClosedLoop':
    '壁が部屋のまわりできちんとつながっていません（どこかで切れているか、まわりがつくれていません）。',
  'tutorial.validation.slabMissing': 'この階に床スラブがありません。',
  'tutorial.validation.openingMissing': 'ドアなどの出入口が見つかりません。',
  'tutorial.validation.spawnMissing': 'この階にスポーン位置がありません。',
  'tutorial.validation.walkthroughNotStarted':
    '「歩いてみる」（ウォークスルー）をまだ始めていません。ツールバーからオンにしてください。',
  'tutorial.validation.walkthroughStillActive':
    'ウォークスルーを終了してください（Esc）。終えてから平面表示に切り替えられます。',
  'tutorial.validation.floorplanSwitchView':
    '画面上部の表示モードで「2D」または「分割」を選んでください。',

  'tree.addLevelTooltip': '階層を追加',
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
  'toolbar.walkthroughTooltip': 'Walk the scene in first-person (street view)',
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

  'controls.select': 'Select',
  'controls.boxSelect': 'Box select',
  'controls.siteEditEnter': 'Edit site',
  'controls.siteEditExit': 'Exit site editing',
  'controls.siteEditUnavailable': 'Site editing (ground level only)',
  'controls.build': 'Build',
  'controls.materialPaint': 'Material paint',
  'controls.furnish': 'Furnish',
  'controls.zoneLayer': 'Zone',
  'controls.delete': 'Delete',

  'furnish.furniture': 'Furniture',
  'furnish.appliance': 'Appliance',
  'furnish.kitchen': 'Kitchen',
  'furnish.bathroom': 'Bathroom',
  'furnish.outdoor': 'Outdoor',

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
  'sidebarTab.settings': 'Settings',

  'walkthrough.exit': 'Exit street view',
  'walkthrough.spawnHint':
    'Place a Spawn Point with the Spawn Point tool to set where walkthrough starts.',
  'walkthrough.move': 'Move',
  'walkthrough.jump': 'Jump',
  'walkthrough.sprint': 'Sprint',
  'walkthrough.lookAround': 'Click to look around',

  'viewToggles.uploadAria': 'Upload scan or guide image',
  'viewToggles.guideSettingsAria': 'Guide image settings',
  'viewToggles.scanSettingsAria': 'Scan settings',
  'viewToggles.deleteGuideAria': 'Delete guide image',
  'viewToggles.deleteScanAria': 'Delete scan',
  'viewToggles.guideImagesTitle': 'Guide images',
  'viewToggles.scansTitle': 'Scans',
  'viewToggles.guideImagesCount': '{count} guide images on this level',
  'viewToggles.scansCount': '{count} scans on this level',
  'viewToggles.guideImageNamed': 'Guide image {n}',
  'viewToggles.scanNamed': 'Scan {n}',
  'viewToggles.noGuidesYet': 'No guide images on this level yet.',
  'viewToggles.noScansYet': 'No scans on this level yet.',

  'common.opacity': 'Opacity',

  'sitePanel.cameraSnapshotTitle': 'Camera snapshot',
  'sitePanel.viewSnapshot': 'View snapshot',
  'sitePanel.takeSnapshot': 'Take snapshot',
  'sitePanel.updateSnapshot': 'Update snapshot',
  'sitePanel.clearSnapshot': 'Clear snapshot',
  'sitePanel.hide': 'Hide',
  'sitePanel.show': 'Show',
  'sitePanel.duplicateLevelTitle': 'Duplicate level',
  'sitePanel.duplicateLevelOptionsTitle': 'Duplicate level with options',
  'sitePanel.duplicateLevelMenu': 'Duplicate',
  'sitePanel.duplicateLevelWithOptions': 'Duplicate with options…',
  'sitePanel.deleteLevelTitle': 'Delete level',
  'sitePanel.deleteGroundLevelBlocked': 'The ground level cannot be deleted',
  'sitePanel.delete': 'Delete',
  'sitePanel.noBuildingsYet': 'No buildings yet',
  'sitePanel.propertyLine': 'Property line',
  'sitePanel.area': 'Area',
  'sitePanel.perimeter': 'Perimeter',
  'sitePanel.addPoint': 'Add point',
  'sitePanel.deleteReferenceAria': 'Delete',
  'sitePanel.defaultGuideName': 'Guide Image',
  'sitePanel.defaultScanName': '3D Scan',
  'sitePanel.zoneWithArea': 'Zone ({area} m²)',

  // Tutorial — Build your first room
  'tutorial.panel.title': 'Build your first room',
  'tutorial.panel.subtitle': 'Progress is driven by checks on your scene.',
  'tutorial.panel.dragHandleAria': 'Drag to move the tutorial panel',
  'tutorial.panel.dragHint': 'Drag this handle to move the panel anywhere on screen.',
  'tutorial.next': 'Next',
  'tutorial.finish': 'Finish tutorial',
  'tutorial.abort': 'Pause',
  'tutorial.skip': 'Skip',
  'tutorial.abortTitle': 'Pause the tutorial?',
  'tutorial.abortBody': 'Progress won’t be saved. You can restart anytime from Settings.',
  'tutorial.abortConfirm': 'Pause',
  'tutorial.skipTitle': 'Skip the tutorial?',
  'tutorial.skipBody': 'End the guided tour. You can start again later from Settings.',
  'tutorial.skipConfirm': 'Skip',
  'tutorial.cancel': 'Cancel',
  'tutorial.checklist.toggle': 'Goals checklist',
  'tutorial.checklist.intro': 'Intro',
  'tutorial.checklist.site': 'Close the site boundary into a loop',
  'tutorial.checklist.building': 'Pick building & level',
  'tutorial.checklist.walls': 'Close a loop with walls',
  'tutorial.checklist.slab': 'Lay a floor (slab)',
  'tutorial.checklist.slabSkipped': 'Lay a floor (slab)',
  'tutorial.checklist.opening': 'Door or opening',
  'tutorial.checklist.openingSkipped': 'Door or opening',
  'tutorial.checklist.spawn': 'Place spawn position',
  'tutorial.checklist.walk': 'Walk through',
  'tutorial.checklist.floorplan': 'View floor plan (2D / Split)',
  'tutorial.offer.title': 'Try the guided “first room” walkthrough?',
  'tutorial.offer.body':
    'About 10–20 minutes: site boundary → walls → floor slab → door → spawn → walkthrough → floor plan (2D / Split).',
  'tutorial.offer.start': 'Start tutorial',
  'tutorial.offer.dismiss': 'Dismiss',
  'tutorial.celebration.title': 'Nice work!',
  'tutorial.celebration.body':
    'You enclosed the room, laid the slab, added a door and spawn, walked through, and checked the floor plan.',
  'tutorial.celebration.cta': 'Close',
  'tutorial.settings.section': 'Tutorial',
  'tutorial.settings.description':
    'Replaces the scene with a minimal tutorial seed, then guides milestone-by-milestone.',
  'tutorial.settings.start': 'Start “first room” tutorial',
  'tutorial.chapters.intro.title': 'Goal: a minimal enclosed room',
  'tutorial.chapters.intro.body':
    'You’ll work through site boundary → walls → slab & door → spawn → walkthrough → floor plan (2D / Split), one step at a time. Go at your own pace; when stuck, read the panel note—then the numbered hints below it.',
  'tutorial.chapters.intro.hint':
    'Press Next to begin Step 1.',
  'tutorial.chapters.site.title': 'Step 1: Turn the site boundary into a closed loop',
  'tutorial.chapters.site.body':
    'When you edit the site (Site on the bottom bar, then Edit site), a green boundary loop appears in the 3D view—that’s your lot outline. Close it with no gaps so it’s clear what land you’re shaping; a simple rectangle is fine to start.\n\n3D view camera: right-drag to orbit; Space+drag or middle-mouse drag to pan when corners go off-screen or are awkward to reach.',
  'tutorial.chapters.site.hint':
    'How to do it:\n0. On the bottom bar choose Site mode, then Edit site.\n1. Drag corners in the 3D view; while editing the site, use Add vertex in the sidebar if you need more corners.\n2. For a rectangle, four corners are enough—the editor draws the closing segment from the last corner back to the first.\n3. Expand the loop until the enclosed area is at least about 4 m² (think roughly 2 m × 2 m).',
  'tutorial.chapters.building.title': 'Ensure building & working level',
  'tutorial.chapters.building.body':
    'You should have a building under the site and a level selected for editing.',
  'tutorial.chapters.building.hint': 'Switch to Structure and re-select the target level.',
  'tutorial.chapters.walls.title': 'Loop walls into one closed room',
  'tutorial.chapters.walls.body':
    'Use the Wall tool with straight segments only until endpoints meet in one closed cycle.',
  'tutorial.chapters.walls.hint': 'Add segments or fix branches/gaps so the loop closes.',
  'tutorial.chapters.slab.title': 'Step 4: Lay the floor slab',
  'tutorial.chapters.slab.body':
    'Choose Slab on the bottom bar and cover the inside of your walled room. One slab over the floor is enough.',
  'tutorial.chapters.slab.hint': 'Make sure this level has a slab filling the room.',
  'tutorial.chapters.opening.title': 'Step 5: Add a door',
  'tutorial.chapters.opening.body':
    'Choose Door and place one opening so you can enter and exit the room.',
  'tutorial.chapters.opening.hint': 'Add a door (attached to a wall counts too).',
  'tutorial.chapters.spawn.title': 'Step 6: Place spawn position',
  'tutorial.chapters.spawn.body':
    'Spawn position sets where walkthrough starts (your position and facing). Choose Spawn position on the bottom bar and place one marker inside the walled room.\n\nIf you place it outside, you may not be able to get into the room—walkthrough does not open doors.',
  'tutorial.chapters.spawn.hint': 'No spawn position on this level.',
  'tutorial.chapters.walk.title': 'Step 7: Walk through your room',
  'tutorial.chapters.walk.body':
    'Open Walkthrough from the toolbar and walk inside the room you built.\n\nPress Esc to exit walkthrough, then press Next to continue to Step 8.',
  'tutorial.chapters.walk.hint': 'Enable first-person walkthrough mode.',
  'tutorial.chapters.floorplan.title': 'Step 8: Check the floor plan (2D / Split)',
  'tutorial.chapters.floorplan.body':
    'Use the view mode control at the top to switch to 2D or Split—the same room appears as a floor plan (Split shows 2D and 3D side by side).\n\nDo this after you’ve exited walkthrough.',
  'tutorial.chapters.floorplan.hint':
    'Pick 2D or Split in the toolbar’s 3D / 2D / Split group on the left. If walkthrough is still on, press Esc first.',
  'tutorial.validation.siteMissing': 'No site data found. Try restarting the tutorial from Settings.',
  'tutorial.validation.sitePointsFew':
    'Not enough corners on the boundary—you need at least three vertices (four for a rectangle). While editing the site, use Add vertex in the sidebar.',
  'tutorial.validation.siteNotClosed':
    'The boundary isn’t a complete loop yet—three corners still counts as “open” for this step. Use four corners for a rectangle and make sure the green lines connect all the way around.',
  'tutorial.validation.siteTooSmall':
    'The enclosed area is still too small—stretch it until it’s clearly larger than about 4 m² (roughly 2 m × 2 m).',
  'tutorial.validation.buildingMissing': 'A building under the site is required.',
  'tutorial.validation.levelMissing': 'At least one level is required.',
  'tutorial.validation.selectLevel': 'Select the working level.',
  'tutorial.validation.wallsTooFew': 'Not enough walls (need at least three segments).',
  'tutorial.validation.wallsNotClosedLoop':
    'Walls don’t form one closed loop (fix branches or gaps).',
  'tutorial.validation.slabMissing': 'No slab on this level.',
  'tutorial.validation.openingMissing': 'No door/opening found.',
  'tutorial.validation.spawnMissing': 'No spawn position on this level.',
  'tutorial.validation.walkthroughNotStarted': 'Start first-person walkthrough mode.',
  'tutorial.validation.walkthroughStillActive':
    'Exit walkthrough first (Esc). Then you can switch to 2D or Split.',
  'tutorial.validation.floorplanSwitchView': 'Switch view mode to 2D or Split at the top.',

  'tree.addLevelTooltip': 'Add new level',
}

export function getMessages(locale: Locale): Record<string, string> {
  return locale === 'ja' ? ja : en
}
