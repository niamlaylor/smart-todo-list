// Client facing scripts here

// This function prevents malicious entries in the task textarea
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTaskElement = (taskName) => {
  const safeHTML = `${escape(taskName)}`;
  const $task = `<li class="list-group-item">${safeHTML}</li>`;
  return $task;
};

const getContainerName = (category) => {
  if (category === 'To watch') {
    return 'to-watch-list';
  } else if (category === 'To read') {
    return 'to-read-list';
  } else if (category === 'To eat') {
    return 'to-eat-list';
  } else if (category === 'To buy') {
    return 'to-buy-list';
  };
};

const renderTasks = function(tasks) {
  for (const task of tasks) {
    const jqueryContainer = '#' + getContainerName(task.category);
    $(`${jqueryContainer}`).prepend(createTaskElement(task.task_name));
  }
};

// {
//   id: 1,
//   user_id: 1,
//   task_name: "Pocahontas",
//   category: "To watch",
//   due_date: "2023-01-05T08:00:00.000Z",
//   date_created: "2023-01-01T08:00:00.000Z",
//   priority: false,
//   is_active: true
//   }

$(document).ready(function() {
  $('#new-task-form').submit(function(event) {
    event.preventDefault();
    const taskData = $(this).serialize();

    $.post('/tasks', taskData)
    .then(() => {
      $.get('/api/tasks', (data, status) => {
        renderTasks([data[data.length - 1]]);
      })
    });
  });

  const loadTasks = function() {
    $.get('/api/tasks', function(data, status) {
      for (const task of data.tasks) {
        if (task.category === 'To watch') {
          $('#to-watch-list').prepend(createTaskElement(task.task_name));
        } else if (task.category === 'To read') {
          $('#to-read-list').prepend(createTaskElement(task.task_name));
        } else if (task.category === 'To eat') {
          $('#to-eat-list').prepend(createTaskElement(task.task_name));
        } else if (task.category === 'To buy') {
          $('#to-buy-list').prepend(createTaskElement(task.task_name));
        };
      };
    });
  };
  loadTasks();
});
