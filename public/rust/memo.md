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

## 参考

- [Docker✕Dev ContainerでRustの開発環境を構築する](https://higmasan.com/docker/docker%E2%9C%95dev-container%E3%81%A7rust%E3%81%AE%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%99%E3%82%8B/)
- [The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/title-page.html)