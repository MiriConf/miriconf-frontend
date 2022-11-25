ARG TARGETARCH

FROM --platform=$TARGETPLATFORM node:18.9-alpine3.15

WORKDIR /frontend

ADD src/ .

RUN npm install express morgan path 

EXPOSE 8080

ENTRYPOINT [ "node", "/frontend/index.js" ]