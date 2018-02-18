FROM node:latest

RUN mkdir /srv/app
WORKDIR /srv/app
ADD src/index.js /srv/app
CMD node index.js
