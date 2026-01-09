# GoogleTest使い方

## 結果評価

[【C++】GoogleTestのアサーション備忘録](https://qiita.com/spc_tokuda/items/e94e8919c1fde2602cc3)

### アサーション一覧

ASSERT_*から始まる場合、失敗したら中断し、EXPECT_*から始まる場合は、失敗しても続行します。

#### True or False

|Assert|Expect|説明|
|--|--|--|
|ASSERT_TRUE(data)|EXPECT_TRUE(data)|dataがTrueであるか|
|ASSERT_FALSE(data)|EXPECT_FALSE(data)|dataがFalseであるか|

#### 値の比較

|Assert|Expect|説明|
|--|--|--|
|ASSERT_EQ(val1, val2)|EXPECT_EQ(val1, val2)|val1 == val2|
|ASSERT_NE(val1, val2)|EXPECT_NE(val1, val2)|val1 != val2|
|ASSERT_LT(val1, val2)|EXPECT_LT(val1, val2)|val1 < val2|
|ASSERT_LE(val1, val2)|EXPECT_LE(val1, val2)|val1 <= val2|
|ASSERT_GT(val1, val2)|EXPECT_GT(val1, val2)|val1 > val2|
|ASSERT_GE(val1, val2)|EXPECT_GE(val1, val2)|val1 >= val2|

EQとかNEとかの正式名称を載せておきます。

``` text
EQ: Equal
NE: Not Equal
LT: Less than
LE: Less than or Equal to
GT: Greater than
GE: Greater than or Equal to
```

#### 文字列の比較

|Assert|Expect|説明|
|--|--|--|
|ASSERT_STREQ(str1, str2)|EXPECT_STREQ(str1, str2)|str1 = str2|
|ASSERT_STRNE(str1, str2)|EXPECT_STRNE(val1, val2)|str1 != str2|
|ASSERT_STRCASEEQ(str1, str2);|EXPECT_STRCASEEQ(val1, val2)|str1 == str2<br>(大文字小文字を無視)|
|ASSERT_STRCASENE(str1, str2);|EXPECT_STRCASENE(val1, val2)|str1 "= str2<br>(大文字小文字を無視)|

これらのアサーションはwchar_t*型の文字列比較に使います。strcmp的に比較してくれる。
C++でよく使うstring型はEXPECT_EQで比較します。

## 使用例

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