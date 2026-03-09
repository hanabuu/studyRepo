# スレッド関係

## pthread_cond_wait

pthread_cond_wait は、POSIXスレッドライブラリで提供される関数で、条件変数を使用してスレッド間の同期を実現するために使用されます。この関数は、指定された条件変数がシグナルを受け取るまでスレッドを待機状態にします。

- pthread_cond_signalによってシグナルを受けるまで処理を待つ。
- 待ちが複数の場合はpthread_cond_broadcast()ですべての待ちを解除することも可能

[pthread_cond_wait の簡単なテスト](https://qiita.com/MarkInada/items/2302ced53b9a543c054d)
[manページ  — PTHREAD_COND_WAIT](https://nxmnpg.lemoda.net/ja/3/pthread_cond_wait)
[pthread_cond_broadcast() - 条件のブロードキャスト](https://www.ibm.com/docs/ja/zos/2.5.0?topic=functions-pthread-cond-broadcast-broadcast-condition#ptcbdct)
