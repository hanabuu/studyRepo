# tauri用コンテナー

- tauriアプリ開発用のコンテナです。

## 準備

1. workフォルダをDockerfileと同じ階層に作成してください。
2. workフォルダ内に、他のリポジトリにあるテンプレートをgit cloneしてください。
  - 以下のコマンドでwork内に配置
    
    ``` bash
    > git clone <リポジトリURL> work/
    ```

## コンテナ操作
### コンテナの起動

``` bash
> docker compose up -d
```

### コンテナの停止

``` bash
> docker compose down
```

### コンテナに入る

``` bash
> docker container exec -it <コンテナ名> bash
```

- コンテナ名は同じ構成であれば、「tauri-container-frontend-1」となってるはず。
  - ルートのフォルダ名が異なれば「tauri-container」という文字がフォルダ名と同じになる。
  - ```docker ps -a```で名前を調べてコンテナ名を入れてください。

## プロジェクトの実行

- コンテナ内に入って、以下を実行する。

``` bash
> cd work
> npm install   # パッケージ類のインストール（初回のみ）
> npm run dev -- --host 0.0.0.0 --port <port>
```

- portは使用するテンプレートごとに違うようです
  - svelteは5173
  - vueは1420

- ２回目からはパッケージのインストールは不要です。
