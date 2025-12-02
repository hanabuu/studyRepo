# Rust ファイル分割

Rustで **rsファイルを分割**して、**片方で文字の定数を定義**し、**もう片方で参照**する最小から実務的なパターンまでまとめます。  
ポイントは **モジュール（module）** と **公開（pub）**、そして **定数の型（`&'static str`）** です。

***

## 基本：単一ファイルのバイナリ（`main.rs`）＋モジュールファイル（`constants.rs`）

### フォルダ構成

    myapp/
    ├─ Cargo.toml
    └─ src/
       ├─ main.rs
       └─ constants.rs

### `src/constants.rs`（定数定義側）

```rust
// src/constants.rs
pub const APP_NAME: &str = "MyApp";
pub const GREETING: &str = "こんにちは";
pub const URL_DOCS: &str = "https://example.com/docs";
```

> *   **`pub`** を付けないと他モジュールから見えません。
> *   文字列リテラルは **`&'static str`**（寿命がプログラム全体）なので `const` で安全に共有できます。

### `src/main.rs`（参照側）

```rust
// src/main.rs
mod constants; // 同じディレクトリの constants.rs をモジュールとして読み込む

fn main() {
    println!("{}: {}", constants::APP_NAME, constants::GREETING);
    println!("Docs: {}", constants::URL_DOCS);
}
```

> `mod constants;` は **そのファイル（constants.rs）を「モジュールとして」組み込む**宣言です。  
> `constants::APP_NAME` のように **モジュール名::項目** で参照します。

***

## ディレクトリ構成でのサブモジュール（複数ファイルを階層化）

### 構成例

    src/
    ├─ main.rs
    └─ config/
       ├─ mod.rs        // サブモジュールのルート
       ├─ keys.rs       // さらに分割
       └─ paths.rs

### `src/config/mod.rs`

```rust
pub mod keys;   // config::keys を公開
pub mod paths;  // config::paths を公開
```

### `src/config/keys.rs`

```rust
pub const API_KEY: &str = "abc123";
pub const SECRET: &str = "s3cr3t";
```

### `src/config/paths.rs`

```rust
pub const DATA_DIR: &str = "/var/lib/myapp";
pub const LOG_FILE: &str = "/var/log/myapp/app.log";
```

### `src/main.rs`

```rust
mod config; // ディレクトリ全体をモジュールとして取り込む（mod.rsが入口）

fn main() {
    println!("API: {}", config::keys::API_KEY);
    println!("Log: {}", config::paths::LOG_FILE);
}
```

***

## ライブラリクレート＋バイナリ（`lib.rs` と `main.rs`）

プロジェクトを **共通ロジックを `lib.rs` に置き、実行は `main.rs`** で、という構成にするのが実務で便利です。

### 構成

    src/
    ├─ lib.rs
    ├─ main.rs
    └─ constants.rs

### `src/lib.rs`

```rust
pub mod constants;     // ライブラリの公開モジュールとして登録
pub use constants::*;  // 任意：再エクスポートして lib のトップから使えるように
```

### `src/constants.rs`

```rust
pub const VERSION: &str = "1.0.0";
pub const ABOUT: &str = "本社課長代理２ 向けツール";
```

### `src/main.rs`

```rust
use myapp::constants::VERSION; // クレート名（Cargo.tomlの package.name）を使って参照
use myapp::ABOUT;

fn main() {
    println!("Version: {VERSION}");
    println!("About: {ABOUT}");
}
```

> `myapp` は `Cargo.toml` の `[package] name = "myapp"` に合わせてください。  
> `pub use` を使うと、`myapp::ABOUT` のようにトップレベルから参照でき、**APIの見通しが良くなります**。

***

## よくあるエラーと対処

*   **`cannot find module 'constants'`**  
    → `mod constants;` を書いたファイルと **同じディレクトリに `constants.rs` があるか**、または **`constants/mod.rs`** になっているか確認。

*   **`constant not found in this scope`**  
    → **`pub` が付いているか**、参照側で **正しいパス**（`crate::...` / `super::...` / `modname::...`）を使っているか確認。

*   **`unresolved import`**  
    → `use` のパスは **クレートルート（`crate`）からの絶対パス**で書くと分かりやすいです。  
    例：`use crate::constants::GREETING;`（`main.rs` の場合は `crate` がバイナリクレート）

***

## `const` と `static` の違い（文字列の場合）

