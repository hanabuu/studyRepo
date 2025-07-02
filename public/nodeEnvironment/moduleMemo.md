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


[Node入門書](https://books.google.co.jp/books?id=t3B9DwAAQBAJ&pg=PT222&lpg=PT222&dq=javascript+%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E5%88%86%E5%89%B2+%E8%87%AA%E5%8B%95%E7%94%9F%E6%88%90&source=bl&ots=ZhsDdxHnk2&sig=ACfU3U07lTvqvLxkaTBq5fA_IHJ_ynjtZw&hl=ja&sa=X&ved=2ahUKEwjVw9rsi-TpAhUpK6YKHTAQCvwQ6AEwCXoECAMQAQ)

