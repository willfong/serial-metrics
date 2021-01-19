FROM arm64v8/node:15
COPY qemu-arm-static /usr/bin
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
CMD [ "node", "index.js" ]
