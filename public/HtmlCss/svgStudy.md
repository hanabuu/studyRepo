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

<svg x="0px" y="0px" viewBox="0 0 512 512" style="width: 200px; height: 200px; opacity: 1;">
	<path class="st0" d="M359.244,224.004h-59.988c-6.217,0-11.258-5.043-11.258-11.258v-59.992c0-6.215-5.039-11.254-11.256-11.254
		h-41.486c-6.217,0-11.258,5.039-11.258,11.254v59.992c0,6.215-5.039,11.258-11.256,11.258h-59.988
		c-6.219,0-11.258,5.039-11.258,11.258v41.484c0,6.215,5.039,11.258,11.258,11.258h59.988c6.217,0,11.256,5.039,11.256,11.258
		v59.984c0,6.219,5.041,11.258,11.258,11.258h41.486c6.217,0,11.256-5.039,11.256-11.258v-59.984
		c0-6.219,5.041-11.258,11.258-11.258h59.988c6.217,0,11.258-5.043,11.258-11.258v-41.484
		C370.502,229.043,365.461,224.004,359.244,224.004z" style="fill: rgb(75, 75, 75);"></path>
	<path class="st0" d="M256,0C114.613,0,0,114.617,0,256c0,141.387,114.613,256,256,256c141.383,0,256-114.613,256-256
		C512,114.617,397.383,0,256,0z M256,448c-105.871,0-192-86.129-192-192c0-105.867,86.129-192,192-192c105.867,0,192,86.133,192,192
		C448,361.871,361.867,448,256,448z" style="fill: rgb(75, 75, 75);"></path>
</svg>

<svg x="0px" y="0px" viewBox="0 0 512 512" style="width: 200px; height: 200px; opacity: 1;">
	<polygon class="st0" points="314.427,151.751 255.996,210.174 197.573,151.751 151.751,197.581 210.173,256.004 151.751,314.427 
		197.573,360.258 255.996,301.834 314.427,360.258 360.249,314.427 301.827,256.004 360.257,197.581" style="fill: rgb(75, 75, 75);"></polygon>
	<path class="st0" d="M437.016,74.992C390.773,28.7,326.607-0.008,256.004,0c-70.61-0.008-134.784,28.7-181.02,74.992
		C28.7,121.228-0.017,185.394,0,256.004c-0.017,70.602,28.7,134.768,74.984,181.012c46.235,46.292,110.409,75.008,181.02,74.984
		c70.603,0.024,134.769-28.692,181.012-74.984c46.285-46.244,74.992-110.409,74.984-181.012
		C512.008,185.394,483.301,121.228,437.016,74.992z M398.728,398.727c-36.613,36.572-86.908,59.1-142.724,59.124
		c-55.832-0.024-106.118-22.552-142.723-59.124c-36.572-36.613-59.107-86.908-59.124-142.723
		c0.016-55.832,22.552-106.102,59.124-142.723c36.606-36.564,86.892-59.108,142.723-59.116
		c55.816,0.008,106.111,22.552,142.724,59.116c36.563,36.622,59.099,86.892,59.116,142.723
		C457.827,311.82,435.291,362.114,398.728,398.727z" style="fill: rgb(75, 75, 75);"></path>
</svg>

<svg x="0px" y="0px" viewBox="0 0 512 512" style="width: 200px; height: 200px; opacity: 1;">
	<path class="st0" d="M487.932,243.768L255.999,0L24.076,243.768c-21.787,22.886-20.874,59.088,2.013,80.865
		c22.887,21.787,59.099,20.896,80.886-2.013l91.818-96.506v228.691c0,31.59,25.617,57.195,57.205,57.195
		c31.6,0,57.217-25.606,57.217-57.195V226.114l91.829,96.506c21.777,22.909,57.978,23.8,80.875,2.013
		C508.806,302.855,509.698,266.654,487.932,243.768z" style="fill: rgb(75, 75, 75);"></path>
</svg>

<svg x="0px" y="0px" viewBox="0 0 512 512" style="width: 200px; height: 200px; opacity: 1;">
	<path class="st0" d="M485.919,187.372c-22.905-21.787-59.106-20.893-80.883,2.011l-91.82,96.511V57.202
		C313.217,25.606,287.6,0,255.993,0c-31.585,0-57.202,25.606-57.202,57.202v228.692l-91.819-96.511
		c-21.776-22.904-58-23.798-80.883-2.011c-22.883,21.756-23.797,57.979-2.01,80.862L255.993,512l231.936-243.765
		C509.696,245.352,508.801,209.128,485.919,187.372z" style="fill: rgb(75, 75, 75);"></path>
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
