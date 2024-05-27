FROM node:15-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm i

COPY ./ ./

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /app/build .
COPY nginx.conf ../sites-available/

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]