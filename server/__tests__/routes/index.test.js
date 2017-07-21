/* global describe, it, expect, beforeEach, afterEach, beforeAll, afterAll */
const chai = require('chai');
chai.use(require('chai-http'));
const mongoose = require('mongoose');
const { app, runServer, closeServer } = require('../../server');
const helpers = require('../../helpers/testData');

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
    await tearDownDb();
    chai.request.agent(app)
      .post('/signup')
      .send({ username: 'test', password: 'test' })
      .then((res) => {
        if (res.headers['set-cookie']) sid = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });

  // Passport authentication
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

  it('should log out', async (done) => {
    const res = await chai.request(app)
      .get('/logout');
    expect(res.status).toEqual(200);
    done();
  });

  // Test sign up for already existing user
  it('should throw an error if user already exists', async (done) => {
    chai.request.agent(app)
      .post('/signup')
      .send({ username: 'test', password: 'test' })
      /* .then((res) => {
        console.log('repeat', res.text);
        done();
      })*/
      .catch((err) => {
        expect(err.status).toEqual(500);
        expect(err.message).toEqual('Internal Server Error');
        expect(err.response.body).toMatchSnapshot();
        done();
      });
  });

  // Formatter
  /*
    Three formatters, three types each
    Let's just test one for each
  */
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
});
