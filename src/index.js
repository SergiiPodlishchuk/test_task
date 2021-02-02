import './styles.css';

const refs = {
  list_toDo: document.querySelector('.list_toDo'),
  addTaskButton: document.querySelector('#addButton'),
  scope: document.querySelector('#scope'),
  active: document.querySelector('#active'),
  successful: document.querySelector('#successful'),
};

refs.addTaskButton.addEventListener('click', addTask);
refs.list_toDo.addEventListener('click', deleteTask);
refs.list_toDo.addEventListener('click', changeTask);

const tasksStorage = JSON.parse(localStorage.getItem('tasks'));
if (tasksStorage === null) {
  refs.list_toDo.insertAdjacentHTML(
    'beforeend',
    '<div>You have not any task</div>',
  );
} else {
  renderList(tasksStorage);
}

function renderList(tasks) {
  refs.list_toDo.innerHTML = '';
  const listTasks = tasks.map(({ date, description, id, checked }) => {
    const checkTrue = checked ? 'checked' : '';

    return `
    <li class="list_toDo_item" id=item_${id}>
        <div class="menu_info">
            <div class="date_check">
                <input class="inputCheck" ${checkTrue} type="checkbox" name="successful" }>
                <div class="dateNow">${date}</div>
            </div>
            <div class="button_menu">
                <button class="change__button" data-action="change_descr"></button>
                <button class="delete__button" data-action="delete_task"></button>
            </div>
        </div>
        <div class="toDo__text">
              ${description}
              <div class="inputDescription">
                <input type="text" id="inputDescr" placeholder="${id} Please enter task description ">
              </div>
        </div>
        
    </li>`;
  });

  refs.list_toDo.insertAdjacentHTML('beforeend', listTasks.join(''));
  const tasksSum = tasks.length;
  const successfulTasks = tasks.filter(({ checked }) => checked).length;

  refs.scope.textContent = tasksSum;
  refs.successful.textContent = successfulTasks;
  refs.active.textContent = tasksSum - successfulTasks;
}

function addTask() {
  const date = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const random_id = Math.floor(Math.random() * 1000);
  const listFromStorage = JSON.parse(localStorage.getItem('tasks'));

  const unicId = listFromStorage
    ? listFromStorage.find(({ id }) => random_id === id)
    : 1;

  const id = unicId ? random_id + 10 : random_id;

  let description = 'Something';
  const checked = false;
  const task = { date, id, checked, description };

  let list = [];
  if (localStorage.getItem('tasks') === null) {
    list.push(task);
  } else {
    list = listFromStorage;
    list.push(task);
  }

  localStorage.setItem('tasks', JSON.stringify(list));
  renderList(list);
}

function changeTask(e) {
  console.log(e.target.value);
  const itemId_toChange = e.target.offsetParent.id;
  if (e.target.dataset.action === 'change_descr') {
    const listAfterChange = JSON.parse(localStorage.getItem('tasks')).find(
      ({ id }) => id === +itemId_toChange.slice(5),
    );
    console.log(listAfterChange);
    listAfterChange.description = 'egddsdsdsdfsefd';
    // localStorage.setItem('tasks', JSON.stringify(listAfterDel));
    // renderList(listAfterDel);
  }
}

function deleteTask(e) {
  const itemId_toDelete = e.target.offsetParent.id;

  if (e.target.dataset.action === 'delete_task') {
    const listAfterDel = JSON.parse(localStorage.getItem('tasks')).filter(
      ({ id }) => id !== +itemId_toDelete.slice(5),
    );
    localStorage.setItem('tasks', JSON.stringify(listAfterDel));
    renderList(listAfterDel);
  }
}

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then(json => console.log(json));
