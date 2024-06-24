# Stage 1: Build React App
FROM node:20-alpine as build

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve React App with Nginx and Certbot
FROM nginx:alpine


# Install Certbot and obtain SSL certificate
RUN apk add --no-cache certbot openssl && \
certbot certonly --standalone --agree-tos --non-interactive -d reactchat.online -m dhkdgmleh@gmail.com

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built React app to Nginx public directory
COPY --from=build /src/dist /usr/share/nginx/html

# Copy SSL certificates
RUN mkdir -p /etc/letsencrypt/live/reactchat.online
COPY /etc/letsencrypt/live/reactchat.online/fullchain.pem /etc/letsencrypt/live/reactchat.online/fullchain.pem
COPY /etc/letsencrypt/live/reactchat.online/privkey.pem /etc/letsencrypt/live/reactchat.online/privkey.pem

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
