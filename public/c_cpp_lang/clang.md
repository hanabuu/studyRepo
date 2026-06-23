# C言語お勉強

## strtol
文字列をlong型に変換する

## strchr

文字列中から特定の文字を検索する

strchr 関数は、C言語で文字列中から特定の文字を検索するための標準ライブラリ関数です。この関数は、指定された文字が最初に出現する位置のポインタを返します。もし文字が見つからない場合は、NULL を返します。

基本的な構文

``` c
#include <string.h>

char *strchr(const char *str, int c);
```

- str: 検索対象の文字列。
- c: 検索する文字（int型だが、実際にはcharとして扱われる）。

使用例

以下は、strchr 関数を使った基本的な例です。

``` c
#include <stdio.h>
#include <string.h>

int main() {
const char *str = "This is a pen.";
char c = 'a';

// 文字列中の文字を検索
char *result = strchr(str, c);

if (result != NULL) {
printf("文字 '%c' は文字列 \"%s\" の %ld 文字目にあります。\n", c, str, result - str + 1);
} else {
printf("文字 '%c' は文字列 \"%s\" 中に見つかりませんでした。\n", c, str);
}

return 0;
}
```

実行結果

``` text
文字 'a' は文字列 "This is a pen." の 9 文字目にあります。
```

応用例: 文字のカウント

文字列中に特定の文字が何回出現するかを数える場合、strchr をループで使用します。

``` c
#include <stdio.h>
#include <string.h>

int main() {
const char *str = "This is a pen.";
char c = 'i';
const char *ptr = str;
int count = 0;

printf("文字列 \"%s\" 中の文字 '%c' の位置:\n", str, c);

while ((ptr = strchr(ptr, c)) != NULL) {
printf("%ld 文字目\n", ptr - str + 1);
ptr++; // 次の文字から検索を続ける
count++;
}

if (count == 0) {
printf("文字 '%c' は見つかりませんでした。\n", c);
} else {
printf("合計 %d 回見つかりました。\n", count);
}

return 0;
}
```

実行結果

``` text
文字列 "This is a pen." 中の文字 'i' の位置:
3 文字目
6 文字目
合計 2 回見つかりました。
```

注意点

戻り値: strchr の戻り値は、文字列中の該当文字のポインタです。このポインタを使って文字列の位置を計算できます。
NULL 終端: strchr は文字列の終端（'\0'）まで検索を行います。該当文字が見つからない場合は NULL を返します。
マルチバイト文字: 日本語などのマルチバイト文字を扱う場合は、_mbschr 関数を使用する必要があります。

関連関数

- strrchr: 文字列の末尾から検索を行う関数。
- memchr: メモリ領域から特定の文字を検索する関数。

