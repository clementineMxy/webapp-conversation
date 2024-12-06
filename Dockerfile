FROM --platform=linux/amd64 node:19-bullseye-slim

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3004

CMD ["yarn","start"]
