# marginとpadding

## margin

- 意味：余白
- 要素の外側の余白
- 他(要素間)との間をあけるとき

## padding

- 意味：詰め物
- 要素の内側の余白
- 中(要素)を大きくしたり、見やすくしたり？

## 違いのイメージ

![MarginとPaddingの違い](img/MarginPaddingImage.svg)

## 実装例

### 見た目

<style>
    #test0 {
        display: flex;
    }
    #test1 {
        background: #dbebf8;
    }
    #test2 {
        background: #FF0000;
        border: 1px solid #666;
        padding: 10px;
    }
    #test3 {
        background: #00FF00;
        border: 1px solid #666;
        margin: 10px;
    }
</style>

<div id="test0">
    <div id="test1">要素1<br>(margin=0,padding=0)</div>
    <div id="test2">要素2<br>(margin=0,padding=10px)</div>
    <div id="test3">要素3<br>(margin=10px, padding=0)</div>
</div>

### コード

``` css
    #test0 {
        display: flex;
    }
    #test1 {
        background: #dbebf8;
    }
    #test2 {
        background: #FF0000;
        border: 1px solid #666;
        padding: 10px;
    }
    #test3 {
        background: #00FF00;
        border: 1px solid #666;
        margin: 10px;
    }
```

``` html
<div id="test0">
    <div id="test1">要素1<br>(margin=0,padding=0)</div>
    <div id="test2">要素2<br>(margin=0,padding=10px)</div>
    <div id="test3">要素3<br>(margin=10px, padding=0)</div>
</div>
```

## 参考

- [CSSのmarginとは？paddingとは？余白の指定方法まとめ](https://saruwakakun.com/html-css/basic/margin-padding#google_vignette)
- [CSSのmarginをあまり書かなくなった話](https://zenn.dev/lancers/articles/b033c39ab13699)
  - marginはあまり使わない方がいいのか？
  - flexboxを使うのがおすすめってある
  - gridの方が好き
  - 使い分けがあまりわからない。。。
- [margin-inline:autoを使おう。margin-left:autoとmargin-right:autoを書くのが面倒なあなたへ](https://zenn.dev/tonkotsuboy_com/articles/margin-inline_auto?redirected=1)