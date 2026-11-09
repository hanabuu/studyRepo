## Linuxコマンド

### find

- 再帰的に検索できる
``` text
> find <検索対象ディレクトリ> -name "<file名>"
> find ./ -name "test.txt"

例）
Zone.Identifierファイルの検索（再帰的）
find <path> -type f -name '*:Zone.Identifier'
末尾に「-delete」をつけると削除できる
```

### locate

- システムとして全体を検索可能
``` text
> updatedb  :Linux内のファイル配置をアップデートする
> locate test.txt
```

曖昧検索は「*」とかはつけなくてよい。

``` text
# locate RZG_Series_Software_Package
/home/alsok/work/proprietary/RZG_Series_Software_Package_for_Linux-20180115.tar.gz
/home/alsok/work/proprietary/RZG_Series_Software_Package_of_Linux_Drivers-20180115.tar.gz
/var/work_bak/proprietary/RZG_Series_Software_Package_for_Linux-20180115.tar.gz
/var/work_bak/proprietary/RZG_Series_Software_Package_of_Linux_Drivers-20180115.tar.gz
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

## 環境変数(PATH) について

- **表示**

``` shell
echo $PATH
```

例）

``` shell
$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/sbin 
```

この時優先順位は ```/usr/local/bin ＞ /usr/bin ＞ /bin ＞ /usr/sbin ＞ /sbin ＞ /usr/local/sbin``` となる。（左側が優先）
そのため、同盟のコマンドがある場合は、優先度が高いパスから使用する

例) 優先度を高くしたい場合

``` shll
$ export PATH=追加したいコマンド検索パス:$PATH
```

- **コマンド実行ファイルの格納場所の確認方法**

``` shell
$ which ls
/bin/ls
```

- **追加**

パスの追加
```.bashrc```か```bash_profile```に以下の記載を行う

``` shell
export PATH=$PATH:追加したいコマンド検索パス
```

追加後以下のコマンドで適用。ファイルは追加したほうのファイル

``` shell
$ source ~/.bashrc
$ source ~/.bash_profile
```

- **削除**

``` shell
$ unset ULB #[$]は入力しなくて良い。
```

### 環境変数の表示方法

``` shell
export -p

