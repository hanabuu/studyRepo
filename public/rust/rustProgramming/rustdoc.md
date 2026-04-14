
# rustdoc
 
Rust のドキュメントは **`///`（アイテム用）** と **`//!`（モジュール／クレート用）** の **docコメント**を Markdown で記述し、`cargo doc` で HTML に出力します。**doctest** により、ドキュメント中のコードは自動テストされます。

***

## 1. 基本の書き方：`///` と `//!`

*   \*\*アイテム（関数・構造体など）\*\*に説明を書く：`///`
*   **モジュールやクレート全体の説明**：`//!`（ファイル先頭や `mod.rs` / `lib.rs` の先頭に）

````rust
//! このクレートは簡単な数値演算を提供します。
//!
//! # 機能
//! - 加算
//! - 乗算

/// 2つの数を加算します。
///
/// # 例
/// ```
/// use my_crate::add;
/// assert_eq!(add(2, 3), 5);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
````

***

## 2. 推奨セクション構成（公共APIに特に有効）

Rust の慣例として、以下の見出しを使うと利用者が情報を探しやすくなります：

*   `# Examples`：**実行可能な使用例**（doctestが走る）
*   `# Panics`：**どの条件で panic するか**
*   `# Errors`：**`Result` のエラー条件と型**
*   `# Safety`：**`unsafe` を含む場合の安全性の前提**
*   `# Performance` / `# Notes` / `# Limitations`：設計上の注意点

````rust
/// ベクトル内の最大値を返します。
///
/// # Examples
/// ```
/// use my_crate::max_in_vec;
/// assert_eq!(max_in_vec(&[1, 4, 2]), Some(4));
/// ```
///
/// # Panics
/// 空のスライスを渡すと **panic はしません**（`None` を返します）。
///
/// # Errors
/// なし（`Option` で表現）
///
/// # Performance
/// O(n) 時間。入力サイズに比例します。
pub fn max_in_vec(xs: &[i32]) -> Option<i32> {
    xs.iter().cloned().max()
}
````

***

## 3. Doctest（ドキュメント内コードのテスト）

### 表示を隠してコンパイルだけしたい行は `#` で始める

````rust
/// # Examples
/// ```
/// # use my_crate::add;
/// let x = add(1, 2);
/// assert_eq!(x, 3);
/// ```
````

### 実行させない／失敗を期待する

*   `no_run`：コンパイルはするが実行しない（副作用がある例など）
*   `should_panic`：パニックを期待
*   `compile_fail`：**コンパイルが失敗する**例を示したいとき

````rust
/// # Examples
/// ```no_run
/// // ネットワークアクセスが必要な例など
/// let _ = std::net::TcpStream::connect("example.com:80").unwrap();
/// ```
///
/// ```should_panic
/// // この関数は負数で panic します
/// my_crate::must_be_positive(-1);
/// ```
///
/// ```compile_fail
/// // 型が合わない例（コンパイルエラーになることを示す）
/// my_crate::add("a", "b");
/// ```
````

> Doctest の実行：`cargo test --doc`（通常の `cargo test` でも併走します）

***

## 4. Intra-doc Links（ドキュメント内リンク）

コード要素へ **安全にリンク** するための記法。**リファクタリングに強い**ので推奨です。

```rust
/// この関数は crate::utils::parse を内部で使用します。
///
/// `Result` 型については [`std::result::Result`] を参照してください。
pub fn process(input: &str) -> Result<(), crate::Error> { /* ... */ }
```

*   `path::to::Type` の形式でリンクを書くと、rustdoc が解決します。
*   外部クレートや標準ライブラリへもリンク可能（例：`std::result::Result`）。
*   Markdown の裸URLより **intra-doc link を推奨**。

***

## 5. 属性による制御：`#[doc(...)]` 系

ドキュメント生成時の細かな制御に便利です。

```rust
/// 通常の説明です。
#[doc(alias = "sum")] // 別名で検索しやすくする（例：sum でヒット）
#[doc(cfg(feature = "fast"))] // この機能が "fast" フィーチャで有効であることを表示
pub fn add(a: i32, b: i32) -> i32 { a + b }

/// 実装詳細のため API リストから隠します。
#[doc(hidden)]
pub fn internal_helper() {}
```

