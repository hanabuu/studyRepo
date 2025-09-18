# C++お勉強

## 初期化方法

``` c
UB req[7]{};
```

``` text
C++11 の統一初期化（uniform initialization）で、UB req[7]{} は配列要素をすべて 0 にする「値初期化（ゼロ初期化）」になります。

UB req[7]{} ≒ UB req[7] = {}; ≒ UB req[7] = {0};（全要素が 0）
UB は uint8_t 相当なので、各要素が 0x00 になります
C++ 専用の書き方です（C では空の {} は不可。C なら UB req[7] = {0}; を使う）
代替: memset(req, 0, sizeof req); や std::array<UB,7> req{}; でも可
```

## ASSERT

``` c
ASSERT_NE(nullptr, resp);
```

``` text
ASSERT_NE は「左と右が等しくないこと」を検証する致命的アサーションです。等しい場合は即座にそのテスト（または現在の関数）を中断します。

使い方の要点

書式: ASSERT_NE(val1, val2);
比較は operator!= を使います（独自型なら != が定義されている必要あり）。
失敗時はその場でテストを打ち切りたい時に使います。継続したいなら EXPECT_NE。
よく使うパターン

ポインタの非NULL確認:
ASSERT_NE(ptr, nullptr);
返り値の検証（整数・列挙など）:
ASSERT_NE(result, -1);
文字列:
std::string 同士は ASSERT_NE(s1, s2) でOK
C文字列(char*)同士は ASSERT_STRNE(cstr1, cstr2) を推奨
浮動小数点は誤差を考慮して EXPECT_NEAR/ASSERT_NEAR を推奨
メッセージ付与

失敗時のヒントを追加できます:
ASSERT_NE(resp, nullptr) << "response must be allocated";
このリポジトリの例（gtest_sciCom.cpp）

キャンセルトークン生成の確認:
ASSERT_NE(nullptr, token);
応答バッファ確保の確認:
ASSERT_NE(nullptr, resp);
補足

ASSERT_ 系は失敗すると「現在の関数から return」します。ヘルパー関数内で使うと、そのヘルパーだけが戻る点に注意してください（致命的失敗を親に伝えるには戻り値で伝搬するか、テスト本体で使うのが安全です）。
```