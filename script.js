document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            
            const taskText = document.createElement('input');
            taskText.type = 'text';
            taskText.value = task;
            taskText.disabled = true;

            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.innerHTML = 'Edit';
            editBtn.addEventListener('click', () => editTask(index, taskText, editBtn));

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerHTML = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(index));

            taskItem.appendChild(taskText);
            taskItem.appendChild(editBtn);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    }

    function editTask(index, taskText, editBtn) {
        if (editBtn.innerHTML === 'Edit') {
            taskText.disabled = false;
            taskText.focus();
            editBtn.innerHTML = 'Save';
        } else {
            tasks[index] = taskText.value.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskText.disabled = true;
            editBtn.innerHTML = 'Edit';
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
