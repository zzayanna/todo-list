const todos = ['Watch lecture', 'Learn DOM'];
localStorage.todos = JSON.stringify(todos);

(function init() {

  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  document.body.append(wrapper);

  const title = document.createElement('h1');
  title.className = 'title';
  title.innerHTML = 'ALL TASKS';

  const taskInput = document.createElement('div');
  taskInput.className = 'new-task';

  const list = document.createElement('ul');
  list.className = 'list';

  wrapper.append(title, taskInput, list);

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.className = 'new-task__input';

  const saveButton = document.createElement('span');
  saveButton.classList.add('button', 'save');
  saveButton.innerHTML = '&#10003';

  taskInput.append(input, saveButton);
  createList();
})();

function createList () {
    const todos = JSON.parse(localStorage.todos);
    const list = document.querySelector('.list');
    list.innerHTML = '';
  
    todos.forEach((todo) => {
      const item = document.createElement('li');
      item.className = 'list__item';
  
      const itemText = document.createElement('p');
      itemText.className = 'list__item__text';
      itemText.innerHTML = `${todo}`;
  
      const editButton = document.createElement('span');
      editButton.classList.add('button', 'edit');
      editButton.innerHTML = '&#9998';
  
      const deleteButton = document.createElement('span');
      deleteButton.classList.add('button', 'delete');
      deleteButton.innerHTML = '&#215';
  
      item.append(itemText, editButton, deleteButton);
      list.append(item);
    });
  
    addListeners();
}

function addListeners() {
  document.querySelectorAll('.list__item__text').forEach((item) => {
    item.addEventListener('click', markItem);
  })

  document.querySelector('.save').addEventListener('click', addTask);

  document.querySelectorAll('.delete').forEach((button) => {
    button.addEventListener('click', deleteTask);
  })

  document.querySelectorAll('.edit').forEach((button) => {
    button.addEventListener('click', editTask);
  })
}

function markItem() {
  this.parentNode.classList.toggle('checked');
}

function addTask() {
  const newTask = document.querySelector('.new-task__input');
  if (newTask.value) {
    const tasks = JSON.parse(localStorage.todos);
    tasks.push(newTask.value);
    localStorage.todos = JSON.stringify(tasks);
    newTask.value = '';
    createList();
  }
}

function deleteTask() {
  const taskToDelete = this.parentNode;
  const text = taskToDelete.firstChild.innerHTML;
  const tasks = JSON.parse(localStorage.todos);
  const index = tasks.indexOf(text);
  tasks.splice(index, 1);
  localStorage.todos = JSON.stringify(tasks);
  createList();
}

function editTask() {
  const taskToEdit = this.parentNode;
  if (!taskToEdit.classList.contains('checked')) {
    const oldText = taskToEdit.firstChild.innerHTML;
    taskToEdit.innerHTML = '';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.className = 'new-task__input';
    input.value = oldText;

    const saveButton = document.createElement('span');
    saveButton.className = 'button';
    saveButton.innerHTML = '&#10003';
    saveButton.addEventListener('click', () => {
      const tasks = JSON.parse(localStorage.todos);
      const index = tasks.indexOf(oldText);
      tasks[index] = input.value;
      localStorage.todos = JSON.stringify(tasks);
      createList();
    })
    
    taskToEdit.append(input, saveButton);
  }
}