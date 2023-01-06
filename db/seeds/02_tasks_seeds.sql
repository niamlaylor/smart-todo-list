-- Tasks table seeds here (Example)
-- TODO: Drop records before seeding


INSERT INTO tasks (id, user_id, task_name, category, due_date, date_created, priority, is_active) 
VALUES (1, 1, 'Pocahontas', 'To watch', NOW(), DATE '2023-01-01', false, true),
       (2, 2, 'Harry Potter', 'To read', NOW(), DATE '2023-01-07', true, true);