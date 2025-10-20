#FROM rust:1.69-slim-bullseye
# FROM rust:1.90-bullseye
FROM rust:1.90-bookworm

ARG USERNAME=developer
ARG GROUPNAME=developer
ARG UID=1000
ARG GID=1000
ARG PASSWORD=password

# Add user for develop
# If you  don't need, please comment out
RUN apt-get update -y && apt-get install -y sudo && \
    groupadd -g $GID $GROUPNAME && \
    useradd -m -s /bin/bash -u $UID -g $GID -G sudo $USERNAME && \
    echo $USERNAME:$PASSWORD | chpasswd && \
    echo "$USERNAME   ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Tauri dependencies
# See https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-linux
RUN apt-get update  && \
    apt-get install -y \
    libwebkit2gtk-4.1-dev \
    libjavascriptcoregtk-4.1-dev \
    libglib2.0-dev \
    pkg-config \
    build-essential \
    curl \
    wget \
    # nodejs \
    # npm \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    libsoup-3.0-dev
    # gio-2.0 

# Install Node.js
# See https://github.com/nodesource/distributions
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - &&\
    apt-get install -y nodejs

# Add user for develop
# If you  don't need, please comment out
USER $USERNAME

ENV PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig

# docker-compose up -d
# docker exec -it rust_todo bash
# docker-compose down --rmi all --volumes