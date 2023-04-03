import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} from '@jest/globals';
import supertest from 'supertest';

import db from '../db/db.js';
import app from '../app.js';
import User from '../models/User.js';

beforeAll(async () => {
  try {
    return await User.destroy({
      where: { email: 'test.user@domain.com' },
    });
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  try {
    await User.destroy({
      where: { email: 'test.user@domain.com' },
    });
    return await db.close();
  } catch (err) {
    console.log(err);
  }
});

const testUser = {
  name: 'Test User',
  email: 'test.user@domain.com',
  password: 'password123',
};

describe('Users signup endpoint', () => {
  test('should sign up user with valid credentials', async () => {
    const response = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(testUser);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });
});

describe('Users login endpoint', () => {
  test('should login user with valid credentials', async () => {
    const response = await supertest(app)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(testUser);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });
});
