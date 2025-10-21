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

## 参考

- [Docker で Tauri の環境を構築する(yew,WSLg)](https://qiita.com/Ritz/items/883337f711a48663cf64)
- [TauriをDockerを使ってなるべく簡単に始める](https://www.tunamaguro.dev/articles/2023/05/tauri-docker/)
- [Tauriでデスクトップアプリ開発に挑戦](https://share.google/gBV6VjSxjJ4ondbJS)
- 