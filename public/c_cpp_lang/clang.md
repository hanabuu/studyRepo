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