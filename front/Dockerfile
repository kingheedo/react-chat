# Stage 1: Build React App
FROM node:20-alpine as build

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve React App with Nginx and Certbot
FROM nginx:latest

# # Install certbot and other necessary packages
# RUN apk add --no-cache certbot certbot-nginx bash

# Copy built React app to Nginx public directory
COPY --from=build /src/dist /usr/share/nginx/html

# # Copy the script to renew certificates
# COPY renew_certificates.sh /usr/local/bin/renew_certificates.sh
# # 갱신 스크립트에 권한부여 이후에 스크립트를 직접 실행가능 or cron job에서 실행
# RUN chmod +x /usr/local/bin/renew_certificates.sh

# Expose port 443
EXPOSE 443


CMD ["nginx", "-g", "daemon off;"]