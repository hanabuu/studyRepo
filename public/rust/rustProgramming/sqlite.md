# Rust SQLite

RustでSQLiteを扱う方法は、用途に応じていくつかの選択肢があります。ここでは **代表的なクレート** として

*   **`rusqlite`**（軽量な同期API・SQLite Cライブラリ直接利用）
*   **`sqlx`**（非同期・型安全・ビルド時検証が可能）
*   **`SeaORM` / `Diesel`**（より高レベルなORM）

を紹介し、まずは実務で使いやすい **`rusqlite`** と **`sqlx`** の基本～応用を網羅します。

***

## 1) まずは選ぶ：用途別ガイド

*   **CLIツール/デスクトップアプリ、単純なDB操作** → `rusqlite`
    *   同期API・最小依存で速い。SQLiteの機能を素直に使える。
*   **非同期サーバー（Tokio）やWebバックエンド** → `sqlx`
    *   `async`対応、型安全なクエリ、ビルド時にSQL検証（`offline` モード可）。
*   **テーブル定義が複雑／リレーション多い** → `SeaORM`（async）や `Diesel`（sync）
    *   モデル中心で記述量削減。ただし導入・学習コストが上がる。

***

## 2) `rusqlite`（同期）での基本

### インストール（`Cargo.toml`）

```toml
[dependencies]
rusqlite = { version = "0.31", features = ["bundled"] }
```

*   `bundled` を付けると、環境にSQLiteが無くてもビルドできる（SQLiteを同梱ビルド）。  
    既存のOS提供のSQLiteを使うなら features を省略。

### 接続・テーブル作成・CRUD

```rust
use rusqlite::{params, Connection, Result};

fn main() -> Result<()> {
    // ファイルDBに接続（なければ作成）。メモリDBなら ":memory:"。
    let conn = Connection::open("app.db")?;

    // テーブル作成
    conn.execute(
        "CREATE TABLE IF NOT EXISTS users (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            name    TEXT NOT NULL,
            age     INTEGER NOT NULL
        )",
        [],
    )?;

    // INSERT（プリペアドステートメント＋パラメータ）
    conn.execute(
        "INSERT INTO users (name, age) VALUES (?1, ?2)",
        params!["Taro", 28],
    )?;

    // 単一行SELECT（query_row）
    let (name, age): (String, i64) = conn.query_row(
        "SELECT name, age FROM users WHERE id = ?1",
        params![1],
        |row| Ok((row.get(0)?, row.get(1)?)),
    )?;
    println!("id=1 -> {name}, {age}");

    // 複数行SELECT（prepare + query_map）
    let mut stmt = conn.prepare("SELECT id, name, age FROM users WHERE age >= ?1")?;
    let rows = stmt.query_map(params![20], |row| {
        Ok(User {
            id: row.get(0)?,
            name: row.get(1)?,
            age: row.get(2)?,
        })
    })?;

    for u in rows {
        println!("{:?}", u?);
    }

    Ok(())
}

#[derive(Debug)]
struct User {
    id: i64,
    name: String,
    age: i64,
}
```

### トランザクション

```rust
use rusqlite::{params, Connection, Result};

fn main() -> Result<()> {
    let conn = Connection::open("app.db")?;
    let tx = conn.transaction()?; // BEGIN

    tx.execute("INSERT INTO users (name, age) VALUES (?1, ?2)", params!["Hanako", 30])?;
    tx.execute("INSERT INTO users (name, age) VALUES (?1, ?2)", params!["Jiro", 25])?;

    tx.commit()?; // COMMIT（失敗すればDROP/ROLLBACK）
    Ok(())
}
```

### 高速化（PRAGMA）

```rust
use rusqlite::{Connection, Result};

fn main() -> Result<()> {
    let conn = Connection::open("app.db")?;
    // 開発/ローカル用途での書き込み速度アップ（耐障害性とのトレードオフ）
    conn.execute_batch(
        r#"
        PRAGMA journal_mode = WAL;      -- 同時アクセス向け
        PRAGMA synchronous = NORMAL;    -- 既定より書き込み少し速く
        PRAGMA foreign_keys = ON;       -- 外部キー保護を有効化
        "#,
    )?;
    Ok(())
}
```

### スキーマ変更（マイグレーション）

`rusqlite` 単体ではマイグレーション管理はないため、以下のように自前でバージョンテーブルを持つか、ツール（例：`refinery`, `barrel`）の導入を検討します。

```rust
conn.execute("CREATE TABLE IF NOT EXISTS schema_version (version INTEGER NOT NULL)", [])?;
let current: i64 = conn.query_row("SELECT COALESCE(MAX(version),0) FROM schema_version", [], |r| r.get(0))?;
if current < 1 {
    conn.execute("ALTER TABLE users ADD COLUMN email TEXT", [])?;
    conn.execute("INSERT INTO schema_version (version) VALUES (1)", [])?;
}
```

***

## 3) `sqlx`（非同期）での基本

### インストール（`Cargo.toml`）

```toml
[dependencies]
tokio = { version = "1", features = ["macros", "rt-multi-thread"] }
sqlx = { version = "0.7", features = ["sqlite", "runtime-tokio", "macros"] }
```

> 補足：`sqlx` は **ビルド時にSQLを検証**する機能があります。  
> その際、`DATABASE_URL=sqlite://app.db` を環境変数に設定し、`sqlx db create` / `sqlx migrate` などを利用すると便利です。（オフライン検証モードもあり）

