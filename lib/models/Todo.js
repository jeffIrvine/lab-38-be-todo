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

  static async insert({ id, title, description, created_on }) {
    const { rows } = await pool.query(`
    INSERT INTO todos (id, title, description, created_on)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, 
    [id, title, description, createdOn]
    );

    return new Todo(rows[0]);
  }
}