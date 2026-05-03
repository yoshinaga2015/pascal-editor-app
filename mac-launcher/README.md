# Pascal Editor — Mac ランチャー（ダブルクリック起動）

非エンジニア向けに、ターミナルを開かずに起動・更新できる `.app` を同梱しています。

## 含まれるアプリ

| アプリ | 役割 |
|--------|------|
| **Pascal Editor** | `bun dev` をバックグラウンドで開始し、ブラウザで http://localhost:3002 を開きます。 |
| **Update Pascal Editor** | `git pull --ff-only` のあと `bun install` を実行し、GitHub の変更を取り込みます。 |
| **Stop Pascal Editor** | ポート 3002 で動いている開発サーバーを停止します。 |

## 使い方

1. **初回のみ**: [Bun](https://bun.sh/) と **Git**（Xcode Command Line Tools）が Mac に入っていることを確認してください。
2. Finder で **`mac-launcher`** フォルダを開き、**Pascal Editor** をダブルクリックします。
3. ブラウザが開けばそのまま編集できます。
4. アップデートがあったら **Update Pascal Editor** をダブルクリックします（1 ボタン相当）。
5. 終わったら **Stop Pascal Editor** でサーバーを止められます（省略するとバックグラウンドで動き続けます）。

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
