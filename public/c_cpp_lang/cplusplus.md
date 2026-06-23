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

## set

std::setは、C++標準ライブラリに含まれる連想コンテナで、ユニークな要素を格納し、要素を自動的に昇順にソートするデータ構造です。重複する要素は自動的に削除され、効率的な検索や挿入が可能です。

``` cpp
#include <iostream>
#include <set>
int main() {
   // int型のsetを作成
   std::set<int> s;
   // 要素の挿入
   s.insert(3);
   s.insert(1);
   s.insert(4);
   // 要素の検索
   auto it = s.find(1);
   if (it != s.end()) {
       std::cout << "Found: " << *it << std::endl;
   } else {
       std::cout << "Not found" << std::endl;
   }
   // 要素の削除
   s.erase(3);
   // 全要素の出力
   for (const auto& x : s) {
       std::cout << x << " ";
   }
   std::cout << std::endl;
   return 0;
}
```

``` text
出力
Found:1
1 4
```

- 主要メンバ
  - insert: 要素を追加します。重複する要素は無視されます。
  - erase: 指定した要素を削除します。
  - find: 指定したキーを検索し、イテレータを返します。見つからない場合はend()を返します。
  - size: 現在の要素数を返します。
  - empty: コンテナが空かどうかを判定します。

- 特徴と注意点
  - 要素は常に昇順にソートされます。
  - 重複する要素は格納されません。
  - イテレータは双方向イテレータで、ランダムアクセスはサポートされていません。
  - std::setは内部的に平衡二分探索木（通常は赤黒木）で実装されています。

- 応用

``` cpp
#include <iostream>
#include <set>
int main() {
   std::set<int> s = {1, 2, 3, 4, 5, 6};
   // 範囲削除 (2以上4未満の要素を削除)
   auto first = s.find(2);
   auto last = s.find(4);
   s.erase(first, last);
   for (const auto& x : s) {
       std::cout << x << " ";
   }
   std::cout << std::endl;
   return 0;
}
```

``` text
出力
1 4 5 6
```

## std::ifstream

std::ifstreamは、C++でファイルを読み取るためのストリームクラスです。テキストファイルやバイナリファイルの内容を簡単に読み込むことができます。

基本的な使用例

以下は、std::ifstreamを使用してファイルを1行ずつ読み取る例です。

``` c++
#include <fstream>
#include <iostream>
#include <string>

int main() {
// ファイルを読み取り専用で開く
std::ifstream ifs("example.txt");
if (!ifs.is_open()) {
std::cerr << "ファイルを開けませんでした" << std::endl;
return 1;
}

// ファイルの内容を1行ずつ読み取る
std::string line;
while (std::getline(ifs, line)) {
std::cout << line << std::endl;
}

// ファイルを閉じる（デストラクタでも自動的に閉じられる）
ifs.close();
return 0;
}
```

主なメソッドと機能

is_open(): ファイルが正常に開かれているか確認します。
close(): ファイルを閉じます。
std::getline(): ファイルから1行ずつ読み取ります。
演算子>>: データを直接変数に読み込むことができます。

注意点

エラーチェック: ファイルが存在しない場合やアクセス権がない場合、is_open()やoperator boolでエラーを確認する必要があります。

``` c++
std::ifstream fin("nonexistent.txt");
if (!fin) {
std::cerr << "ファイルが存在しません" << std::endl;
}
```

フォーマットエラー: 不正なフォーマットのデータがある場合でも例外は発生しないため、状態チェックが必要です。
バイナリモード: バイナリファイルを扱う場合は、std::ios::binaryフラグを指定します。

``` c++
std::ifstream binFile("data.bin", std::ios::binary);
```
これらの機能を活用することで、効率的にファイル操作が可能になります。