ARG TARGETARCH

FROM --platform=$TARGETPLATFORM alpine:3.17.1

WORKDIR /frontend

RUN apk add yarn

RUN yarn add next

ADD . .

RUN yarn install

EXPOSE 3000

ENTRYPOINT [ "yarn", "next", "dev" ]