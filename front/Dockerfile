FROM node:20-alpine as build

WORKDIR /src

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/kingheedo/react-chat .

COPY package.json package-lock.json ./

Run npm ci

RUN npm run build

COPY . .

FROM nginx:1.21

RUN apt-get update && apt-get install -y certbot cron

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /src/dist /usr/share/nginx/html

RUN mkdir -p /var/www/certbot

EXPOSE 80 443

COPY ./init-letsencrypt.sh /init-letsencrypt.sh
RUN chmod +x /init-letsencrypt.sh
COPY ./renew-cert.sh /renew-cert.sh
RUN chmod +x /renew-cert.sh

CMD ["/bin/bash", "-c", "/init-letsencrypt.sh && cron && tail -f /var/log/cron.log"]