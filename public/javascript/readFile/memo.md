## ディレクトリ操作

- 特定ディレクトリの読み込み

```js
const fs = require("fs");

let dataDir: string = "./data/";
let fileList: string[] = fs.readdirSync(dataDir);
console.log(fileList);
```

## 読み込みソース

```js
const fs = require("fs");
const iconv = require("iconv-lite");

const readSJISCSV = (fileName = "") => {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;

    // let buf    = new Buffer(data, 'binary');     //バイナリバッファを一時的に作成する
    // let retStr = iconv.decode(buf, "Shift_JIS"); //作成したバッファを使い、iconv-liteでShift-jisからutf8に変換
    let retStr = Buffer.from(data, "Shift_JIS").toString();
    console.log(retStr.length);
  });
};

const readUTF8CSV = (fileName = "") => {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) throw err;

    console.log(data.length);
  });
};
```

## 参考

[Node.js で DeprecationWarning を出さずに encode と decode](https://qiita.com/atsuo1203/items/3a6b588bc7d506367b75)

## リポジトリ

[fileControlSample](https://github.com/hanabuu/fileControlSample)
