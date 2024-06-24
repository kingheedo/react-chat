# Stage 1: Build React App
FROM node:20-alpine as build

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Copy nginx configuration
COPY ./nginx ./nginx

RUN npm run build

# Stage 2: Serve React App with Nginx and Certbot
FROM nginx:alpine

# Install certbot and other necessary packages (if needed)
# RUN apk add --no-cache certbot certbot-nginx bash curl

# Copy Nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built React app to Nginx public directory
COPY --from=build /src/dist /usr/share/nginx/html

# Add script for renewing certificates (if needed)
# COPY renew_certificates.sh /usr/bin/renew_certificates.sh
# RUN chmod +x /usr/bin/renew_certificates.sh

# Add cron job for certbot renewal (if needed)
# RUN echo "0 0 * * * /usr/bin/renew_certificates.sh" >> /etc/crontabs/root

# Expose HTTPS port
EXPOSE 443

# Start Nginx in daemon mode
CMD ["nginx", "-g", "daemon off;"]
