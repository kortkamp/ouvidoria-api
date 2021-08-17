import httpRequest from 'supertest';
import db from '@shared/infra/typeorm/';
import 'reflect-metadata';

import app from '@shared/infra/http/app';

describe('Districts integration test', () => {
  const createUserRequest = {
    name: 'John',
    email: 'john@email.com',
    admin: true,
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
    bearerToken = httpResponse.body.token;

    httpResponse = await httpRequest(app).post('/api/districts').send({
      name: 'central park',
    }).auth(bearerToken, { type: 'bearer' });
    districtId = httpResponse.body.id;
  });

  afterAll(async () => {
    await db.clear();
  });

  it('Should be able to create a Complaint', async () => {
    const complaintCreateRequest = {
      district_id: districtId,
      message: 'some random complaint',
    };
    httpResponse = await httpRequest(app)
      .post('/api/complaints')
      .send(complaintCreateRequest)
      .auth(bearerToken, { type: 'bearer' });

    expect(httpResponse.status).toEqual(200);
    expect(httpResponse.body).toMatchObject(complaintCreateRequest);
  });
  it('Should be able to list Complaints', async () => {
    httpResponse = await httpRequest(app)
      .get('/api/complaints')
      .auth(bearerToken, { type: 'bearer' });

    expect(httpResponse.status).toEqual(200);
    expect(httpResponse.body).toBeInstanceOf(Array);
    expect(httpResponse.body).toHaveLength(1);
  });
});
