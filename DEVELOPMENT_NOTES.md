# 開発ノート（フォーク運用）

## 2026-05-03 — 公開フォーク準備・macOS ランチャー

### 変更の具体

- `mac-launcher/` を追加（`Pascal Editor.app` / `Update Pascal Editor.app` / `Stop Pascal Editor.app`、`Contents/Resources/path-env.sh` による GUI 起動時の `PATH` 補正）。
- ルート `README.md` にフォーク由来・著作権・MIT・商標の注意を追記。
- 本ファイルを新設。

### 意図

- 非エンジニアがターミナルなしで起動・更新できるようにする。
- Finder 経由の `.app` では `PATH` が最小となるため、`~/.bun/bin`・Homebrew・ログインシェル相当の `PATH` を明示的に結合する。
- 公開フォークとしてオリジナル権利者／ライセンスを README と `LICENSE` で明示する。

### ADR

1. **リモート運用:** 上流は `upstream`（`https://github.com/pascalorg/editor.git`）、公開先は `origin`（`https://github.com/yoshinaga2015/pascal-editor-app.git`）。上流との同期は `git fetch upstream` → マージ／リベースで行う。
2. **`PATH` 解決:** `.app` の可搬性のため、`path-env.sh` を各バンドルの `Contents/Resources/` に同梱し、`MacOS` から `../Resources/path-env.sh` を読み込む。
3. **権利表記:** ライセンス文言の唯一の規範は `LICENSE`。README は利用者向けの要約・フォークの説明にとどめ、差異があれば `LICENSE` を優先する。

## 2026-05-03 — 上流自動同期（GitHub Actions）

### 変更の具体

- `.github/workflows/sync-from-upstream.yml` を追加（`workflow_dispatch`、任意で `schedule`）。
- マージ失敗時に `github-script` で Issue を自動作成。
- README / `mac-launcher/README.md` に「Update アプリはフォーク向け pull のみ」「上流は Actions で取り込む」旨を追記。

### 意図

- 非エンジニアがターミナル・上流 remote を意識せず、GitHub 上のフォークへ上流変更を取り込めるようにする。
- コンフリクト時は Issue で検知し、手動解消の着手点にする。

### ADR

1. **同期の実行場所:** マージと push は GitHub Actions 上で実施（ローカル認証に依存しない）。Mac の Update は引き続き `origin` の pull のみ。
2. **Issue の粒度:** マージ失敗のたびに新規 Issue（ラベルは未設定・作成権限のみで API エラーを避ける）。
3. **定期実行:** 既定はオフ（コメントアウト）。有効化するとノイズ・競合が増えるため README で注意喚起する。

## 2026-05-03 — Mac から GitHub Actions を起動

### 変更の具体

- `mac-launcher/Sync upstream on GitHub.app` を追加（`gh workflow run sync-from-upstream.yml`）。
- 既定リポジトリ `yoshinaga2015/pascal-editor-app`、`~/Library/Application Support/PascalEditor/github-repo.txt` で上書き可能。
- `mac-launcher/README.md` とルート `README.md` を更新。

### 意図

- ブラウザで Actions を開かずに、ダブルクリックで上流同期ワークフローをキューに入れる。

### ADR

1. **認証:** PAT をランチャーに埋め込まず、ユーザーが既に使っている **GitHub CLI（gh）** に委ねる。
2. **完了待ちしない:** `workflow_dispatch` は非同期のため、ブラウザで Actions を開いてユーザーが進捗確認。続けて **Update** は別操作。

## 2026-05-03 — Update で Applications にランチャーを再同期

### 変更の具体

- `Update Pascal Editor.app` の成功時に `~/Applications/PascalEditor/*.app` へ `rsync`。
- README に Dock の推奨場所と Git で mac-launcher が通常残る旨を追記。

### 意図

- リポジトリを pull しても、Dock が指す `.app` がリポジトリ内の古いパスに固定され続けないようにする。

### ADR

1. **コピー先:** `~/Applications/PascalEditor` に限定し、システム全体の Applications と混ぜない。
2. **`rsync --delete`:** バンドル内で削除されたファイルもミラーに反映する。

## 2026-05-03 — アプリの日本語既定化と英語切り替え（i18n）

### 変更の具体

- `packages/editor/src/i18n/` を追加（`ja` / `en` 辞書、`I18nProvider`、`useI18n`、`useOptionalI18n`、`localStorage` キー `pascal-editor-locale`）。
- `@pascal-app/editor` から i18n を再エクスポート。
- ビューアツールバーに言語スイッチャー（地球アイコン）を追加。主要 UI（ツールバー、オーバーレイ、クラッシュフォールバック、カメラヒント、構造ツール、サイトパネルの一部など）を `t()` 化。
- `apps/editor` で `Providers` により `I18nProvider` でラップ、`layout` の `lang` 初期値を `ja` に変更（クライアントで選択言語に同期）。
- シーン一覧・404・ホームバナー・作成ボタン文言を i18n 対応（`scenes-view.tsx`、`scene-not-found.tsx` など）。

### 意図

- 既定を日本語とし、アプリ内から英語へ切り替え可能にする。
- 選択言語をローカルに保持し、`html lang` をアクセシビリティ・フォントに整合させる。

### ADR

1. **辞書の置き場所:** 文言の大半は `@pascal-app/editor` に集約し、ホストアプリは Provider とページ固有のクライアント枠のみ担当する。
2. **永続化:** ブラウザの `localStorage` のみ（サーバーセッションなし）。SSR の初期 HTML は `lang="ja"` 固定で、ハイドレーション後にユーザー設定へ合わせる。
3. **オプショナルフック:** R3F など Provider 外になりうる箇所は `useOptionalI18n` でフォールバックする。
