elTodoForm = document.querySelector(".form");
elTodoInput = document.querySelector(".form__input");
elTodoList = document.querySelector(".todo__list");
elTemplate = document.querySelector(".todo__template").content;
elTodoListItem = elTemplate.querySelectorAll(".todo__item");
elBtns = document.querySelector(".btns");
elButtonAll = document.querySelector(".button-all");
elButtonComplete = document.querySelector(".button-complete");
elButtonIncomplete = document.querySelector(".button-incomplete");
elClearAll = document.querySelector(".button-clear-complete");
elMoon = document.querySelector(".moon");
elSun = document.querySelector(".sun");

const todos = [];

// const buttonClicked = function (param1, param2, param3) {
//   param1.classList.add("buttonblue");
//   param2.classList.remove("buttonblue");
//   param3.classList.remove("buttonblue");
// };

//render
const renderTodos = function (array, node) {
  node.innerHTML = null;

  // if (!elTodoInput.value) {
  //   return;
  // }
  const todosFragment = document.createDocumentFragment();

  array.forEach((todo) => {
    const TemplateCopy = elTemplate.cloneNode(true);

    const inputTitle = TemplateCopy.querySelector(".todo__item__value");
    const Checkbox = TemplateCopy.querySelector(".todo__item__input");
    const deleteButton = TemplateCopy.querySelector(".todo__delete");

    inputTitle.textContent = todo.title;
    Checkbox.dataset.todoId = todo.id;
    deleteButton.dataset.todoId = todo.id;

    if (todo.isCompleted) {
      Checkbox.checked = true;
      inputTitle.classList.toggle("todo__item__value-true");
    } else {
      Checkbox.checked = false;
    }

    todosFragment.appendChild(TemplateCopy);
    document.querySelector(".button-all-score").textContent = todos.length;
  });

  node.appendChild(todosFragment);
};

//Listen Form
elTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const TodoInputvalue = elTodoInput.value.trim();

  const newTodo = {
    title: TodoInputvalue,
    id: todos[todos.length - 1]?.id + 1 || 0,
    isCompleted: false,
  };

  todos.push(newTodo);

  renderTodos(todos, elTodoList);

  elTodoInput.value = "";
});

//Check
const handleCheck = function (id, array) {
  const foundtodo = array.find((todo) => todo.id == id);

  foundtodo.isCompleted = !foundtodo.isCompleted;

  renderTodos(array, elTodoList);
};

//Delete
const handleDeletebutton = function (id, array) {
  const foundtodoIndex = array.findIndex((todo) => todo.id == id);
  array.splice(foundtodoIndex, 1);
  renderTodos(array, elTodoList);
};

elTodoList.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (evt.target.matches(".todo__item__input")) {
    const checkBoxId = Number(evt.target.dataset.todoId);

    handleCheck(checkBoxId, todos);
  }

  if (evt.target.matches(".todo__delete")) {
    const deleteButtonId = Number(evt.target.dataset.todoId);
    handleDeletebutton(deleteButtonId, todos);
  }
});

elBtns.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (evt.target.matches(".button-all")) {
    renderTodos(todos, elTodoList);
    buttonClicked(elButtonAll, elButtonComplete, elButtonIncomplete);
  }

  if (evt.target.matches(".button-complete")) {
    const filteredTodos = todos.filter((todo) => todo.isCompleted);
    renderTodos(filteredTodos, elTodoList);
    buttonClicked(elButtonComplete, elButtonAll, elButtonIncomplete);
  }

  if (evt.target.matches(".button-incomplete")) {
    const filteredTodos = todos.filter((todo) => !todo.isCompleted);
    renderTodos(filteredTodos, elTodoList);
    buttonClicked(elButtonIncomplete, elButtonComplete, elButtonAll);
  }

  if (evt.target.matches(".button-clear-complete")) {
    const filteredTodos = todos.filter((todo) => todo.isCompleted);

    const idsToRemove = filteredTodos.map((todo) => todo.id);

    todos = todos.filter((todo) => !idsToRemove.includes(todo.id));
    renderTodos(todos, elTodoList);
  }
});

elMoon.addEventListener("click", (evt) => {
  evt.preventDefault();

  elMoon.style.display = "none";
  elSun.style.display = "block";
  elTodoInput.classList.toggle("form__input-clicked");
  elTodoList.classList.toggle("todo__list-clicked");

  elTemplate
    .querySelector(".todo__item__value")
    .classList.toggle("todo__item__value-clicked");

  elTodoListItem.forEach((item) => item.classList.toggle("todo__item-clicked"));

  document.querySelector(".body").classList.toggle("body-clicked");
});

elSun.addEventListener("click", (evt) => {
  evt.preventDefault();

  elSun.style.display = "none";
  elMoon.style.display = "block";
  elTodoInput.classList.toggle("form__input-clicked");
  elTodoList.classList.toggle("todo__list-clicked");
  document.querySelector(".body").classList.toggle("body-clicked");
  elTemplate
    .querySelector(".todo__item__value")
    .classList.toggle("todo__item__value-clicked");

  elTodoListItem.forEach((item) => item.classList.toggle("todo__item-clicked"));
});
