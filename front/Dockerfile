# Stage 1: Build React App
FROM node:20-alpine as build

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve React App with Nginx and Certbot
FROM nginx:alpine

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built React app to Nginx public directory
COPY --from=build /src/build /usr/share/nginx/html

# Copy SSL certificates
COPY nginx/ssl/fullchain.pem /etc/letsencrypt/live/reactchat.online/fullchain.pem
COPY nginx/ssl/privkey.pem /etc/letsencrypt/live/reactchat.online/privkey.pem

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
