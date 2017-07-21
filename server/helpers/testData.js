const faker = require('faker');

exports.generateAuthorName = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
});

// generate an object represnting a ref.
// can be used to generate seed data for db
// or request.body data
exports.generateArticleData = () => ({
  user: 'test',
  type: 'Article',
  title: faker.company.catchPhrase(),
  authors: [
    { author: exports.generateAuthorName() },
    { author: exports.generateAuthorName() },
  ],
  year: 2017,
  journal: faker.company.companyName(),
  volume: `${faker.random.number()}`,
  issue: `${faker.random.number()}`,
  pages: `${faker.random.number()}-${faker.random.number()}`,
  url: faker.internet.url(),
});

exports.generateBookData = () => ({
  user: 'test',
  type: 'Book',
  title: faker.company.catchPhrase(),
  authors: [
    { author: exports.generateAuthorName() },
    { author: exports.generateAuthorName() },
  ],
  city: faker.address.city(),
  publisher: faker.company.companyName(),
  year: 2017,
});

exports.generateWebsiteData = () => ({
  user: 'test',
  type: 'Website',
  title: faker.company.catchPhrase(),
  siteTitle: faker.company.companyName(),
  accessDate: faker.date.recent(),
  pubDate: faker.date.past(),
  url: faker.internet.url(),
});

exports.seedRefData = (References) => {
  const seedData = [];

  for (let i = 1; i <= 3; i += 1) {
    seedData.push(exports.generateArticleData());
    seedData.push(exports.generateBookData());
    seedData.push(exports.generateWebsiteData());
  }
  // this will return a promise
  return References.insertMany(seedData);
};
