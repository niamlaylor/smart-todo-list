const db = require('../connection');

const getUsersTask = (userId) => {
  return db.query(`
  SELECT * FROM tasks
  WHERE user_id = $1`, [userId])
    .then(data => {
      return data.rows;
    });
};

const addTask = (params) => {
  let text = (`
  INSERT INTO tasks (user_id, task_name, category, due_date, date_created, priority, is_active)
  VALUES(`);
  let values = [];

  const fields = ["user_id", "task_name", "category", "due_date", "date_created", "priority", "is_active"];

  fields.map((val, index) => {
    values.push(params[val]);
    if (index < fields.length - 1) text += `$${values.length}, `;
    else text += `$${values.length})`;
  });

  return db.query(text, values)
    .then(data => 'added');
};
  
const getTask = (taskId) => {
  return db.query(`
  SELECT * FROM tasks
  WHERE id = $1`, [taskId])
    .then(data => {
      if (data.rows.length > 0) return data.rows[0];
      return null;
    });
};

const editTask = (params) => {
  let text = (`UPDATE tasks SET `);
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
    .then(data => data.rows[0]);
};

const deleteTask = (userId, taskId) => {
  return db.query(`
  DELETE FROM tasks
  WHERE user_id = $1 AND id = $2 RETURNING *`, [userId, taskId])
    .then(data => data.rows);
};

module.exports = { getUsersTask, addTask, getTask, editTask, deleteTask };