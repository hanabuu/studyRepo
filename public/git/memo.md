# git めも

## 覚書

- [nameとemailを設定する](https://docs.github.com/ja/get-started/git-basics/setting-your-username-in-git)

``` text
> git config user.name '～'
> git config user.email '～'
```

### ローカルのプロジェクトをGitHubへアップロードする方法

#### 例）StaticHtml

* GitHubへアップロードしたいプロジェクトディレクトリへ移動

``` text
$ cd testStaticHtml/
$ git init
Initialized empty Git repository in C:/work/nodejs/workspace/testStaticHtml/.git/
```

* 必要であれば.gitignoreを作成し、バージョン管理しないファイルやディレクトリを記載（例：*.log）

``` text
$ vim .gitignore
```


* 先ほど作成したGitHubリポジトリのURLをコピー&ペーストして、リモートブランチとして設定

``` text
git remote add origin https://github.com/hanabuu/testStaticHtml.git
```

※これで.git/configにコミット先を記録するんだと思う

* 確認

``` text
$ git remote -v
origin  https://github.com/hanabuu/testStaticHtml.git(fetch)
origin  https://github.com/hanabuu/testStaticHtml.git(push)

```

### プロジェクトディレクトリ内にあるファイルやディレクトリを全てコミット 

``` text
$ git add .
$ git commit -m "Initial Commit"
```

※addでめちゃめちゃワーニング出たけど。。気にしない.改行コードっぽい

* ローカルのファイルをアップロード

``` text
git push -u origin master
```

## 参考

### branch作成

#### ブランチ一覧確認

``` text
> git branch
```

#### ローカルブランチからブランチを作成

``` text
> git chckout -b <作成するブランチ名>
```

[【Git入門】branchを指定してcloneする方法をわかりやすく解説](https://www.sejuku.net/blog/71801)

#### リモートブランチからローカルブランチを作成

``` text
> git checkout -b <作成するブランチ名> origin/<作成元のリモートブランチ名>
```

#### ブランチ切り替え

``` text
> git checkout <ブランチ名>
```

#### ブランチをリモートに登録

``` text
> git push -u origin <作成したブランチ名>
```

### branchのクローン

https://www.sejuku.net/blog/71801

``` text
$ git clone -b [branch名] http://～.git
``` 

#### フォルダ指定してクローン

``` text
$ git clone [URL] [フォルダ名]
```

[git cloneでディレクトリを指定する方法とは？フォルダ名を自由に決めてクローンしよう](https://school.learning-next.app/blog/git/git-clone-directory)

#### リモートブランチを取得

``` text
$ git checkout -b <ブランチ名> origin/<ブランチ名>
```

- masterブランチのところでやる

### gitのクローンからコミット

https://itsakura.com/tool-github-git-ssh

``` text
$ git config --global user.name <username>
$ git config --global user.email <useremail>

$ git clone ～.git
```

### git pull

``` text
$ git remote add ～.git
$ git pull origin master
```

[フォルダ以下の全プロジェクトでgit pullする](https://llcc.hatenablog.com/entry/2017/04/07/204529)

### git config

https://note.nkmk.me/git-config-setting/

### ローカルのリポジトリのコミットからプッシュの流れ

``` text
$ git add .                     // ローカルの変更を追加（ファイルの追加だけでなく変更を追加している）
$ git commit -m "change"        // ローカルコミット
$ git push -u origin master     // プッシュ
```

## リポジトリのサイズ確認

``` text
// リポジトリの総サイズ
$ du -s <ディレクトリ名>
// 中のディレクトリ毎に出してくれる
$ du <ディレクトリ名>
```

サイズはキロ単位で出る。
-mでメガ単位で出る。

## git add取消

### はじめてのgit add を取り消す

git init 直後のgit addを取り消したい場合。

* 全てのファイルを取り消し

``` text
git rm --cached -r .
```

* 特定のファイルのみ取り消し

```  text
git rm --cached -r file_name
```

### 2回目以降のgit add を取り消す

* 全てのファイルを取り消し

``` text
git reset HEAD
```

* 特定のファイルのみ取り消し

``` text
git reset HEAD file_name
```

* 直前のコミットの取消

``` text
git reset --soft HEAD^
```

[参考](https://qiita.com/shuntaro_tamura/items/06281261d893acf049ed)
[エラー参考(error: RPC failed; result=22, HTTP code = 411)](https://qiita.com/hapoon/items/f06542082c75cbf41c54)
[[git] 戻したい時よく使っているコマンドまとめ](https://qiita.com/rch1223/items/9377446c3d010d91399b)
[怖くない切り戻し git-revert / git-reset](https://qiita.com/takiguchi-yu/items/f56563f56217b71b0b7e)


## 差分確認

```
git diff ～
```

### ブランチ間の差分

```
cd 対象フォルダ
git diff <対象フォルダのブランチ名>..origin/<比較対象ブランチ名>
```

### 変更されたファイルのみ

```
git diff ～ --name-only
```

## ローカルの変更取り消し

``` text
git checkout <filename>         //特定ファイル取り消し
git checkout .                  //全消し
```

[2. ブランチを切り替える](https://backlog.com/ja/git-tutorial/stepup/08/)

## 2025/04 問題

- GitLabの更新に伴い、パーソナルアクセストークンが必須となった。そのタイミングでクローンとかができなくなった
  - いろいろトークンやらユーザーやら作ったがだめ
  - permissionでダメ
  - プロジェクトを「公開」にすることで解決できたので、newは未使用とする
- プロジェクトを「公開」にしてもpushがなぜかpermissionで蹴られる
  - 上でユーザーを新しく作ったことで、Windowsの資格情報に２つのユーザーの情報が入ってしまったことが原因
  - とりあえず、git:<ipaddress>の資格情報を消して、再度pushをしてみると、ユーザー情報を再度入力することができ、ユーザー名とトークンを入れると正常に戻った。

- 勉強になったこと
  - configの確認

  ``` shell
  > git config --system --list  # 全体のコンフィグ
  > git config --global --list  # グローバルのコンフィグ
  > git config --local --list   # 各リポジトリのコンフィグ
  ```

  - なんかglobalにいろいろ記載があって、ここのcredential.helperでどこからパスワードをとってくるか設定してるらしい

  ``` shell
  > git config --global credential.helper wincred  #Windowsの資格情報から取得？
  ```

## SSHでの接続

Git SSH

1. githubアカウントの鍵を作成

``` powershell
> ssh-keygen -t ed25519 -f $env:USERPROFILE\.ssh\id_ed25519_work -C "work-github"
```

これなにか聞かれるけど、無視してEnter！
再確認されるけど、Enter！
でいく。
あと、gitLabとgitHubで分けたいときはそれぞれでキーを作成する。
id_ed25519_workの部分でworkをユニークにしてやる。.sshフォルダのファイル名なので。
あと"work-github"もユニークにしないとかな？

2. %USERPROFILE\.ssh\config を作成/編集

``` text
Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work
  IdentitiesOnly yes
```

3. GitHubアカウントに公開鍵を登録する

%USERPROFILE\.ssh\id_ed25519_work.pubの公開鍵の内容を登録する。
拡張子なしのほうは秘密鍵なので、絶対に登録しないこと

4. GitHubアカウントでOrgnaizetionを設定している場合、そっちに連携

  1. https://github.com/settings/keys を開く
  2. 鍵 work-github（上記フィンガープリント）を探す
  3. Configure SSO から ALSOK-Products-Dev-Dept を Authorize
  4. もう一度実行
    ```
    git clone git@github-work:ALSOK-Products-Dev-Dept/sd_specification_viewer.git
    ```

5. WSLで設定する

WSLでgit cloneする場合、SSH設定はWSL側で行います。

SSH設定ファイル: /home/<ユーザー>/.ssh/config
秘密鍵/公開鍵: /home/<ユーザー>/.ssh/id_ed25519_work /home/<ユーザー>/.ssh/id_ed25519_work.pub
接続先の記録: known_hosts
github-work というホスト名でクローンしたいなら、/home/alsok/.ssh/config に例えば以下を入れます。

``` text
Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work
  IdentitiesOnly yes
```

実行前に権限も設定してください。

``` text
mkdir -p ~/.ssh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/id_ed25519_work
```

接続確認:

```
ssh -T git@github-work
```

### LinuxでSSH接続するために

Linuxでは.sshフォルダがユーザールートフォルダに存在しない。そのため以下の手順で手動で作成する

- **新規で鍵を作る場合**

1. .ssh フォルダ作成と権限設定
mkdir -p ~/.ssh
chmod 700 ~/.ssh

1. 鍵が未作成なら新規作成（推奨: ed25519）
ssh-keygen -t ed25519 -C "your_email@example.com"
保存先は通常そのまま Enter（~/.ssh/id_ed25519）

1. 鍵ファイル権限を整える
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub

1. 公開鍵をGitLabに登録
cat ~/.ssh/id_ed25519.pub
表示された内容を GitLab の
User Settings → SSH Keys
に貼り付けて保存

1. 接続テスト
ssh -T git@gitlab.com
初回はホスト確認が出るので yes

- **すでにある鍵ファイルを適用する場合

1. .ssh がなければ作成
mkdir -p ~/.ssh
chmod 700 ~/.ssh

1. config を作成
touch ~/.ssh/config
chmod 600 ~/.ssh/config

1. config に既存鍵を指定
例（gitlab.com に既存鍵を使う）:

``` text
Host gitlab.com
HostName gitlab.com
User git
IdentityFile ~/.ssh/既存の秘密鍵ファイル名
IdentitiesOnly yes
```

例（GitLabを別名で使い分ける）:

``` text
Host gitlab-work
HostName gitlab.com
User git
IdentityFile ~/.ssh/既存の秘密鍵ファイル名
IdentitiesOnly yes
```

1. 秘密鍵の権限も確認
chmod 600 ~/.ssh/既存の秘密鍵ファイル名

1. 接続確認
標準ホスト設定なら:
ssh -T git@gitlab.com

1. 別名ホスト設定なら:
ssh -T git@gitlab-work

### .crtファイルはただの証明書

.crt は通常 SSH 秘密鍵ではないため、そのまま使えない可能性が高いです。ローカルの .crt の実体を確認して、SSH に使えるか判断します。
.crt はたいてい X.509 証明書で、SSH の秘密鍵そのものではありません。GitLab の SSH 認証で必要なのは基本的に「SSH 秘密鍵」と、その対になる「SSH 公開鍵」です。

整理するとこうです。

- .ssh にファイルを置くこと自体は可能
- ただし、置いただけで SSH 鍵として使えるわけではない
- GitLab の SSH 認証で使うのは通常 다음の形式です
  - 秘密鍵: id_ed25519, id_rsa など
  - 公開鍵: id_ed25519.pub, id_rsa.pub など
- .crt は多くの場合、TLS/社内証明書用であって SSH 用ではありません

例外はあります。
- .crt の中身が実は秘密鍵で、拡張子だけ .crt になっている
- OpenSSH の証明書運用をしている
ただし GitLab の一般的な git clone 用 SSH 認証では、これはかなり特殊です。

まず中身を確認してください。ファイルを開いて先頭がどれかで判別できます。
- -----BEGIN OPENSSH PRIVATE KEY-----
- -----BEGIN RSA PRIVATE KEY-----
  - これは SSH 秘密鍵として使える可能性があります
- -----BEGIN CERTIFICATE-----
  - これは証明書です。通常は SSH 秘密鍵としては使えません
- -----BEGIN PUBLIC KEY-----
  - 公開鍵の可能性はありますが、SSH 用の .pub とは別形式のことがあります

判定の目安:
- SSH に必要なのは「秘密鍵」
- GitLab に登録するのは「公開鍵」
- .crt が証明書だけなら、GitLab SSH 認証には使えません

次の確認方法が確実です。
1. .crt の先頭数行を見る
2. もし BEGIN CERTIFICATE なら、SSH 用ではないと考える
3. もし社内から配布されたファイルなら、その鍵が「GitLab SSH 用」なのか「クライアント証明書用」なのか配布元に確認する

必要なら次にできることは 2 つです。
1. その .crt の中身をこちらで判定する
2. GitLab 用の SSH 鍵を新規作成して、登録手順まで進める

中身を見せられるなら、秘密情報に当たる可能性があるので全文ではなく先頭 3 行だけ共有してください。BEGIN の種類だけで判定できます。

### .crtをLinux(RHL)に適用したい(OSの信頼ストア)

1. 証明書ファイルを用意する

拡張子は .crt か .pem で大丈夫です。
必要なのはサーバー証明書ではなく、その発行元の CA 証明書です。

1. 信頼ストアに追加する

``` bash
sudo cp company-ca.crt /etc/pki/ca-trust/source/anchors/
sudo update-ca-trust
```

### GitLabで複数リポジトリでSSHキーを共有する

1. 管理者エリア＞デプロイキー＞新しいデプロイキーでSSHの公開鍵を登録する
1. 各リポジトリで設定＞リポジトリ＞デプロイキーからパブリックアクセスが可能なデプロイキーで登録したキーを「有効」にする

## 参考

[参考](https://qiita.com/mizutoki79/items/9b709bd50505d2768352)
[【git】【Windows】認証情報を設定しよう](https://zenn.dev/kuuki/articles/git-config-auth-windows)

[git pull完全ガイド：実践的な使い方とベストプラクティス【2025年最新版】](https://blue3orz.com/git-pull-complete-guide-2025/)