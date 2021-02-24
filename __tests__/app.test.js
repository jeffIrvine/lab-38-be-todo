const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

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
});