# 出力結果(一部のみ記載)
declare -x PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
declare -x LANG="ja_JP.UTF-8"
declare -x SHELL="/bin/bash"
```

[参考](https://qiita.com/ryouya3948/items/8edbd5d744c83dd41141)

### 環境変数の引継ぎ

以下のコマンドでcurlに失敗

``` bash
$ curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh" | sudo bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  5580  100  5580    0     0   6495      0 --:--:-- --:--:-- --:--:--  6503
curl: (6) Could not resolve host: packages.gitlab.com
Failed to download: https://packages.gitlab.com/install/repositories/runner/gitlab-runner/el/9/config_file.repo
Verify curl installation.
```

いろいろ調べるとsudoに環境変数が渡ってないことが原因だった。調べてみるとAIの回答は以下

sudo で環境変数を引き継ぐには -E オプションを使用します。また、特定の環境変数だけを引き継ぎたい場合は --preserve-env を指定し、コマンドラインで一時的に渡すこともできます。具体的な使い分けとコマンドは以下の通りです。

1. すべての環境変数を引き継ぐ現在のシェルに設定されているほとんどの環境変数をそのまま sudo 先に引き継ぐには、コマンドの前に -E オプションを付けます。

``` bash
sudo -E command
```

2. 特定の環境変数だけを引き継ぐ特定の変数（例: PATH や http_proxy）のみをピンポイントで引き継ぎたい場合は、--preserve-env オプションを使います。

```bash
sudo --preserve-env=PATH,http_proxy command
```

3. 一時的な環境変数を渡して実行する事前に環境変数を export していなくても、そのコマンドを実行する時だけ変数を設定して引き継ぐことができます。

```bash
sudo env PATH="$PATH" command
```

4. 常に特定の変数を引き継ぐ設定（永続化）sudo するたびにオプションを付けるのが手間な場合や、特定の変数（PATH など）がリセットされてしまうのを防ぐには、/etc/sudoers ファイルを編集します。コマンド sudo visudo を実行し、env_keep に引き継ぎたい変数を追加します。

```bash
Defaults env_keep += "PATH http_proxy"
```

上記を踏まえ、以下のコマンドで成功した。

```bash
$ curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh" | sudo --preserve-env=PTAH,https_proxy,http_proxy bash
```

ただ、よくわからないのが、管理者権限では実行に失敗する。よくわからない・・

## /etc/resolv.confがない

/etc/resolv.confは、LinuxなどのUNIX系OSでドメイン名（URLなど）からIPアドレスを調べる「名前解決」の動作（DNSサーバーや検索ドメイン）を設定するファイルです

主要な記述項目
ファイル内には主に以下のパラメーターを記述します。

- nameserver: 問い合わせを行うDNSサーバーのIPアドレス（通常最大3つまで指定可能）。
- search: ホスト名のみ指定された際に補完するドメインの検索順序。
- domain: ローカルドメインのデフォルト値。

注意点と設定方法
現在の多くのLinuxディストリビューションでは、このファイルはNetworkManagerやsystemd-resolvedなどのネットワーク管理サービスによって自動生成されます。そのため、手動でファイルを編集しても再起動やネットワーク再接続時に上書きされて消えてしまうことがあります。DNS設定を恒久的に変更したい場合は、利用している環境に合わせて以下のいずれかの適切な手順を実行してください。

1. systemd-resolved を使用している場合（Ubuntuなど）
通常、/etc/resolv.confは/run/systemd/resolve/stub-resolv.confへのシンボリックリンクになっています。設定を変更するには、/etc/systemd/resolved.confを編集し、DNSサーバーなどを指定したのちにサービスを再起動します。

```text
[Resolve]
DNS=8.8.8.8 1.1.1.1
```

2. NetworkManager を使用している場合(Redhat系)
NetworkManagerが/etc/resolv.confを制御している場合、直接編集すると上書きされます。恒久的な設定はnmcliコマンドを利用して設定するか、GUIツール（ネットワーク設定画面）で行います。[第21章 /etc/resolv.conf ファイルの手動設定](https://docs.redhat.com/ja/documentation/red_hat_enterprise_linux/8/html/configuring_and_managing_networking/manually-configuring-the-etc-resolv-conf-file_configuring-and-managing-networking)

- 再起動時に残らなくていい

```bash
sudo tee /etc/resolv.conf > /dev/null <<'EOF'
nameserver 1.1.1.1
nameserver 8.8.8.8
options timeout:2 attempts:3
EOF
```

- 恒久的に設定する場合

```bash
sudo nmcli connection modify ens160 ipv4.dns "1.1.1.1 8.8.8.8"
sudo nmcli connection modify ens160 ipv4.ignore-auto-dns yes
sudo nmcli connection up ens160
```

3. 手動で直接管理したい場合（恒久設定の無効化）
自動更新を無効にして/etc/resolv.confを手動編集できるようにするには、ネットワークマネージャーの設定（例: /etc/NetworkManager/conf.d/90-dns-none.conf）を編集し、DNSの自動処理を無効にする必要があります。

```text
[main]
dns=none
```

## リモート接続

Windowsも同様らしい

### SSH

- **基本の使い方**

``` sh
ssh ユーザー名@ホスト名またはIPアドレス
```

例：`ssh admin@192.168.1.10`

よく使うオプション

ポートを指定：`ssh -p 2222 user@host`
秘密鍵を指定：`ssh -i C:\Users\あなた\.ssh\id_ed25519 user@host`
鍵ペアを作る：`ssh-keygen -t ed25519`（C:\Users\あなた\.ssh\ に保存されます）

「'ssh' は認識されていません」と出たとき

「設定」→「システム」→「オプション機能」で「OpenSSH クライアント」を追加してください（Windows 10では「アプリ」→「オプション機能」）。

※ちちなみに、COM ポートへの接続はPuTTYのplinkが必要

``` sh
plink -serial COM3 -sercfg 115200,8,n,1,N
```

-sercfg の値は「ボーレート, データビット, パリティ, ストップビット, フロー制御」の順です。接続する機器の設定に合わせてください。

### SCP

- **基本の書き方**

``` sh
scp コピー元 コピー先
```

リモート側のファイルは ユーザー名@ホスト:パス の形で書きます。

例

ローカルからリモートへ送る：
`scp C:\work\data.txt user@192.168.1.10:/home/user/`
リモートからローカルへ取ってくる：
`scp user@192.168.1.10:/var/log/app.log C:\work\`
フォルダごとコピーする（-r）：
`scp -r C:\work\project user@host:/home/user/`
ポートを指定する（大文字の -P。sshの小文字 -p とは違うので注意）：
`scp -P 2222 file.txt user@host:/tmp/`
秘密鍵を指定する：
`scp -i C:\Users\あなた\.ssh\id_ed25519 file.txt user@host:/tmp/`

- **注意点**

パスにスペースが入る場合は "C:\My Files\a.txt" のように引用符で囲んでください。
ファイルをたくさん、または何度もやり取りするなら、対話的に操作できる sftp user@host も便利です。