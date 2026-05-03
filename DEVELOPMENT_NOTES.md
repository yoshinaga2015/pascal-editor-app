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
