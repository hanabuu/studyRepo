# tauri動かしてみる

## 準備

### docker-composeのインストール

```
sudo apt install docker-compose
```

## wslにDisplay用の設定追加

- .bashrcの最後に以下を追加

```
export DISPLAY=:0
export WAYLAND_DISPLAY=wayland-0
export XDG_RUNTIME_DIR=/mnt/wslg/runtime-dir
export PULSE_SERVER=/mnt/wslg/PulseServer
```

wsl(ubuntu)上の表示をwindows側に出力する設定のようだ。

### x11-appsをインストール 

```
sudo apt install x11-apps
```

### docker起動

```
docker-compose up -d
```

### dockerの中に入る

```shell
> docker exec -it rust_todo bash
```

### 消す
ダメだったときに消すやつ

``` shell
> docker-compose down --rmi all --volumes
```

rust:1.69-slim-bullseyeだとxeyesが入れられないかもと言われ、slimなしをいれて<br>
それでbuildできたからtauri実行しようとすると1.69古いからと言われ、1.90を入れてみたけど<br>
まだできなかった。
なんか環境変数の問題っぽい。

### tauriのチュートリアルを試す

``` shell
> npm create tauri-app@latest
> cd tauri-app
> npm install
> npm run tauri dev
```

## 別コンテナ

* dockerfileの別アプローチでnodeコンテナ上にtauriを入れる方法
* docker-composeはtauri-appがある前提となっているため、適宜volumeにマウントできるように配置しておくこと

## exe作成

``` text
npm run tauri build はデフォルトで Windows 向けに NSIS インストーラー（.exe）を作ります。インストーラーなしで実行可能ファイルだけ欲しいなら、Tauri の bundler を exe に絞れば OK です。

生成物は src-tauri/target/x86_64-pc-windows-gnu/release/bundle/exe/ 配下に配置され、インストール不要でそのまま起動できます。

さらに軽い “そのまま cargo の成果物” が欲しい場合は、バンドル処理を通さずに cargo build --release --target x86_64-pc-windows-gnu を実行すれば src-tauri/target/x86_64-pc-windows-gnu/release/<appname>.exe が生成されます。必要に応じてお選びください。
```

## テクニック

### 環境による差分の判断

``` ts
  /**
   * @function handleRequestClose
   * @description ダイアログ共通 close 要求を受け取り、親へ閉鎖通知を委譲する。
   * @param reason - 閉鎖要求の起因（背景クリックまたは ESC）。
   */
  function handleRequestClose(reason: "backdrop" | "escape") {
    if (import.meta.env.DEV) {
      console.debug("[dialog-close] version-dialog", { reason });
    }
    onClose();
  }
```

import.meta.env.DEV は、.env ファイルの値を直接読むものではなく、Vite が提供する「今の実行モードが開発かどうか」の組み込みフラグです。

true: 開発サーバー実行時（例: npm run dev）
false: 本番ビルド/本番実行時（例: npm run build）
つまりこの行は「開発中だけ console.debug を出す」ための判定です。
補足として、import.meta.env には他にも PROD, MODE, BASE_URL, SSR などの組み込み値があります。

### デスクトップアプリ上での動作か、ブラウザ上での動作か

tauriの機能でフロントエンド側で使える

``` ts
<script>
  import { invoke, isTauri } from "@tauri-apps/api/core";

  if(isTauri()){
    // Tauri デスクトップアプリとして実行中
  } else {
    // 通常のブラウザ環境や開発用 Web 表示で実行中
  }
</sctipt>
```

### windowオブジェクトが存在するかの判断

``` ts
<script>
const inBrowser = typeof window !== "undefined";

if(inBrowser){
  // ブラウザ文脈で実行中（DOM API を使える）
} else {
  // SSR など window がない文脈
}
</script>
```

この変数を使って、window.addEventListener の登録可否や、Tauri 初期化処理の分岐前提を安全にしています。つまり isTauri が「Tauri 実行か」を見るのに対し、inBrowser は「そもそもブラウザ API が使えるか」を見るガード変数です。

### tauri::State

1.  起動時に共有状態を登録する
setup 内で ```app.manage(...)``` します。例えばデータベース接続管理状態とか。
1.  コマンド引数で State<'_, T> を受ける
```#[tauri::command]``` 関数の引数に書くと、Tauri が自動注入します。
1.  フロントの invoke では State 引数を渡さない
フロントは業務入力（port, mode など）だけ渡せばよく、State はバックエンドで解決されます。
1.  State から必要な依存を取り出して使う
例えば データベース接続管理状態 から 接続状態 を取得して処理へ渡すとか。
1.  未登録の型は注入できない
```app.manage(T)``` していない型を ```State<T>``` で受けるとコマンド実行時に失敗します。

- 実務上の使い分け:
```State<T>```: DB接続管理、ロガー、設定、キャッシュなど「アプリ全体で共有したい依存」
通常引数: フロントから毎回渡す入力値（文字列、ID、パスなど）

- 最小イメージ:
setup: app.manage(MyState::new())
command: fn cmd(state: tauri::State<'_, MyState>, arg: String) -> ...
この2点をセットで覚えると運用しやすいです。

## 参考

- [Docker で Tauri の環境を構築する(yew,WSLg)](https://qiita.com/Ritz/items/883337f711a48663cf64)
- [TauriをDockerを使ってなるべく簡単に始める](https://www.tunamaguro.dev/articles/2023/05/tauri-docker/)
- [Tauriでデスクトップアプリ開発に挑戦](https://share.google/gBV6VjSxjJ4ondbJS)
- 