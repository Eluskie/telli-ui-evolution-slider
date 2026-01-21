#!/bin/bash
# Simple build script - no Docker needed!

set -e

echo "🔨 Building Telli UI apps..."
echo ""

# Build main app
echo "📦 Building main app..."
npm install
npm run build
echo "✅ Main app built to ./dist"
echo ""

# Build chat app
echo "💬 Building chat app..."
cd telli-chat
npm install
npm run build
echo "✅ Chat app built to ./telli-chat/dist"
echo ""

cd ..
echo "🎉 All apps built successfully!"
echo ""
echo "Files are ready in:"
echo "  • Main app:    ./dist"
echo "  • Chat app:    ./telli-chat/dist"
echo "  • Animation:   ./animation"
