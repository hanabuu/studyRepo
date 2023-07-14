# nodeの管理

特定のnode.jsバージョンでないと動作しないパッケージがある。ex. nexe, ble等
そのため、nodejsのバージョン管理ツールを導入する。

導入するツールは[volta]である。

## voltaのインストール
[Volta-Getting Started](https://docs.volta.sh/guide/getting-started)
ここの「download and run the Windows installer」をクリックするとダウンロードされる。
ダウンロードしたインストールファイルを実行し、インストール（特に指定等なし）

## node.js, npmのインストール

最新インストール
``` text
> volta install node
> volta install npm
> node -v
v18.16.1
> npm -v
9.7.2
```

## 特定バージョンのインストール

Voltaでは、installというコマンドはそのバージョンをフェッチして使用するという意味で使用されます。
複数のバージョンをインストールした後に、デフォルトで使用したいバージョンがある場合は再度volta install　を実行します。

今後のためにフェッチはしたいけど今は使用したくないという場合は以下のコマンドを使用します。
```
> volta fetch node@14.15.3
success: fetched node@14.15.3 (with npm@6.14.9)
```

## リストの表示

```
PS F:\nodejs> volta list all
⚡️ User toolchain:

    Node runtimes:
        v14.15.3
        v18.16.1 (default)

    Package managers:
        npm:
            v9.7.2 (default)

    Packages:
```

## プロジェクトにnodeのバージョンを固定
プロジェクトフォルダに行って、以下のコマンドを実行

```
> volta pin node@14.15.3
```

## 参考
[Node.jsのバージョン管理はVoltaに決定](https://zenn.dev/aiueda/articles/7dcecaa05d4f24)
[Windows 環境から Node.js を完全に削除する方法をやってみた](https://dev.classmethod.jp/articles/completely-uninstall-nodejs-from-windows/)
