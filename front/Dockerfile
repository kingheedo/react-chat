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

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
