-- Drop and recreate Tasks table (Example)

DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL
  category VARCHAR(50) NOT NULL
  title VARCHAR(255) NOT NULL
  due_date DATE NOT NULL
  date_created DATE NOT NULL
  priority BOOLEAN NOT NULL
  is_active BOOLEAN NOT NULL
);
