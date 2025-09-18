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
