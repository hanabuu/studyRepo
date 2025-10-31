# Rust動かしてみた

## dockerfile

- 最小構成で

``` Dockerfile
FROM rust:1.68.0-alpine

# workディレクトリの作成
WORKDIR /work
 
CMD ["/bin/sh"]

# sudo docker build -t rust_study:1.68 .
# sudo docker run --rm -it  -v "$(pwd)/src:/work" rust_study:1.68
# sudo docker container exec -it <コンテナ名> bash
# sudo docker container ls
```

- ubuntuイメージの場合

``` Dockerfile
# 公式のUbuntuイメージをベースにする
FROM ubuntu:22.04

# 開発に必要なツールをインストールする
RUN apt-get update && \
    apt-get install -y curl build-essential && \
    rm -rf /var/lib/apt/lists/*

# Rustをインストールする
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain stable

# 環境変数を設定する
ENV PATH="/root/.cargo/bin:${PATH}"

# 開発用のディレクトリを作成する
WORKDIR /app

# 開発用のカレントディレクトリにソースコードをコピーする
# COPY . /app

# コンテナ起動時にRustのビルドを実行する（必要に応じて変更）
CMD ["/bin/bash"]

# sudo docker build -t rust_study:22.04 .
# sudo docker run --rm -it  -v "$(pwd)/src:/app" rust_study:22.04
# sudo docker container exec -it <コンテナ名> bash
# sudo docker container ls
```

## hello world

* main.rs

``` rust
fn main() {
    // 世界よ、こんにちは
    println!("Hello, world!");
}
```

## ビルド

``` shell
> rustc main.rs
```

## 実行

- Cと同じやん

``` shell
> ./main
```

## パッケージマネージャーCargo

``` shell
$ cargo --version
```

多分DockerのFromのバージョンと一致してるものと思われる

### Cargoでプロジェクト作成

``` shell
$ cargo new hello_cargo  #プロジェクトが作成される
$ cd hello_cargo
$ ls
```

``` text
hello_cargo
 |- src
     └ main.rs
 |- .gitignore
 └ - Cargo.toml         # package.jsonみたいなやつ
```

* gitについて

参考文献より

``` text
また、.gitignoreファイルと共に新しいGitリポジトリも初期化されています。 もし、すでに存在するGitリポジトリの中でcargo newを実行したなら、Git関連のファイルは作られません。 cargo new --vcs=gitとすることで、この振る舞いを変更できます。

補足：Gitは一般的なバージョン管理システムです。 cargo newコマンドに--vcsフラグを与えることで、別のバージョン管理システムを使用したり、何も使用しないようにもできます。 利用可能なオプションを確認するにはcargo new --helpを実行します。
```

#### Cargo.tomlについて

TOML（Tom's Obvious, Minimal Language、トムの明確な最小限の言語）形式で、Cargoの設定フォーマットです。

作成されたCargo.toml

``` text
[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

- [package]
セクションヘッダー

- [dependencies]
パッケージを記載するところ。Rustではパッケージのことを**クレート**と呼ぶらしい。
以下のような記述をすることでクレートを追加する

``` toml
rand = "0.8.3"
```

改めてbuildすれば、勝手にダウンロードして使えるようになる。ネットワークが脆弱だからなのか結構長い。。
最初buildしてしまえば、Cargo.lockファイルで今のバージョンを記憶してダウンロードはされない。

##### クレートのアップデートについて

アップデートが必要なら以下のコマンドでアップデートまでされる

``` shell
$ cargo update
    Updating crates.io index
    (crates.ioインデックスを更新しています)
    Updating rand v0.8.3 -> v0.8.4
    (randクレートをv0.8.3 -> v0.8.4に更新しています)
```

ただ末尾のバージョンくらいまでしか自動でアップデートされないみたい。
マイナーバージョンから先はCargo.tomlを更新してビルドが必要らしい。

##### クレートのドキュメント

以下のコマンドでクレートのドキュメントをブラウザで表示してくれるようだが、できなかった

``` shell
$ cargo doc --open
```

#### ビルド

作成されたプロジェクトフォルダ内で以下のコマンドを実行する

``` shell
$ cargo build
```

いろいろファイルが作成されるが、以下のコマンドで実行できる

``` shell
$ ./target/build/[bainaryName]
```

bainaryNameはパッケージ名と同じっぽい。

#### 一括実行

ビルドから実行までは以下のコマンドで可能

``` shell
$ cargo run
```

#### コンパイル可否のチェックだけ

``` shell
$ cargo check
```

ビルドよりも高速

## 参考

- [Docker✕Dev ContainerでRustの開発環境を構築する](https://higmasan.com/docker/docker%E2%9C%95dev-container%E3%81%A7rust%E3%81%AE%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%99%E3%82%8B/)
- [The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/title-page.html)