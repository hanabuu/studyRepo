# 配列系

## 関数配列

```c
// 各種関数を配列に格納
ER (*preInitFunc[])(void) = {
    func_A_preInit,      /* Func A preInit */
    func_B_preInit, /* Func B preInit */
    func_C_preInit,      /* Func C preInitt */
    func_D_preInit,     /* Func D preInit */
    NULL};

// 配列をループして各種関数を実行する
for (cnt = 0;; cnt++){                      /* preInit実行ループ */
  if (NULL == preInitCold[cnt]){            /* preInitテーブルの領域がNULLの場合 */
    break;                                  // 最後までやったら抜ける
  }else{                                    /* preInitテーブルがNULLではない*/
    subret = (*preInitCold[cnt])();         /* 各機能のPreInit処理起動 */
    if (COM_EC_OK != subret){               /* preInit処理がNGの場合 */
      printf("ERR preInitCold[%d] subret[%d]\n", cnt, subret);
      printf("[e]%s ret:%d\n", __func__, COM_EC_NG);
      return (COM_EC_NG);                   // 一つでも失敗したら抜ける
    }else{
      ;                                     /* 処理なし */
    }
  }
}
```