*   **`const`**：**インライン展開**される定数。型は必須。文字列なら `&'static str`。
*   **`static`**：**1つの実体**を持つグローバル変数。可変にしたいなら `static mut`（非推奨）、もしくは `OnceCell`/`Lazy` を使う。

文字列定数は通常 **`pub const NAME: &str = "..."`** で十分です。

***

## 実務Tips

*   **設定文言を別ファイル（テキスト）にしたい**場合はビルド時に取り込む：
    ```rust
    pub const TEMPLATE: &str = include_str!("../assets/template.txt");
    ```
    *   `include_str!` は **コンパイル時にファイル内容を `&'static str`** として埋め込みます。
    *   ランタイム依存を減らせて便利（CLIや配布が楽）。

*   **テストから参照したい**ならモジュールを `pub` にして `#[cfg(test)]` を活用：
    ```rust
    #[cfg(test)]
    mod tests {
        use super::*;
        #[test]
        fn constants_exist() {
            assert_eq!(APP_NAME, "MyApp");
        }
    }
    ```

*   **API整理**には `pub use` を使った **再エクスポート**が有効：
    ```rust
    // lib.rs
    pub mod constants;
    pub use constants::{APP_NAME, GREETING};
    ```

***

## まとめ

1.  **別ファイルに分割**するには `mod xxx;`（ファイル or ディレクトリ）を宣言。
2.  **他モジュールから参照する項目は `pub`** を付与。
3.  **文字列定数は `pub const NAME: &'static str`** が基本。
4.  階層化するなら **`mod.rs`（ディレクトリ）** と **`pub mod submodule;`** で整理。
5.  ライブラリ化して **`lib.rs` + 再エクスポート（`pub use`）** にすると、使う側の見通しが良くなる。

***

### 次に進めるために

どの構成で使う予定ですか？

*   単純な **バイナリのみ（`main.rs`）**
*   **`lib.rs` と `main.rs`** の分離
*   **階層化されたモジュール** がすでにある

もし既存のプロジェクトがあれば、**ディレクトリツリー**（`src`配下）と **現状の参照エラー** を教えていただければ、**正しい `mod` / `use` パス**に直してサンプルをお渡しします。

## フォルダで分割したときの参照方法

``` text
以下のような構成の場合の定数の読み込みはどうすればいいですか？
myapp/
　├─ main
　　　└─ main.rs    ←ここからconstants.rsの定数を読みたい
　└─ constants
　　　└─ constants.rs　←定数定義が定義されている
```

良い質問です。Rustの**モジュール探索規則**に沿って配置すれば、`main.rs` から `constants.rs` の定数を参照できます。  
ご提示の構成は少しだけ標準から外れているので、**正しい配置パターン**ごとにやり方を示します。

> あなたの構成（概念図）
>
>     myapp/
>     ├─ main
>     │  └─ main.rs        ← ここから constants.rs を使いたい
>     └─ constants
>        └─ constants.rs   ← 定数定義
>
> ※ 実際には `src/` 配下で管理する必要があります。

***

## 推奨構成①：最もシンプル（`src/main.rs` と `src/constants.rs`）

### ディレクトリ構成

    myapp/
    ├─ Cargo.toml
    └─ src/
       ├─ main.rs
       └─ constants.rs

### `src/constants.rs`（定数定義）

```rust
// src/constants.rs
pub const APP_NAME: &str = "MyApp";
pub const GREETING: &str = "こんにちは";
```

### `src/main.rs`（参照側）

```rust
// src/main.rs
mod constants; // 同じディレクトリの constants.rs をモジュールとして登録

fn main() {
    println!("{}: {}", constants::APP_NAME, constants::GREETING);
}
```

*   ポイント：`mod constants;` は **ファイルをモジュールに組み込む宣言**。
*   参照は `constants::APP_NAME` のように **モジュール名::項目**。

***

## 推奨構成②：ディレクトリモジュール（`src/constants/mod.rs`）

「`constants` をフォルダとしてまとめたい」ならこちら。

### ディレクトリ構成

    myapp/
    ├─ Cargo.toml
    └─ src/
       ├─ main.rs
       └─ constants/
          └─ mod.rs

### `src/constants/mod.rs`

```rust
// src/constants/mod.rs
pub const APP_NAME: &str = "MyApp";
pub const GREETING: &str = "こんにちは";
```

### `src/main.rs`

```rust
// src/main.rs
mod constants; // フォルダ constants/ の mod.rs を読み込む

fn main() {
    println!("{}: {}", constants::APP_NAME, constants::GREETING);
}
```

