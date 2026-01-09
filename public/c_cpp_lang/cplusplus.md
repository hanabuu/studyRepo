# C++お勉強

## 初期化方法

``` c
UB req[7]{};
```

``` text
C++11 の統一初期化（uniform initialization）で、UB req[7]{} は配列要素をすべて 0 にする「値初期化（ゼロ初期化）」になります。

UB req[7]{} ≒ UB req[7] = {}; ≒ UB req[7] = {0};（全要素が 0）
UB は uint8_t 相当なので、各要素が 0x00 になります
C++ 専用の書き方です（C では空の {} は不可。C なら UB req[7] = {0}; を使う）
代替: memset(req, 0, sizeof req); や std::array<UB,7> req{}; でも可
```