### 接続・テーブル作成・CRUD（async/await）

```rust
use sqlx::{sqlite::SqlitePoolOptions, Row};
use sqlx::Sqlite; // 型注釈に使う
use tokio;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    // プール作成
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect("sqlite://app.db").await?;

    // DDL
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS users (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            name    TEXT NOT NULL,
            age     INTEGER NOT NULL
        )
        "#,
    )
    .execute(&pool)
    .await?;

    // INSERT（? プレースホルダ）
    sqlx::query("INSERT INTO users (name, age) VALUES (?, ?)")
        .bind("Taro")
        .bind(28)
        .execute(&pool)
        .await?;

    // SELECT（単一行）
    let row = sqlx::query("SELECT name, age FROM users WHERE id = ?")
        .bind(1)
        .fetch_one(&pool)
        .await?;
    let name: String = row.get("name");
    let age: i64 = row.get("age");
    println!("id=1 -> {name}, {age}");

    // SELECT（複数行）
    let mut rows = sqlx::query("SELECT id, name, age FROM users WHERE age >= ?")
        .bind(20)
        .fetch(&pool);

    while let Some(row) = rows.try_next().await? {
        let id: i64 = row.get("id");
        let name: String = row.get("name");
        let age: i64 = row.get("age");
        println!("{id}: {name} ({age})");
    }

    Ok(())
}
```

### 型安全なクエリ（`query_as!` / `FromRow`）

```rust
use sqlx::{FromRow, sqlite::SqlitePoolOptions};
use tokio;

#[derive(Debug, FromRow)]
struct User {
    id: i64,
    name: String,
    age: i64,
}

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    let pool = SqlitePoolOptions::new().connect("sqlite://app.db").await?;
    let users: Vec<User> = sqlx::query_as::<_, User>("SELECT id, name, age FROM users WHERE age >= ?")
        .bind(20)
        .fetch_all(&pool)
        .await?;
    println!("{users:#?}");
    Ok(())
}
```

### トランザクション（`sqlx::Transaction`）

```rust
use sqlx::{Transaction, Sqlite, sqlite::SqlitePoolOptions};
use tokio;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    let pool = SqlitePoolOptions::new().connect("sqlite://app.db").await?;
    let mut tx: Transaction<Sqlite> = pool.begin().await?;

    sqlx::query("INSERT INTO users (name, age) VALUES (?, ?)")
        .bind("Hanako")
        .bind(30)
        .execute(&mut tx)
        .await?;

    sqlx::query("INSERT INTO users (name, age) VALUES (?, ?)")
        .bind("Jiro")
        .bind(25)
        .execute(&mut tx)
        .await?;

    tx.commit().await?;
    Ok(())
}
```

### マイグレーション（`sqlx-cli`）

1.  開発環境に `sqlx-cli` を導入（`cargo install sqlx-cli`）
2.  `sqlx migrate add init` でマイグレーションファイル作成
3.  `sqlx migrate run` で適用  
    ファイルに `CREATE TABLE ...` 等を書いて、履歴管理を自動化できます。

***

## 4) ORMを使う場合

### SeaORM（async）

*   `Entity` と `Model` を定義し、`find` / `insert` / `update` をメソッドで書ける。
*   複雑なリレーションやクエリ合成が楽。
*   例：`sea-orm = { version = "0.12", features = ["sqlx-sqlite", "runtime-tokio-rustls"] }`

### Diesel（sync）

*   コンパイル時に型安全なクエリを生成する、老舗ORM。
*   例：`diesel = { version = "2", features = ["sqlite"] }`
*   `diesel_cli`（要SQLite dev headers）でマイグレーション運用が楽。

***

## 5) よくある落とし穴とTips

*   **複数スレッド／複数プロセスからのアクセス**  
    SQLiteは同時書き込みに弱い。`WAL` モードや再試行（リトライ）・短いトランザクションで対処。書き込みが多いならサーバー型DB（PostgreSQL等）を検討。
*   **テキストのエンコーディング**  
    SQLiteはUTF-8推奨。バイナリを保存する場合は `BLOB` を使う。
*   **パフォーマンス**
    *   まとめてINSERTする際は `transaction + executemany` 的にループ内で`execute`するよりも `tx` 内で行う。
    *   適切なインデックス作成。
*   **SQLインジェクション対策**  
    常に **パラメータバインディング** を使う（文字列連結のSQLは避ける）。
*   **スキーマの進化**  
    長期運用なら **マイグレーションツール** を必ず導入（`sqlx migrate` / `refinery` / `diesel migrations` など）。

***

## 6) まとめ

*   手軽さ重視なら **`rusqlite`**（同期）
*   非同期バックエンドや型安全なクエリ検証なら **`sqlx`**（async）
*   モデル中心の開発なら **SeaORM / Diesel**
*   トランザクション・インデックス・WAL・マイグレーションを押さえると実運用が安定します。

***

### 次に進めるために

どんな用途でSQLiteを使いますか？  
例）「ローカルCLIで設定DB」「TokioベースのWeb API」「大量のCSVを取り込んで集計」「Redmineのようなチケット管理の試作」など。  
イメージを教えていただければ、**ベストなクレート選定**と\*\*具体的なプロジェクトひな形（`Cargo.toml` とコード一式）\*\*を作ってお渡しします。
