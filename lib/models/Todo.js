const pool = require('../utils/pool');

module.exports = class Todo {
  id;
  title;
  description;
  createdOn;

  constructor({ id, title, description, created_on }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdOn = created_on;
  }

  static async insert({ title, description }) {
    const { rows } = await pool.query(`
    INSERT INTO todos (title, description, created_on)
    VALUES ($1, $2, $3)
    RETURNING *
    `, 
    [title, description, new Date]
    );

    return new Todo(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
    SELECT * FROM todos
    `);

    return rows.map(row => new Todo(row));
  }

  
};
