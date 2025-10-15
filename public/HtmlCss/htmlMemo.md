# HTML&CSSメモ

## 文字サイズ
``` css
font-size: 16px;
```

- デフォルトが16pxだそう。
- bodyにつければ全体の文字サイズを調整可能
- 一部にしたければそのクラスにつければいいのかな

## input

``` html
<input class="input-field" type="text">
```

``` css
.input-field {
  width: 10px;    # inputの幅を変更
  height: 10px;   # inputの高さ変更
}
```
width,heightでやるのはtextareaも同じ

## テーブルのスクロールとセル間の隙間をなくす、thの固定

- テーブルを表示したいけど、ページ自体をスクロールしたくない
- 普通に枠線書くと、セル間に間がある。それをなくしたい

``` html
<div class="scroll-div">
  <table="scroll-table">
    <th></th>
    <td></td>
  </table>
</div>
```

``` css
.scroll-div {
    max-width: 100%;                /* 横幅を画面の最大幅と同じにする。（いろんなディスプレイで自動で合わせられる） */
    height: 850px;
    border: 1px solid #000;      /*わかりやすくボーダーを引く*/
    overflow: scroll;            /* スクロール可能にする */
}

.scroll-table {
  /* thを固定する。(ヘッダがずっと見えるように) */
  position: sticky:
  top: 0;
  /* tableの隙間をなくす。多分下記のどちらかでよい */
  border-spacing: 0;            /* tableの隙間をなくす */
  border-collapse: collapse;    /* tableの隙間をなくす */
}

.scroll-table td {
  border: 1px solid #ccc;     /* 枠線をつける */
}
```