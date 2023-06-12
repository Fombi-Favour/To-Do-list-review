class Functionality {
  static localGetItem() {
    let data;
    if (localStorage.getItem('todoData') === null) {
      data = [];
    } else {
      // eslint-disable-next-line no-unused-vars
      data = JSON.parse(localStorage.getItem('todoData'));
    }
    return data;
  }

  // add the data to local storage
  addData = (newData) => {
    this.newData = newData;
    const data = Functionality.localGetItem();
    data.push(newData);
    localStorage.setItem('todoData', JSON.stringify(data));
  };

  // displays the to do list data
  displayData = (newData) => {
    this.newData = newData;
    const todoList = document.querySelector('.task-list');
    const todoTask = document.createElement('div');
    todoTask.className = 'task';
    todoTask.id = newData.index;
    // todoTask.draggable = true;

    const updateContent = document.createElement('div');
    updateContent.className = 'update';
    updateContent.id = newData.index;
    const inputCheck = document.createElement('input');
    inputCheck.type = 'checkbox';
    inputCheck.id = newData.index;
    inputCheck.className = 'complete';
    const description = document.createElement('input');
    description.id = newData.index;
    description.type = 'text';
    description.value = newData.description;
    description.className = 'updateDesc';
    updateContent.appendChild(inputCheck);
    updateContent.appendChild(description);

    if (newData.completed === true) {
      inputCheck.checked = true;
      description.classList.add('checked');
    } else {
      description.classList.remove('checked');
      inputCheck.checked = false;
    }

    const iconContent = document.createElement('div');
    iconContent.className = 'icons';
    const moveIcon = document.createElement('i');
    moveIcon.id = 'move';
    moveIcon.className = 'las la-ellipsis-v';
    const deleteIcon = document.createElement('i');
    deleteIcon.id = 'delete';
    deleteIcon.className = 'las la-trash-alt hidden';
    iconContent.appendChild(moveIcon);
    iconContent.appendChild(deleteIcon);

    todoTask.appendChild(updateContent);
    todoTask.appendChild(iconContent);
    todoList.appendChild(todoTask);

    // Update the description to the task
    const edit = todoTask.querySelector('.updateDesc');

    edit.addEventListener('input', () => {
      newData.description = edit.value;
      Functionality.updateStorage(newData.index, newData);
    });

    edit.addEventListener('focus', () => {
      const allItems = document.querySelectorAll('.task-list, .task');
      const move = todoTask.querySelector('#move');
      const trash = todoTask.querySelector('#delete');
      allItems.forEach((item) => {
        if (item === todoTask) {
          item.classList.add('active');
          trash.classList.remove('hidden');
          move.classList.add('hidden');
        } else {
          item.classList.remove('active');
          trash.classList.remove('hidden');
          move.classList.add('hidden');
        }
      });
    });

    // checked if complete is true
    const checked = todoTask.querySelector('.complete');
    checked.addEventListener('change', () => {
      newData.completed = !newData.completed;
      if (newData.completed === true) {
        inputCheck.checked = true;
        description.classList.add('checked');
      } else {
        description.classList.remove('checked');
        inputCheck.checked = false;
      }
      Functionality.updateStorage(newData.index, newData);
    });

    // delete each task of the list
    const trash = todoTask.querySelector('#delete');
    trash.addEventListener('click', () => {
      Functionality.deleteData(newData.index);
      todoList.removeChild(todoTask);
    });
  };

  // delete data
  static deleteData(id) {
    let data = Functionality.localGetItem();
    // eslint-disable-next-line no-unused-vars
    data = data.filter((todo) => todo.index !== id).map((todo, index) => {
      todo.index = index + 1;
      return todo;
    });
    localStorage.setItem('todoData', JSON.stringify(data));
  }

  // update data in local storage
  static updateStorage(id, updateData) {
    const data = Functionality.localGetItem();
    const updateId = data.findIndex((todo) => todo.index === id);
    if (updateData !== -1) {
      data[updateId] = updateData;
      localStorage.setItem('todoData', JSON.stringify(data));
    }
  }

  // delete list of data if complete is checked true
  static deleteComplete() {
    let data = Functionality.localGetItem();
    // filter complete task
    // eslint-disable-next-line no-unused-vars
    data = data.filter((todo) => !todo.completed).map((todo, index) => {
      todo.index = index + 1;
      return todo;
    });
    localStorage.setItem('todoData', JSON.stringify(data));

    const complete = document.querySelectorAll('.checked');
    complete.forEach((todos) => {
      const item = todos.closest('.task');
      item.parentNode.removeChild(item);
    });
  }

  // display the data in local storage
  static showStorage() {
    const crud = new Functionality();
    const data = Functionality.localGetItem();
    data.forEach((item) => {
      crud.displayData(item);
    });
  }
}

export default Functionality;
