# 疑似要素について

* セレクタ―にbeforeやafterをつけることで、そのタグの前後に文字列等をつけることが可能

```
h2:before {
    content: "○"
}
h2:after {
    content: "●"
}
ol li:before {
    content: "◆"
}
ul li:before {
    content: "■"
}
```

<style>
h2:before {
    content: "○"
}
h2:after {
    content: "●"
}
ol li:before {
    content: "◆"
}
ul li:before {
    content: "■"
}
</style>

## ああ

* ああ
* ｂｂ

1. aa
1. bb

## 疑似要素の種類

## 参考

* [CSSの擬似要素「:before」「:after」を使ってみよう！](https://proengineer.internous.co.jp/content/columnfeature/5950)
* [擬似要素](https://developer.mozilla.org/ja/docs/Web/CSS/Pseudo-elements)
