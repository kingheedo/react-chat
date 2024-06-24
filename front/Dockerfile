# Stage 1: Build React App
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

WORKDIR /app/front

RUN npm run build

# Stage 2: Serve React App with Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/front/build /usr/share/nginx/html

# Copy nginx configuration file from the current directory (where Dockerfile is located)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
