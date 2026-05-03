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
