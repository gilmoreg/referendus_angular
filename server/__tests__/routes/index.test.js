/* global describe, it, expect, beforeEach, afterEach, beforeAll, afterAll */
import supertest from 'supertest';

import { app, runServer, closeServer } from '../../server';

const agent = supertest(app);

describe('API Integration Tests', () => {
  beforeAll(async () => runServer);
  afterAll(async () => closeServer);

  beforeEach(async () => {
    // Create a test user
  });

  afterEach(async () => {
    // drop the database
  });

  it('should log a valid user in', async (done) => {
    /*
      Call API
    */
    const res = await agent.post('/login', { username: 'test', password: 'test' });
    // { message: 'Login successful', user: req.user.username }
    expect(res.message).toEqual('Login successful');
    expect(res.user).toEqual('test');
    done();
  });

  it('should refuse an invalid login', async (done) => {
    const res = await agent.post('/login', { username: 'garbage', password: 'garbage' });
    // Not sure yet how to get a proper fail message with the logic I have
    // expect(res.message).toEqual('')
    done();
  });
});
