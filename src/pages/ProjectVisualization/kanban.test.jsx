// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: { projects: [] } }), // Adjust the response as needed
    })
  );

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import KanbanComponent from './kanban';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

// Mock react-router-dom useNavigate and useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => ({ projectId: '123' }),
}));

// Mock localStorage
const localStorageMock = (function () {
  let store = {
    token: 'test-token',
    role: 'Project Manager',
    userid: 'user-id'
  };

  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('KanbanComponent', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('renders without crashing', async () => {
    mockAxios.onGet('http://127.0.0.1:3000/api/v1/projects/123').reply(200, {
      data: {
        project: {
          tasks: [],
          Members: []
        }
      }
    });

    render(
      <Router>
        <KanbanComponent />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('TODO')).toBeInTheDocument();
      expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
      expect(screen.getByText('COMPLETED')).toBeInTheDocument();
    });
  });
}); 
