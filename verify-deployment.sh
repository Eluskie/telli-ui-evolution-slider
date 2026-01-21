#!/bin/bash
# Deployment verification script - can be run by CI/CD or manually

set -e

echo "🔍 Verifying deployment..."
echo ""

# Check if container is running
if ! docker ps | grep -q telli-ui; then
    echo "❌ Container 'telli-ui' is not running!"
    echo "   Run: docker-compose up -d"
    exit 1
fi

echo "✅ Container is running"
echo ""

# Verify main app files
echo "Checking main app files..."
if docker exec telli-ui test -f /usr/share/nginx/html/index.html; then
    echo "  ✅ Main app index.html exists"
else
    echo "  ❌ Main app index.html missing!"
    exit 1
fi

# Verify chat app files
echo "Checking chat app files..."
if docker exec telli-ui test -d /usr/share/nginx/html/chat; then
    echo "  ✅ Chat directory exists"
    if docker exec telli-ui test -f /usr/share/nginx/html/chat/index.html; then
        echo "  ✅ Chat app index.html exists"
    else
        echo "  ❌ Chat app index.html missing!"
        exit 1
    fi
else
    echo "  ❌ Chat directory doesn't exist!"
    exit 1
fi

# Verify animation files
echo "Checking animation files..."
if docker exec telli-ui test -d /usr/share/nginx/html/animation; then
    echo "  ✅ Animation directory exists"
    if docker exec telli-ui test -f /usr/share/nginx/html/animation/index.html; then
        echo "  ✅ Animation index.html exists"
    else
        echo "  ❌ Animation index.html missing!"
        exit 1
    fi
else
    echo "  ❌ Animation directory doesn't exist!"
    exit 1
fi

# Test nginx config
echo ""
echo "Testing nginx configuration..."
if docker exec telli-ui nginx -t 2>&1 | grep -q "successful"; then
    echo "  ✅ Nginx config is valid"
else
    echo "  ❌ Nginx config has errors!"
    docker exec telli-ui nginx -t
    exit 1
fi

echo ""
echo "🎉 All checks passed! Your deployment looks good."
echo ""
echo "Access your apps at:"
echo "  • Main:      https://telli.gerardmarti.info/"
echo "  • Chat:      https://telli.gerardmarti.info/chat/"
echo "  • Animation: https://telli.gerardmarti.info/animation/"
