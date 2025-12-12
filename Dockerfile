# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy everything and build main app
COPY . .
RUN npm run build

# Build telli-chat app
WORKDIR /app/telli-chat
RUN npm ci
RUN npm run build

# Serve stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the main app build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the chat app build output to /chat subdirectory
COPY --from=builder /app/telli-chat/dist /usr/share/nginx/html/chat

# Copy the animation page to /animation subdirectory
COPY --from=builder /app/animation /usr/share/nginx/html/animation

# Copy the Rive animation file to the root for access
COPY --from=builder /app/public/telli_logo_animation.riv /usr/share/nginx/html/telli_logo_animation.riv

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
