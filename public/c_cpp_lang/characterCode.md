# 文字コードについて

## 文字コードの体系

- 文字コードは以下の概念を持つ
  - 文字集合：ASCIIやUnicode
  - 符号化方式：Shift-JISやUTF-8

### 文字列集合（キャラクタセット）

- 世界中のすべての文字、記号、書式に、それぞれ固有の番号（コードポイント）を割り当てるもの
- 例えるなら:文字の「辞書」や「リスト」のようなもので、各文字の「正解の番号」を定義
- 文字に「群・面・区・点」の番号を割り振ります。群は 0～127、面・区・点は 0～255 の数値をとります。すべて使用すると 128×256×256×256＝2,147,483,648文字を表すことができます。

### 符号化方式（エンコーディングルール ）

- 文字の番号（コードポイント）を、実際にコンピューターのメモリやファイルで扱えるバイト列（データの並び）に変換するための「エンコーディング方式」の一つ
- 例えるなら:辞書に載っている言葉（Unicodeの番号）を、実際の文章として書き表す「書き方」や「形式」

### 詳細な説明

[とほほの文字コード入門](https://www.tohoho-web.com/ex/charset.html)

### なぜ符号化方式が必要か

- AIの回答
```
なぜUTF-8が存在するのか
Unicodeの「番号」だけでは、コンピューターが文字データをそのままの形で保存・伝送したり、処理したりすることはできません。UTF-8のようなエンコーディング方式によって、その「番号」が実際のデータの形に変換されることで、コンピューターが文字を正しく認識し、保存、表示、処理できるようになるのです。﻿
```

[ふと思ったんだけどさ、なんで UTF-8 とか使うの？](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q13276961088)

```
>ふと思ったんだけどさ、なんで UTF-8 とか使うの？
インターネット上では１バイトの文字コードを基本に動いているので、ユニコードも複数バイトで表現出来るUTF-8を使っています。
>Unicode を直接使うのではダメなの？
世界中の文字を表現する為１文字21ビットも必要で、英語圏では８ビットで済み、結果的にビット数が増えてしまう問題があるので、８ビット文字を１バイトで表現出来るUTF-8の方を使っています。
```

## Unicode

- 世界中の文字を一つのコード体系で表現しようとして制定されたもの。
- Unicode では 0～16面×0～255区×0～255点の 17×256×256＝1,114,112文字の範囲で文字を定義しています。
- 例えば日本語の「あ」は「0面48区66点」と定義されています。「0-48-66」の様に表現したり、48 → 0x30、66 → 0x42 と 16進数に変換して「U+3042」の様に表したりします。

## UTF-8
ASCII文字を 1バイトで表現できるように、U+007F までの文字は 1バイト、U+07FF までの文字は 2バイト、U+FFFF までの文字は 3バイトで表現する。U+10000～U+10FFFF の文字は、本来の UTF-8 では 4バイトに変換する。
マルチバイトの場合、2byte目以降は「10xxxxxx」(10から始まる)ので、「バイト文字 & 0xC0 == 0x80」であれば

|Unicode|ビット数|変換元ビット(Unicode)|変換後ビット(UTF-8)|
|--|--|--|--|
|U+0000～U+007F|7bits<br>(1byte文字)|0xxxxxxx|0xxxxxxx<br>(00-7F)|
|U+0080～U+07FF|11bits<br>(2byte文字)|00000yyy xxxxxxxx|110yyyxx 10xxxxxx<br>(C0-DF)(80-BF)|
|U+0800～U+FFFF|16bits<br>(3byte文字)|yyyyyyyy xxxxxxxx|1110yyyy 10yyyyxx 10xxxxxx<br>(E0-EF)(80-BF)(80-BF)|
|U+10000～U+10FFFF<br>(本来のUTF-8方式)|21bits<br>(4byte文字)|zzzzz yyyyyyyy xxxxxxxx|11110zzz 10zzyyyy 10yyyyxx 10xxxxxx<br>(F0-F7)  (80-BF)  (80-BF)  (80-BF)|

※Oracle データベースなど一部のシステムでは サロゲートペア を用いる方式(CESU-8)で 6バイトに変換することもあるが、今回は省略。

### UTF-8で何バイト文字かを判定したい

``` c
#include <stdio.h>
#include <string.h>

/**
 * @brief マルチバイト文字の先頭バイトかどうかを判定する
 * @param c 判定する文字
 * @return 0:2byte目以降の文字, 1:1byte文字, 2:2byte文字, 3:3byte文字, 4:4byte文字
 */
int is_multibyte_lead_byte(char c) {
    if((c & 0xC0) == 0x80) return 0; // 2byte目以降の文字
    if((c & 0x0E) == 0xC0) return 2; // 2byte文字
    if((c & 0xF0) == 0xE0) return 3; // 3byte文字
    if((c & 0xF8) == 0xF0) return 4; // 4byte文字
    return 1; // 1byte文字 
}

int main(void) {
    int len;
    const char *str = "Hello, わたしの世界"; // "Hello, World" in Chinese
    printf("Input string: %ld\n", strlen(str) ? strlen(str) : 0);   // マルチバイト文字列の長さをバイト数で表示

    for(int i = 0; str[i] != '\0'; ) {
        len = is_multibyte_lead_byte(str[i]);
        for(int j = 0; j < len; j++) {
            printf("%02X ", (unsigned char)str[i + j]);
        }
        printf("\n");
        i += len;   //マルチバイト文字の長さ分インデックスを進める
    }
    return 0;
}
```

## 参考

- [【マルチバイト文字】バイト数判定のための一覧表](https://qiita.com/t-yama-3/items/07e9fbba7db73eca8c6f)
- [【C言語】日本語文字列の字数カウント・文字列切り出し（マルチバイト文字）](https://qiita.com/t-yama-3/items/7cba573b4cf23322dfc8)
- [【C 言語】UTF-8 文字列の表現方法](https://zenn.dev/masakielastic/articles/62f9ef72e06f31)
- [UnicodeをUTF-8やUTF-16に変換する方法 #文字コード - Qiita](https://qiita.com/yasushi-jp/items/b006f7170ef3a86de09f)
- [Shift-JIS, UTF-8をC言語で扱うために文字コードについて調べた](https://qiita.com/PG-practice/items/7be1511d9f28f1bfeecf)
- [文字コードって意味わからん](https://zenn.dev/counterworks/articles/cd76d459bc835a)