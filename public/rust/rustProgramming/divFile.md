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
