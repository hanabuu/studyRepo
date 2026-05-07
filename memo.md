# その他

## VScode

### ショートカット

- 必要な分の覚書

|キー|動作||
|--|--|--|
|Ctrl+1|左のエディターをフォーカス|分割してなければエディター部分へのフォーカスにも使える|
|Ctrl+`|ターミナルを開く|ターミナルにフォーカスにも使える|

## 画像張付け

[VSCodeでMarkdownに画像を貼り付ける](https://qiita.com/IshigiwaKenichiro/items/a188bae076c8ea330ef6)

- Paste Image
  - Ctrl + Alt + Vで画像とリンクを貼ってくれる
- 保存先変更
  - vscodeのsetting.json

``` json
{
  "pasteImage.path": "${currentFileDir}/images"
}

```

### VSCode上でブラウザ確認する方法

- 方法A（Simple Browser）
  - Ctrl+Shift+P
  - Simple Browser: Show
  - URLに <対象のURL> を入力
- 方法B（Portsパネル）
  - VSCode下部の PORTS を開く
  - <対象のポート> があれば Open in Browser
  - なければ <対象のポート> を Forward して開く
- 方法C（今回の環境で私が使った確認）
  - VSCode内蔵ブラウザで http://127.0.0.1:5173/ を開いてUIを確認済み
- それでも別PCから見えない場合の確認順
- サーバーが起動中か: ss -ltnp | grep <対象ポート>
- バインドが 0.0.0.0 か
- サーバー機のFWで <対象ポート>/TCP が許可されているか
- 別PC側のプロキシ除外に <該当サーバーのIPアドレス> を追加しているか

## Linuxコマンド

覚書

### tar

- 圧縮

``` text
> tar -zcvf filename.tar.gz directoryName   // tar.gzへの圧縮
> tar -cvf filename.tar directoryName //tarへの圧縮
```

- 解凍

``` text
> tar -zxvf filename.tar.gz  // tar.gzからの解凍
> tar -xvf filename.tar  // tarからの解凍
```

- オプション

|option|full name|mean|
|--|--|--|
|-z|--gzip|gzip形式であることを指定|
|-c|--create|新しく圧縮ファイルを作る|
|-v|--verbose|処理結果を出力|
|-f|--file|圧縮ファイルの名前|
|-x|--extract|圧縮ファイルからファイルを取り出す|

[Linux tar.gz tar 圧縮 解凍](https://qiita.com/HyunwookPark/items/047ba2da9ef16bcac356)

## Database

- 20250204の日付の分割と日付の型にする

``` sql
 datetime(
    substr(eventDate,0,5) || '-' || 
    substr(eventDate,5,2) || '-' || 
    substr(eventDate,7,2) || ' ' || 
    substr(eventDate,9,2) || ':' || 
    substr(eventDate,11,2) || ':' || 
    substr(eventDate,13,2) 
 ) as 'eventDate',
```

- 日付の差分

``` sql
select 
 strftime('%Y', '2025-05-02') - strftime('%Y', '2024-03-22') as "year",
 strftime('%m', '2025-05-02') - strftime('%m', '2024-03-22') as "month",
 strftime('%d', '2025-05-02') - strftime('%d', '2024-03-22') as "day",
 (strftime('%Y', '2025-05-02') - strftime('%Y', '2024-03-02')) * 12 + (strftime('%m', '2025-05-02') - strftime('%m', '2024-03-02')) as "between"
```

``` text
year	month	day	between
1	2	-20	14
```

## その他のメモ

[PowerShell のスクリプトが実行できない場合の対処方法](https://warawaforce.hatenablog.com/entry/2020/07/29/231649)

- 以下のコマンドをPowerShellの管理者で実施する

``` text
> PowerShell Set-ExecutionPolicy RemoteSigned
```

## Regular expression(正規表現)

- []を使った表現
  - [abc]：文字列の中に「a,b,c」いずれかにマッチ
  - [a-z]：「a〜z」の文字列がマッチ
  - [a-zグ]：「a〜z」と「グ」の文字
  - [^a-z]：「a〜z」以外の文字

|文字||
|—|—|
|.|任意の一文字|
|\n|改行|
|\s|スペースとタブ|
ここは資料で

[\s^\n]：改行を除くスペースおよびタブ

- **行頭、行末の表現**
^：（キャレットという）
$：（ダラー）

^[0-9]：行頭の0-9の文字
置換で^を指定して文字を入れると行頭にはいる

- **{}の繰り返し**
  - {5}：5回繰り返し
  - {5.}：5回以上繰り返し
  - {5-10}：5〜10回繰り返し{5,10}のときもある？エディター等による

\t[0-9]{1.}：タブの後に0-9の文字が1回以上繰り返しているところ

- **特定の文字列が入る行を特定する**
　- ```^.*女.*$```
    - 女の部分が検索したい文字列
    - 前後の文字は.(任意)と*(繰り返し)
    - ^$で行頭行末
    - ただし、2箇所女の文字が入るとダメなのでちょっと工夫が必要
  - ```\b<str>\b```
    - その文字だけ探し出すのかな

最小マッチ、最長マッチ
最小マッチ：最初に出てきたとき：文字の前に$を入れる
最長マッチ；最後まで繰り返す（デフォルト）

^[^~]*.xlsx
