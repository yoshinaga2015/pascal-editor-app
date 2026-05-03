# Pascal Editor — Mac ランチャー（ダブルクリック起動）

非エンジニア向けに、ターミナルを開かずに起動・更新できる `.app` を同梱しています。

## 含まれるアプリ

| アプリ | 役割 |
|--------|------|
| **Pascal Editor** | `bun dev` をバックグラウンドで開始し、ブラウザで http://localhost:3002 を開きます。 |
| **Update Pascal Editor** | `git pull --ff-only` のあと `bun install` を実行し、**GitHub 上のこのフォーク**の変更を取り込みます。オリジナル [pascalorg/editor](https://github.com/pascalorg/editor) の新着まで反映したいときは、先に **Sync upstream on GitHub** を実行するか、GitHub の **Actions → Sync from upstream** を手動で実行してください。 |
| **Sync upstream on GitHub** | GitHub Actions の **Sync from upstream** を **`gh workflow run`** でキューに入れます（要 [GitHub CLI](https://cli.github.com/) と `gh auth login`）。実行後に Actions のページをブラウザで開きます。**その後** **Update Pascal Editor** でローカルを更新してください。 |
| **Stop Pascal Editor** | ポート 3002 で動いている開発サーバーを停止します。 |

### GitHub 同期アプリのセットアップ（初回のみ）

1. ターミナルで `brew install gh`（または [公式](https://cli.github.com/) の手順）
2. `gh auth login` — **このフォークに書き込めるアカウント**で、`repo` を許可
3. フォークの `owner/repo` を変えたい場合は、次に **一行だけ**書いて保存:  
   `~/Library/Application Support/PascalEditor/github-repo.txt`  
   （未作成時は既定で `yoshinaga2015/pascal-editor-app` を使います）

## 使い方

1. **初回のみ**: [Bun](https://bun.sh/) と **Git**（Xcode Command Line Tools）が Mac に入っていることを確認してください。
2. Finder で **`mac-launcher`** フォルダを開き、**Pascal Editor** をダブルクリックします。
3. ブラウザが開けばそのまま編集できます。
4. 上流の新着まで取り込みたいときは **Sync upstream on GitHub** を実行し（完了まで少し待つ）、続けて **Update Pascal Editor** を実行します。
5. フォークの更新だけでよいときは **Update Pascal Editor** のみで構いません。
6. 終わったら **Stop Pascal Editor** でサーバーを止められます（省略するとバックグラウンドで動き続けます）。

## Dock や Applications に置く

- **そのままコピー**: `mac-launcher` 内の各 `.app` を **Dock** にドラッグするか、`アプリケーション` フォルダへコピーして使えます。
- **保存される設定**: リポジトリの場所は  
  `~/Library/Application Support/PascalEditor/repo-path.txt`  
  に記録されます。`.app` だけを別の場所に移しても、このファイルがあれば同じフォルダを参照します。
- **初回またはパスが変わったとき**: 自動でフォルダ選択ダイアログが開くので、`package.json`（ルートの `"name": "editor"`）があるフォルダを選んでください。

## ログ

- 開発サーバー出力: `~/Library/Application Support/PascalEditor/dev-server.log`
- 最後の更新処理出力: `~/Library/Application Support/PascalEditor/update-last.log`

## トラブルシュート

- **「Bun が見つかりません」** と出る（ターミナルでは `bun` が使える）  
  Finder から開いたアプリにはターミナルと違って PATH が渡らないことがあります。ランチャーは各 `.app` 内の設定で `~/.bun/bin`・Homebrew のパス・ログインシェル相当の PATH を足します。**「Update Pascal Editor」を実行するか**、`mac-launcher` を git で最新にしてから再度お試しください。それでもダメなときはターミナルで `which bun` と打ち、表示されたパスを確認してください（ほかの場所に入っている可能性があります）。

## 注意

- **Update** は `git pull --ff-only` です。ローカルでコミット済みの変更と競合すると失敗します。そのときは開発者に相談するか、ターミナルで解消してください。
- 起動済みのときに **Pascal Editor** をもう一度実行すると、サーバーは増やさずブラウザだけ開きます。
