import './style.css';

const ul = document.querySelector('.to_do_lists');

const renderLists = () => {
  const tasks = JSON.parse(localStorage.getItem('TODO')) || [];
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('to_do_list');
    li.innerHTML = `
   <div class="container">
   <input type="checkbox" name="check" id="checks" data-id=${task.index} />
   <input class="text" data-id=${task.index} value='${task.description}'  />
   </div>
   <i class="fa fa-ellipsis-v"></i>
   <i class="fa fa-trash hidden" ></i>
   `;
    ul.appendChild(li);
  });
};

renderLists();

const checked = (check, tasks) => {
  const index = check.dataset.id - 1;

  if (tasks[index].completed) {
    check.checked = true;
    check.parentElement.lastElementChild.classList.add('line-through');
    check.parentElement.lastElementChild.classList.add('color');
  } else {
    check.checked = false;
    check.parentElement.lastElementChild.classList.remove('line-through');
    check.parentElement.lastElementChild.classList.remove('color');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('TODO')) || [];
  document.querySelectorAll('#checks').forEach((check) => {
    checked(check, tasks);
  });
});

const input = document.querySelector('.input');

const addToLists = () => {
  input.addEventListener('keypress', (e) => {
    const tasks = JSON.parse(localStorage.getItem('TODO')) || [];
    if (e.key === 'Enter') {
      if (!input.value) {
        alert('Please enter a task');
        return;
      }

      const eachTask = {
        description: input.value,
        completed: false,
        index: tasks.length + 1,
      };

      tasks.push(eachTask);
      localStorage.setItem('TODO', JSON.stringify(tasks));
    }
  });
};

addToLists();

const checkboxClick = () => {
  const checkboxs = document.querySelectorAll('#checks');
  checkboxs.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
      const tasks = JSON.parse(localStorage.getItem('TODO')) || [];
      const index = e.target.dataset.id - 1;

      if (checkbox.checked) {
        tasks[index].completed = true;
      } else {
        tasks[index].completed = false;
      }

      localStorage.setItem('TODO', JSON.stringify(tasks));
      checked(e.target, tasks);
    });
  });
};
checkboxClick();

const editingTask = () => {
  const element = document.querySelectorAll('.text');
  element.forEach((ele) => {
    ele.addEventListener('click', () => {
      const tasks = JSON.parse(localStorage.getItem('TODO'));
      ele.contentEditable = true;
      ele.parentElement.parentElement.lastElementChild.previousElementSibling.classList.add('hidden');
      ele.parentElement.parentElement.lastElementChild.classList.remove('hidden');

      ele.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (!ele.value) {
            alert('Please enter a task');
            return;
          }

          tasks.forEach((task) => {
            if (task.index === +ele.dataset.id) {
              task.description = ele.value;
            }
          });
          localStorage.setItem('TODO', JSON.stringify(tasks));
          window.location.reload();
        }
      });
    });
  });
};
editingTask();

const removeSingleTask = () => {
  document.querySelectorAll('.fa-trash').forEach((ele) => {
    ele.addEventListener('click', () => {
      let tasks = JSON.parse(localStorage.getItem('TODO')) || [];
      const index = ele.parentElement.firstElementChild.firstElementChild.dataset.id;

      tasks = tasks.filter((task) => task.index !== +index);
      tasks.forEach((task, index) => {
        task.index = index + 1;
      });
      localStorage.setItem('TODO', JSON.stringify(tasks));

      ele.parentElement.remove();

      window.location.reload();
    });
  });
};

removeSingleTask();

const removeCompletedTasks = () => {
  const clearCompletedList = document.querySelector('.clear_list');
  clearCompletedList.addEventListener('click', (e) => {
    let tasks = JSON.parse(localStorage.getItem('TODO')) || [];
    tasks = tasks.filter((task) => task.completed !== true);
    tasks.forEach((task, index) => {
      task.index = index + 1;
    });

    localStorage.setItem('TODO', JSON.stringify(tasks));

    const nodeElement = Array.from(e.target.previousElementSibling.childNodes);
    nodeElement.forEach((element) => {
      if (element.firstElementChild.lastElementChild.classList.contains('line-through')) {
        element.remove();
      }
    });
    window.location.reload();
  });
};

removeCompletedTasks();
