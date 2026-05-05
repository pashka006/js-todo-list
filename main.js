'use strict';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const createTaskElement = (task) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = task.id; 

    const span = document.createElement('span');
    span.className = 'todo-item__text';
    span.textContent = task.text; 

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-item__btn-delete';
    deleteBtn.textContent = 'Видалити';
    deleteBtn.setAttribute('aria-label', 'Видалити завдання');

    li.append(span, deleteBtn);
    return li;
};

const renderTasks = () => {
    todoList.innerHTML = ''; 

    if (tasks.length === 0) {
        todoList.innerHTML = '<li class="empty-state">Список порожній. Додайте завдання!</li>';
        return;
    }

    const fragment = document.createDocumentFragment();
    tasks.forEach(task => {
        fragment.appendChild(createTaskElement(task));
    });
    
    todoList.appendChild(fragment);
};

todoForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const taskText = todoInput.value.trim();
    if (!taskText) return;

    const newTask = {
        id: Date.now().toString(), 
        text: taskText
    };

    tasks.push(newTask);
    saveToLocalStorage();
    
    todoInput.value = ''; 
    renderTasks();
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-item__btn-delete')) {
        const li = e.target.closest('.todo-item');
        const taskId = li.dataset.id;
        
        tasks = tasks.filter(task => task.id !== taskId);
        saveToLocalStorage();
        renderTasks();
    }
});

renderTasks();
