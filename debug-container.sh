#!/bin/bash
# Debug script to check what's actually in the container

echo "=== Checking container structure ==="
echo ""
echo "Main app files:"
docker exec telli-ui ls -la /usr/share/nginx/html/ | head -20
echo ""
echo "Chat app files:"
docker exec telli-ui ls -la /usr/share/nginx/html/chat/ 2>/dev/null || echo "❌ Chat directory doesn't exist!"
echo ""
echo "Animation files:"
docker exec telli-ui ls -la /usr/share/nginx/html/animation/ 2>/dev/null || echo "❌ Animation directory doesn't exist!"
echo ""
echo "=== Checking nginx config ==="
docker exec telli-ui cat /etc/nginx/conf.d/default.conf
echo ""
echo "=== Testing nginx config ==="
docker exec telli-ui nginx -t
