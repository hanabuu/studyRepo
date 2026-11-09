# Github Copilot CLI

- 終わり方
  - `/exit`と入力
  - Ctrl+Cを２回押す
  - Ctrl+Dを押す

セッションは保存されるから、起動後copilot を起動して、 /resume で再開可能
終了前には /tasks でバックグラウンド実行中でないか確認すること

- セッションには名前が付けられて、再開時に指定すると便利
  - 名前の付け方：

  ```
  /rename <セッション名>
  ```

- セッションの復元方法

``` text
# copilot --resume=<セッション名>  名前のセッションを再開する。IDの指定もできる
# copilot --resume                 セッション一覧から選ぶ
# copilot --continue               直近のセッションをそのまま再開
```

再開するときはそのフォルダに行ってないと、相対パスやファイル操作がずれちゃう恐れがあるっぽい

- codebase-memoryのセッション

``` text
copilot --resume=aa7109a3-1299-45f0-a0b5-253cac77a86a
```