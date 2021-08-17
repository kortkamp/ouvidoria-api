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
  let complaintId:string;
  let answerId:string;

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

    httpResponse = await httpRequest(app).post('/api/districts').send({
      name: 'central park',
    }).auth(adminBearerToken, { type: 'bearer' });
    districtId = httpResponse.body.id;

    httpResponse = await httpRequest(app)
      .post('/api/complaints')
      .send({
        district_id: districtId,
        message: 'some random complaint',
      })
      .auth(userBearerToken, { type: 'bearer' });

    complaintId = httpResponse.body.id;
  });

  afterAll(async () => {
    await db.clear();
  });

  it('Should not allow non admin users create Answers', async () => {
    const answerCreateRequest = {
      complaint_id: complaintId,
      message: 'some random answer',
    };
    httpResponse = await httpRequest(app)
      .post('/api/answers')
      .send(answerCreateRequest)
      .auth(userBearerToken, { type: 'bearer' });

    answerId = httpResponse.body.id;
    expect(httpResponse.status).toEqual(401);
  });

  it('Should be able to create an Answer', async () => {
    const answerCreateRequest = {
      complaint_id: complaintId,
      message: 'some random answer',
    };
    httpResponse = await httpRequest(app)
      .post('/api/answers')
      .send(answerCreateRequest)
      .auth(adminBearerToken, { type: 'bearer' });

    answerId = httpResponse.body.id;
    expect(httpResponse.status).toEqual(200);
    expect(httpResponse.body).toMatchObject(answerCreateRequest);
  });

  it('Should return 404 erro when try to delete an inexistent Answer', async () => {
    httpResponse = await httpRequest(app)
      .delete('/api/answers/__unexistent_answer_id__')
      .auth(adminBearerToken, { type: 'bearer' });

    expect(httpResponse.status).toEqual(404);
  });

  it('Should be able to delete an Answer', async () => {
    httpResponse = await httpRequest(app)
      .delete(`/api/answers/${answerId}`)
      .auth(adminBearerToken, { type: 'bearer' });

    expect(httpResponse.status).toEqual(200);
  });

  it('Should not allow non admin users delete Answers', async () => {
    httpResponse = await httpRequest(app)
      .delete(`/api/answers/${answerId}`)
      .auth(userBearerToken, { type: 'bearer' });

    expect(httpResponse.status).toEqual(401);
  });
});
