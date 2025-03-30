
document.addEventListener('DOMContentLoaded', function() {
   
    const today = new Date();
    document.getElementById('currentDate').valueAsDate = today;

    
    generateTimeBlocks();
    
    
    generateWaterCups();
    
    
    setupEventListeners();
});

function generateTimeBlocks() {
    const timeBlocksContainer = document.getElementById('timeBlocks');
    timeBlocksContainer.innerHTML = '';
    
    for (let hour = 5; hour <= 20; hour++) {
        const timeBlock = document.createElement('div');
        timeBlock.className = 'schedule-item';
        
        const timeLabel = document.createElement('span');
        timeLabel.className = 'time';
        timeLabel.textContent = `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'PM' : 'AM'}`;
        
        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.className = 'task-input';
        taskInput.placeholder = 'Task';
        
        timeBlock.appendChild(timeLabel);
        timeBlock.appendChild(taskInput);
        timeBlocksContainer.appendChild(timeBlock);
    }
}

function generateWaterCups() {
    const waterCupsContainer = document.getElementById('waterCups');
    waterCupsContainer.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const cup = document.createElement('div');
        cup.className = 'water-cup';
        cup.addEventListener('click', function() {
            this.classList.toggle('filled');
        });
        waterCupsContainer.appendChild(cup);
    }
}

function setupEventListeners() {
   
    document.getElementById('addTodoBtn').addEventListener('click', addNewTodo);
   
    addNewTodo();
}

function addNewTodo() {
    const todoList = document.getElementById('todoList');
    
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'todo-input';
    input.placeholder = 'Add task...';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', function() {
        todoItem.remove();
    });
    
    todoItem.appendChild(checkbox);
    todoItem.appendChild(input);
    todoItem.appendChild(deleteBtn);
    
    todoList.appendChild(todoItem);
}


function savePlannerData() {
    const plannerData = {
        date: document.getElementById('currentDate').value,
        weather: document.getElementById('weatherSelect').value,
       
    };
    
    localStorage.setItem('dailyPlanner', JSON.stringify(plannerData));
}


function loadPlannerData() {
    const savedData = localStorage.getItem('dailyPlanner');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('currentDate').value = data.date;
        document.getElementById('weatherSelect').value = data.weather;
      
    }
}


loadPlannerData();


document.querySelectorAll('input, textarea, select').forEach(element => {
    element.addEventListener('change', savePlannerData);
});
