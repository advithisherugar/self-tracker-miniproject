document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    generateTimeBlocks();
    generateWaterCups();
    setupAddButtons();
    setupCurrentDate();
    
    // Load saved data
    loadPlannerData();
    
    // Set up auto-saving
    setupAutoSave();
});

// Set current date display
function setupCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    document.getElementById('dateDisplay').textContent = today.toLocaleDateString('en-US', options);
}

// Generate time blocks
function generateTimeBlocks() {
    const container = document.getElementById('timeBlocks');
    container.innerHTML = '';
    
    const hours = [8,9,10,11,12,1,2,3,4,5,6,7,8];
    const ampm = ['AM','AM','AM','AM','PM','PM','PM','PM','PM','PM','PM','PM','PM'];
    
    hours.forEach((hour, index) => {
        const time = hour > 12 ? `${hour-12} ${ampm[index]}` : `${hour} ${ampm[index]}`;
        
        const block = document.createElement('div');
        block.className = 'time-block';
        
        const timeLabel = document.createElement('div');
        timeLabel.className = 'time-label';
        timeLabel.textContent = time;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'time-input';
        input.placeholder = 'What are you doing?';
        input.dataset.time = time;
        
        block.appendChild(timeLabel);
        block.appendChild(input);
        container.appendChild(block);
    });
}

// Generate water cups
function generateWaterCups() {
    const container = document.getElementById('waterCups');
    container.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const cup = document.createElement('div');
        cup.className = 'water-cup';
        cup.innerHTML = `<span>${i+1}</span>`;
        cup.addEventListener('click', function() {
            this.classList.toggle('filled');
            updateWaterCount();
            saveData();
        });
        container.appendChild(cup);
    }
}

// Update water count display
function updateWaterCount() {
    const count = document.querySelectorAll('.water-cup.filled').length;
    document.getElementById('waterCount').textContent = `${count}/8`;
}

// Set up add buttons
function setupAddButtons() {
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            addTaskItem(targetId);
        });
    });
}

// Add a new task item to specified container
function addTaskItem(containerId, text = '', checked = false) {
    const container = document.getElementById(containerId);
    
    const item = document.createElement('div');
    item.className = 'task-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = checked;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-input';
    input.value = text;
    input.placeholder = getPlaceholderText(containerId);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.addEventListener('click', function() {
        item.classList.add('fade-out');
        setTimeout(() => {
            item.remove();
            saveData();
        }, 300);
    });
    
    item.appendChild(checkbox);
    item.appendChild(input);
    item.appendChild(deleteBtn);
    container.appendChild(item);
    
    // Focus on new input
    input.focus();
}

// Get appropriate placeholder text
function getPlaceholderText(containerId) {
    const placeholders = {
        'todoList': 'Add a new task...',
        'mealsList': 'What did you eat?',
        'exerciseList': 'What exercise did you do?',
        'notesList': 'Write a note...',
        'tomorrowList': 'Plan for tomorrow...'
    };
    return placeholders[containerId] || 'Enter item...';
}

// Set up auto-saving
function setupAutoSave() {
    // Save on change for all inputs
    document.addEventListener('change', function(e) {
        if (e.target.matches('input, textarea')) {
            saveData();
        }
    });
    
    // Save on blur
    document.addEventListener('blur', function(e) {
        if (e.target.matches('.task-input, .time-input')) {
            saveData();
        }
    }, true);
    
    // Save on Enter key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.matches('.task-input, .time-input')) {
            saveData();
            e.target.blur();
        }
    });
}

// Save all data
function saveData() {
    const plannerData = {
        timeBlocks: Array.from(document.querySelectorAll('.time-block')).map(block => ({
            time: block.querySelector('.time-label').textContent,
            task: block.querySelector('.time-input').value
        })),
        
        taskLists: {
            todoList: getTaskListData('todoList'),
            mealsList: getTaskListData('mealsList'),
            exerciseList: getTaskListData('exerciseList'),
            notesList: getTaskListData('notesList'),
            tomorrowList: getTaskListData('tomorrowList')
        },
        
        water: document.querySelectorAll('.water-cup.filled').length
    };
    
    localStorage.setItem('plannerData', JSON.stringify(plannerData));
    showSaveStatus();
}

// Get data for a task list
function getTaskListData(listId) {
    return Array.from(document.querySelectorAll(`#${listId} .task-item`)).map(item => ({
        text: item.querySelector('.task-input').value,
        checked: item.querySelector('.task-checkbox').checked
    }));
}

// Load saved data
function loadPlannerData() {
    const savedData = localStorage.getItem('plannerData');
    if (!savedData) {
        // Add default items if no saved data
        addTaskItem('todoList');
        addTaskItem('mealsList');
        addTaskItem('exerciseList');
        addTaskItem('notesList');
        addTaskItem('tomorrowList');
        return;
    }
    
    const data = JSON.parse(savedData);
    
    // Load time blocks
    if (data.timeBlocks) {
        const blocks = document.querySelectorAll('.time-block');
        data.timeBlocks.forEach((block, i) => {
            if (blocks[i]) {
                blocks[i].querySelector('.time-input').value = block.task || '';
            }
        });
    }
    
    // Load task lists
    if (data.taskLists) {
        for (const [listId, items] of Object.entries(data.taskLists)) {
            const container = document.getElementById(listId);
            container.innerHTML = '';
            
            if (items && items.length > 0) {
                items.forEach(item => {
                    addTaskItem(listId, item.text, item.checked);
                });
            } else {
                addTaskItem(listId);
            }
        }
    }
    
    // Load water
    if (data.water) {
        const cups = document.querySelectorAll('.water-cup');
        for (let i = 0; i < data.water && i < cups.length; i++) {
            cups[i].classList.add('filled');
        }
        updateWaterCount();
    }
}

// Show save status
function showSaveStatus() {
    const status = document.getElementById('saveStatus');
    status.classList.add('show');
    
    setTimeout(() => {
        status.classList.remove('show');
    }, 2000);
}