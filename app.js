<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task List</title>
  <style>
    .task {
      display: flex;
      align-items: center;
      margin: .5rem 0;
    }
    .task input {
      flex: 1;
      margin-right: .5rem;
    }
    .task button {
      margin-left: .5rem;
    }
    .err {
      display: none;
      color: red;    
    }
  </style>
</head>
<body>
  <div>
    <input type="text" id="task-input" placeholder="Add a new task">
    <button class="add-btn">Add Task</button>
  </div>
  <div class="err">Please enter a task!</div>
  <ul class="task-items"></ul>
  <button class="clear-tasks">Clear All Tasks</button>
  <input type="text" id="search" placeholder="Search tasks...">

  <script>
    const taskInput = document.getElementById("task-input");
    const addBtn = document.querySelector(".add-btn");
    const taskList = document.querySelector(".task-items");
    const clearAll = document.querySelector(".clear-tasks");
    const searchInput = document.querySelector("#search");

    const showErrorMessage = (message) => {
      const err = document.querySelector(".err");
      err.textContent = message;
      err.style.display = "block";
      setTimeout(() => err.style.display = "none", 2000);
    };

    const addTask = () => {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        showErrorMessage("Please enter a task!");
        return;
      }

      const newLi = document.createElement("li");
      newLi.className = "task";

      const task = document.createElement("input");
      task.type = "text";
      task.className = "taskDisabled";
      task.value = taskText;
      task.disabled = true;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerText = "Delete";

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.innerText = "Edit";

      newLi.append(task, deleteBtn, editBtn);
      taskList.appendChild(newLi);
      taskInput.value = "";
    };

    const handleTaskListClick = (e) => {
      if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
      } else if (e.target.classList.contains("edit-btn")) {
        const input = e.target.parentElement.querySelector('input[type="text"]');
        input.disabled = !input.disabled;
        if (!input.disabled) input.focus();
      }
    };

    const clearAllTasks = () => {
      taskList.innerHTML = "";
    };

    const searchTasks = (e) => {
      const searchedWord = e.target.value.toLowerCase();
      const taskItems = document.querySelectorAll(".task");
      taskItems.forEach(taskItem => {
        const taskText = taskItem.querySelector(".taskDisabled").value.toLowerCase();
        taskItem.style.display = taskText.includes(searchedWord) ? "block" : "none";
      });
    };

    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addTask();
    });

    taskList.addEventListener("click", handleTaskListClick);
    clearAll.addEventListener("click", (e) => {
      e.preventDefault();
      clearAllTasks();
    });
    searchInput.addEventListener("keyup", searchTasks);
  </script>
</body>
</html>
