# Deployment Guide

## Prerequisites Checklist
✅ Domain configured on Namecheap  
✅ DNS pointing to your server  
✅ Let's Encrypt SSL certificate installed  
⬜ Docker and Docker Compose installed on server

## Step-by-Step Deployment

### 1. Update nginx.conf with your domain
Replace `yourdomain.com` in `nginx.conf` with your actual domain name (2 places).

### 2. Verify Let's Encrypt certificates exist
SSH into your server and check:
```bash
sudo ls -la /etc/letsencrypt/live/yourdomain.com/
```

You should see:
- `fullchain.pem`
- `privkey.pem`

### 3. Build and deploy with Docker

#### Option A: Using Docker Compose (Recommended)
```bash
# Build the image
docker-compose build

# Start the container
docker-compose up -d

# Check logs
docker-compose logs -f
```

#### Option B: Using Docker directly
```bash
# Build the image
docker build -t telli-ui .

# Run the container
docker run -d \
  -p 80:80 \
  -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  -v /var/lib/letsencrypt:/var/lib/letsencrypt:ro \
  --restart unless-stopped \
  --name telli-ui \
  telli-ui
```

### 4. Access your applications

Once deployed, you can access:

- **Main UI**: `https://yourdomain.com/`
- **Chat Widget**: `https://yourdomain.com/chat`
- **Animation**: `https://yourdomain.com/animation`

### 5. Verify SSL is working
```bash
# Test HTTPS
curl -I https://yourdomain.com

# Check certificate
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```

## Troubleshooting

### HTTP not redirecting to HTTPS
Check nginx is running:
```bash
docker exec telli-ui nginx -t
docker logs telli-ui
```

### SSL Certificate errors
Ensure certificates are mounted correctly:
```bash
docker exec telli-ui ls -la /etc/letsencrypt/live/yourdomain.com/
```

### 404 errors on /chat route
Verify the build created the chat directory:
```bash
docker exec telli-ui ls -la /usr/share/nginx/html/chat/
```

## SSL Certificate Renewal

Let's Encrypt certificates expire every 90 days. Set up auto-renewal:

```bash
# Add to crontab
0 0 * * 0 certbot renew --quiet && docker restart telli-ui
```

## Updating the application

When you push new changes:

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

## Firewall Configuration

Ensure ports 80 and 443 are open:

```bash
# For UFW (Ubuntu)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload

# For firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```