[【C言語】strchrの使い方：文字列内から指定文字を検索する手順](https://af-e.net/c-language-how-to-use-strchr/)

## ポインタ配列チェーン？

### イメージ
``` text
val：[～,値,～,next]
　　　　　　　　  L [～,値,～,next]
                              L [～,値,～,NULL]
```

### 実装例

``` C
typedef struct structName {
    ～
    値;
    ～
    struct nextStruct *next;
};

struct val;
val = calloc(1, sizeof(struct));
old_val = val;

while(val){
  // valの中を格納していく
  // もう次がないことがわかったら
  if(次なし){
    // 次をnullにする
    old_val->next = NULL;
    // 最後に確保した領域を解放
    free(val);
    val = NULL;
  }

  // 次があるかもしれないので、old_valに格納したvalを入れる
  old_val = val;
  // valに新しく確保した領域を入れる
  val = calloc(1, sizeof(struct));
}
```

## 乱数

``` text
rand(): 乱数生成
srand()：seed設定
```

[C言語で乱数を扱う方法（rand関数とsrand関数）](https://daeudaeu.com/c_random/)

- rand()で乱数を生成できるが、プログラムを終了すると毎回同じ値が取れる。
- srand()でseedを設定することで、乱数を生成する発生系列を変更できる。一般的に時刻(time)で取得したseedを使う。

## gdb

[はじめてのgdb](https://qiita.com/arene-calix/items/a08363db88f21c81d351)

## メモリ管理

### mallocとcallocの違い

- malloc
  - 確保された領域は初期化されてない
- calloc
  - 確保された領域は全ビットが自動的に0で埋められる

[C言語　mallocとcallocの違い](https://qiita.com/keitean/items/a8e6931173906b02abc0)

# listen

## backlog

C言語で listen() 関数の backlog パラメータについて解説します。
listen() はサーバーソケットを「接続待ち状態」にするための関数で、backlog は接続要求キューの最大長を指定します。

**基本構文**
``` c
#include <sys/types.h>
#include <sys/socket.h>

int listen(int sockfd, int backlog);
```

- sockfd
socket() で作成し、bind() 済みのソケットディスクリプタ（通常は SOCK_STREAM）。
- backlog
接続要求キューの最大長（未処理の接続要求を何件まで保持するか）。

backlog の意味

サーバーは listen() を呼び出すと、OS 内部に「接続要求キュー」が作られます。
クライアントが connect() を呼ぶと、このキューに要求が積まれます。
サーバーが accept() を呼び出すと、キューから1件取り出して接続を確立します。
backlog はこのキューの最大長を指定します。
キューが満杯のときに新しい接続要求が来ると、クライアント側は ECONNREFUSED などのエラーを受け取るか、TCP の場合は無視されることがあります（OS 実装依存）。

**注意点**

実際の最大長は OS によって制限され、backlog より小さくなることがあります。
例: Linux では /proc/sys/net/core/somaxconn の値が上限。
backlog に 0 や負数を指定すると、OS がデフォルト値に置き換える場合があります。
TCP の場合、キューは「半接続状態（SYN受信済み）」と「完全接続状態（3ウェイハンドシェイク完了）」の2種類に分かれますが、backlog はこれらの合計に影響します。

サンプルコード
```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define PORT 8080
#define BACKLOG 5  // 接続待ちキューの最大長

int main(void) {
    int server_fd;
    struct sockaddr_in address;
    int opt = 1;

    // ソケット作成
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == -1) {
        perror("socket");
        exit(EXIT_FAILURE);
    }

    // アドレス再利用設定
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt)) == -1) {
        perror("setsockopt");
        close(server_fd);
        exit(EXIT_FAILURE);
    }

    // バインド
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) == -1) {
        perror("bind");
        close(server_fd);
        exit(EXIT_FAILURE);
    }

    // 接続待ち開始
    if (listen(server_fd, BACKLOG) == -1) {
        perror("listen");
        close(server_fd);
        exit(EXIT_FAILURE);
    }

    printf("Server listening on port %d (backlog=%d)\n", PORT, BACKLOG);

    // accept() で接続を受け付けるループ
    while (1) {
        int client_fd;
        struct sockaddr_in client_addr;
        socklen_t client_len = sizeof(client_addr);

        client_fd = accept(server_fd, (struct sockaddr *)&client_addr, &client_len);
        if (client_fd == -1) {
            perror("accept");
            continue;
        }

        printf("Connected: %s:%d\n",
               inet_ntoa(client_addr.sin_addr),
               ntohs(client_addr.sin_port));

        close(client_fd);
    }

    close(server_fd);
    return 0;
}
```

**実運用でのポイント**

高負荷サーバーでは backlog を大きめに設定し、somaxconn も調整する。
accept() を高速に処理できるようにスレッドや非同期I/Oを活用する。
backlog が小さいと、瞬間的なアクセス集中で接続拒否が発生しやすくなる。

listen() の 半接続キュー（SYN queue） と 完全接続キュー（accept queue） の動作を図解します。
これは TCP サーバーが listen() を呼び出した後、クライアントから接続要求が来たときの流れです。

TCP 接続確立とキューの関係

``` text
クライアント側                      サーバー側
------------------------------------------------------------
connect()  --->  SYN  ------------>  [半接続キュー]  ←───┐
                                      (SYN受信済み)      │
                   <------------  SYN+ACK               │
ACK  ----------->                    完全接続キュー      │
                                      (3way完了)   ─────┘
                                      ↓
                                   accept() で取り出す
```

キュー構造のイメージ
[半接続キュー] (SYN queue)
- SYNパケットを受信したが、3ウェイハンドシェイクが未完了の接続
- OSが一定時間保持（タイムアウトあり）
- SYN flood攻撃の影響を受けやすい

[完全接続キュー] (accept queue)
- 3ウェイハンドシェイクが完了し、accept() 待ちの接続
- listen() の backlog 値はこのキューの最大長に影響
- 満杯になると新しい接続は拒否される（ECONNREFUSEDなど）


全体フロー図
``` text
          ┌───────────────────────────────┐
          │        listen(backlog=N)       │
          └───────────────────────────────┘
                          │
                          ▼
        ┌──────────────────────────────────────┐
        │ クライアントから SYN 受信              │
        └──────────────────────────────────────┘
                          │
                          ▼
        ┌──────────────────────────────────────┐
        │ 半接続キューに追加 (SYN queue)         │
        │ ※SYN+ACK 送信                         │
        └──────────────────────────────────────┘
                          │
                          ▼
        ┌──────────────────────────────────────┐
        │ クライアントから ACK 受信              │
        └──────────────────────────────────────┘
                          │
                          ▼
        ┌──────────────────────────────────────┐
        │ 完全接続キューに移動 (accept queue)    │
        │ ※backlog の制限を受ける               │
        └──────────────────────────────────────┘
                          │
                          ▼
        ┌──────────────────────────────────────┐
        │ accept() によりアプリが接続を取得      │
        └──────────────────────────────────────┘
```

**補足**

Linux では backlog の上限は /proc/sys/net/core/somaxconn で制限されます（デフォルト 128）。
半接続キューのサイズは /proc/sys/net/ipv4/tcp_max_syn_backlog で制御されます。
高負荷サーバーでは両方の値を調整しないと、backlog を大きくしても効果が出ない場合があります。

## stat

stat関数は、指定したファイルやディレクトリの状態情報を取得するための関数です。
基本概要
C言語での stat関数 は、ファイルやディレクトリの情報を取得し、struct stat に格納します。標準Cライブラリの一部ではなく、#include <sys/stat.h> が必要です。関数の基本的な形式は以下の通りです。

``` c
#include <sys/stat.h>
int stat(const char *path, struct stat *buf);
```

- path: 情報を取得したいファイルやディレクトリのパス
- buf: 取得した情報を格納する struct stat のポインタ
- 戻り値: 成功時は0、失敗時は-1を返す

stat構造体の主なメンバ

struct stat には以下の情報が含まれます。

- st_dev : ファイルが存在するデバイスID
- st_ino : inode番号
- st_mode : ファイルの種類とアクセス権（パーミッション）
- st_nlink : ハードリンクの数
- st_uid : 所有者のユーザID
- st_gid : 所有者のグループID
- st_rdev : 特殊ファイルの場合のデバイスID
- st_size : ファイルサイズ（バイト単位）
- st_blksize : ファイルシステムI/Oでの最適ブロックサイズ
- st_blocks : 割り当てられているブロック数
- st_atime : 最終アクセス時刻
- st_mtime : 最終修正時刻
- st_ctime : 最終状態変更時刻（inode情報の更新を含む）

ファイルの種類を判定するために、S_ISREG(st.st_mode)（通常ファイル）、S_ISDIR(st.st_mode)（ディレクトリ）などのマクロが用意されています。

- lstat(): シンボリックリンクの場合、リンク自体の情報を取得
- fstat(): ファイルディスクリプタを指定して情報を取得
- fstatat(): 指定ディレクトリを基準に相対パスで情報を取得

使用例

``` c
#include <stdio.h>
#include <sys/stat.h>
int main() {
    struct stat st;
    if(stat("example.txt", &st) == 0) {
        printf("ファイルサイズ: %ld バイト\n", st.st_size);
        printf("最終修正時刻: %ld\n", st.st_mtime);
    } else {
        perror("statエラー");
    }
    return 0;
}
```

エラー条件
stat関数は以下のような場合にエラーを返します。

- EACCES : パス上のディレクトリに検索権限がない
- ENOENT : 指定ファイルが存在しない
- ENOTDIR : パスの一部がディレクトリでない
- EOVERFLOW : ファイルサイズが構造体で表現できない
- その他、EFAULT, EIO, ELOOP, ENAMETOOLONG など 

応用

- ファイルの存在確認
- ファイルサイズの取得
- アクセス権や所有者情報の取得
- ディレクトリかどうかの判定

stat関数は、単にファイルの存在を確認するだけでなく、詳細なファイル情報を取得する際に非常に便利です。Visual Studioなどの環境では、標準Cではないため注意が必要ですが、POSIX準拠の環境では広く利用可能です 
