# Stage 1: Build React App
FROM node:20-alpine as build

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve React App with Nginx and Certbot
FROM nginx:alpine

# Install certbot and other necessary packages
RUN apk add --no-cache certbot certbot-nginx bash

# Copy built React app to Nginx public directory
COPY --from=build /src/dist /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the script to renew certificates
COPY renew_certificates.sh /usr/local/bin/renew_certificates.sh
RUN chmod +x /usr/local/bin/renew_certificates.sh

# Expose port 80 and 443
EXPOSE 80
EXPOSE 443


CMD ["sh", "-c", "nginx -g 'daemon off;' & /usr/local/bin/renew_certificates.sh"]