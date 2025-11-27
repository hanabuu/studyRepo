# Rust正規表現

***

## 1) まずは導入

Rustの標準ライブラリには正規表現は含まれていないため、一般的には **`regex` クレート** を使います。

**`Cargo.toml`**:

```toml
[dependencies]
regex = "1"
```

***

## 2) 基本的な使い方

### マッチ判定（全体に対して一致するか）

```rust
use regex::Regex;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let re = Regex::new(r"^\d{4}-\d{2}-\d{2}$")?; // YYYY-MM-DD
    let s = "2025-11-27";
    println!("is date? {}", re.is_match(s)); // true
    Ok(())
}
```

### 部分一致の抽出（キャプチャ）

```rust
use regex::Regex;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let re = Regex::new(r"(\w+):\s*(\d+)")?;
    let text = "count: 42, retry: 3";

    if let Some(caps) = re.captures(text) {
        let key = &caps[1];      // "count"
        let value = &caps[2];    // "42"
        println!("{key} = {value}");
    }

    // すべての一致箇所を反復
    for caps in re.captures_iter(text) {
        println!("{} = {}", &caps[1], &caps[2]);
    }
    Ok(())
}
```

### 名前付きキャプチャ

```rust
use regex::Regex;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let re = Regex::new(r"(?P<key>\w+):\s*(?P<val>\d+)")?;
    let text = "count: 42, retry: 3";

    for caps in re.captures_iter(text) {
        let key = &caps["key"];
        let val = &caps["val"];
        println!("{key} = {val}");
    }
    Ok(())
}
```

### 置換（`replace` / `replace_all`）

```rust
use regex::Regex;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let re = Regex::new(r"\bcat\b")?;
    let text = "cat catalog scat cat";
    let once = re.replace(text, "dog");        // 最初の一致だけ
    let all  = re.replace_all(text, "dog");    // すべての一致
    println!("{once}"); // "dog catalog scat cat"
    println!("{all}");  // "dog catalog scat dog"
    Ok(())
}
```

### イテレーション（位置と一致文字列）

```rust
use regex::Regex;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let re = Regex::new(r"\d+")?;
    let text = "A12-B345-C6";
    for m in re.find_iter(text) {
        println!("match '{}' at {}..{}", m.as_str(), m.start(), m.end());
    }
    Ok(())
}
```

***

## 3) 高度な使い方

### ビルダー（フラグ・サイズ制限・ケース無視など）

```rust
use regex::RegexBuilder;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let re = RegexBuilder::new(r"foo.*bar")
        .case_insensitive(true) // 大文字小文字を無視
        .multi_line(true)       // ^,$ を行単位に
        .dot_matches_new_line(false) // '.' は改行にマッチしない
        .size_limit(10_000_000) // コンパイル時ヒープ制限（パターンが巨大な場合）
        .build()?;
    println!("{}", re.is_match("Foo xyz bar")); // true
    Ok(())
}
```

### 複数パターンをまとめて判定：`RegexSet`

```rust
use regex::RegexSet;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let set = RegexSet::new([
        r"\berror\b",
        r"\bwarn(ing)?\b",
        r"\binfo\b",
    ])?;
    let line = "warning: disk space low";
    let matched = set.matches(line);
    for i in matched.iter() {
        println!("pattern {} matched", i); // 1 が出る（0-based）
    }
    Ok(())
}
```

### バイト列向け（UTF-8でない場合）：`regex::bytes::Regex`

```rust
use regex::bytes::Regex;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let re = Regex::new(br"\xFF{2}")?; // 0xFFが2連続
    let data = b"\x01\xff\xff\x02";
    println!("{}", re.is_match(data)); // true
    Ok(())
}
```

***

## 4) パフォーマンスのポイント

*   **正規表現は繰り返し使うなら再コンパイルしない**  
    毎回 `Regex::new` を呼ぶと遅くなります。再利用できるようにスコープを工夫するか、**`once_cell`** で静的に初期化します。

```rust
use once_cell::sync::Lazy;
use regex::Regex;

static RE_DATE: Lazy<Regex> = Lazy::new(|| Regex::new(r"^\d{4}-\d{2}-\d{2}$").unwrap());

fn validate(s: &str) -> bool {
    RE_DATE.is_match(s)
}
```

