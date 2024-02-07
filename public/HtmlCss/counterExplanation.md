<style>
html body {
    counter-reset: h1counter;           /* h1counter のカウンタを 0 にセット */
}

h1.target {
    counter-increment: h1counter;      /* h1counter カウンタの増加数をセット（省略で1ずつ） */
    counter-reset: h2counter;
}

h1.target:before {
    content: "第" counter(h1counter) "章 ";      /* 表示形式を指定 */
}

h2.target {
    counter-increment: h2counter;
    counter-reset: h3counter;
}

h2.target:before {
    content: "第" counter(h1counter) "章-第" counter(h2counter) "項 ";
}

h3.target {
    counter-increment: h3counter;
}

h3.target:before {
    content: "第" counter(h1counter) "章-第" counter(h2counter) "項-第" counter(h3counter) "号 "
}

ul.target li.target {
    list-style-type: disc;
}

ul li ul li {
    list-style-type: circle;
}

ol li {
    list-style-type: none;
    counter-increment: cnt;
}

ol li::before {
    content: "(" counter(cnt, katakana) ") ";
}   

ol li ol li {
    list-style-type: none;
    counter-increment: cnt2;
}

ol li ol li::before {
    content: "(" counter(cnt2) ") ";
}
</style>

# CSSのカウンターについて

* CSS内で数値のインクリメントが可能。
* hタグやli,olタグで数値をインクリメントさせた値を表示可能

```
counter-reset: (変数名);                // CSS内で使用する(変数名)のリセット
counter-increment: (変数名) (増減値)    // (変数名)をインクリメントする（増減値は省略可。省略すると1ずつ）
content: counter((変数名)) (文字)       // 表示する形式を指定する
```

## 使用例

* hタグ

```
body {
    counter-reset: h1cnt h2cnt;             // bodyで最初にカウンターリセット。h1cntの後にスペースでほかの変数を入れることで一括してリセット可能
}

h1 {
    counter-increment: h1cnt;         // h1タグ出るたびにカウンターをインクリメント
    counter-reset: h2cnt;             // h1タグが出るたびにh2cntをリセット
}

h1: before {
    content: counter(num) " ";          // h1の前にカウンター+スペースをつける
}

h2 {
    counter-increment: h2cnt;           // h2タグが出るたびにカウンターをインクリメント。ただh1が間にあればリセットされる。
}
```

* ul/liタグ、ol/liタグ
    * ul/liやol/liについても同様にセット可能。
    * ul/liやol/liについて、入れ子の場合は入れ子の数分記載が必要
    * counter()の第二引数に表記方法を指定可能。またcontentに文字列で"("、")"を入れることでカウンターの数値をカッコで囲むことが可能。

```
ul li {
    list-style-type: disc;                      // ポチの表記を変更
}

ul li ul li {                                   // 入れ子の場合
    list-style-type: circle;                    // ポチの表記を○にする
}

ol li {
    list-style-type: none;                      // liの数値の表記を表示しないようにする
    counter-increment: cnt;                     // カウンターをインクリメント
}

ol li::before {                                 // liの前にカウンターを表示
    content: "(" counter(cnt, katakana) ") ";   // counter()に表記方法を記載
}   

ol li ol li {                                   // 入れ子の場合（以下同じ）
    list-style-type: none;
    counter-increment: cnt2;
}

ol li ol li::before {
    content: "(" counter(cnt2) ") ";
}
```

## 実際の表記

``` css
<style>
html body {
    counter-reset: h1counter;           /* h1counter のカウンタを 0 にセット */
}

h1 {
    counter-increment: h1counter;      /* h1counter カウンタの増加数をセット（省略で1ずつ） */
    counter-reset: h2counter;
}

h1:before {
    content: "第" counter(h1counter) "章 ";      /* 表示形式を指定 */
}

h2 {
    counter-increment: h2counter;
    counter-reset: h3counter;
}

h2:before {
    content: "第" counter(h1counter) "章-第" counter(h2counter) "項 ";
}

h3 {
    counter-increment: h3counter;
}

h3:before {
    content: "第" counter(h1counter) "章-第" counter(h2counter) "項-第" counter(h3counter) "号 "
}

ul li {
    list-style-type: disc;
}

ul li ul li {
    list-style-type: circle;
}

ol li {
    list-style-type: none;
    counter-increment: cnt;
}

ol li::before {
    content: "(" counter(cnt, katakana) ") ";
}   

ol li ol li {
    list-style-type: none;
    counter-increment: cnt2;
}

ol li ol li::before {
    content: "(" counter(cnt2) ") ";
}
</style>

```

# h1-1{.target}

## h2-1-1{.target}

* list1
    * aa
* list2
    * bb

### h3-1{.target}

1. number1
    1. number1-1<br>aa
    1. number1-1
1. number2
    1. number2-1
    1. number2-2

## h2-1-2{.target}

* list1
* list2


# h1-2{.target}

## h2-2-2{.target}

* list1
* list2

### h3-2{.target}

1. number1
    1. number1-1
    1. number1-1
1. number2
    1. number2-1
    1. number2-2

## h2-2-2{.target}

* list1
* list2

## 参考

* [【CSS】counterを利用した自動ナンバリング](https://design-studio-f.com/blog/css-counter-automatic-numbering/)
* [cssでlistのナンバリングはカスタマイズできる!](https://ponsyon.com/archives/2703)