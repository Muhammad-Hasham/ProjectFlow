const request = require('supertest');
const mongoose = require('mongoose');
const path = require('path');
const app = require('../app');
const User = require('../model/userModel');
const dotenv = require('dotenv');

// Load the test environment variables
dotenv.config({ path: path.resolve(__dirname, './config.test.env') });

let token;
let userId;

beforeAll(async () => {
    const url = process.env.DATABASE;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    await User.deleteMany({});

    const userResponse = await request(app)
        .post('/api/v1/users/signup')
        .send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            passwordConfirm: 'password123',
            role:'Project Manager'
        })
        .expect(201);

    token = userResponse.body.token;
    userId = userResponse.body.data.user._id;
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('User API', () => {

    test('should return error if password or passwordConfirm is included in updateMe request', async () => {
        
        const invalidUpdate = {
            name: 'Invalid User',
            email: 'invalid@example.com',
            password:'newpassword',
            passwordConfirm:"newpassword"
        };
    
        const response = await request(app)
            .patch('/api/v1/users/updateMe')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidUpdate)
            .expect(400);
        expect(response.status).toBe(400);
        
    });

    test('should update user profile using updateMe route', async () => {
        const updatedProfile = {
            name: 'Updated Test User',
            email: 'updated@example.com'
        };

        const response = await request(app)
            .patch('/api/v1/users/updateMe')
            .set('Authorization', `Bearer ${token}`)
            .send(updatedProfile)
            .expect(200);

        expect(response.body.status).toBe('success');
        expect(response.body.data.user.name).toBe('Updated Test User');
        expect(response.body.data.user.email).toBe('updated@example.com');
    });


    test('should update user password using updateMyPassword route', async () => {
        const newPassword = {
            passwordCurrent: 'password123',
            password: 'newpassword123',
            passwordConfirm: 'newpassword123'
        };

        const response = await request(app)
            .patch('/api/v1/users/updateMyPassword')
            .set('Authorization', `Bearer ${token}`)
            .send(newPassword)
            .expect(200);

        expect(response.body.status).toBe('success');
        
        // Log in with new password to confirm the update
        const loginResponse = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: 'updated@example.com',
                password: 'newpassword123'
            })
            .expect(200);

        expect(loginResponse.body.status).toBe('success');
        expect(loginResponse.body.token).toBeDefined();
    });    
    

    test('should detect the UnAuthorized access to update user', async () => {
        const unAuthUpdate = {
            name: 'Updated Test User',
            email: 'updated@example.com'
        };

        const response = await request(app)
            .patch('/api/v1/users/updateMe')
            .send(unAuthUpdate)
            .expect(401);  // for unauthorized access

        expect(response.status).toBe(401);
    });

});
