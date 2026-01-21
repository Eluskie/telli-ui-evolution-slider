#!/bin/bash
# Simple deployment script - copies files to nginx directory

set -e

# Configuration - change these paths if needed
NGINX_ROOT="/var/www/telli.gerardmarti.info"
NGINX_CONFIG_SRC="./nginx-simple.conf"
NGINX_CONFIG_DEST="/etc/nginx/sites-available/telli.gerardmarti.info"

echo "🚀 Deploying Telli UI..."
echo ""

# Build everything first
echo "Building apps..."
bash build-all.sh
echo ""

# Create nginx root directory if it doesn't exist
echo "📁 Creating nginx directories..."
sudo mkdir -p $NGINX_ROOT
sudo mkdir -p $NGINX_ROOT/chat
sudo mkdir -p $NGINX_ROOT/animation

# Copy built files
echo "📋 Copying files..."
sudo cp -r dist/* $NGINX_ROOT/
sudo cp -r telli-chat/dist/* $NGINX_ROOT/chat/
sudo cp -r animation/* $NGINX_ROOT/animation/
sudo cp public/loading_spinner_telli.riv $NGINX_ROOT/ 2>/dev/null || true

# Set permissions
echo "🔐 Setting permissions..."
sudo chown -R www-data:www-data $NGINX_ROOT
sudo chmod -R 755 $NGINX_ROOT

# Copy nginx config
echo "⚙️  Installing nginx config..."
sudo cp $NGINX_CONFIG_SRC $NGINX_CONFIG_DEST
sudo ln -sf $NGINX_CONFIG_DEST /etc/nginx/sites-enabled/telli.gerardmarti.info 2>/dev/null || true

# Test nginx config
echo "🧪 Testing nginx configuration..."
sudo nginx -t

# Reload nginx
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your apps are now live at:"
echo "  • https://telli.gerardmarti.info/"
echo "  • https://telli.gerardmarti.info/chat/"
echo "  • https://telli.gerardmarti.info/animation/"
