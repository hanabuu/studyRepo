# リストの使い方

## 通常のリスト

* なにも考えないとこんな感じで使う。

例）
<ul>
    <li>aa</li>
    <li>bb</li>
</ul>
<ol>
    <li>aa</li>
    <li>bb</li>
</ol>

ソースコード
``` html
<ul>
    <li>aa</li>
    <li>bb</li>
</ul>
<ol>
    <li>aa</li>
    <li>bb</li>
</ol>

```

``` markdown
* aa
* bb

1. aa
1. bb
```

## マークや数字をカスタマイズしたい

「list-style-type」を使うことでリストのマークや数字をカスタマイズ可能

例）

<style>
ul.chage-type1 li.type-circle {
    list-style-type: circle;
}
ul.chage-type1 li.type-square {
    list-style-type: square;
}
ol.change-type1 li.type-katakana {
    list-style-type: katakana;
}
ol.change-type1 li.type-hiragana {
    list-style-type: hiragana;
}
</style>

<ul class="chage-type1">
    <li class="type-circle">aaaa</li>
    <li class="type-square">bbb</li>
</ul>
<ol class="change-type1">
    <li class="type-katakana">ccc</li>
    <li class="type-hiragana">ddd</li>
</ol>

ソースコード

``` html
<style>
ul.chage-type1 li.type-circle {
    list-style-type: circle;
}
ul.chage-type1 li.type-square {
    list-style-type: square;
}
ol.change-type1 li.type-katakana {
    list-style-type: katakana;
}
ol.change-type1 li.type-hiragana {
    list-style-type: hiragana;
}
</style>

<ul class="chage-type1">
    <li class="type-circle">aaaa</li>
    <li class="type-square">bbb</li>
</ul>
<ol class="change-type1">
    <li class="type-katakana">ccc</li>
    <li class="type-hiragana">ddd</li>
</ol>

```


## カッコつけたい

数字にカッコをつけたりできる。

例）
<style>
ol.change-type2 {
    counter-reset: olCnt;
}
ol.change-type2 li.type-katakana {
    counter-increment: olCnt;
    list-style-type: none;
}

ol.change-type2 li.type-katakana:before {
    content: "(" counter(olCnt) ") ";
}

</style>

<ol class="change-type2">
    <li class="type-katakana">ccc</li>
    <li class="type-katakana">ddd</li>
</ol>

ソースコード
``` html
<style>
ol.change-type2 {
    counter-reset: olCnt;
}
ol.change-type2 li.type-katakana {
    counter-increment: olCnt;
    list-style-type: none;
}

ol.change-type2 li.type-katakana:before {
    content: "(" counter(olCnt) ") ";
}

</style>

<ol class="change-type2">
    <li class="type-katakana">ccc</li>
    <li class="type-katakana">ddd</li>
</ol>
```

## 参考

* [list-style-type:箇条書きリストマークの一覧【よく使うもの】](https://pasoviva.com/css_list-mark/)
* [ol,li,リストで括弧付の数字を作る方法](https://webnetamemo.com/coding/css/201507161181)
* [olタグで括弧付きの数字で表示する](https://blog.websuccess.jp/archives/2711/)
* [【CSS】list-style-typeの使い方：箇条書きのマーカー種類を変える](https://saruwakakun.com/html-css/reference/list-style-type)