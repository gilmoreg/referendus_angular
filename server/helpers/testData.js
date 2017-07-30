exports.generateAuthorName = () => ({
  firstName: 'test',
  lastName: 'test',
});

// generate an object represnting a ref.
// can be used to generate seed data for db
// or request.body data
exports.generateArticleData = () => ({
  user: 'test',
  type: 'article',
  title: 'testing test',
  authors: [
    { author: exports.generateAuthorName() },
    { author: exports.generateAuthorName() },
  ],
  year: 2017,
  journal: 'test journal',
  volume: 1,
  issue: 1,
  pages: '1=10',
  url: 'http://test.com',
});

exports.generateBookData = () => ({
  user: 'test',
  type: 'book',
  title: 'test',
  authors: [
    { author: exports.generateAuthorName() },
    { author: exports.generateAuthorName() },
  ],
  city: 'Test',
  publisher: 'Test Publisher',
  year: 2017,
});

exports.generateWebsiteData = () => ({
  user: 'test',
  type: 'website',
  title: 'test',
  siteTitle: 'Test',
  accessDate: new Date(),
  pubDate: new Date(),
  url: 'http://test.com',
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
