# codebase-memory-mcp WSL 導入メモ

本資料はcodebase-memory-mcpの導入方法です。

## 導入内容

- 対象: WSL2 / Linux x86_64
- ツール: [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)
- 導入バージョン: `0.11.0`
- 実行ファイル: `~/.local/bin/codebase-memory-mcp`
- VS Code Remote User MCP 設定: `~/.vscode-server/data/User/mcp.json`
- インデックスやキャッシュは WSL 内でローカルに保持される。Docker、API キー、言語ランタイムは不要。

## 簡易導入手順

WSLをVSCodeで開き、チャットから以下のプロンプトを実行する。

```
https://qiita.com/P-man_Brown/items/73b13ea96a538b3f58e6 を WSL に導入して
```

MCPサーバーまでインストールしてくれた。

## 実施した導入手順

手作業で実施する場合の手順。[参考](#参考)を基に導入しても可。
簡易導入手順で導入した場合は本章は飛ばしてよいです。

1. Linux の OS とアーキテクチャを確認する。

   ```bash
   uname -s
   uname -m
   ```

   今回は `Linux` / `x86_64` のため、Linux amd64 portable 版を使用した。

2. 公式インストーラーを保存して内容と構文を確認し、VS Code のみを対象に実行する。

   ```bash
   curl -fsSL \
     https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh \
     -o /tmp/codebase-memory-mcp-install.sh
   bash -n /tmp/codebase-memory-mcp-install.sh
   bash /tmp/codebase-memory-mcp-install.sh --clients=vscode
   ```

   インストーラーは GitHub Releases から Linux amd64 portable アーカイブを取得し、`checksums.txt` による SHA-256 検証後に展開する。今回、バイナリと更新用 `install.sh` が `~/.local/bin` に配置され、`~/.bashrc` に PATH の設定が追加された。

3. WSL の VS Code Remote User 設定に MCP サーバーを登録する。

   自動検出では VS Code クライアントが見つからなかったため、Remote User 用の `mcp.json` を作成した。設定内容:

   ```json
   {
     "servers": {
       "codebase-memory-mcp": {
         "type": "stdio",
         "command": "/home/<ユーザー>/.local/bin/codebase-memory-mcp"
       }
     }
   }
   ```

   ファイルの場所: `~/.vscode-server/data/User/mcp.json`

## 導入確認

新しい WSL シェルで次を実行する。

```bash
codebase-memory-mcp --version
```

導入時の確認結果は `codebase-memory-mcp 0.11.0`。

VS Code では WSL 接続を再読み込みし、Copilot Chat の Agent モードで MCP サーバーが利用可能になったことを確認する。対象プロジェクトを開いた後、エージェントに「このプロジェクトをインデックスしてください」と依頼する。初回インデックス後は、グラフ検索、関数呼び出し追跡、アーキテクチャ概要などの MCP ツールで解析できる。

## 使い方

VSCodeのプロジェクトに入ってチャットから以下の内容を実行するだけ

``` text
このプロジェクトを index して
```

あとは普通にソースコードの調査をするだけ

## 更新

同じ公式インストーラーを再実行する。

```bash
bash ~/.local/bin/install.sh --clients=vscode
```

## 参考

- [公式 README](https://github.com/DeusData/codebase-memory-mcp#readme)
- [VS Code の MCP サーバー設定](https://code.visualstudio.com/docs/agent-customization/mcp-servers)
- [Claude Code のトークン消費を抑える - codebase-memory-mcp の紹介](https://zenn.dev/omeroid/articles/fb40dd4136bc78)
- [【codebase-memory-mcp】インストールしてAIにコードベースを解析させる方法](https://qiita.com/P-man_Brown/items/73b13ea96a538b3f58e6)