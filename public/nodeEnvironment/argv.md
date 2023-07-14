# nodejs引数について

## コマンドライン引数の取得方法

### サンプルプログラム

```
const main = () => {
    for(let i=0; i<process.argv.length; i++){
        console.log('argv[' + i + '] = ' + process.argv[i]);
    }
}
```

processオブジェクトはnode.jsの実行環境のグローバル変数の一つのため、requireの必要なし。

### 実行結果
```
> node index.js aaa bbb
argv[0] = C:\Users\xxx\AppData\Local\Volta\tools\image\node\18.16.1\node.exe
argv[1] = F:\nodejs\workspace\depackHD730\index.js
argv[2] = aaa
argv[3] = bbb
```

* 第一引数はnodeの実行ファイル
* 第二引数は実行しているＪＳファイル
* 第三引数からがコマンドラインで渡した引数

### nexeの場合

```
> .\depackHD730.exe aaa bbb
argv[0] = F:\nodejs\workspace\depackHD730\depackHD730.exe
argv[1] = F:\nodejs\workspace\depackHD730\index.js
argv[2] = aaa
argv[3] = bbb
```

第一引数、第二引数がexeに併せて変わるだけで、第三引数からは変わらない

## 参考
[コマンドライン引数の取得](https://qiita.com/s_ryota/items/a985b521ce623c0eaf42)