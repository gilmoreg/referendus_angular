FROM node:7.10
LABEL maintainer="Grayson Gilmore (gilmoreg@live.com)"

# Heroku requires angular CLI be installed globally
RUN npm install -g --quiet @angular/cli@latest concurrently nodemon

# Prevent npm install from running unless package.json changes
COPY ./package.json src/
RUN cd src && npm install --quiet
RUN mkdir src/client
COPY ./client/package.json src/client/
RUN cd src/client && npm install --quiet

COPY . /src
COPY ./client/src/bootswatch.min.css /src/client/node_modules/bootstrap/dist/css/bootswatch.min.css
WORKDIR src/

CMD ["npm", "start"]