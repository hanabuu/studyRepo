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

## 参考

[svg 要素の基本的な使い方まとめ](http://defghi1977.html.xdomain.jp/tech/svgMemo/svgMemo_03.htm)
