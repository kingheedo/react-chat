# Stage 1: Build React App
FROM node:20-alpine as build

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve React App with Nginx and Certbot
FROM nginx:alpine

# Install certbot
RUN apk add --no-cache certbot certbot-nginx

# Copy built React app to Nginx public directory
COPY --from=build /src/dist /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 and 443
EXPOSE 80
EXPOSE 443

CMD ["sh", "-c", "nginx -g 'daemon off;' & while :; do certbot renew --nginx --non-interactive; sleep 12h; done"]