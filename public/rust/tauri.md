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

※まだできてない

## 参考

- [Docker で Tauri の環境を構築する(yew,WSLg)](https://qiita.com/Ritz/items/883337f711a48663cf64)
- [TauriをDockerを使ってなるべく簡単に始める](https://www.tunamaguro.dev/articles/2023/05/tauri-docker/)