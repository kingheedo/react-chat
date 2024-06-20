FROM node:20-alpine

WORKDIR /src

COPY package.json package-lock.json ./

Run npm ci

COPY . .

EXPOSE 3090

CMD [ "npm", "start" ]