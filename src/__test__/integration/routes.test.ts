import httpRequest from 'supertest';
import db from '@shared/infra/typeorm/';
import 'reflect-metadata';

import app from '@shared/infra/http/app';

describe('Routes integration test', () => {
  beforeAll(async () => {
    await db.create();
  });

  it('Should responde with status 404 if resource is not found', async () => {
    const httpResponse = await httpRequest(app).get('/api/users');
    expect(httpResponse.status).toEqual(404);
  });
});
