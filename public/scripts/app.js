// Client facing scripts here

// This function prevents malicious entries in the task textarea
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTaskElement = (taskName, task_id) => {
  const safeHTML = `${escape(taskName)}`;
  const $task = `<li class="list-group-item"><a href="/tasks/${task_id}" class="card-link">${safeHTML}</a></li>`;
  return $task;
};

$(document).ready(function () {
  $("#new-task-form").submit(function (event) {
    event.preventDefault();
    const taskData = $(this).serialize();

    $.post("/tasks", taskData).then((task) => {
      if (task.category === "To watch") {
        $("#to-watch-list").prepend(createTaskElement(task.task_name, task.id));
      } else if (task.category === "To read") {
        $("#to-read-list").prepend(createTaskElement(task.task_name, task.id));
      } else if (task.category === "To eat") {
        $("#to-eat-list").prepend(createTaskElement(task.task_name, task.id));
      } else if (task.category === "To buy") {
        $("#to-buy-list").prepend(createTaskElement(task.task_name, task.id));
      }
    });
  });

  const loadTasks = function () {
    $.get("/api/tasks", function (data, status) {
      for (const task of data.tasks) {
        if (task.category === "To watch") {
          $("#to-watch-list").prepend(
            createTaskElement(task.task_name, task.id)
          );
        } else if (task.category === "To read") {
          $("#to-read-list").prepend(
            createTaskElement(task.task_name, task.id)
          );
        } else if (task.category === "To eat") {
          $("#to-eat-list").prepend(createTaskElement(task.task_name, task.id));
        } else if (task.category === "To buy") {
          $("#to-buy-list").prepend(createTaskElement(task.task_name, task.id));
        }
      }
    });
  };
  loadTasks();
});
