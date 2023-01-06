const db = require('../connection');

const getUsersTask = (userId) => {
  return db.query(`
  SELECT * FROM tasks
  WHERE user_id = $1`, [userId])
    .then(data => data.rows)
    .catch(err => console.error(this, 'query failed', err.stack));
};

const addTask = (userId, category, taskName) => {
  return db.query(`
  INSERT INTO tasks (user_id, category, task_name)
  VALUES ($1, $2, $3) RETURNING *`, [userId, category, taskName])
    .then(data => data.rows[0])
    .catch(err => console.error(this, 'query failed', err.stack));
};
  
const getTask = () => {
  
}

const editTask = () => {
  
}

const deleteTask = () => {
  
}

module.exports = { getUsersTask, addTask, getTask, editTask, deleteTask };