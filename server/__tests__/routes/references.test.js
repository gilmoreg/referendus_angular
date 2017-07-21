/* global describe, it, expect, beforeEach, beforeAll, afterAll */
const chai = require('chai');
chai.use(require('chai-http'));
const mongoose = require('mongoose');
const { app, runServer, closeServer } = require('../../server');
const helpers = require('../../helpers/testData');

mongoose.Promise = global.Promise;

function tearDownDb() {
  return mongoose.connection.dropDatabase();
}

describe('References tests', () => {
  beforeAll(async () => runServer);
  afterAll(async () => closeServer);

  let sid;

  beforeEach(async (done) => {
    // Create a test user
    await tearDownDb();
    chai.request.agent(app)
      .post('/signup')
      .send({ username: 'test', password: 'test' })
      .then((res) => {
        if (res.headers['set-cookie']) sid = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });

  it('getRefs should throw an error with no format query param', (done) => {
    chai.request.agent(app)
      .get('/refs')
      .set('Cookie', sid)
      .send()
      .catch((err) => {
        expect(err.status).toEqual(500);
        expect(err.message).toEqual('Internal Server Error');
        done();
      });
  });

  it('getRefs should throw and error on invalid format', (done) => {
    chai.request.agent(app)
      .get('/refs?format=garbage')
      .set('Cookie', sid)
      .send()
      .catch((err) => {
        expect(err.status).toEqual(500);
        expect(err.message).toEqual('Internal Server Error');
        done();
      });
  });

  // GetRefs Formats
  /* it('getRefs should return refs for apa', async (done) => {
    const article = helpers.generateArticleData();
  }); */
});
