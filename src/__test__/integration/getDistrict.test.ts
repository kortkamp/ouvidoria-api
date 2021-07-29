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

  beforeAll(async () => {
    await db.create();
    await db.clear();
    await httpRequest(app).post('/api/users').send(createAdminRequest);
    await httpRequest(app).post('/api/users').send(createUserRequest);

    // login users
    httpResponse = await httpRequest(app).post('/api/login').send({
      email: createUserRequest.email,
      password: createUserRequest.password,
    });
    userBearerToken = httpResponse.body;

    httpResponse = await httpRequest(app).post('/api/login').send({
      email: createAdminRequest.email,
      password: createAdminRequest.password,
    });
    adminBearerToken = httpResponse.body;

    // create a district
    httpResponse = await httpRequest(app).post('/api/districts').send({
      name: 'central park',
    }).auth(adminBearerToken, { type: 'bearer' });
    districtId = httpResponse.body.id;

    // create a complaint
    httpResponse = await httpRequest(app)
      .post('/api/complaints')
      .send({
        district_id: districtId,
        message: 'some random complaint',
      })
      .auth(userBearerToken, { type: 'bearer' });

    complaintId = httpResponse.body.id;

    // create an answer
    httpResponse = await httpRequest(app)
      .post('/api/answers')
      .send({
        complaint_id: complaintId,
        message: 'some asnwer',
      })
      .auth(adminBearerToken, { type: 'bearer' });

    // create another complaint
    httpResponse = await httpRequest(app)
      .post('/api/complaints')
      .send({
        district_id: districtId,
        message: 'some random complaint',
      })
      .auth(userBearerToken, { type: 'bearer' });

    complaintId = httpResponse.body.id;

    // create another answer
    httpResponse = await httpRequest(app)
      .post('/api/answers')
      .send({
        complaint_id: complaintId,
        message: 'some asnwer',
      })
      .auth(adminBearerToken, { type: 'bearer' });
  });

  afterAll(async () => {
    await db.clear();
  });

  it('getDistrict response must have the correct number of complaints', async () => {
    httpResponse = await httpRequest(app)
      .get(`/api/districts/${districtId}`)
      .auth(adminBearerToken, { type: 'bearer' });

    // 1console.log(httpResponse.body);
    const { complaints } = httpResponse.body;

    expect(complaints).toBeInstanceOf(Array);
    expect(complaints.length).toEqual(2);
  });

  it('Each complaint in getDistrict must have the correct number of answers', async () => {
    httpResponse = await httpRequest(app)
      .get(`/api/districts/${districtId}`)
      .auth(adminBearerToken, { type: 'bearer' });

    // 1console.log(httpResponse.body);
    const { complaints } = httpResponse.body;

    let answer1;
    let answer2;
    if (complaints.length === 2) {
      answer1 = complaints[0].answers;
      answer2 = complaints[1].answers;
    }

    expect(answer1).toBeInstanceOf(Array);
    expect(answer1.length).toEqual(1);
    expect(answer2).toBeInstanceOf(Array);
    expect(answer2.length).toEqual(1);
  });
});
