FROM --platform=linux/amd64 node:19-bullseye-slim

WORKDIR /app

COPY . .

ENV YARN_REGISTRY=https://registry.npmmirror.com 

RUN yarn install --registry $YARN_REGISTRY
RUN yarn build

EXPOSE 3004

CMD ["yarn","start"]
