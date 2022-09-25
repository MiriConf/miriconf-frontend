FROM node:18.9-alpine3.15

WORKDIR /frontend

ADD src/ .

RUN yarn install

ENTRYPOINT [ "node", "/frontend/index.js" ]