const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Todo = require('../lib/models/Todo');

describe('lab-38-be-todo routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a todo with post', async() => {
    const res = await request(app)
      .post('/api/v1/todos')
      .send({
        title: 'Something Cheeky',
        description: 'Something descriptive'
      });

    expect(res.body).toEqual({
      id: '1',
      title: 'Something Cheeky',
      description: 'Something descriptive',
      createdOn: expect.any(String) 
    });

  });

  it('gets all todos with GET', async() => {
    await Promise.all([
      {
        title: 'test1',
        description: 'test1'
      },
      {
        title: 'test2',
        description: 'test2'
      },
      {
        title: 'test3',
        description: 'test3'
      }
    ].map(todo => Todo.insert(todo)));

    const res = await request(app)
      .get('/api/v1/todos');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'test1',
        description: 'test1',
        createdOn: expect.any(String)
      },
      {
        id: expect.any(String),
        title: 'test2',
        description: 'test2',
        createdOn: expect.any(String)
      },
      {
        id: expect.any(String),
        title: 'test3',
        description: 'test3',
        createdOn: expect.any(String)
      },
    ]);
  });
});
