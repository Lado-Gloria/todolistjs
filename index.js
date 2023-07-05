const userContainer = document.getElementById('container');
const getTodos = () => {
  return fetch('https://dummyjson.com/todos/user/14')
    .then(response => response.json())
    .then(data => data.todos)
    .catch(error => {
      console.log(error);
      
    });
};

const displayUsers = () => {
  getTodos()
    .then(todos => {
      console.log(todos);
      todos.forEach(item => {
        let div = document.createElement('div');
        let userName = document.createElement('input');
        let ids = document.createElement('span');
        let checkbox = document.createElement('input');
        let icon = document.createElement('i');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        icon.classList.add('fa', 'fa-trash');
        ids.appendChild(icon);
        userName.value = item.todo;
        checkbox.addEventListener('change', () => {
          updateTodoStatus(item.id, checkbox.checked)
            .then(() => {
              if (checkbox.checked) {
                userName.style.textDecoration = 'line-through';
              } else {
                userName.style.textDecoration = 'none';
              }
            });
        });
        icon.addEventListener('click', () => {
          deleteUser(item.id)
            .then(() => {
              div.remove();
            });
        });
        div.appendChild(checkbox);
        div.appendChild(userName);
        div.appendChild(ids);
        div.setAttribute('key', item.id);
        div.setAttribute('class', 'people');
        userContainer.appendChild(div);
      });
    });
};

const addTodo = (todo) => {
  return fetch('https://dummyjson.com/todos/user/14', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        todo,
        completed: false
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Todo added:', data);
      return data;
    })
    .catch(error => {
      console.log(error.message);
    });
};

const addForm = document.getElementById('addForm');
addForm.addEventListener('submit', event => {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const newTask = taskInput.value;
  taskInput.value = '';
  if (newTask) {
    const div = document.createElement('div');
    const userName = document.createElement('input');
    const ids = document.createElement('span');
    const checkbox = document.createElement('input');
    const icon = document.createElement('i');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    icon.classList.add('fa', 'fa-trash');
    ids.appendChild(icon);
    userName.value = newTask;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        userName.style.textDecoration = 'line-through';
      } else {
        userName.style.textDecoration = 'none';
      }
    });
    icon.addEventListener('click', () => {
      deleteUser(newTask);
      div.remove();
    });

    div.appendChild(checkbox);
    div.appendChild(userName);
    div.appendChild(ids);
    div.setAttribute('key', Date.now());
    div.setAttribute('class', 'people');
    userContainer.appendChild(div); 
  }
});

window.addEventListener('DOMContentLoaded', displayUsers);

const updateTodoStatus = (id, completed) => {
  return fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        completed
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Todo updated:', data);
      return data;
    })
    .catch(error => {
      console.log(error.message);
    });
};

const deleteUser = (id) => {
  return fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log({ data });
      return data;
    })
    .catch(error => {
      console.log(error.message);
    });
};

