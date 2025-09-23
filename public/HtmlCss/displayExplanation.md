<style>

html body {
    counter-reset: h1counter;           /* h1counter のカウンタを 0 にセット */
    font-family: 'Yu Gothic Medium', '游ゴシック Medium', YuGothic, '游ゴシック体',
    'UD デジタル 教科書体 NP-R', 'Myrica M', 'メイリオ', Meiryo;
    font-size: 14px;
}
h1 {
    counter-increment: h1counter;      /* h1counter カウンタの増加数をセット（省略で1ずつ） */
    counter-reset: h2counter;
}

h1:before {
    content: counter(h1counter) ". ";      /* 表示形式を指定 */
}

h2 {
    counter-increment: h2counter;
    counter-reset: h3counter;
}

h2:before {
    content: counter(h1counter) "-" counter(h2counter) ". ";
}

h3 {
    counter-increment: h3counter;
}

h3:before {
    content: counter(h1counter) "-" counter(h2counter) "-" counter(h3counter) ". "
}
</style>

# display要素について

HTMLにおける各タグは（ざっくりというと）表示形式を決めるdisplayと呼ばれるプロパティ値を持っている。
display値によって表示の仕方やサイズ変更の可否が決まる重要なプロパティ値である。

## displayの取る値

displayプロパティの指定はいろいろある。[ここ](https://developer.mozilla.org/ja/docs/Web/CSS/display)にすべて載ってるが、すべてはまだ理解していないので、理解している内容だけ説明。理解したら増やしていこう。

現状わかってるもの。


|no.|display|備考|
|--|--|--|
|1. |block|[block](#block要素について)|
|2. |inline|[inline](#inline要素について)|
|3. |inline-block||
|4. |flex|[flex](#display-flexについて)|
|5. |grid||
|6. |none||
|7. |table|特に説明することなし。|


## 各タグのデフォルトのdisplay値

まず最初にHTMLタグのどのタグがどのdisplay値を持っているかを把握しておいた方がいい。

<table>
<thead>
	<tr><th>display</th><th>htmlタグ</th></tr>
</thead>
<tbody>
	<tr><td>block</td><td>div,p,h1,h2,h3,h4,h5,h6,ul,ol,form,option,main,header,footer,section,nav,article,aside,body,html</td></tr>
	<tr><td>inline</td><td>a,span,img,iframe,video,label,br</td></tr>
	<tr><td>inline-block</td><td>input,textarea,select</td></tr>
	<tr><td>list-item</td><td>li</td></tr>
	<tr><td>table</td><td>table</td></tr>
	<tr><td>table-row-group</td><td>tbody</td></tr>
	<tr><td>table-row</td><td>tr</td></tr>
	<tr><td>table-cell</td><td>td,th</td></tr>
	<tr><td>none</td><td>head,style,script,meta,title,link</td></tr>
</tbody>
</table>

## block要素について

* block要素は、要素がディスプレイの横幅いっぱいに広がっている。

<div style="background-color: red; color: white">
例) div要素
</div>

### block要素のサイズ

* widthやheightでのサイズ指定が可能

<style>
div.change-size {
    width: 500px;
    background-color: blue;
    color: white;
}
</style>

<div class="change-size">size変更(500px)のdiv要素</div>

### block要素の余白

* marginやpaddingによる余白も指定可能

<style>
section.parent {
    width: 500px;
    background-color: red;
    color: white;
    text-align: center;
}
div.child-1 {
    width: 200px;
    background-color: blue;
    color: white;
    margin: 10px;
    text-align: center;
}
div.child-2 {
    width: 200px;
    background-color: blue;
    color: white;
    padding: 10px;
    text-align: center;
}
</style>

<section class="parent">
親
<div class="child-1">子１</div>
<div class="child-2">子２</div>
</section>

## inline要素について

* inline要素は、中の文字列等のサイズきっかりにサイズが取られ、横にも並ぶ

<span style="background-color: red; color: white">span1</span><span style="background-color: red; color: white">span2</span>

### inline要素のサイズ

* inline要素はサイズ変更**不可**

<style>
span.change-size {
    width: 500px;
    background-color: blue;
    color: white;
}
</style>

<span class="change-size">size変更(500px)のspan要素</span>

* 500pxを指定してるがサイズが変わらず、内容ピッタリに取られる。

### inline要素の余白

* 横へのmarginは設定できるが、縦方向は無理。
* paddingは設定可能

<style>
section.span-parent {
    width: 500px;
    background-color: red;
    color: white;
}
span.child-1 {
    background-color: blue;
    color: white;
    margin: 10px;
}
span.child-2 {
    background-color: blue;
    color: white;
    padding: 10px;
}
</style>

<section class="span-parent">
親
<span class="child-1">margin:10px</span>
<span class="child-2">padding:10px</span>
</section>

## inline-block要素について

* inline-block要素はblockとinlineの中間とのこと。
* 横に並べられるし、サイズは変更できる。（もう全部これにしちゃえばいいのに）

<input style="background-color: red; color: white" value="あああ"></input><input style="background-color: red; color: white" value="あああ"></input>

* 以下説明のためdivやspanをinline-blockにして説明

### inline-block要素のサイズ

* widthやheightでのサイズ指定が可能

<style>
span.inline-block-change-size {
    display: inline-block;
    width: 500px;
    background-color: blue;
    color: white;
}
</style>

<span class="inline-block-change-size">inline-blockにしてsize変更(500px)のspan要素</span>

### inline-block要素の余白

<style>
section.inline-block-parent {
    width: 500px;
    background-color: red;
    color: white;
    text-align: center;
}
div.child-1 {
    display: inline-block;
    width: 200px;
    background-color: blue;
    color: white;
    margin: 10px;
    text-align: center;
}
div.child-2 {
    display: inline-block;
    width: 200px;
    background-color: blue;
    color: white;
    padding: 10px;
    text-align: center;
}
</style>

<section class="inline-block-parent">
親
<div class="child-1">margin:10px</div>
<div class="child-2">padding:10px</div>
</section>

## none要素について

* none要素は表示されないので、説明なし。

## サイズ変更のちょっとまとめ

各要素はdisplayの値によってサイズの変更可否が決まる

||横幅と高さの指定|横幅の初期値|高さの初期値|他要素との並び方|余白のつき方|
|--|--|--|--|--|--|
|block要素|可能|親要素の横幅|内容で決まる|改行される|勝手につくものがある|
|inline要素|不可能|内容で決まる|内容で決まる|改行されない|上下に特殊なつき方をする|
|inline-block要素|可能|内容で決まる|内容で決まる|改行されない|勝手につくものがある|

## 余白の指定のちょっとまとめ

||左右余白の指定|上下余白の指定|備考|
|--|--|--|--|
|block要素|左右のmargin,paddingを自由に変更可能|上下のmargin,paddingを自由に変更可能||
|inline要素|左右のmargin,paddingを自由に変更可能|不可|上下のpaddingで前後の行と被る|
|inline-block要素|左右のmargin,paddingを自由に変更可能|上下のmargin,paddingを自由に変更可能||

## display値の変更

* それぞれの要素については、CSSで要素を変えることが可能。

<style>
    div.change-disp {
        display: inline;
        background-color: blue;
        color: white;
    }
    span.change-disp {
        display: block;
        background-color: blue;
        color: white;
    }
    div.change-disp-size {
        display: inline;
        width: 500px;
        background-color: blue;
        color: white;
    }
</style>

<div class="change-disp">inlineのdiv要素</div>

<span class="change-disp">blockのspan要素<span>


<div class="change-disp-size">inlineにしてサイズ変更(500px)したがサイズが変わらないdiv要素</div>


## 「display: flex」について

* flexで囲んだ中については、中の要素がblock,inlineに関係なく横並びにすることが可能。

例)
中の要素をただ並べただけだと、文字数分のサイズがただ横に並ぶだけ
<style>
section.flex-div1 {
    display: flex;
    background-color: red;
    color: white;
}
</style>

<section class="flex-div1">
    <div>div要素</div>
    <span>span要素</span>
</section>

### サイズ変更

* 中の要素ごとにサイズの変更が可能
* 中の要素のサイズは「flex-shrink:0」を指定して「width」でサイズを変えるのが基本らしいが、shrinkを指定しなくてもサイズは変わる。flex-shrinkはflex-boxの縮小率で数値があがれば小さくなる。0で縮小なしらしい（ちょっと理解できてない）flex-shrink:0を指定しない場合画面幅の余りのサイズ

<style>
section.flex-div2 {
    display: flex;
    background-color: red;
}
div.flex-div2 {
    width: 200px;
    background-color: blue;
    color: white;
}
span.flex-span2 {
    width: 400px;
    background-color: yellow;
}
</style>

<section class="flex-div2">
    <div class="flex-div2">div要素(size:200px)</div>
    <span class="flex-span2">span要素(size:400px)</span>
</section>

### 並べ方

* justify-contentプロパティによって並べ方を指定可能

* 例）space-between
  * 全体のサイズを各要素の数分で割って、各要素の開始位置はそれぞれの割った開始位置。

<style>
section.flex-div3 {
    display: flex;
    justify-content: space-between;
    background-color: red;
}
div.flex-div3 {
    width: 100px;
    background-color: blue;
    color: white;
}
span.flex-span3 {
    width: 200px;
    background-color: yellow;
}
p.flex-p3 {
    width: 150px;
    background-color: green;
    color: white;
}
</style>

<section class="flex-div3">
    <div class="flex-div3">div要素</div>
    <span class="flex-span3">span要素</span>
    <p class="flex-p3">p要素</p>
</section>

* 並べ方は以下の値がある（詳しくは別で説明【準備中】）

|justify-contentの値|説明|
|--|--|
|flex-start|行頭寄せ(左揃え)・初期値|
|flex-end|行末寄せ(右揃え)|
|center|センター揃え(中央揃え)|
|space-between|アイテムの間にスペースを均等に割り付け|
|space-around|アイテムの両端にスペースを均等に割り付け|

### 折り返し方法

* 親要素に入りきらない場合（サイズ超過）に折り返したい場合に「flex-wrap: wrap(左から右)/wrap-reverse(右から左)」を使う。
* 折り返したくないときは「flex-wrap: nowrap」（子要素が自動でサイズ調整される？）

<style>
section.flex-div4 {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: red;
    width: 600px;
}
div.flex-div4 {
    width: 250px;
    background-color: blue;
    color: white;
}
span.flex-span4 {
    width: 250px;
    background-color: yellow;
}
p.flex-p4 {
    width: 250px;
    background-color: green;
    color: white;
}
</style>

<section class="flex-div4">
    <div class="flex-div4">div要素</div>
    <span class="flex-span4">span要素</span>
    <p class="flex-p4">p要素</p>
</section>

* 折り返し方法には以下の指定がある

|flex-wrapの値|説明|
|--|--|
|nowrap|flexアイテムを折り返さない（デフォルト）|
|wrap|flexアイテムを折り返す（左から右）|
|wrap-reverse	flexアイテムを折り返す（右から左）|

## 「display: grid」について

* gridによってテーブルのような並びを実現できる。


## 参考URL

### displayについて
* [【CSS】displayの使い方を総まとめ！inlineやblockの違いは？](https://saruwakakun.com/html-css/basic/display)
* [【display】インラインブロック要素の性質と使い方](https://www.itra.co.jp/webmedia/what-is-inline-block.html)
* [インライン要素について](https://www.itra.co.jp/webmedia/what-is-inline-block.html)
* [【CSS】displayの使い方を総まとめ！inlineやblockの違いは？](https://saruwakakun.com/html-css/basic/display)
* [【初心者向け】CSSのvertical-alignを基礎から解説](https://mteam.jp/column/10146/)
* [【CSS】justify-contentプロパティの使い方と実装例を解説！！](https://webukatu.com/wordpress/blog/18110/)
* [【display】インラインブロック要素の性質と使い方](https://www.itra.co.jp/webmedia/what-is-inline-block.html)
* [ドキュメント](https://developer.mozilla.org/ja/docs/Web/CSS/display)

### flexについて
* [フレックスボックス（フレキシブルボックス）とはなにか？](https://mamewaza.com/support/blog/howto-use-flex.html)
* [flex-wrap「flexアイテムの折り返し方法」](https://web-designer.cman.jp/css_ref/abc_list/flex-wrap/)
* [【CSS】displayの使い方を総まとめ！inlineやblockの違いは？](https://saruwakakun.com/html-css/basic/display)
* [【初心者向け】CSSのvertical-alignを基礎から解説](https://mteam.jp/column/10146/)
* [【CSS】justify-contentプロパティの使い方と実装例を解説！！ ](https://webukatu.com/wordpress/blog/18110/)
* [display flex とinline-blockの違いを勉強してみた](https://qiita.com/tosagatuo/items/c8b51150d20527df216d)

### gridについて
* [【CSS】gridでできるこんなレイアウト10選（grid関連プロパティ総ざらい）](https://zenn.dev/kagan/articles/4f96a97aadfcb8)
* [【css】gridの基本用語と使い方 | ほぼほぼ４コいち](https://yoncoichi.com/grid/)

### その他
* [CSSで中央寄せする9つの方法（縦・横にセンタリング）](https://saruwakakun.com/html-css/basic/centering)




