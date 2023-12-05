FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN yarn 

COPY ./dist ./dist

CMD ["yarn","start:dev"]