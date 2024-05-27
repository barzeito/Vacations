FROM node:18-alpine3.19

WORKDIR /app

COPY package.json ./

RUN npm i

COPY ./ ./

RUN npm run build

EXPOSE 8080

CMD npm start



