// elements

const formElement = document.querySelector(".form");
const editTaskModal = document.querySelector(".edit-task-container");
const errorMsgElement = document.querySelector(".error-msg");
const tasksListElement = document.querySelector(".tasksList");
const editTaskElement = document.querySelector(".edit-task-container");

const tasks = [];

const errorMsg = function (message) {
  errorMsgElement.textContent = message;
  errorMsgElement.style.top = 0;
  let timeoutId = null;
  clearTimeout(timeoutId);
  setTimeout(function () {
    errorMsgElement.style.top = "-100%";
    errorMsgElement.textContent = "";
  }, 5000);
};

const displayTasks = function () {
  let markup = "";
  tasks.forEach(
    (task, index) =>
      (markup += `<li>
    <div class="task">${task.task}</div>
    <div class="control-actions">
    <button class="edit-task" onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete-task" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
    </div>
    </li>`)
  );
  tasksListElement.innerHTML = markup;
};

function deleteTask(id) {
  const isDelete = confirm("Are you sure!");
  if (!isDelete) return;

  tasks.splice(id, 1);
  displayTasks();
}

function closeModal() {
  editTaskElement.style.top = "-100%";
}

function editTask(id) {
  editTaskElement.style.top = 0;

  editTaskElement.innerHTML = `
  <div class="close-modal" onclick="closeModal()">&times;</div>
  <h1>Edit Task: ${id}</h1>
        <form class="edit-form">
          <div class="form-group">
            <input type="text" value="${tasks[id].task}" />
            <button>Edit Task</button>
          </div>
        </form>`;

  const form = editTaskElement.querySelector(".edit-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputField = event.target.querySelector("input");
    if (inputField.value == "") return;
    tasks[id].task = inputField.value;
    tasks[id].date = new Date().toISOString();
    displayTasks();
    editTaskElement.style.top = "-100%";
  });
}

const AddTask = function (event) {
  event.preventDefault();
  const inputField = event.target.querySelector("input");
  if (inputField.value === "") {
    errorMsg("Field is empty!, please enter a task");
    return;
  }

  tasks.unshift({ task: inputField.value, date: new Date().toISOString() });
  displayTasks();
  return (inputField.value = "");
};

formElement.addEventListener("submit", AddTask);
