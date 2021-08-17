import httpRequest from 'supertest';
import db from '@shared/infra/typeorm/';
import 'reflect-metadata';

import app from '@shared/infra/http/app';

describe('Districts integration test', () => {
  const createAdminRequest = {
    name: 'Admin',
    email: 'admin@email.com',
    admin: true,
    password: '123456',
  };
  const createUserRequest = {
    name: 'User',
    email: 'user@email.com',
    admin: false,
    password: '123456',
  };

  let adminBearerToken:string;
  let userBearerToken:string;

  let httpResponse;
  let districtId:string;

  beforeAll(async () => {
    await db.create();
    await db.clear();

    await httpRequest(app).post('/api/users').send(createAdminRequest);
    await httpRequest(app).post('/api/users').send(createUserRequest);

    httpResponse = await httpRequest(app).post('/api/login').send({
      email: createUserRequest.email,
      password: createUserRequest.password,
    });
    userBearerToken = httpResponse.body.token;

    httpResponse = await httpRequest(app).post('/api/login').send({
      email: createAdminRequest.email,
      password: createAdminRequest.password,
    });
    adminBearerToken = httpResponse.body.token;
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

  it('Should not allow non admin to create Districts', async () => {
    httpResponse = await httpRequest(app).post('/api/districts').send({
      name: 'central park',
    }).auth(userBearerToken, { type: 'bearer' });
    districtId = httpResponse.body.id;
    expect(httpResponse.status).toEqual(401);
  });

  it('Should be able to create a District', async () => {
    httpResponse = await httpRequest(app).post('/api/districts').send({
      name: 'central park',
    }).auth(adminBearerToken, { type: 'bearer' });
    districtId = httpResponse.body.id;
    expect(httpResponse.status).toEqual(200);
    expect(httpResponse.body).toHaveProperty('name', 'central park');
  });

  it('Should be able to show a District without auth', async () => {
    httpResponse = await httpRequest(app).get(`/api/districts/${districtId}`);
    expect(httpResponse.status).toEqual(200);
    expect(httpResponse.body).toHaveProperty('id', districtId);
    expect(httpResponse.body).toHaveProperty('name');
    expect(httpResponse.body).toHaveProperty('complaints');
  });

  it('Should return 404 when getting an inexistent District', async () => {
    httpResponse = await httpRequest(app).get('/api/districts/__inexistent_district_id__');
    expect(httpResponse.status).toEqual(404);
  });

  it('Should be able to list Districts without auth', async () => {
    httpResponse = await httpRequest(app).get('/api/districts');
    expect(httpResponse.status).toEqual(200);
    expect(httpResponse.body).toBeInstanceOf(Array);
  });
});
