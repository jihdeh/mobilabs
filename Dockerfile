FROM node:7.0.0
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY app /usr/src/app/app
COPY server /usr/src/app/server
COPY tools /usr/src/app/tools
COPY style /usr/src/app/style
COPY util /usr/src/app/util

RUN npm install --loglevel=warn --prefix /usr/src/app

COPY . /usr/src/app

CMD ["npm", "run", "start"]