*   Rustの`regex`は **バックトラッキングしないDFA/NFAベース** で、**安全かつ高速**。ただし機能制限あり（後述）。

***

## 5) よく使う正規表現フラグ（インライン）

*   `(?i)` 大文字小文字無視
*   `(?m)` 複数行（^,$ が行頭・行末）
*   `(?s)` ドットが改行もマッチ
*   `(?x)` 拡張モード（空白やコメントを無視して可読性向上）

例：

```rust
let re = Regex::new(r"(?im)^\s*title:\s*(.+)$")?;
```

***

## 6) サニティチェック・安全な書き方のコツ

*   生文字列リテラル `r"..."` を使うと、バックスラッシュのエスケープが減って書きやすくなります。
*   アンカー `^` / `$` を適切に使って意図しない部分一致を避ける。
*   入力が巨大な場合、`find_iter`でストリーム的に処理し、**不要なコピー**を避ける。
*   置換でキャプチャを使うときは `$name` や `$1` を使う（`replace`はCowを返すため効率的）。

```rust
use regex::Regex;
fn main() {
    let re = Regex::new(r"(?P<first>\w+)\s+(?P<last>\w+)").unwrap();
    let s = "Taro Yamada";
    let out = re.replace(s, "$last, $first");
    println!("{out}"); // "Yamada, Taro"
}
```

***

## 7) 文字・Unicodeの扱い

*   `\w`, `\d`, `\s` などは **Unicode対応**。ASCII限定にしたい場合は範囲指定（例：`[A-Za-z0-9_]`）を使ってください。
*   絵文字や合成文字列を厳密に扱う必要がある場合、**正規表現だけでは困難**なことがあります。場合によっては `unicode-segmentation` クレートの **grapheme** 単位処理を検討します。

***

## 8) 制約と代替

Rustの `regex` は高速性重視のため、以下が**未対応**です：

*   **バックリファレンス**（`(\w+)\1` のようなもの）
*   **ルックアラウンド**（`(?=...)`、`(?!...)`、`(?<=...)`、`(?<!...)`）

もしこれらが必要なら、**`fancy-regex`** クレートを検討してください（内部でバックトラッキングするため遅くなる可能性あり）。

**`Cargo.toml`**:

```toml
[dependencies]
fancy-regex = "0.13"
```

**使用例**（前方一致：ルックアヘッド）:

```rust
use fancy_regex::Regex;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let re = Regex::new(r"\b\w+(?=\s+\d{2})")?;
    let s = "item 12, code 9, name 77";
    for m in re.find_iter(s) {
        println!("{}", m?.as_str()); // "item", "name"
    }
    Ok(())
}
```

***

## 9) 実運用の小さなパターン集

### メールアドレスの簡易チェック（厳密ではない）

```rust
use regex::Regex;
fn is_email(s: &str) -> bool {
    Regex::new(r"^[^\s@]+@[^\s@]+\.[^\s@]+$").unwrap().is_match(s)
}
```

### ログからレベルと本文抽出

```rust
use regex::Regex;
fn parse_log(line: &str) -> Option<(&str, &str)> {
    let re = Regex::new(r"^\[(INFO|WARN|ERROR)\]\s+(.*)$").unwrap();
    re.captures(line).map(|c| (c.get(1).unwrap().as_str(), c.get(2).unwrap().as_str()))
}
```

### 数値（整数/符号あり）

```rust
use regex::Regex;
fn is_int(s: &str) -> bool {
    Regex::new(r"^[+-]?\d+$").unwrap().is_match(s)
}
```

***

## 10) トラブルシューティング

*   **「pattern error: unrecognized escape sequence」**  
    → 文字列エスケープと正規表現エスケープの二重を疑い、**生文字列 `r"..."`** へ変更。
*   **遅い/CPU使用率が高い**  
    → パターンを簡素化、`RegexSet`の利用、再コンパイル回避、入力の前処理（分割や範囲限定）、`bytes::Regex`の検討。
*   **期待した一致にならない**  
    → `(?m)` / `(?s)` フラグの有無、アンカー、貪欲/非貪欲（`*` vs `*?`）の確認。

***

## 11) まとめ

*   まずは `regex` クレートを採用。**高速・安全・Unicode対応**。
*   繰り返し使うパターンは**コンパイルを一度だけ**。
*   ルックアラウンドなどが必要なら **`fancy-regex`** を検討。

***

