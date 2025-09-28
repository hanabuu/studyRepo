FROM rust:1.69-slim-bullseye

# Tauri dependencies
# See https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-linux
RUN apt-get update -y && \
    apt-get install -y \
    clang \
    make \
    cmake \
    libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    x11-apps

# Install Node.js
# See https://github.com/nodesource/distributions
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
    apt-get install -y nodejs