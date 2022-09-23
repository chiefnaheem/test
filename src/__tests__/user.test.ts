import supertest from 'supertest';
import app from '../app';

describe('Auth', () => {
  const userData = {
    name: 'Tolu',
    occupation: 'farming',
    email: 'tolz@yahoo.com',
    password: 'testing',
  };

  test('registers', async () => {
    const response = await supertest(app).post('api/v1/user/register').send(userData);
    expect(response.status).toBe(201);
  });

  test("login", async () => {
    const response = await supertest(app)
      .post("api/v1/user/login")
      .send({ email: userData.email, password: userData.password });

    expect(response.status).toBe(200);
  });
});
