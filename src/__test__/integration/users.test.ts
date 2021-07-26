import httpRequest from 'supertest';
import db from '@shared/infra/typeorm/';
import 'reflect-metadata';

// import app from '@shared/infra/http/app';

import app from '@shared/infra/http/app';

describe('Users integration test', () => {
  const createUserRequest = {
    name: 'John',
    email: 'john@email.com',
    password: '123456',
  };

  beforeAll(async () => {
    await db.create();
    await db.clear();
  });

  afterAll(async () => {
    await db.clear();
  });
  it('Should be able to create an user', async () => {
    const httpResponse = await httpRequest(app).post('/api/users').send(createUserRequest);
    expect(httpResponse.status).toEqual(200);
    expect(httpResponse.body).toMatchObject({
      name: createUserRequest.name,
      email: createUserRequest.email,
    });
  });
  it('Should be able to authenticate an user', async () => {
    const httpResponse = await httpRequest(app).post('/api/login').send({
      email: createUserRequest.email,
      password: createUserRequest.password,
    });
    expect(httpResponse.status).toEqual(200);
    expect(httpResponse.body).toBeTruthy();
  });
  it('Should not allow authentication with wrong password', async () => {
    const httpResponse = await httpRequest(app).post('/api/login').send({
      email: createUserRequest.email,
      password: 'completely_wrong_password',
    });
    expect(httpResponse.status).toEqual(401);
  });
});
