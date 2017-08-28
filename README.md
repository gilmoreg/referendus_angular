# referendus_angular

by [Grayson Gilmore](http://gilmoreg.com).

[See the live site here](https://referendus-angular.herokuapp.com/).

## Screenshots
![referendus-screenshots](http://res.cloudinary.com/dk85nueap/image/upload/v1503769922/Referendus_Summary_v9orem.png)

## Summary
Referendus allows you to store academic references (either articles, books, or websites), choose which of the major citation formats you require, and copy them in rich text to the clipboard, ready to paste into your own work. The site also saves your choice of format for the next time you log in.
Creating accounts and signing in and out is quick and easy.

Note: for the original jQuery version of this app, see [here](https://github.com/gilmoreg/referendus).

## Technical
* This is a full stack web app.
* The server side uses Node, Express, MongoDB and Passport.
    * API functions are tested with Jest and Chai.
    * Authentiction is session-based and persistence stored.
    * Passwords are encrypted with bcrypt.
    * The user's format choice is stored in LocalStorage.
* The browser side uses [Angular 4](https://angular.io/) and [ngx-bootstrap](https://github.com/valor-software/ngx-bootstrap).
* Additionally, the site uses [Bootswatch Spacelab](https://bootswatch.com/spacelab/) as a theme.
* Demo is hosted on Heroku.

## Deployment
* Set the following environment variables:
````
DATABASE_URL=mongodb://<user>:<pass>@<url>:<port>/referendus
PORT=3000
SECRET="<secret>"
KEY="<key>"
````
* Start the app
````
// If the app is deployed via Docker image, the build step should be completed automatically
npm start

// If deployed some other way, a build step may be necessary
npm run build
npm start
````

## Development Roadmap
* Implement the ability to autofill fields for a new reference given an ISBN or DOI.
* Sorting reference lists

## Known Issues
* Dates do not automatically load in the website editor in Firefox or Safari. A future version of Firefox will support this feature.