*   `#[doc = include_str!("README.md")]`：**外部ファイルを取り込む**（クレートルートの大きな説明に便利）
    ```rust
    //! # このクレートについて
    #![doc = include_str!("../README.md")]
    ```

***

## 6. クレート／モジュールのトップレベル文書

*   **クレート説明**は `lib.rs` の先頭で `//!` を使う
*   **モジュール説明**は `mod.rs` または `module.rs` の先頭で `//!`

```rust
// src/lib.rs
//! # my_crate
//! 高速な数値演算クレートです。
//!
//! - `add`：加算
//! - `mul`：乗算

pub mod math;
```

```rust
// src/math.rs
//! 数学関連の関数群。

/// 乗算します。
pub fn mul(a: i32, b: i32) -> i32 { a * b }
```

***

## 7. Markdown のコツ（見栄えと保守性）

*   **見出し**：`#`, `##`, `###` を適度に使う
*   **コードフェンス**：Rust の例は ` ` で囲む。タグ（`no_run`, `should_panic`, `compile_fail`）を活用
*   **箇条書き**：`-` か `*`
*   **テーブル**：必要なら Markdown テーブルも可（ただし複雑にしすぎない）
*   **注記**：引用 `>` を使うことで目立たせられる
*   **画像**：パス指定で埋め込み可能（公開ドキュメントで相対パスを扱う際はビルド環境に注意）

***

## 8. 生成コマンド＆オプション

*   **標準**：`cargo doc --open`（生成後ブラウザで開く）
*   **依存を除く**：`cargo doc --no-deps`
*   **プライベートも出す**：`cargo doc --document-private-items`（社内用に便利）
*   **フィーチャ指定**：`cargo doc --features fast` / `--all-features`
*   **ワークスペース**：ルートで `cargo doc --workspace`

***

## 9. 実用テンプレート（関数・構造体）

### 関数テンプレート

````rust
/// {{関数の一文要約}}。
///
/// {{詳しい説明。前提条件や副作用があれば明記。}}
///
/// # Examples
/// ```
/// // 実行可能な最小例
/// # use my_crate::{{fn_name}};
/// let out = {{fn_name}}({{args}});
/// # assert!(true);
/// ```
///
/// # Panics
/// {{panic条件}}。
///
/// # Errors
/// {{エラー型と発生条件}}。
///
/// # Safety
/// {{unsafe前提}}（unsafe を含む場合のみ）。
pub fn {{fn_name}}(/* ... */) -> /* ... */ { /* ... */ }
````

### 構造体テンプレート

````rust
/// {{型の一文要約}}。
///
/// {{用途や設計方針、注意点}}。
///
/// # Examples
/// ```
/// # use my_crate::{{Type}};
/// let t = {{Type}}::new(/* ... */);
/// # assert!(true);
/// ```
pub struct {{Type}} {
    /// {{フィールドの意味と単位・制約など}}
    pub value: i32,
}
````

***

## 10. ベストプラクティス

*   **例は最小で実用的**に：長すぎる例は分割
*   **`Panics`/`Errors` は正確に**：利用者のバグを減らす
*   **`Safety` は必須**：`unsafe` を含む API では明確に
*   **intra-doc links を積極的に**：リファクタに強い
*   **`#[doc(alias = "...")]`**：検索性アップ（別名や俗称）
*   **`include_str!` で外部ファイルを再利用**：README と同期
*   **doctest を CI で回す**：例の鮮度を保つ

***

## 11. ありがちな落とし穴と対策

*   **パス解決が失敗するリンク**  
    → `crate::` からの絶対パスで書く／実在するアイテム名を確認

*   **`compile_fail` を誤用**  
    → 本当に「コンパイル失敗する」コードだけに使う（実行失敗は `should_panic`）

*   **長い例が壊れやすい**  
    → 補助行は `#` で隠す、外部依存は `no_run` で抑制

*   **フィーチャごとの API**  
    → `#[doc(cfg(feature = "..."))]` で可視性を表示、`cargo doc --features ...` で検証

***

### 次のステップ（ご希望があれば）

*   実際の **関数／型** に合わせて **日本語テンプレートを適用**したサンプルを書きます。
*   既存コードから **`cargo doc` の出力が読みやすくなるよう** docコメントを整えるチェックリストを作ります。
*   CI（GitHub Actions など）で **doctest を常時実行**する設定例も用意できます。

## 読みやすくするには

