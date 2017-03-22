FROM node:7.7

ENV APPLICATION_ROOT /app/
ADD . $APPLICATION_ROOT
WORKDIR $APPLICATION_ROOT
EXPOSE 4000

RUN npm install
RUN npm init --yes
RUN npm install graphql --save

CMD ["node", "./server.js"]
