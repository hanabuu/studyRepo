# 書き込み系

## CSV ファイルの書き込み

### writeFile

```js
import fs from "fs";

const csvData = [
  ["Name", "Age", "Email"],
  ["John Doe", "30", "john@example.com"],
  ["Jane Smith", "25", "jane@example.com"],
];

const csvContent = csvData.map((row) => row.join(",")).join("\n");

fs.writeFile("output.csv", csvContent, (error) => {
  if (error) {
    console.error("CSVファイルの作成中にエラーが発生しました:", error);
  } else {
    console.log("CSVファイルが作成されました。");
  }
});
```

## ストリームを使った書き込み


## ブラウザでファイルを保存する

* ブラウザ側でファイルを保存しようとしたときFileSystemAccessAPI対応のブラウザ(Chrome系)については保存ダイアログを出して保存が可能

``` js
if (window.showSaveFilePicker) {
    try {
        const handle = await window.showSaveFilePicker({
            suggestedName: 'export.yaml',
            types: [
                {
                    description: 'YAML Files',
                    accept: { 'text/yaml': ['.yaml', '.yml'] }
                }
            ]
        });
        const writable = await handle.createWritable();
        await writable.write(yamlText);
        await writable.close();
    } catch (error) {
        if (!error || error.name !== 'AbortError') {
            console.error('YAMLファイルの保存に失敗しました。', error);
        }
    }
    return;
}
```

## 参考

[nodeJS で CSV ファイルを出力する](https://zenn.dev/hunmatu/scraps/d312f1f4897915)
[Node.js の Stream を使ってみる](https://qiita.com/b-coffin/items/bfdb1145d5acca7268ff)

## リポジトリ

[fileControlSample](https://github.com/hanabuu/fileControlSample)