**既存コードの docコメントを整えて `cargo doc` の出力を読みやすくするためのチェックリスト**を、すぐに使える形でまとめました。Rust の慣例に沿いつつ、現場でメンテ可能な運用面（CIやレビュー観点）も含めています。

***

## 📋 ドキュメント整備チェックリスト（実務向け）

### 1) 配置と粒度

*   [ ] **`//!` をクレート／モジュール先頭に**置いて、全体概要・設計方針・用語定義を記載
    *   クレート：`src/lib.rs` の先頭
    *   モジュール：`src/<module>.rs` の先頭
*   [ ] **`///` は公開 API（pub）を中心に**：関数／型／trait／フィールド／定数に付ける
*   [ ] **非公開 API は必要に応じて**：社内用なら `--document-private-items` を前提に整える

### 2) 一文要約と目的

*   [ ] **先頭行は一文要約**（名詞で終わる短文、検索一覧で見える想定）
*   [ ] **次に詳細説明**（前提条件、制約、典型的な用途／非用途を簡潔に）

### 3) セクション構成（推奨）

*   [ ] `# Examples`：最小で実用的なサンプル（後述の Doctest ルールに従う）
*   [ ] `# Panics`：パニック条件があれば明記（無いなら省略可）
*   [ ] `# Errors`：`Result` のエラー型と発生条件を明記
*   [ ] `# Safety`：`unsafe` が絡む API は **必須**（利用者の責務を具体的に）
*   [ ] `# Performance` / `# Notes` / `# Limitations`：重要な性能特性や制限があれば

### 4) Doctest（動く例）

*   [ ] \*\*サンプルは基本「実行可能」\*\*にし、補助行は `#` で隠す
*   [ ] 副作用／外部アクセスがある例は `no_run`
*   [ ] 失敗を示す例は `should_panic`
*   [ ] コンパイルが通らないことを示す例は `compile_fail`
*   [ ] **CI で `cargo test --doc` を常時実行**（壊れたサンプルを早期検出）

### 5) リンクの質（Intra-doc Links）

*   [ ] **コード要素へのリンクは** Markdown で `[`型/関数名`]` + パス（例：`[`std::result::Result`]`、`[`crate::parser::parse`]`）
*   [ ] 相対パスより **`crate::` から絶対パス**を推奨（リファクタに強い）
*   [ ] 外部クレートや標準ライブラリにも積極的にリンク

### 6) 検索性・可視性

*   [ ] **シノニムを `#[doc(alias = "...")]`** で追加（例：「sum」「total」など）
*   [ ] feature-gated API には **`#[doc(cfg(feature = "..."))]`** を付与
*   [ ] 内部専用 API は **`#[doc(hidden)]`** で一覧から除外（リンク先からは見える）

### 7) 表現の一貫性（用語・単位）

*   [ ] **ドメイン用語集**をクレート先頭に用意（`//!` で Glossary／約物の統一）
*   [ ] **単位・範囲・前提をフィールドに明記**（例：「ミリ秒」「0..=255」など）
*   [ ] エラー文言・panic 条件は **コードと整合**（曖昧語を避ける）

### 8) Markdown の作法

*   [ ] 見出しは `#` → `##` → `###` の深さを整理し、1ファイルで **2–3階層に留める**
*   [ ] 箇条書きは短く・平易に（冗長説明は別セクションへ）
*   [ ] コードフェンスは \`\`\`rust で統一、タグ（`no_run` 等）を適切に
*   [ ] 表や画像は **必要最小限**（画像はビルド環境で解決可能なパスに）

### 9) 外部ファイルの取り込み（重複排除）

*   [ ] **README をクレート説明に再利用**：`#![doc = include_str!("../README.md")]`
*   [ ] 長い仕様は `include_str!` で取り込んで **一元管理**
*   [ ] 変更時の差分把握のため、**ファイル冒頭に版番号／更新日**を明記

### 10) コマンド運用

*   [ ] 通常：`cargo doc --open`
*   [ ] 依存除外：`cargo doc --no-deps`
*   [ ] プライベート含む：`cargo doc --document-private-items`
*   [ ] feature 指定：`cargo doc --features fast` / `--all-features`
*   [ ] ワークスペース：`cargo doc --workspace`

***

## ✅ すぐに使えるテンプレ（貼り付け用）

### 関数

