FROM node:7.10
LABEL maintainer="Grayson Gilmore (gilmoreg@live.com)"

RUN npm install @angular/cli -g

# Prevent npm install from running unless package.json changes
COPY ./package.json src/
RUN cd src && npm install
RUN mkdir src/client
COPY ./client/package.json src/client/
RUN cd src/client && npm install

COPY . /src
COPY ./client/src/bootswatch.min.css /src/client/node_modules/bootstrap/dist/css/bootswatch.min.css
WORKDIR src/

CMD ["npm", "start"]