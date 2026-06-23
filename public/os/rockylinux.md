# RockyLinux

## ダウンロード

最初はフルで落とそうと思ったけど 10G もあるということで断念。
なんだかんだ Minimal で全然問題なさそう。
ただカーネルのインストールはめんどくさい。（最新とインストールが違う。。）

## 参考

- [Rocky Linux でサーバ構築を試してみた](https://qiita.com/seshat/items/2c57ed9225c18c89469e)
- [VPS(Rocky Linux 9.3)に Node.js をインストール](https://zenn.dev/pino0701/articles/vps_install_node)

## rg

rg（[ripgrep](https://github.com/BurntSushi/ripgrep)）は、Rustで実装された非常に高速なコマンドライン検索ツールです。標準のgrepと同様に正規表現でテキスト検索を行いますが、デフォルトで高速な再帰検索、.gitignoreの自動考慮、マルチスレッド処理を行い、大規模なコードベースやログファイルから瞬時にパターンを特定できます。 [1, 2, 3] 
主な特徴と使い方:

* 高速検索: grep, ag より高速。
* 自動検索: カレントディレクトリを再帰的に検索。
* 除外機能: .gitignore に含まれるファイルや隠しファイルを自動で検索対象外にする。
* 基本コマンド: rg [パターン] [パス]。 [1, 2, 3, 4, 5] 

よく使うオプションと例:

* rg "pattern": 現在のディレクトリ以下を再帰的に検索。
* rg -i "pattern": 大文字小文字を区別せず検索。
* rg -w "pattern": 単語単位で完全一致検索。
* rg -l "pattern": マッチしたファイル名のみを表示。
* rg -g "*.py" "pattern": Pythonファイルのみを対象に検索。
* rg -tpy "pattern": [rg -g "*.py" "pattern"] と同等。
* rg -Tpy "pattern": [rg -g "!*.py" "pattern"] と同等。
* rg -F "string": 正規表現を使わず、文字列そのもので検索。 [1, 4, 6, 7] 

- インストール方法（Ubuntu/Debian）:

``` sh
sudo apt install ripgrep
```

- インストール方法(RedHat) :

標準リポジトリで見つからない場合は、EPEL（Extra Packages for Enterprise Linux）を有効にする必要があります。

``` sh
# EPELのインストール
sudo dnf install epel-release

# ripgrepのインストール
sudo dnf install ripgrep
```

- インストール方法(Cargo)

``` sh
cargo install ripgrep
```

[1] [https://bashdo.com](https://bashdo.com/command/ripgrep/)
[2] [https://koanacademy.jp](https://koanacademy.jp/rg)
[3] [https://www.youtube.com](https://www.youtube.com/watch?v=1gywe0ILrvw&t=10)
[4] [https://gihyo.jp](https://gihyo.jp/admin/serial/01/ubuntu-recipe/0579)
[5] [https://labex.io](https://labex.io/ja/tutorials/linux-fast-searching-with-ripgrep-384504)
[6] [https://maku.blog](https://maku.blog/p/4jhbtm3/)
[7] [https://qiita.com](https://qiita.com/miyagaw61/items/32b151087a6b8d29e0aa)
[8] [https://zenn.dev](https://zenn.dev/megeton/articles/56b8a6a74e6394)

## SSHサーバー

Rocky LinuxでSSHサーバーを設定するには、SSHサービスをインストールし、設定ファイルを編集して、ファイアウォールでSSHポートを許可する必要があります。
SSHサーバーのインストールと設定手順

1. システムの更新:

最初に、システムを最新の状態に更新します。以下のコマンドを実行します。

``` bash
sudo dnf update
```

1. OpenSSHサーバーのインストール:

SSHサーバーがインストールされていない場合、以下のコマンドでインストールします。

``` bash
sudo dnf install openssh-server
```

1. SSHサービスの起動と有効化:

SSHサービスを起動し、システム起動時に自動的に開始するように設定します。

``` bash
sudo systemctl start sshd
sudo systemctl enable sshd
```

1. SSH設定ファイルの編集:

SSHの設定ファイルを開き、必要に応じて設定を変更します。

``` bash
sudo vi /etc/ssh/sshd_config
```

  - PermitRootLogin: ルートログインを無効にするために、以下の行を変更します。
  
  ``` text
  PermitRootLogin no
  ```

  - ポートの変更: デフォルトのポート22を変更したい場合は、以下の行のコメントを外し、ポート番号を変更します。

  ``` text
  #Port 22
  ```

1. ファイアウォールの設定:

SSHサービスへのアクセスを許可するために、ファイアウォールの設定を行います。

``` bash
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```

1. SSHサービスの再起動:

設定を変更した後、SSHサービスを再起動します。

``` bash
sudo systemctl restart sshd
```

1. 接続の確認

SSHクライアントを使用して、他のコンピュータからSSH接続を試みます。接続が成功すれば、設定は完了です。

これでRocky LinuxでのSSH設定が完了しました。リモートから安全に接続できるようになります。詳細な手順や設定については、公式ドキュメントや信頼できるリソースを参照してください

[【Rocky Linux 9】02.SSH設定](https://qiita.com/T_Tsan/items/5943685891078bbdc217)

