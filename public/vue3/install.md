# vite + vue3 インストール編

## インストール方法

vitaのインストールでプロジェクトの作成が可能。
テンプレートでvite+vue3かvite+vue3+typescriptかとかいろいろ選べるようだ。
インストール方法は以下。
```
% npm init vite@latest [プロジェクト名] -- --template [テンプレート名]
例(vite+vue3)) > npm init vite@latest [プロジェクト名] -- --template vue
例(vite+vue3+typescript)) > npm init vite@latest [プロジェクト名] -- --template vue-ts
```

以下のディレクトリ構成のプロジェクトが出来上がる

```
.
|-- README.md
|-- index.html
|-- package.json
|-- package-lock.json
|-- public
|   `-- vite.svg
|-- src
|   |-- App.vue
|   |-- assets
|   |   `-- icon.svg
|   |-- components
|   |   `-- HelloWorld.vue
|   |-- vite-env.d.ts
|   `-- main.ts
|-- tsconfig.json
|-- tscinfig.node.json
|-- .gitignore
|-- README.md
`-- vite.config.ts
```

これでインストール完了。

## 実行

インストール完了後以下のコマンドで、すぐに実行可能。

```
> npm run dev
```

以下の表示でサーバーが立ち上がる。
http://localhost:5173/へアクセスすることで、画面を確認できる。

``` text
  VITE v4.4.7  ready in 1119 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

