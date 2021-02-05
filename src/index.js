// import './sass/main.scss';
import './styles.css';

const refs = {
  list_toDo: document.querySelector('.list_toDo'),
  addTaskButton: document.querySelector('#addButton'),
  addTaskLittleButton: document.querySelector('#addButtonLittle'),
  scope: document.querySelector('#scope'),
  active: document.querySelector('#active'),
  successful: document.querySelector('#successful'),
};

refs.addTaskButton.addEventListener('click', addTask);
refs.addTaskLittleButton.addEventListener('click', addTask);
refs.list_toDo.addEventListener('click', deleteTask);
refs.list_toDo.addEventListener('click', changeTask);
refs.list_toDo.addEventListener('click', checkedListen);

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
    <li class="item" id=item_${id}>
        <div class="item__menu_info">
            <div class="item_date_check">
                <input class="item__check" ${checkTrue} type="checkbox" name="successful" }>
                <div class="item__dateNow">${date}</div>
            </div>
            <div class="button_menu">
                <button class="item__changeButton" data-action="change_descr"></button>
                <button class="item__deleteButton" data-action="delete_task"></button>
            </div>
        </div>
         
          <textarea name="descriptions" 
             class="item__text ${checkTrue}"
             id="text_desxr" 
             cols="400" 
             wrap="soft"
             disabled
             placeholder="Please enter your descriptions">${description}</textarea>
      
        
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

  let description = '';
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
 

function changeTask(e) {
  const itemId_toChange = e.target.offsetParent.id;

  if (e.target.dataset.action === 'change_descr') {
    e.target.classList.add('item__changeButton_OK');
    const tasksList = JSON.parse(localStorage.getItem('tasks'));

    const itemToChange = tasksList.find(
      ({ id }) => id === +itemId_toChange.slice(5),
    );
    const index = tasksList.indexOf(itemToChange);
    const texterea = e.target.offsetParent.children[1];
    let value = texterea.value;

    if (texterea.disabled === true) {
      texterea.disabled = false;
    } else if (texterea.disabled === false) {
      itemToChange.description = value;
      const changedList = [...tasksList];
      changedList[index] = itemToChange;
      localStorage.setItem('tasks', JSON.stringify(changedList));
      renderList(changedList);
      texterea.disabled === true;
    }
  }
}

function checkedListen(e) {
  if (e.target.name === 'successful') {
    const itemId_toChecked = e.target.offsetParent.id;
    const tasksList = JSON.parse(localStorage.getItem('tasks'));
    const checkedItem = tasksList.find(
      ({ id }) => id === +itemId_toChecked.slice(5),
    );
    const index = tasksList.indexOf(checkedItem);
    checkedItem.checked = e.target.checked;
    const checkedList = [...tasksList];
    checkedList[index] = checkedItem;

    localStorage.setItem('tasks', JSON.stringify(checkedList));
    renderList(checkedList);
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

// function fetchData(obj_Task) {
//   fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//       title: 'foo',
//       body: 'bar',
//       userId: 1,
//     }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then(response => response.json())
//     .then(json => console.log(json));
// }

// fetchData();
