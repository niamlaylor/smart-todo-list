// Client facing scripts here

// This function prevents malicious entries in the task textarea
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTaskElement = (taskName, task_id) => {
  const safeHTML = `${escape(taskName)}`;
  const $task = `<li class="list-group-item"><a href="/tasks/${task_id}" class="card-link">${safeHTML} <i class="fa-solid fa-pencil float-right"></i></a></li>`;
  return $task;
};

$(document).ready(function () {
  $("#new-task-form").submit(function (event) {
    event.preventDefault();
    const taskData = $(this).serialize();

    $.post("/tasks", taskData).then((task) => {
      console.log(task);
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

  $("#edit-user").submit(function (event) {
    console.log("submit event activated");
    event.preventDefault();

    const formText = $(this).serialize();
    $.post("/users/update-user", formText)
      .then((data) => {
        if (!data) {
          console.log("Error, post request successful but no values to edit");
        } else {
          if (data.email.length > 3) {
            $("#userEmailDisplay").text(data.email);
<<<<<<< Updated upstream
=======
            $("#edit-user").trigger("reset");
          } else {
            $("#edit-user").trigger("reset");
>>>>>>> Stashed changes
          }
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
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
