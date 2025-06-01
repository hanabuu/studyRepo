# SVG 勉強

## 書き方

### 線

<svg viewBox="0 0 50 15">
    <path stroke="black" stroke-width="1" fill="none"
      d="M0,0
         L10,10 
         V-10 
         z"/>
</svg>

```
d="M0,0 L10,10 V-10 z"
```

- M,L,V はコマンドを示す
  - 大文字は**絶対位置指定**，小文字は**現在位置からの相対位置指定**

| コマンド        | 意味                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------ |
| M,m             | 初期位置,位置のスキップ                                                                          |
| L,l             | 直線を引く                                                                                       |
| H,h             | 水平線を引く                                                                                     |
| V,v             | 垂直線を引く                                                                                     |
| C,c,S,s,Q,q,T,t | 曲線を引く．端点と制御点とで曲線を指定する                                                       |
| A,a             | 円弧を引く                                                                                       |
| Z,z             | 直近の M 位置まで直線を引いて線を閉じる.なお，座標を重ねただけでは線が閉じられた事にはならない． |
| B,b             | x 軸の方向を設定する(他のコマンドによる描画に影響を及ぼす)                                       |
| R,r             | Catmull-Rom スプライン曲線を引く                                                                 |

- [0,0],[10,10],[-10]はパラメータで座標位置や移動距離を示す
  - M0.0 : 初期位置　 x 座標 0,y 座標 0

<svg viewBox="0 0 200 70">
    <!-- z指定でパスを閉じる場合 -->
    <path stroke="black" stroke-width="1" fill="none" d="M5,30 h30 l-15,30 z"/>
    <!-- z指定なしで線を引く場合(パスが閉じられないから少し開いて見える)-->
    <path stroke="black" stroke-width="1" fill="none" d="M55,30 h30 l-15,30 l-15,-30"/>
    <!-- 途中でMを入れて複数図形の図形を一つにする -->
    <path stroke="black" stroke-width="1" fill="none" d="M105,30 h30 l-15,30 z M155,30 h30 l-15,30 l-15,-30"/>
</svg>

- 同じコマンドを連続して用いる場合はコマンドを省略できるが、見通しが悪くなるので、やらない
- M コマンドの後ろに座標を重ねた場合は L コマンドとして扱われる

### 色の指定方法

-　それぞれ以下の指定が可能

- strock：線の色
- fill:面の色

<svg viewBox="0 0 200 200">
    <path d="M 25 25 L 175 25" stroke="black" stroke-dasharray="2"/>
    <path d="M 175 25 L 175 175" stroke="black" stroke-dasharray="2"/>
    <path d="M 25 25 Q 175 25 175 175" stroke="blue" fill="none"/>
    <path stroke="red">
        <animate attributeName="d" calcMode="linear" from="M 25 25 L 175 25" to="M 175 25 L 175 175" begin="0s" dur="6s" repeatCount="indefinite"/>
    </path>
    <circle fill="red" r="5">
        <animateMotion path="M 25 25 Q 175 25 175 175" begin="0s" dur="6s" calcMode="linear" repeatCount="indefinite"/>
    </circle>
</svg>

<svg viewBox="0 0 100 100">
    <rect x="10" y="10" width="50" height="50" rx="30" ry="30" stroke="black" stroke-width="1" fill="none">0</rect>
    <rect x="32" y="15" width="5" height="5" rx="3" ry="3" stroke="black" stroke-width="1" fill="none">1</rect>
    <rect x="14" y="33" width="5" height="5" rx="3" ry="3" stroke="black" stroke-width="1" fill="none"/>2</rect>
    <rect x="50" y="33" width="5" height="5" rx="3" ry="3" stroke="black" stroke-width="1" fill="none"/>3</rect>
    <rect x="32" y="50" width="5" height="5" rx="3" ry="3" stroke="black" stroke-width="1" fill="none"/>4</rect>
</svg>

## 参考

[svg 要素の基本的な使い方まとめ](http://defghi1977.html.xdomain.jp/tech/svgMemo/svgMemo_03.htm)
[実装の仕組みが分かれば簡単！画像の一部を切り取るカットアウトを実装する CSS と SVG のテクニック | コリス](https://coliss.com/articles/build-websites/operation/css/cut-out-effect-css-or-svg.html)
[最近見かける、粒子の粗いグラデーション！ほんの少しの CSS と SVG で実装できるの知ってた？](https://coliss.com/articles/build-websites/operation/work/grainy-gradients.html)
[SVG を使うときに知っておくといいことをまとめました](https://qiita.com/manabuyasuda/items/01a76204f97cd73ffc4e)
[コードで描く SVG 　 JavaScript 編](https://tiltilmitil.co.jp/blog/1532)
[コードで描く SVG 　図形/テキスト編](https://tiltilmitil.co.jp/blog/1494)
[10 分でわかる SVG 基礎編](https://atmarkit.itmedia.co.jp/ait/articles/1206/01/news143.html)
[もっと早く知りたかった！SVG を扱うなら知っておきたいタグ＆プロパティまとめ](https://ferret-plus.com/7522)
[変幻自在なグラフィック表現！CSS, SVG, Canvas でマスクを使いこなせ - ICS MEDIA](https://ics.media/entry/210701/)
[君は使い分けられるか？CSS/SVG/Canvas のビジュアル表現でできること・できないこと - ICS MEDIA](https://ics.media/entry/200520/)
[svg のリファクタリングの流れ](https://qiita.com/xrxoxcxox/items/22a69d1ade7e2866e26a)

### Zdog

[SVG や Canvas で実装した平らな要素を 3D モデルでレンダリングできる超軽量 JavaScript ライブラリ -Zdog](https://coliss.com/articles/build-websites/operation/javascript/3d-engine-for-canvas-svg-zdog.html)

### 商用無料のやつ

[商用利用無料、UI デザイン用の SVG アイコンが 1000 種類以上！ 改変・再配布も可の太っ腹ライセンス- MingCute Icon](https://coliss.com/articles/freebies/mingcute-icon.html)
[商用利用も完全無料！ UI デザインに最適、シンプルなデザインでパフォーマンスに影響を与えない超軽量の SVG アイコン素材 -Next Icons | コリス](https://coliss.com/articles/build-websites/operation/work/next-icons-lightweight-svg.html)
[SVG アイコン素材サイト 14 選【無料・商用利用可】Notion からサイト制作まで自由に。 | KodoCode](https://kodocode.net/design-free-iconsvg/)
[もうこれで SVG アイコンを探すときに困らない！ 無料で利用できるアイコンライブラリを横断検索できる便利サイト -Icônes | コリス](https://coliss.com/articles/build-websites/operation/work/icon-explorer-with-searching-icones.html)
[無料で人気ブランドのロゴなど 3000 個以上の SVG アイコンをダウンロードできるサイト「Simple Icons」 - GIGAZINE](https://gigazine.net/news/20240922-simple-icons/)
