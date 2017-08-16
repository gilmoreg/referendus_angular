/* global describe, it, expect, beforeEach, beforeAll, afterAll */
/**
 * @jest-environment node
 */
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
  it('getRefs should return refs for apa', async (done) => {
    const article = helpers.generateArticleData();
    await chai.request.agent(app)
      .post('/refs')
      .set('Cookie', sid)
      .send(article);
    const res = await chai.request.agent(app)
      .get('/refs?format=apa')
      .set('Cookie', sid)
      .send();
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(1);
    done();
  });

  it('getRefs should return refs for chicago', async (done) => {
    const book = helpers.generateBookData();
    await chai.request.agent(app)
      .post('/refs')
      .set('Cookie', sid)
      .send(book);
    const res = await chai.request.agent(app)
      .get('/refs?format=chicago')
      .set('Cookie', sid)
      .send();
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(1);
    done();
  });

  it('getRefs should return refs for mla', async (done) => {
    const website = helpers.generateWebsiteData();
    await chai.request.agent(app)
      .post('/refs')
      .set('Cookie', sid)
      .send(website);
    const res = await chai.request.agent(app)
      .get('/refs?format=mla')
      .set('Cookie', sid)
      .send();
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(1);
    done();
  });

  it('editRef should successfully edit a ref', async (done) => {
    const website = helpers.generateWebsiteData();
    const ref = await chai.request.agent(app)
      .post('/refs')
      .set('Cookie', sid)
      .send(website);
    const { id } = ref.body;
    const res = await chai.request.agent(app)
      .put(`/refs/${id}`)
      .set('Cookie', sid)
      .send({ id, title: 'test' });
    expect(res.body.title).toEqual('test');
    done();
  });

  it('deleteRef should successfully delete a ref', async (done) => {
    const book = helpers.generateBookData();
    const ref = await chai.request.agent(app)
      .post('/refs')
      .set('Cookie', sid)
      .send(book);
    const { id } = ref.body;
    await chai.request.agent(app)
      .delete(`/refs/${id}`)
      .set('Cookie', sid)
      .send();
    const res = await chai.request.agent(app)
      .get('/refs?format=apa')
      .set('Cookie', sid)
      .send();
    expect(res.body.length).toEqual(0);
    done();
  });
});
