#!/data/data/com.termux/files/usr/bin/bash

echo "🔹 Updating Termux..."
pkg update && pkg upgrade -y

echo "🔹 Installing core dev tools..."
pkg install -y git nodejs python clang make openssl

echo "🔹 Verifying installs..."
node -v
npm -v
git --version

echo "✅ Termux setup complete"
