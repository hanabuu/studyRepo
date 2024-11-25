# その他

## VSCodeショートカット
必要な分の覚書
|キー|動作||
|--|--|--|
|Ctrl+1|左のエディターをフォーカス|分割してなければエディター部分へのフォーカスにも使える|
|Ctrl+`|ターミナルを開く|ターミナルにフォーカスにも使える|

## Linuxコマンド
覚書
### tar
* 圧縮
```
> tar -zcvf filename.tar.gz directoryName   // tar.gzへの圧縮
> tar -cvf filename.tar directoryName //tarへの圧縮
```

* 解凍
```
> tar -zxvf filename.tar.gz  // tar.gzからの解凍
> tar -xvf filename.tar  // tarからの解凍
```

* オプション
|option|full name|mean|
|--|--|--|
|-z|--gzip|gzip形式であることを指定|
|-c|--create|新しく圧縮ファイルを作る|
|-v|--verbose|処理結果を出力|
|-f|--file|圧縮ファイルの名前|
|-x|--extract|圧縮ファイルからファイルを取り出す|

[Linux tar.gz tar 圧縮 解凍](https://qiita.com/HyunwookPark/items/047ba2da9ef16bcac356)

## その他

[PowerShell のスクリプトが実行できない場合の対処方法](https://warawaforce.hatenablog.com/entry/2020/07/29/231649)