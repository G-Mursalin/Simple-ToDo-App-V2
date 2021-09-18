// Selectos
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Get Data Feom Local Stroage
if (localStorage.getItem('ToDos')) {
  const data = JSON.parse(localStorage.getItem('ToDos'));
  todoList.insertAdjacentHTML('beforeend', data);
}
// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deletChack);
filterOption.addEventListener('click', filterTodo);
// Functions

function addTodo(e) {
  e.preventDefault();
  const html = `<div class="todo">
  <li class="todo-item">${todoInput.value}</li>
  <button class="complete-btn"><i class="fas fa-check"></i></button
  ><button class="trash-btn"><i class="fas fa-trash"></i></button>
</div>`;
  todoList.insertAdjacentHTML('beforeend', html);
  updateTodoNodeList();

  //Clear Input Field
  todoInput.value = '';
}

function deletChack(e) {
  const item = e.target;

  //Delete
  if (item.classList.contains('trash-btn')) {
    //   Animation
    item.parentElement.classList.add('fall');
    item.parentElement.addEventListener('transitionend', () => {
      item.parentElement.remove();
      updateTodoNodeList();
    });
  }
  //Mark as done
  if (item.classList.contains('complete-btn')) {
    item.parentElement.classList.toggle('completed');
    updateTodoNodeList();
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos);

  todos.forEach(todo => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;

      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

// Save To Local Stroage
function savetoLS(todos) {
  const todosArray = Array.from(todos);

  if (todosArray.length === 0) {
    localStorage.clear('ToDos');
    return;
  }

  const html = todosArray
    .map(val => val.outerHTML)
    .reduce((acc, val) => acc + val);

  localStorage.setItem('ToDos', JSON.stringify(html));
}
// Update todos node list
function updateTodoNodeList() {
  const todos = document.querySelectorAll('.todo');
  savetoLS(todos);
}
