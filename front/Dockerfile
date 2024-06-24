FROM node:20-alpine as build

WORKDIR /src

COPY package.json package-lock.json ./

Run npm ci

COPY . .

RUN npm run build

# Stage 2: Serve React App with Nginx and Certbot
FROM nginx:alpine

# Install certbot and other necessary packages
# RUN apk add --no-cache certbot certbot-nginx bash curl

# Copy Nginx configuration
COPY ../nginx/nginx.conf /etc/nginx/nginx.conf
COPY ../nginx/ssl/fullchain.pem /etc/letsencrypt/live/reactchat.online/fullchain.pem
COPY ../nginx/ssl/privkey.pem /etc/letsencrypt/live/reactchat.online/privkey.pem
#COPY nginx/ssl /etc/nginx/ssl

# Copy built React app to Nginx public directory
COPY --from=build /src/dist /usr/share/nginx/html

# Add script for renewing certificates
# COPY renew_certificates.sh /usr/bin/renew_certificates.sh
# RUN chmod +x /usr/bin/renew_certificates.sh

# Add cron job for certbot renewal
# RUN echo "0 0 * * * /usr/bin/renew_certificates.sh" >> /etc/crontabs/root

EXPOSE 80
EXPOSE 443

# CMD ["sh", "-c", "crond -l 2 && nginx -g 'daemon off;'"]
CMD ["nginx", "-g", "daemon off;"]
