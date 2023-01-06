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
  
const getTask = (taskId) => {
  return db.query(`
  SELECT * FROM tasks
  WHERE id = $1`, [taskId])
    .then(data => data.rows)
    .catch(err => console.error(this, 'query failed', err.stack));
};

const editTask = (params) => {
  let text = (`UPDATE items SET `);
  let values = [];

  if (params.task_name) {
    values.push(params.name);
    text += `task_name = $${values.length} `;
  }

  if (params.category) {
    values.push(params.category);
    text += `category = $${values.length} `;
  }

  if (params.due_date) {
    values.push(params.due_date);
    text += `due_date = $${values.length} `;
  }

  if (params.date_created) {
    values.push(params.date_created);
    text += `date_created = $${values.length} `;
  }

  if (params.priority) {
    values.push(params.priority);
    text += `priority = $${values.length} `;
  }

  if (params.is_active) {
    values.push(params.is_active);
    text += `is_active = $${values.length} `;
  }

  values.push(params.userId, params.taskId);
  text += `WHERE user_id = $${values.length - 1} AND id = $${values.length} RETURNING *`;

  return db.query(text, values)
    .then(data => data.rows[0])
    .catch(err => console.error(this, 'query failed', err.stack));
};

const deleteTask = (userId, taskId) => {
  return db.query(`
  DELETE FROM tasks
  WHERE user_id = $1 AND id = $2 RETURNING *`, [userId, taskId])
    .then(data => 'deleted')
    .catch(err => console.error(this, 'query failed', err.stack));
};

module.exports = { getUsersTask, addTask, getTask, editTask, deleteTask };