# syntax=docker/dockerfile:1.7

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y --no-install-recommends \
  build-essential \
  curl \
  wget \
  ca-certificates \
  git \
  gnupg2 \
  dirmngr \
  file \
  pkg-config \
  cmake \
  xz-utils \
  unzip \
  zip \
  libwebkit2gtk-4.0-dev \
  libwebkit2gtk-4.1-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  libxdo-dev \
  libxtst-dev \
  libssl-dev \
  libjavascriptcoregtk-4.1-dev \
  libsoup-3.0-dev \
  mingw-w64 \
  g++-mingw-w64-x86-64-posix \
  gcc-mingw-w64-x86-64-posix \
  nsis \
  && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get install -y --no-install-recommends nodejs \
  && rm -rf /var/lib/apt/lists/*

RUN update-alternatives --set x86_64-w64-mingw32-gcc /usr/bin/x86_64-w64-mingw32-gcc-posix \
  && update-alternatives --set x86_64-w64-mingw32-g++ /usr/bin/x86_64-w64-mingw32-g++-posix

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain stable \
  && /root/.cargo/bin/rustup target add x86_64-pc-windows-gnu

ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /workspace

# Keep container running by default; docker compose services will override the command.
CMD ["sleep", "infinity"]
