FROM node:10-alpine

WORKDIR /usr/src/app

COPY . .
COPY package*.json .

RUN yarn \
&&  yarn build
