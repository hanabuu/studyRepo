# UNIXドメイン

## 内容
- Linux内で使えるプロセス間通信
- ファイルを介してソケット通信を行う。
 - 外部への通信はできない

## サンプル

### C言語

- client
  - UNIXドメイン(SOCK_STREAM)では以下の流れ
    1. socket作成
    1. connect
      - ここでサーバー側が待ち受けていないと接続失敗する
    1. send
      - sendto()は使わず、send()を使うべし
      - 余談: sendtoの５，６引数は宛先アドレス
- server
  - UNIXドメインでは以下の流れ
    1. socket作成
    1. bindでポートの紐づけ
    1. listenで待ち受け
    1. 以降ループ
    1. selectでタイムアウト設定
    1. accept
    1. recv
      - recvformは使わない。udpだけか？

socketをあまり理解してなかったので、今後参考から勉強してこれを更新していく

### Nodejs

- 作った
- 気づき
  - 受信側起動時にsocketファイル削除しなければ、起動しない。(突然死を防ぐため？)
  - ということは相互に送信側受信側を作成することができない
  - つまり送信用socket、受信用socketを作らないとダメ

## 参考

- [C言語ソケット通信サンプル(UNIXドメイン)](https://www.mathkuro.com/c-cpp/c-unix-domain-socket-sample/)
- [Node.jsでもUNIXドメインソケットを使いたい](https://qiita.com/walk8243/items/49ce3fc24500038f126f)
- [ソケット通信を一緒に理解しよう！！](https://qiita.com/fujifuji1414/items/6daa393a86582d81f0b5)