-- Drop and recreate Tasks table (Example)

DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  task_name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  due_date DATE,
  date_created DATE,
  priority BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);
