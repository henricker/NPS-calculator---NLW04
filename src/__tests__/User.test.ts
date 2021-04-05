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


  it("should be able to create a new user", async () => {
    const response = await request(app).post('/users').send({
      name: "user",
      email: "user@example.com",
    });
    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("created_at");

    expect(response.body.name).toBe("user");
    expect(response.body.email).toBe("user@example.com");
  });
  
  it("should not be able to create a new user with exists email", async () => {
    const response = await request(app).post('/users').send({
      name: "user",
      email: "user@example.com",
    });
    expect(response.status).toBe(400);
    
  });
})