# モジュールについて

## pathモジュール

[nodejsのpathモジュールの使い方](https://qiita.com/oblivion/items/e9677ef4ca38643aaa14)

``` javascript
const path = require('path')

console.log('basename:', path.basename('./dir/test.txt'))
console.log('dirname:', path.dirname('./dir/test.txt'))
console.log('extname:', path.extname('./dir/test.txt'))
console.log('parse:', path.parse('./dir/test.txt'))
console.log('join:', path.join('dir', 'dir2', 'test.txt'))
console.log('relative:', path.relative('./dir', './dir2/test.txt'))
```

出力結果

``` text
basename: test.txt
dirname: ./dir
extname: .txt
parse: { root: '',
  dir: './dir',
  base: 'test.txt',
  ext: '.txt',
  name: 'test' }
join: dir/dir2/test.txt
relative: ../dir2/test.txt
```

## dotenv

- 環境変数ファイル.envを扱う（iniみたいな外部ファイルからデータを読み取れる）

- .envファイル
``` text
OBNIZ_ID=123456789
```

- index.js
``` js
const obnizid=process.env.OBNIZ_ID;
console.log(obnizid);
```

- 実行時
```
> node --env-file=.env index.js
```

- [Node.jsでdotenvがいらなくなったっぽいので使ってみる](https://qiita.com/n0bisuke/items/c9f8cc3b7ddd419fcf1e)
- [【Node】dotenvで環境変数を設定する](https://qiita.com/ozaki25/items/3e2cf94f29bd0edc1979)