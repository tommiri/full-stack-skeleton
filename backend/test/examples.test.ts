import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} from '@jest/globals';
import supertest from 'supertest';

import User from '../src/models/User';
import Example from '../src/models/Example';
import app from '../src/app';
import db from '../src/db/db';

describe('GET examples endpoint', () => {
  test('should return status 200 and valid json', async () => {
    const response = await supertest(app)
      .get('/api/examples')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'First example',
          description: 'First description',
        }),
        expect.objectContaining({
          id: 2,
          name: 'Second example',
          description: 'Second description',
        }),
        expect.objectContaining({
          id: 3,
          name: 'Third example',
          description: 'Third description',
        }),
      ])
    );
  });
});

describe('GET item by id endpoint', () => {
  test('should return 200 and json if found', async () => {
    const response = await supertest(app)
      .get('/api/examples/1')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'First example',
        description: 'First description',
      })
    );
  });
});

let loggedInUser;

beforeAll(async () => {
  try {
    await User.destroy({
      where: { email: 'test.user@domain.com' },
    });

    const response = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(testUser);

    loggedInUser = response.body;
  } catch (err) {
    console.log(err);
  }
});

const testUser = {
  name: 'Test User',
  email: 'test.user@domain.com',
  password: 'password123',
};

describe('POST item endpoint', () => {
  test('should create a new item', async () => {
    const item = {
      name: 'Test Item',
      description: 'Test description',
    };

    const response = await supertest(app)
      .post('/api/examples')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`) // Authentication
      .send(item);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toEqual('Test Item');
    expect(response.body.description).toEqual('Test description');
  });

  test('should not allow no name property', async () => {
    const item = {
      description: 'Test description',
    };

    const response = await supertest(app)
      .post('/api/examples')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(item);

    expect(response.status).toEqual(403);
    expect(response.text).toContain('Name is required!');
  });

  test('should not allow no description property', async () => {
    const item = {
      name: 'Test Item',
    };

    const response = await supertest(app)
      .post('/api/examples')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(item);

    expect(response.status).toEqual(403);
    expect(response.text).toContain('Description is required!');
  });

  test('should not allow empty name', async () => {
    const item = {
      name: '',
      description: 'Test description',
    };

    const response = await supertest(app)
      .post('/api/examples')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(item);

    expect(response.status).toEqual(403);
    expect(response.text).toContain('Name must not be empty!');
  });

  test('should not allow empty description', async () => {
    const item = {
      name: 'Test Item',
      description: '',
    };

    const response = await supertest(app)
      .post('/api/examples')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(item);

    expect(response.status).toEqual(403);
    expect(response.text).toContain('Description must not be empty!');
  });

  test('should not allow too short name', async () => {
    const item = {
      name: 'C',
      description: 'Test description',
    };

    const response = await supertest(app)
      .post('/api/examples')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(item);

    expect(response.status).toEqual(403);
    expect(response.text).toContain(
      'Name must be atleast 3 characters long!'
    );
  });

  test('should not allow too short description', async () => {
    const item = {
      name: 'Test Item',
      description: 'S',
    };

    const response = await supertest(app)
      .post('/api/examples')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(item);

    expect(response.status).toEqual(403);
    expect(response.text).toContain(
      'Description must be atleast 3 characters long!'
    );
  });

  test('should not allow a duplicate item', async () => {
    const item = {
      name: 'First example',
      description: 'First description',
    };

    const response = await supertest(app)
      .post('/api/examples')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(item);

    expect(response.status).toEqual(403);
    expect(response.text).toContain('Item already exists');
  });

  afterAll(async () => {
    try {
      return await Example.destroy({
        where: { name: 'Test Item', description: 'Test description' },
      });
    } catch (err) {
      console.log(err);
    }
  });
});

describe('DELETE item endpoint', () => {
  test('should delete the item by id', async () => {
    const item = {
      name: 'Test Item Delete',
      description: 'Crazy Description Delete',
    };

    const postResponse = await supertest(app)
      .post('/api/examples')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(item);

    const postId = postResponse.body.id;

    const deleteResponse = await supertest(app)
      .delete(`/api/examples/${postId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`);

    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.text).toEqual(
      JSON.stringify({ deleted: deleteResponse.body.deleted })
    );
  });

  test('should check that item with id exists', async () => {
    const response = await supertest(app)
      .delete('/api/examples/100001')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Not Found');
  });
});

afterAll(async () => {
  try {
    await User.destroy({
      where: { email: 'test.user@domain.com' },
    });
  } catch (err) {
    console.log(err);
  }
  return await db.close();
});
