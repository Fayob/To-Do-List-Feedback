import './style.css';
import addToLists from './modules/add-task.js';
import renderLists from './modules/display-task.js';
import { checked, checkboxClick } from './modules/checked.js';
import editingTask from './modules/edit-task.js';
import { removeCompletedTasks, removeSingleTask } from './modules/remove-task.js';

renderLists();

document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('TODO')) || [];
  document.querySelectorAll('#checks').forEach((check) => {
    checked(check, tasks);
  });
});

addToLists();

checkboxClick();

editingTask();

removeSingleTask();

removeCompletedTasks();
