#!/usr/bin/env bash
set -euo pipefail

cd contracts/earn-quest

cargo build --release
cargo test
cargo fmt --all -- --check
cargo clippy --all-targets --all-features -- -D warnings
rustup target add wasm32-unknown-unknown
cargo build --release --target wasm32-unknown-unknown
cargo install cargo-deny || true
make license-check
