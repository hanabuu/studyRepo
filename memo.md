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

## Database

* 20250204の日付の分割と日付の型にする
```
 datetime(
    substr(eventDate,0,5) || '-' || 
    substr(eventDate,5,2) || '-' || 
    substr(eventDate,7,2) || ' ' || 
    substr(eventDate,9,2) || ':' || 
    substr(eventDate,11,2) || ':' || 
    substr(eventDate,13,2) 
 ) as 'eventDate',
```

* 日付の差分

```
select 
 strftime('%Y', '2025-05-02') - strftime('%Y', '2024-03-22') as "year",
 strftime('%m', '2025-05-02') - strftime('%m', '2024-03-22') as "month",
 strftime('%d', '2025-05-02') - strftime('%d', '2024-03-22') as "day",
 (strftime('%Y', '2025-05-02') - strftime('%Y', '2024-03-02')) * 12 + (strftime('%m', '2025-05-02') - strftime('%m', '2024-03-02')) as "between"
```

```
year	month	day	between
1	2	-20	14
```

## その他

[PowerShell のスクリプトが実行できない場合の対処方法](https://warawaforce.hatenablog.com/entry/2020/07/29/231649)

```
> PowerShell Set-ExecutionPolicy RemoteSigned
```