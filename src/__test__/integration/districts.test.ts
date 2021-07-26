import httpRequest from 'supertest';
import db from '@shared/infra/typeorm/';
import 'reflect-metadata';

import app from '@shared/infra/http/app';

describe('Districts integration test', () => {
  const createUserRequest = {
    name: 'John',
    email: 'john@email.com',
    password: '123456',
  };

  let bearerToken:string;
  let httpResponse;
  let districtId:string;

  beforeAll(async () => {
    await db.create();
    await db.clear();
    await httpRequest(app).post('/api/users').send(createUserRequest);
    httpResponse = await httpRequest(app).post('/api/login').send({
      email: createUserRequest.email,
      password: createUserRequest.password,
    });
    bearerToken = httpResponse.body;
    // await db.clear();
  });

  afterAll(async () => {
    await db.clear();
  });
  it('Should not allow creation of Districts without auth', async () => {
    httpResponse = await httpRequest(app).post('/api/districts').send({
      name: 'central park',
    });
    expect(httpResponse.status).toEqual(401);
  });

  it('Should be able to create a District', async () => {
    httpResponse = await httpRequest(app).post('/api/districts').send({
      name: 'central park',
    }).auth(bearerToken, { type: 'bearer' });
    districtId = httpResponse.body.id;
    expect(httpResponse.status).toEqual(200);
  });

  it('Should be able to show a District without auth', async () => {
    httpResponse = await httpRequest(app).get(`/api/districts/${districtId}`);
    expect(httpResponse.status).toEqual(200);
    expect(httpResponse.body).toHaveProperty('id', districtId);
    expect(httpResponse.body).toHaveProperty('name');
    expect(httpResponse.body).toHaveProperty('complaints');
  });

  it('Should be able to list Districts without auth', async () => {
    httpResponse = await httpRequest(app).get('/api/districts');
    expect(httpResponse.status).toEqual(200);
    expect(httpResponse.body).toBeInstanceOf(Array);
  });
});
