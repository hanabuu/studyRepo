# クラス

classはstruct、impl、traitで作る。

例) クラス側

``` rust
// fruits.rs
/// 属性
pub struct Fruits {
    name: String,
    color: String,
}

/// Fruits構造体の実装
impl Fruits {
    /// コンストラクタ
    pub fn new(name: &str, color: &str) -> Self {
        Self {
            name: name.to_string(),
            color: color.to_string(),
        }
    }

    /// 説明文を返すメソッド
    pub fn describe(&self) -> String {
        format!("This fruit is a {} and its color is {}.", self.name, self.color)
    }
}
```

使用する側の例

``` rust
// main.rs
mod fruits
use crate::fruits::Fruits;

fn main(){
  let fruits = Fruits::new("Apple","Red");
  let description = fruits.describe();
  println!("{}", description);
}

```

※fruits.rsはmain.rsと同じフォルダとする
※fruits.rsをFruits.rsとすると、モジュール名と構造体名が同じとなってしまいエラーが発生する。基本ファイル名は小文字とする慣習があるのか、それに倣うこと。

## 参考
- [オブジェクト指向経験者のためのRust入門](https://qiita.com/nacika_ins/items/cf3782bd371da79def74)
- [impl Trait - Rust By Example 日本語版](https://share.google/MPVlpe9YbkVvJxWd8)