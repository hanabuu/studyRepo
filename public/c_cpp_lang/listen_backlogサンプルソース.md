listen() の backlog の違いによる接続拒否の発生を確認できる C サーバープログラムを作ります。
このプログラムは、accept() をあえて遅らせて、接続待ちキューがいっぱいになる様子を再現します。

実験用サーバープログラム（C言語）
``` c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <errno.h>

#define PORT 8080
#define BACKLOG 2  // backlogを小さくして実験

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
    memset(&address, 0, sizeof(address));
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
    printf("Try connecting multiple clients quickly to see backlog effect.\n");

    // acceptを遅らせて backlog を埋める
    sleep(15); // この間にクライアントから接続を試みる

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

実験方法


サーバーを起動
``` shell
Bashgcc backlog_test.c -o backlog_test
./backlog_test
```

→ sleep(15) の間は accept() しないので、接続要求はキューに溜まります。


別ターミナルから複数接続
``` shell
Bashnc 127.0.0.1 8080
```

を3回以上素早く実行（BACKLOG=2 なので3つ目以降は拒否される可能性大）。


キューの状態を確認
``` shell
Bashss -lnt
```

または
``` shell
Bashnetstat -an | grep 8080
```

→ SYN-RECV（半接続）や ESTABLISHED（完全接続）が見える。


結果

最初の2接続はキューに入り、3つ目以降は Connection refused になる可能性あり。
OS設定（somaxconn や tcp_max_syn_backlog）によって挙動が変わる。


実験のポイント

BACKLOG を 2 → 10 に変えて再実行すると、拒否が減る。
Linux の場合、上限は /proc/sys/net/core/somaxconn で制限される。
半接続キューは /proc/sys/net/ipv4/tcp_max_syn_backlog に依存。


もし希望があれば、このサーバーに**クライアント側の負荷ツール（C言語版）**を作って、短時間に大量接続を送ることで backlog の限界をもっと明確に見せられます。
これをやると SYN queue と accept queue の違いもリアルに観察できます。
作りますか？
そうすればサーバーのキューが埋まる様子を一発で再現できます。
