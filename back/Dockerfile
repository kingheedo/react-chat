# 빌드 단계
FROM node:20 as build

WORKDIR /src

# package.json과 package-lock.json 복사하여 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 코드 복사 후 빌드 실행
COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf

# 포트 노출
EXPOSE 443

# 실행 명령 설정
CMD ["npm", "run", "start:prod"]
