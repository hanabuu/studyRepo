# C言語お勉強

## strtol
文字列をlong型に変換する

## ポインタ配列チェーン？

### イメージ
``` text
val：[～,値,～,next]
　　　　　　　　  L [～,値,～,next]
                              L [～,値,～,NULL]
```

### 実装例

``` C
typedef struct structName {
    ～
    値;
    ～
    struct nextStruct *next;
};

struct val;
val = calloc(1, sizeof(struct));
old_val = val;

while(val){
  // valの中を格納していく
  // もう次がないことがわかったら
  if(次なし){
    // 次をnullにする
    old_val->next = NULL;
    // 最後に確保した領域を解放
    free(val);
    val = NULL;
  }

  // 次があるかもしれないので、old_valに格納したvalを入れる
  old_val = val;
  // valに新しく確保した領域を入れる
  val = calloc(1, sizeof(struct));
}
```

## 乱数

``` text
rand(): 乱数生成
srand()：seed設定
```

[C言語で乱数を扱う方法（rand関数とsrand関数）](https://daeudaeu.com/c_random/)

- rand()で乱数を生成できるが、プログラムを終了すると毎回同じ値が取れる。
- srand()でseedを設定することで、乱数を生成する発生系列を変更できる。一般的に時刻(time)で取得したseedを使う。

## gdb

[はじめてのgdb](https://qiita.com/arene-calix/items/a08363db88f21c81d351)

## メモリ管理

### mallocとcallocの違い

- malloc
  - 確保された領域は初期化されてない
- calloc
  - 確保された領域は全ビットが自動的に0で埋められる

[C言語　mallocとcallocの違い](https://qiita.com/keitean/items/a8e6931173906b02abc0)