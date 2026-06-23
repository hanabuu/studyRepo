## Linuxコマンド

### find

- 再帰的に検索できる
``` text
> find <検索対象ディレクトリ> -name "<file名>"
> find ./ -name "test.txt"
```

### locate

- システムとして全体を検索可能
``` text
> updatedb  :Linux内のファイル配置をアップデートする
> locate test.txt
```

### ln

リンクを張るコマンド

``` text
> ln [オプション] <リンク元ファイル名> <リンク名>
```

- ハードリンク
  - ハードリンクとは、1つのファイルの実態に複数の名前を付ける機能。ハードリンクで追加されたファイル名は、どちらが本物名前で仮の名前などの区別が存在しない。
- シンボリックリンク
  - シンボリックリンクとは、リンク先のパス名が書かれた小さな特殊ファイルです。ハードリンクとは違い、リンク先がファイルの実体です。

[lnコマンドめっちゃ便利。](https://qiita.com/mitsumizo/items/3c266699d9ca7a712108)

## ulimit

- 各ユーザーが使用できるシステムリソースを制限するコマンド
- 特定のユーザーがシステム全体のリソースを過剰に消費することを防ぐ
- 基本的な使い方

  ``` bash
  # 現在の制限をすべて表示
  $ ulimit -a
  # ユーザーが生成できる最大プロセス数を10に制限
  $ ulimit -u 10
  # 作成可能なファイルサイズを100KBに制限
  $ ulimit -f 100
  # 仮想メモリの最大量を1000KBに制限
  $ ulimit -v 1000
  # 同時に開けるファイル数を10に制限
  $ ulimit -n 10
  ```

  これらの制限を超えるとエラーが発生する、例えば```Too many open files```や```file size limit exceeded```など。

### ソフトリミットとハードリミット

- ソフトリミット：現在のセッションで有効な制限値。ユーザー自身でハードリミットの範囲内で変更可能
- ハードリミット：システム全体での最大値。一般ユーザーは減らすことはできるが、増やすことはできない。(rootユーザーのみ変更可能)

``` bash
# ソフトリミットを設定
$ ulimit -Sn 4000
# ハードリミットを設定
$ ulimit -Hn 8000
```

### 永続的な設定

- ```ulimit```の設定はデフォルトでは一時的です。永続化には```/etc/security/limits.conf```を編集する

``` text
# ユーザーやグループに制限を追加
@group_name hard nproc 20
username hard fsize 10000
```

この設定はログイン時にPAM認証を通じて適用される。ただしデーモンプロセスには適用されないため、systemdやinit.dスクリプトに直接設定を追加する必要がある。

### 注意点

- ulimitコマンドは現在のシェルセッションのみ影響する
- 設定を変更する際はシステム全体の安定性を考慮してください。

### 参考URL

- [ulimit](https://atmarkit.itmedia.co.jp/ait/articles/1908/01/news031.html)
- [システムアドレスの制限](https://qiita.com/hot_study_man/items/24e2bb953d4dca539c75)

## teeコマンド

- teeコマンドは、Linuxで標準出力をそのまま画面に表示しつつ、同時にファイルにも出力する便利なコマンドです。これにより、コマンドの実行結果を確認しながら記録することが可能です。

### 基本的な使い方

- 以下は、teeコマンドの基本的な使用例です。

``` bash
コマンド | tee ファイル名
```

この形式で、コマンドの出力が画面に表示されると同時に、指定したファイルに保存されます。

- 例: ファイルへの出力

``` bash
$ls /var | tee output.txt
```

このコマンドは、ls /varの結果を画面に表示しながら、output.txtに保存します。

### ファイルへの追記

- 既存のファイルに内容を追記したい場合は、-aオプションを使用します。

``` bash
> コマンド | tee -a ファイル名
```

- 例: 追記

``` bash
> echo "新しい行" | tee -a output.txt
```

これにより、output.txtに「新しい行」が追記されます。

### 標準エラー出力の保存

- 標準エラー出力も含めて保存するには、リダイレクトを使用します。

``` bash
> コマンド 2>&1 | tee ファイル名
```

- 例: 標準エラー出力の保存

``` bash
> ping 9999 2>&1 | tee error_log.txt
```

このコマンドは、エラー出力を含むすべての出力をerror_log.txtに保存します。

### sudoと組み合わ使用

- sudoで特権が必要なファイルに書き込む場合にもteeが役立ちます。

``` bash
> echo "0" | sudo tee /proc/sys/vm/swappiness
```

このコマンドは、swappinessの値を0に変更します。

### 複数ファイルへの出力

- 複数のファイルに同時に出力することも可能です。

``` bash
> コマンド | tee ファイル1 ファイル2
```

- 例: 複数ファイルへの出力

``` bash
> ls /var | tee file1.txt file2.txt
```

このコマンドは、ls /varの結果をfile1.txtとfile2.txtの両方に保存します。

### 注意点

- teeコマンドは標準出力をそのまま画面に表示するため、不要な出力を抑えたい場合は>/dev/nullを使用して捨てることができます。
- ファイルに追記する際は、-aオプションを忘れないようにしてください。
- teeコマンドは、ログの記録やデバッグに非常に便利なツールです。適切に活用することで、作業効率を大幅に向上させることができます。

### 参考URL

- [Linuxコマンド tee](https://www.ibm.com/docs/ja/aix/7.1.0?topic=t-tee-command)
- [Qiita](https://qiita.com/wnoguchi/items/2fc3ec11043d139dc6bb)

## vmstat

``` text
procs
  r:実行待ち状態のプロセス数
  b:割り込み不可能なスリープ状態にあるプロセス数
memory
  swpd:現在の仮想メモリの量
  free:現在開いている実メモリの量
  buff：バッファに使われている実メモリの量
  cache:キャッシュとして使われている実メモリの量
  inact:アクティブになっていない実メモリの量
  active:アクティブな実メモリ
swap
  si:ディスクからスワップインしているメモリ量
  so:ディスクにスワップしてるメモリ量
io
  bi:ブロックデバイスから受け取ったブロック数(KB/s)
  bo:ブロックデバイスに送られたブロック数(kb/s)
system
  in:1秒当たりの割り込み回数
  cs:1秒当たりのコンテキストスイッチ回数
CPU
  us:実行に使用したユーザー時間
  sy:カーネルコードの実行に使用したシステム時間
  id:アイドル時間
  wa:IOの待ち時間
  st:不明
```

## useradd

``` text
useradd -g [グループ名] [ユーザー名]
passwd [ユーザー名]
※ここでパスワードを打つ
```

## DNS系

``` text
dig MX [ドメイン]
```

## ポート確認

``` shell
> ss -tulnp | grep [ポート番号]
```

-t：TCPポート
-u：UDPポート
-l：リッスン中のポート
-n：ポート番号を数値表示
-p：プロセス名を表示

何も表示されなければ使用されていない

## OSやバージョンの確認

LinuxのOSやバージョンを確認するには、以下のコマンドを使用します。これらのコマンドは、ディストリビューションに依存せず広く利用可能です。

1. /etc/os-release ファイルを使用

OSの詳細情報を確認するために、/etc/os-release ファイルを参照します。

``` bash
cat /etc/os-release
```

例:

``` text
NAME="Ubuntu"
VERSION="22.04.3 LTS (Jammy Jellyfish)"
ID=ubuntu
PRETTY_NAME="Ubuntu 22.04.3 LTS"
```

2. lsb_release コマンドを使用

lsb_release コマンドは、Linux Standard Base (LSB) に基づいた情報を提供します。

``` bash
lsb_release -a
```

例:

``` text
Distributor ID: Ubuntu
Description: Ubuntu 22.04.3 LTS
Release: 22.04
Codename: jammy
```

3. hostnamectl コマンドを使用

システムのホスト名やOS情報を確認できます。

``` bash
hostnamectl
```

例:

``` text
Operating System: Ubuntu 22.04.3 LTS
Kernel: Linux 5.15.0-78-generic
Architecture: x86-64
```

4. uname コマンドを使用

カーネルバージョンやシステム情報を取得します。
``` bash
uname -a
```

例:

``` text
Linux hostname 5.15.0-78-generic #85-Ubuntu SMP x86_64 GNU/Linux
```

注意点

古いディストリビューションでは、/etc/os-release が存在しない場合があります。その場合は、以下のコマンドも試してください:

``` bash
cat /etc/*release
cat /etc/*version
```

これらのコマンドで、現在使用しているLinuxディストリビューションとそのバージョンを簡単に確認できます。

## パッケージ確認

dnfでインストール済みのパッケージを確認する方法は以下の通りです：

```dnf list installed```: このコマンドを実行すると、インストールされているすべてのパッケージのリストが表示されます 
```dnf history```: このコマンドを使用すると、過去のアップデートやインストール、削除などの操作履歴が表示されます 
特定のパッケージの確認: ```dnf list installed <パッケージ名>```を実行することで、特定のパッケージがインストールされているかどうかを確認できます 
```dnf info <パッケージ名>```: このコマンドを使うと、特定のパッケージの詳細情報を確認できます 
これらのコマンドを使用して、dnfでインストール済みのパッケージを簡単に確認できます。

[dnf コマンドの使い方メモ](https://qiita.com/yasushi-jp/items/0dc7f413632927f92286)

## メモリ確認

Linuxでは、メモリ使用状況を確認するために複数の便利なコマンドがあります。ここでは代表的な方法を紹介します。

- freeコマンドで確認
  - ステップ1: 基本的な実行

    ``` bash
    free -h
    ```

    - ```-h``` オプションでGiBやMiBなど人間が読みやすい形式になります。 出力例には以下の項目があります：
    - total：総メモリ量
    - used：使用中メモリ量
    - free：未使用メモリ量
    - available：即利用可能なメモリ量（キャッシュ解放分含む）

  - ステップ2: 定期的に監視

    ``` bash
    free -h -s 3
    ```

    3秒ごとに更新して表示します。

  - ステップ3: スワップ含めた合計表示

    ``` bash
    free -t
    ```

- topコマンドでリアルタイム監視
  - ステップ1: 実行

    ``` bash
    top
    ```

    - CPU・メモリ使用率をリアルタイムで表示します。%MEM列がプロセスごとのメモリ使用率です。

  - ステップ2: メモリ順に並び替え Shift + M を押すと、メモリ使用量の多い順に並び替えられます。

- 追加の便利コマンド
  - vmstat：メモリ・CPU・I/O統計を簡易表示
    
    ``` bash
    vmstat -s
    ```

  - htop（インストール必要）：カラー表示で見やすく、操作性も高い

- 確認ポイント
  - available が少ない場合はメモリ逼迫の可能性あり
  - スワップ(Swap)のusedが増えている場合は物理メモリ不足の兆候
  - これらを組み合わせることで、Linuxシステムのメモリ状況を効率的に把握できます。

[【Linuxコマンド】メモリの使用状況を確認する方法｜free・top](https://www.sejuku.net/blog/54699)

