# C 言語-単体テスト

## GoogleTest

### 参考サイト

- [Docker で Google Test+Coverage 環境を構築するメモ【Ubuntu24.04】](https://progzakki.sanachan.com/develop-software/environment/setup-google-test-gcovr-on-ubuntu-docker/)
- [C 言語で書いたプログラムを googletest でテストできるようにした](https://qiita.com/kaitokimuraofficial/items/b879ad6ee190f3f80afb)
- [C++の環境をいい感じに構築](https://qiita.com/n-jun-k2/items/1b84b5b99351fb835035)

## GoogleMock

```Bash
$ g++ IWaterVolumeSensor.cpp KettleController.cpp KettleController_test.cpp -o kettle -g -pthread -lgtest_main -lgtest -lgmock_main -lgmock
```

## 参考サイト

### 全体

- [C 言語の static 関数に対するユニットテスト](https://qiita.com/mofu/items/50d80c3d58e92e98a47d)
- [Makefile の解説](http://omilab.naist.jp/~mukaigawa/misc/Makefile.html)

### GoogleTest

- [Google Mock 1 – Google Test のカバレッジ計測を試してみた #4](https://www.gaio.co.jp/gaioclub/gtest_coverage_blog04/)
- [GoogleMock を C 言語で使う方法をハックしてみた](https://futurismo.biz/archives/306/)
- [Google Test を使ってみる（その５：GoogleMock 編）](https://developer.mamezou-tech.com/blogs/2023/10/08/google-test-05/)
- [既存の C 言語ファイルを変更せずに GoogleMock を使う](https://qiita.com/azuki_bar/items/4849d9266f446a1b36ec)
- [C で GoogleMock してみる](https://qiita.com/hakua-doublemoon/items/38f7fdbad047e41481cb)
- [GoogleTest/gMock を用いた C++ユニットテストの導入ガイド](https://zenn.dev/turing_motors/articles/257850090fc961)
- [組み込み単体テスト実践入門](https://zenn.dev/kimatata/books/b0a55247706116)
  - [4-1: GoogleTest のインストール](https://zenn.dev/kimatata/books/b0a55247706116/viewer/googletest)
- [Linux 環境に GoogleTest を入れてみた](https://note.com/mizeee7956/n/nff6163675246)
- [【Linux】gtest + lcov でカバレッジを計測する](https://qiita.com/matskeng/items/6f8ec15009fbaaef30d0)
- [Google Test で C++の単体テストをやってみた ①](https://qiita.com/kamura375/items/c393446b59136f47f841)
- [C 言語で書いたプログラムを googletest でテストできるようにした](https://qiita.com/kaitokimuraofficial/items/b879ad6ee190f3f80afb)
- [C ソースコードのテスト自動化を googletest で行う(googletest 導入編)(1/3)](https://qiita.com/denden14/items/bd1d313bf57f806bba9d)
- [Google Test を導入してみた](https://qiita.com/y-vectorfield/items/6238cfd2d9c34aefe364)
- [Google Test の使い方](https://qiita.com/shohirose/items/30e39949d8bf990b0462)
- [C 言語の関数を gmock で mock 化する方法](https://qiita.com/poponta/items/6e8cd5f98846c098d32c)
- [article-strage](https://github.com/kaitokimuraofficial/article-strage/tree/main/Qiita/created-dev-env-of-Clang-that-can-test-easily-with-gooletest)
- [組込 C 言語で UnitTest 5 GoogleMock - sioaji2012 のブログ](https://sioaji2012.hatenablog.com/entry/2019/01/07/222049)
- [「【完全ガイド】Google Test で実現する 5 つの即実践ユニットテスト術 | Dexall 公式テックブログ](https://dexall.co.jp/articles/?p=1614)
- [Google C++ Testing Framework をはじめよう](http://opencv.jp/googletestdocs/primer.html#primer)
- [Google Test を使うための Makefile](https://qiita.com/skkzsh/items/08ec6d2fd151ebc6d079)

### cppcheck

- [【保存版】cppcheck による C++静解析完全ガイド – 設定から実践活用まで](https://dexall.co.jp/articles/?p=1717#i-7)

```text
dockerfileはapt-getにcppcheck入れるだけ
使い方も以下の例
# 最も基本的な使用法
cppcheck file.cpp
# すべての警告を有効化
cppcheck --enable=all file.cpp
# 特定の警告タイプを指定
cppcheck --enable=warning,performance,portability file.cpp
```

### CUnit

- [C 言語で CUnit を使っていい感じにテストをする方法](https://qiita.com/Hiroya_W/items/dd2e682718fac5b44db2)
- [CUnit 使ってみた](https://wk6.hatenadiary.org/entry/20110613/1307976448)
- [C 言語での CUnit を使ったユニットテストの基礎と応用](https://ittrip.xyz/c/cunit-unit-test-guide#google_vignette)
- [CUnit](https://cunit.sourceforge.net/screenshots.html)
- [CUnit: C 用 単体テスト・フレームワーク](https://blog.goo.ne.jp/marunomarunogoo/e/a660fb3bfee5edd179ce711c94291fdd)
- [【Windows】CMake 導入](https://qiita.com/matskeng/items/c466c4751e1352f97ce6)
- [C 言語によるアジャイル開発とテスト駆動開発(CI 入門) ~ 2.CUnit 導入 ~](https://qiita.com/denden14/items/27d29735caef9b5639e0)
- [勝手に作る CMake 入門 その 1 基本的な使い方](https://kamino.hatenablog.com/entry/cmake_tutorial1)
- [CUnit を使って C 言語プログラムのユニットテストを実行する方法 - EurekaMoments](https://www.eureka-moments-blog.com/entry/2019/02/17/181353)

### fff

- [レガシーコードを C 言語の TDD 用フレームワーク『Fake Function Framework (fff)』ですっぽんぽんにする](https://futurismo.biz/archives/1794/)
- [C 言語の単体テストをする上で最強のフレームワーク](https://kotsutsumi.hatenablog.com/entry/2021/04/17/202629)

### その他

- [GCC Mirror](https://gcc.gnu.org/mirrors.html)