````rust
/// {{一文要約}}。
///
/// {{詳細説明：目的／前提／副作用／注意点}}。
///
/// # Examples
/// ```
/// # use my_crate::{{fn_name}};
/// let out = {{fn_name}}({{args}});
// # assert!(true);
/// ```
///
/// # Panics
/// {{panic条件}}。
///
/// # Errors
/// {{エラー型}} — {{発生条件}}。
///
/// # Safety
/// {{unsafe前提と呼び出し側の責務}}（unsafe 関数／ポインタ操作等の場合）。
pub fn {{fn_name}}(/* ... */) -> /* ... */ { /* ... */ }
````

### 構造体／フィールド

````rust
/// {{型の一文要約}}。
///
/// {{用途・設計方針・制約}}。
///
/// # Examples
/// ```
/// # use my_crate::{{Type}};
/// let t = {{Type}}::new(/* ... */);
/// ```
pub struct {{Type}} {
    /// {{意味／単位／許容範囲（例：ミリ秒、0..=255）}}
    pub value: i32,
}
````

### クレート先頭（`lib.rs`）

```rust
//! # {{クレート名}}
//! {{クレートの概要と目的}}。
//!
//! ## 機能
//! - {{主要機能1}}
//! - {{主要機能2}}
//!
//! ## 用語（Glossary）
//! - {{用語}}：{{定義}}
//! - {{用語}}：{{定義}}
#![doc = include_str!("../README.md")]
```

***

## 🧪 Doctest ルールの具体化

*   **補助行は見せない**：
    ````rust
    /// # Examples
    /// ```
    /// # use my_crate::add;
    /// let x = add(1, 2);
    /// assert_eq!(x, 3);
    /// ```
    ````
*   **副作用がある例**：
    ````rust
    /// ```no_run
    /// let _ = std::net::TcpStream::connect("example.com:80").unwrap();
    /// ```
    ````
*   **エラー例・失敗例**：
    ````rust
    /// ```compile_fail
    /// my_crate::add("a", "b"); // 型が合わずにコンパイルエラー
    /// ```
    ///
    /// ```should_panic
    /// my_crate::must_be_positive(-1); // 負数で panic
    /// ```
    ````

***

## 🔍 レビュー観点（PR の Diff を見るとき）

*   [ ] 一文要約が **具体的・簡潔**か（抽象語の連打になっていないか）
*   [ ] `Examples` が **最短で動く**か（不要な依存や無駄な説明がないか）
*   [ ] `Panics` / `Errors` / `Safety` が **実コードと整合**しているか
*   [ ] **intra-doc links** に統一されているか（パスが正しく解決できるか）
*   [ ] **feature 表示**（`#[doc(cfg(...))]`）が漏れていないか
*   [ ] 用語・単位・範囲が **明示**されているか（曖昧さを減らす）
*   [ ] 変更で **doctest が落ちていないか**（CIで確認）

***

## 🧑‍💻 CI 導入例（GitHub Actions）

`.github/workflows/doc.yml`

```yaml
name: Doc & Doctest

on:
  pull_request:
  push:
    branches: [ main ]

jobs:
  doctest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: dtolnay/rust-toolchain@stable
      - name: Run doctests
        run: cargo test --doc --all-features

  build-doc:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: dtolnay/rust-toolchain@stable
      - name: Build documentation
        run: cargo doc --workspace --no-deps --all-features
```

***

## 🔧 自動チェック（オプション）

*   **lint**：`cargo clippy` はコード向けですが、**doc 内のリンク切れ検知**は `rustdoc` のビルド時警告で拾えます。
*   **pre-commit**：`cargo test --doc` を pre-commit で回すと、壊れた例をコミット前に防止できます。

***

## 🎯 最後に（英さん向け提案）

英さんのプロジェクトでは、以下から始めるのがおすすめです：

1.  重要な公開 API に **一文要約＋`Examples`＋`Errors`** をまず付与
2.  `lib.rs` 先頭に **Glossary** と **README 取り込み**
3.  CI に **doctest** を導入して、以後は壊れない運用に

もし既存レポジトリ（関数名・型名・エラー型）を共有いただければ、**テンプレを具体の API に合わせて埋め込んだ差分案**（例：関数10本分）を作成します。必要なら **社内向け（`--document-private-items` 想定）版の書きぶり**にも最適化します。

