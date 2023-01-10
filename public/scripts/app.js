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
      console.log(task)
      if (task.category === "To watch") {
        // Add new task to the To watch card
        $("#to-watch-list").prepend(createTaskElement(task.task_name, task.id));

        // Increase the counter by 1
        let $watchCount = Number($("#watch-count").text());
        $watchCount += 1;
        console.log($watchCount)
        $("#watch-count").text($watchCount);

      } else if (task.category === "To read") {
        $("#to-read-list").prepend(createTaskElement(task.task_name, task.id));
        let $readCount = Number($("#read-count").text());
        $readCount += 1;
        console.log($readCount)
        $("#read-count").text($readCount);

      } else if (task.category === "To eat") {
        $("#to-eat-list").prepend(createTaskElement(task.task_name, task.id));
        let $eatCount = Number($("#eat-count").text());
        $eatCount += 1;
        console.log($eatCount)
        $("#eat-count").text($eatCount);

      } else if (task.category === "To buy") {
        $("#to-buy-list").prepend(createTaskElement(task.task_name, task.id));
        let $buyCount = Number($("#buy-count").text());
        $buyCount += 1;
        console.log($buyCount)
        $("#buy-count").text($buyCount);
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
