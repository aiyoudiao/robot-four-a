FROM node:10

MAINTAINER "robot-four-a" "newdiao@163.com"

ADD ./dist /koa-ts-api-server/

WORKDIR /koa-ts-api-server

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN npm config set registry http://r.cnpmjs.org/

RUN cd koa-ts-api-server && npm install

EXPOSE 8080

CMD ["npm","run","prod"]

