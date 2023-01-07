const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserById = (id) => {
  // Should we sanitize the input to prevent SQL injection?

  return db.query(`
  SELECT * FROM users 
  WHERE id = $1`, [id])
    .then(data => {
      return data.rows;
    });
};

const getUserByEmail = (id) => {
  return db.query(`
  SELECT * FROM users 
  WHERE email = $1`, [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, getUserById, getUserByEmail };
