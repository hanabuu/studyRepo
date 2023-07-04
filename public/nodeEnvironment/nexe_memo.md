# nexe化

## nexeのインストール
nexeはnodeのバージョン毎に管理している為、voltaを使用して14.5.3にする

```
npm install nexe@3.3.3  -> これもダメ
```
~~バージョンを指定しないとインストールできなかった~~
voltaを使用しているとそのままインストールしてもvolta側の入らない
そのため、管理者権限でコマンドプロンプトを立ち上げて以下のコマンド

```
npm install nexe -g
```

もうグローバルにインストールしてやる
[VoltaでAngularをインストールしようとした話](https://www.kthksgy.com/development/volta-error-could-not-create-shared-environment-for-package/)

## exe化

簡単なプログラムなら以下のコマンドで実行可能らしい
```
> nexe index.js --target=windows-x64-14.15.3
```
自分のローカルはできた・・・

## エラー
他のＰＣで以下のエラーが発生 -> **exe化したやつの「node_module」フォルダをexeと同じフォルダにおいてやることで動作する**

```
PS C:\Users\alsok\Desktop> .\testSerialTest.exe
C:\Users\alsok\Desktop\node_modules\node-gyp-build\node-gyp-build.js:60
  throw new Error('No native build was found for ' + target + '\n    loaded from: ' + dir + '\n')
  ^

Error: No native build was found for platform=win32 arch=x64 runtime=node abi=83 uv=1 libc=glibc node=14.15.3
    loaded from: C:\Users\alsok\Desktop\node_modules\@serialport\bindings-cpp

    at Function.load.resolve.load.path (C:\Users\alsok\Desktop\node_modules\node-gyp-build\node-gyp-build.js:60:9)
    at load (C:\Users\alsok\Desktop\node_modules\node-gyp-build\node-gyp-build.js:22:30)
    at Object.<anonymous> (C:\Users\alsok\Desktop\node_modules\@serialport\bindings-cpp\dist\load-bindings.js:11:46)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Module.require (internal/modules/cjs/loader.js:952:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at Object.<anonymous> (C:\Users\alsok\Desktop\node_modules\@serialport\bindings-cpp\dist\darwin.js:8:25)
```



## 参考
[Nexe V3](https://github.com/nexe/nexe/releases/tag/v3.3.3)
[nexeでNode.jsのアプリをパッケージングしようとしたらNode.jsのバージョンで怒られた](https://qiita.com/hikaru_naga/items/55ab9c5e76bc46ddc8d6)

[Node.jsアプリケーションを、実行可能ファイルにまとめるnexeを試す](https://kazuhira-r.hatenablog.com/entry/20180212/1518447476)
[【nodejs活用】nexeでポータブルなExpress.jsサーバーを手軽に持ち歩く〜Windows編](https://deep.tacoskingdom.com/blog/173)
[nodeアプリケーションを実行可能ファイルにして出力する](https://qiita.com/hana_asia/items/ed8876962e3d1035c0a6)
[NexeでNode.jsアプリから実行可能ファイルを作成する](https://www.memory-lovers.blog/entry/2021/11/19/100000)