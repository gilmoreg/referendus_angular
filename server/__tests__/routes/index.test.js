/* global describe, it, expect, beforeEach, afterEach, beforeAll, afterAll */
const chai = require('chai');
chai.use(require('chai-http'));
const mongoose = require('mongoose');
const { app, runServer, closeServer } = require('../../server');

mongoose.Promise = global.Promise;

function tearDownDb() {
  return mongoose.connection.dropDatabase();
}

describe('API Integration Tests', () => {
  beforeAll(async () => runServer);
  afterAll(async () => closeServer);

  let sid;

  beforeEach(async (done) => {
    // Create a test user
    chai.request.agent(app)
      .post('/signup')
      .send({ username: 'test', password: 'test' })
      .then((res) => {
        if (res.headers['set-cookie']) sid = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });

  afterEach(async (done) => {
    await tearDownDb();
    done();
  });

  it('should log a valid user in', async (done) => {
    const res = await chai.request(app)
      .post('/login')
      .send({ username: 'test', password: 'test' });
    expect(res.body.message).toEqual('Login successful');
    expect(res.body.user).toEqual('test');
    done();
  });

  it('should refuse an invalid login', async (done) => {
    chai.request(app)
      .post('/login')
      .send({ username: 'garbage', password: 'garbage' })
      .catch((err) => {
        expect(err.status).toEqual(401);
        done();
      });
  });
});
