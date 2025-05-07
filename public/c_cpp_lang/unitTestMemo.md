# C 言語-単体テスト

## GoogleTest

### 参考サイト

- [Docker で Google Test+Coverage 環境を構築するメモ【Ubuntu24.04】](https://progzakki.sanachan.com/develop-software/environment/setup-google-test-gcovr-on-ubuntu-docker/)
- [C 言語で書いたプログラムを googletest でテストできるようにした](https://qiita.com/kaitokimuraofficial/items/b879ad6ee190f3f80afb)
- [C++の環境をいい感じに構築](https://qiita.com/n-jun-k2/items/1b84b5b99351fb835035)

## GoogleMock

``` Bash
$ g++ IWaterVolumeSensor.cpp KettleController.cpp KettleController_test.cpp -o kettle -g -pthread -lgtest_main -lgtest -lgmock_main -lgmock
```

## 参考サイト

- [Google Mock 1 – Google Test のカバレッジ計測を試してみた #4](https://www.gaio.co.jp/gaioclub/gtest_coverage_blog04/)
- [GoogleMock を C 言語で使う方法をハックしてみた](https://futurismo.biz/archives/306/)
- [Google Test を使ってみる（その５：GoogleMock 編）](https://developer.mamezou-tech.com/blogs/2023/10/08/google-test-05/)
- [既存の C 言語ファイルを変更せずに GoogleMock を使う](https://qiita.com/azuki_bar/items/4849d9266f446a1b36ec)
- [C で GoogleMock してみる](https://qiita.com/hakua-doublemoon/items/38f7fdbad047e41481cb)
- [GoogleTest/gMock を用いた C++ユニットテストの導入ガイド](https://zenn.dev/turing_motors/articles/257850090fc961)
- [組み込み単体テスト実践入門](https://zenn.dev/kimatata/books/b0a55247706116)
  - [4-1: GoogleTest のインストール](https://zenn.dev/kimatata/books/b0a55247706116/viewer/googletest)
