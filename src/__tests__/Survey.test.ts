import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new survey", async () => {
    const response = await request(app).post('/surveys').send({
      title: "Title exemple",
      description: "Description exemple",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("created_at");
  });

  it("should be able to get all surveys", async () => {
    await request(app).post('/surveys').send({
      title: "Title exemple2",
      description: "Description exemple2",
    });

    const response = await request(app).get('/surveys')

    expect(response.body.length).toBe(2);
  });
})