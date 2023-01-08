// Client facing scripts here
const { getTask } = require('../../db/queries/tasks_queries');

// This function prevents malicious entries in the task textarea
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTaskElement = (taskName) => {
  const safeHTML = `<p>${escape(taskName)}</p>`;
  const $task = `<li class="list-group-item">${safeHTML}</li>`;
  return $task;
};

$(document).ready(function() {
});