*   フォルダをモジュールにする場合、**入口ファイル名は `mod.rs`** が基本です。

***

## 構成③：さらに分割（`constants/constants.rs` をぶら下げたい）

フォルダ `constants/` の中にさらに `constants.rs` を置くなら、**`mod.rs` でサブモジュール宣言**をします。

### ディレクトリ構成

    myapp/
    ├─ Cargo.toml
    └─ src/
       ├─ main.rs
       └─ constants/
          ├─ mod.rs
          └─ constants.rs

### `src/constants/constants.rs`（定数定義）

```rust
// src/constants/constants.rs
pub const APP_NAME: &str = "MyApp";
pub const GREETING: &str = "こんにちは";
```

### `src/constants/mod.rs`（サブモジュールの公開）

```rust
// src/constants/mod.rs
pub mod constants;
```

### `src/main.rs`（参照側）

```rust
// src/main.rs
mod constants;

fn main() {
    println!("{}: {}", constants::constants::APP_NAME, constants::constants::GREETING);
    // もしくは再エクスポートを使う（下記Tips参照）
}
```

> 階層が深くなると参照パスが長くなるので、\*\*再エクスポート（`pub use`）\*\*で短くできます（後述）。

***

## 構成④：複数バイナリを使う場合（`src/bin/main.rs`）

もし「`main/` ディレクトリ配下に `main.rs`」を置きたい目的が **複数の実行ファイル（バイナリ）を作るため**なら、Rustの慣例では **`src/bin/`** を使います。

### ディレクトリ構成

    myapp/
    ├─ Cargo.toml
    └─ src/
       ├─ bin/
       │  └─ main.rs            ← 実行ファイル
       └─ constants/
          └─ mod.rs             ← 共通モジュール

### `src/constants/mod.rs`

```rust
pub const APP_NAME: &str = "MyApp";
pub const GREETING: &str = "こんにちは";
```

### `src/bin/main.rs`

```rust
// バイナリ側からは crate ルート基準で参照する
use myapp::constants; // ← Cargo.toml の package.name が myapp の場合

fn main() {
    println!("{}: {}", constants::APP_NAME, constants::GREETING);
}
```

> この場合、**`src/lib.rs` を置いてモジュールを公開**すると参照が楽になります。  
> 例：

*   `src/lib.rs`
    ```rust
    pub mod constants;
    ```
*   `src/bin/main.rs`
    ```rust
    use myapp::constants;

    fn main() {
        println!("{}: {}", constants::APP_NAME, constants::GREETING);
    }
    ```

***

## 再エクスポート（参照を短くする小技）

モジュール階層が深いなら `pub use` を使ってトップから見えるようにできます。

*   `src/lib.rs`
    ```rust
    pub mod constants;
    pub use constants::APP_NAME;      // トップへ再エクスポート
    pub use constants::GREETING;
    ```
*   `src/bin/main.rs` や `src/main.rs`
    ```rust
    use myapp::APP_NAME;
    use myapp::GREETING;

    fn main() {
        println!("{}: {}", APP_NAME, GREETING);
    }
    ```

***

## よくあるつまずき

*   **`cannot find module 'constants'`**  
    → `mod constants;` を置いたファイルと **同じ `src/` 階層に `constants.rs` または `constants/mod.rs` があるか**確認。

*   **`unresolved import` / パスが通らない**  
    → **クレート名（`Cargo.toml` の `[package] name`）** を正しく使う。バイナリからライブラリを参照するときは `use myapp::constants;` のように **crate ルート**基準で。

*   **`constants.rs` をフォルダ内に置きたい**  
    → **フォルダの入口は `mod.rs`**。`mod.rs` 内で `pub mod constants;` を宣言し、`constants.rs` をサブモジュールにする。

***

## まとめ（あなたの構成に対応させるなら）

*   `main.rs` を **`src/` 直下**に置けるなら → **構成①**が最も簡単。
*   `constants` をフォルダにしたいなら → **構成②**。
*   `constants/constants.rs` とさらに分けたいなら → **構成③**（`mod.rs`＋`pub mod constants;`）。
*   `main/` ディレクトリに複数バイナリを置く意図なら → **構成④**（`src/bin/` を使い、`src/lib.rs` で公開）。

***

### 補足質問

今の実プロジェクトは `src/` 配下がどうなっていますか？  
`ls -R src`（ディレクトリツリー）を貼っていただければ、**最短で動く `mod`/`use` の書き方**を具体的に示します。
