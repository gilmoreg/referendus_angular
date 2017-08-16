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
WORKDIR src/

CMD ["npm", "start"]