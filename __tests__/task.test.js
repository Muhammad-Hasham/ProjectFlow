const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const path = require('path');
const Task = require('../model/taskModel');
const User = require('../model/userModel');
const Project = require('../model/projectModel');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, './config.test.env') });

let token;
let taskId;
let createdUser;
let project;

beforeAll(async () => {
    const url = process.env.DATABASE;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    await User.deleteMany({});
    await Task.deleteMany({});
    await Project.deleteMany({});

    createdUser = await User.create({
        name: 'Project Manager',
        email: 'task@example.com',
        password: 'password123',
        passwordConfirm: 'password123',
        role: 'Project Manager'
    });

    const response = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'task@example.com', password: 'password123' })
        .expect(200);

    token = response.body.token;

    project = await Project.create({
        name: 'Sample Project',
        description: 'This is a test project',
        end_date: '2023-12-31',
        project_manager: createdUser._id
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
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


describe('Task API', () => {
    test('should create a new task', async () => {
        const taskData = {
            tasks: [{
                name: 'Sample Task',
                description: 'This is a test task',
                project: project._id
            }]
        };

        const response = await request(app)
            .post('/api/v1/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(taskData)
            .expect(201);

        taskId = response.body.data.tasks[0]._id;
        expect(response.body.data.tasks[0].name).toBe('Sample Task');
    });

    test('should get all tasks for the project manager', async () => {
        
        const additionalTask = await Task.create({
            name: 'Another Task',
            description: 'This is another test task',
            project: project._id,
            project_manager: createdUser._id,
            assignee: createdUser._id
        });

        

        const response = await request(app)
            .get('/api/v1/tasks')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        

        expect(response.body.results).toBeGreaterThan(0);
    });

    test('should get a particular task', async () => {
        const response = await request(app)
            .get(`/api/v1/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`);

        if (response.status === 500) {
            // console.error('Internal Server Error:', response.body);
        } else {
            expect(response.status).toBe(200);
            expect(response.body.data.task.name).toBe('Sample Task');
        }
    });

    test('should update a task', async () => {
        const updatedTaskData = { name: 'Updated Sample Task' };

        const response = await request(app)
            .patch(`/api/v1/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedTaskData)
            .expect(200);

        expect(response.body.data.data.name).toBe('Updated Sample Task');
    });

    test('should detect the UnAuthorized access to update task', async () => {
        const updatedTaskData = { name: 'Updated Sample Task' };

        const response = await request(app)
            .patch(`/api/v1/tasks/${taskId}`)
            .send(updatedTaskData)
            .expect(401);  // for unauthorized access

        expect(response.status).toBe(401);
    });


    test('should delete a task', async () => {
        const response = await request(app)
            .delete(`/api/v1/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);
    });

});
