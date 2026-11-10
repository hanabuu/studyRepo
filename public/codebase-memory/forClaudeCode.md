# ClaudeCodeへの設定

VSCode に登録した MCP サーバーは、Claude Code からは使えません。Claude Code は VSCode とは別の MCP 設定を読み込むためです。

- VSCode の登録先：`~/.vscode-server/data/User/mcp.json`。ここに`codebase-memory-mcp`（`/home/****/.local/bin/codebase-memory-mcp`）が登録されているらしい
- Claude Code の登録先：claude mcp add で作られる `~/.claude.json`、またはプロジェクト直下の `.mcp.json`。

## Claude Code でも使えるようにする方法

次のどちらかで登録できます。

- 特定プロジェクトだけで使う場合

``` sh
claude mcp add codebase-memory-mcp -- /home/<ユーザー名>/.local/bin/codebase-memory-mcp
```

- 全プロジェクトで使う場合

``` sh
claude mcp add -s user codebase-memory-mcp -- /home/<ユーザー名>/.local/bin/codebase-memory-mcp
```

チームで共有したい場合は、-s project を付けるとリポジトリ直下に .mcp.json が作られ、git で共有できます。

登録した設定は新しく起動したセッションから有効になります。登録したら、Claude Code を再起動するか claude --resume でこのセッションを再開してください。/mcp で接続状態を確認できます。接続されれば、今後のコード調査では codebase-memory を優先して使います。

- Claude Code の再起動後

再起動すると、MCP として `codebase-memory` のツールが直接使えるようになります。`/mcp` で `codebase-memory-mcp` が接続済みになっているか確認してください。
プロンプトに `/mcp` と入力してEnterを押すと、MCPサーバーの一覧が表示されます。

- `codebase-memory-mcp` が `✔ connected` なら接続できています。
- `✘ failed` と出ている場合は、サーバーを選ぶとエラー内容や再接続の操作が表示されます。

## .codebase-memoryがィレクトリが存在するかどうかで使うかどうかを決めたい

- 全リポジトリ共通の判断ルール（任意）
他のリポジトリでも同じ基準で判断させたい場合は、`~/.claude/CLAUDE.md` に次の内容を追記してください。
mdファイルなければ新しく作ればよい

``` md
## codebase-memory の使い分け
- リポジトリ直下に `.codebase-memory/` がある場合は、コード検索・呼び出し関係の調査に codebase-memory-mcp を優先して使う。ない場合は使わない（grep/find/Read で調べる）。
- インデックスは `.codebase-memory/artifact.json` の commit 時点のもの。以降の変更は grep/Read で確認する。
- 再インデックス（`.codebase-memory/` の更新）はユーザーに確認してから行う。
```
