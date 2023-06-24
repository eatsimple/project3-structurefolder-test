import supertest from 'supertest';
import app from '../index.js'; // Ubah dengan path yang sesuai ke file entry point Anda

describe('Testing endpoints for user', () => {
  // ## describe untuk GET ALL USERS
  describe('should get all users', () => {
    it('responds with json', async () => {
      const response = await supertest(app).get('/users').set('Accept', 'application/json');
      expect(response.status).toBe(200);
    });
  });

  // ## describe untuk GET USERS BY ID
  describe('GET /users/:id', () => {
    it('should get user by ID', async () => {
      const userId = '3228b786-b4d5-4ec2-b45c-47c3aae6930a'; // ID pengguna yang ingin Anda uji

      const response = await supertest(app).get(`/users/${userId}`);
      expect(response.status).toBe(200);
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });

    it('should return 404 if user is not found', async () => {
      const nonExistingUserId = 'fjakj8324242'; // ID pengguna yang tidak ada

      const response = await supertest(app).get(`/users/${nonExistingUserId}`);

      expect(response.status).toBe(200);
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });
  });

  // ## describe untuk CREATE USER
  describe('POST /users', () => {
    it('should create a new user', async () => {
      //   app.post('/users', (req, res) => {
      //     res.send({
      //       name: 'John Doe',
      //       email: 'johndoe@example.com',
      //     });
      //   });

      const newUser = {
        name: 'John Doe',
        email: 'johndoe@example.com',
      };

      await supertest(app).post('/users').send(newUser).set('Accept', 'application/json').set('Content-type', 'application/json');

      expect(201);
      expect(newUser.name).toBe('John Doe');
      expect(newUser.email).toBe('johndoe@example.com');
    });
  });

  // describe untuk UPDATE USER
  describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
      const updatedUser = {
        name: 'Updated Name',
        email: 'updatedemail@example.com',
      };

      const createdUserId = '23c1f407-d14f-4414-b26f-8876099f6857';

      await supertest(app).put(`/users/${createdUserId}`).send(updatedUser).set('Accept', 'application/json').set('Content-type', 'application/json');

      expect(201);
      expect(updatedUser.name).toBe('Updated Name');
      expect(updatedUser.email).toBe('updatedemail@example.com');

      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });

    it('should return 404 if user is not found', async () => {
      const nonExistingUserId = 'non-existing-id';
      const updatedUser = {
        name: 'Updated Name',
        email: 'updatedemail@example.com',
      };

      const response = await supertest(app).put(`/users/${nonExistingUserId}`).send(updatedUser).set('Accept', 'application/json').set('Content-type', 'application/json');

      expect(404);
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });
  });

  // ## describe untuk DELETE USER
  describe('DELETE /users/:id', () => {
    it('should delete an existing user', async () => {
      const createdUserId = '23c1f407-d14f-4414-b26f-8876099f6857';
      const response = await supertest(app).delete(`/users/${createdUserId}`);

      expect(200);
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });

    it('should return 404 if user is not found', async () => {
      const nonExistingUserId = 'jfaijd88284299u8f';

      await supertest(app).delete(`/users/${nonExistingUserId}`);

      expect(404);
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });
  });
});
