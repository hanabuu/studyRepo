# Pathについて

## PathBuf

PathBuf は、Rust の std::path::PathBuf で、パス文字列を「所有する」型です。


``` rs
use std::path::{Path, PathBuf};
```

として取り込んで、

``` rs
path: PathBuf
```

で path がファイルパスそのものを保持している、という意味です。

要点だけ言うとこうです。

- PathBuf
  - パスを所有する型
  - 可変に組み立てたり保持したりできる
  - String に近い立場
- Path
  - パスの参照先として使う型
  - ふつうは &Path として使う
  - str に近い立場

対応関係はだいたいこれです。

- String ↔ &str
- PathBuf ↔ &Path

``` rs
path: root.to_path_buf(),
```

で &Path から PathBuf を作ったり。
逆に as_deref() で ```Option<PathBuf>``` を ```Option<&Path>``` に変えています。

つまり ```PathBuf``` は、

- ファイルパスを構造体の中に保存したい
- 関数の外でも持ち回りたい
- パスを結合して新しいパスを作りたい

ときに使う型です。

一方で、

- 読み取り専用で見るだけ
- 所有権はいらない
- 関数に借用で渡したい

ときは &Path を使います。
