npm install -g --quiet @angular/cli@latest
cd client
npm install --quiet
ng build --prod
cp src/bootswatch.min.css src/client/node_modules/bootstrap/dist/css/bootswatch.min.css
cd ~
node server/server.js
