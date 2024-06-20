FROM node:20-alpine as build

WORKDIR /src

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/kingheedo/react-chat .

COPY package.json package-lock.json ./

Run npm ci

RUN npm run build

COPY . .

FROM nginx:1.21

COPY --from=build /src/dist /usr/share/nginx/html

# Let's Encrypt 인증서를 사용하여 HTTPS 설정
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]