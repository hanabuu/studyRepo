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

### GoogleTest

- [Google Mock 1 – Google Test のカバレッジ計測を試してみた #4](https://www.gaio.co.jp/gaioclub/gtest_coverage_blog04/)
- [GoogleMock を C 言語で使う方法をハックしてみた](https://futurismo.biz/archives/306/)
- [Google Test を使ってみる（その５：GoogleMock 編）](https://developer.mamezou-tech.com/blogs/2023/10/08/google-test-05/)
- [既存の C 言語ファイルを変更せずに GoogleMock を使う](https://qiita.com/azuki_bar/items/4849d9266f446a1b36ec)
- [C で GoogleMock してみる](https://qiita.com/hakua-doublemoon/items/38f7fdbad047e41481cb)
- [GoogleTest/gMock を用いた C++ユニットテストの導入ガイド](https://zenn.dev/turing_motors/articles/257850090fc961)
- [組み込み単体テスト実践入門](https://zenn.dev/kimatata/books/b0a55247706116)
  - [4-1: GoogleTest のインストール](https://zenn.dev/kimatata/books/b0a55247706116/viewer/googletest)
- [Linux環境にGoogleTestを入れてみた](https://note.com/mizeee7956/n/nff6163675246)
- [【Linux】gtest + lcov でカバレッジを計測する](https://qiita.com/matskeng/items/6f8ec15009fbaaef30d0)
- [Google TestでC++の単体テストをやってみた①](https://qiita.com/kamura375/items/c393446b59136f47f841)
- [C言語で書いたプログラムをgoogletestでテストできるようにした](https://qiita.com/kaitokimuraofficial/items/b879ad6ee190f3f80afb)
- [Cソースコードのテスト自動化をgoogletestで行う(googletest導入編)(1/3)](https://qiita.com/denden14/items/bd1d313bf57f806bba9d)
- [Google Testを導入してみた](https://qiita.com/y-vectorfield/items/6238cfd2d9c34aefe364)
- [Google Testの使い方](https://qiita.com/shohirose/items/30e39949d8bf990b0462)
- [C言語の関数をgmockでmock化する方法](https://qiita.com/poponta/items/6e8cd5f98846c098d32c)
- [article-strage](https://github.com/kaitokimuraofficial/article-strage/tree/main/Qiita/created-dev-env-of-Clang-that-can-test-easily-with-gooletest)

### CUnit

- [C言語でCUnitを使っていい感じにテストをする方法](https://qiita.com/Hiroya_W/items/dd2e682718fac5b44db2)
- [CUnit使ってみた](https://wk6.hatenadiary.org/entry/20110613/1307976448)
- [C言語でのCUnitを使ったユニットテストの基礎と応用](https://ittrip.xyz/c/cunit-unit-test-guide#google_vignette)
- [CUnit](https://cunit.sourceforge.net/screenshots.html)
- [CUnit: C 用 単体テスト・フレームワーク](https://blog.goo.ne.jp/marunomarunogoo/e/a660fb3bfee5edd179ce711c94291fdd)
- [【Windows】CMake 導入](https://qiita.com/matskeng/items/c466c4751e1352f97ce6)
- [C言語によるアジャイル開発とテスト駆動開発(CI入門) ~ 2.CUnit導入 ~](https://qiita.com/denden14/items/27d29735caef9b5639e0)
- [勝手に作るCMake入門 その1 基本的な使い方](https://kamino.hatenablog.com/entry/cmake_tutorial1)

### fff

- [レガシーコードをC言語のTDD用フレームワーク『Fake Function Framework (fff)』ですっぽんぽんにする](https://futurismo.biz/archives/1794/)
- [C言語の単体テストをする上で最強のフレームワーク](https://kotsutsumi.hatenablog.com/entry/2021/04/17/202629)

### その他

- [GCC Mirror](https://gcc.gnu.org/mirrors.html)