const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const path = require('path');
const Project = require('../model/projectModel');
const User = require('../model/userModel');
const dotenv = require('dotenv');

// Load the test environment variables
dotenv.config({ path: path.resolve(__dirname, './config.test.env') });

let token;
let projectId;
let createdUser;

beforeAll(async () => {
    const url = process.env.DATABASE;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    await User.deleteMany({});
    await Project.deleteMany({});

    createdUser = await User.create({
        name: 'Project Manager',
        email: 'pm@example.com',
        password: 'password123',
        passwordConfirm: 'password123',
        role: 'Project Manager'
    });

    

    const response = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'pm@example.com', password: 'password123' })
        .expect(200);

    token = response.body.token;
    
});

afterAll(async () => {
    await User.deleteMany({});
    await Project.deleteMany({});
    await mongoose.connection.close();
});

describe('User Creation and Login', () => {
    test('should create a new user', async () => {
        expect(createdUser).toBeDefined();
    });

    test('should log in the user and provide a token', async () => {
        expect(token).toBeDefined();
    });
});

describe('Project API', () => {


    test('should create a new project', async () => {
        const projectData = {
            name: 'Sample Project',
            description: 'This is a test project',
            end_date: '2023-12-31',
            project_manager: createdUser._id, // Ensure the project manager is set
            member: ['adil@gmail.com']
        };

        const response = await request(app)
            .post('/api/v1/projects')
            .set('Authorization', `Bearer ${token}`)
            .send(projectData)
            .expect(201); // Ensure we get a 201 status code


        expect(response.body.data.data.name).toBe('Sample Project');
        projectId = response.body.data.data._id;
    });
    

    test('should get a particular project', async () => {
        const response = await request(app)
            .get(`/api/v1/projects/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200); // Ensure we get a 200 status code

      

        expect(response.body.data.project.name).toBe('Sample Project');
    });

    test('should update a project', async () => {
        const updatedProjectData = {
            name: 'Updated Sample Project'
        };

        const response = await request(app)
            .patch(`/api/v1/projects/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedProjectData)
            .expect(200); // Ensure we get a 200 status code

        

        expect(response.body.data.data.name).toBe('Updated Sample Project');
    });


    test('should detect the UnAuthorized access to update project', async () => {
        const updatedProjectData = {
            name: 'Updated Sample Project'
        };

        const response = await request(app)
            .patch(`/api/v1/projects/${projectId}`)
            .send(updatedProjectData)
            .expect(401); // Ensure we get a 401 , which is unauthorized access

        expect(response.status).toBe(401);
    });


    test('should delete a project', async () => {
        const response = await request(app)
            .delete(`/api/v1/projects/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204); // Ensure we get a 204 status code

        
    });

});
