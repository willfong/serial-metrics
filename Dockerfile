FROM node:15
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
CMD [ "node", "index.js" ]
