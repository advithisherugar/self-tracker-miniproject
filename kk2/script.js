let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthYear = document.getElementById("currentMonthYear");
const calendar = document.getElementById("calendar");
const eventInput = document.getElementById("eventInput");
const eventList = document.getElementById("eventList");

function generateCalendar(month, year) {
    calendar.innerHTML = "";
    monthYear.textContent = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement("div");
        dayEl.classList.add("calendar-day");
        dayEl.innerHTML = `<strong>${day}</strong>`;
        calendar.appendChild(dayEl);
    }
}

function addEvent() {
    if (eventInput.value) {
        const li = document.createElement("li");
        li.textContent = eventInput.value;
        eventList.appendChild(li);
        eventInput.value = "";
    }
}

document.getElementById("prevMonth").addEventListener("click", () => generateCalendar(--currentMonth, currentYear));
document.getElementById("nextMonth").addEventListener("click", () => generateCalendar(++currentMonth, currentYear));

generateCalendar(currentMonth, currentYear);
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks(); // Refresh list
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let completedTasksList = document.getElementById("completedTasksList");

    taskList.innerHTML = "";
    completedTasksList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    // Load active tasks
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span contenteditable="true" oninput="updateTask(${index}, this.innerText)">${task}</span>
            <button onclick="completeTask(${index})">✔️</button>
            <button onclick="deleteTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
    });

    // Load completed tasks
    completedTasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span contenteditable="true" oninput="updateCompletedTask(${index}, this.innerText)">${task}</span>
            <button onclick="deleteCompletedTask(${index})">🗑️</button>
        `;
        completedTasksList.appendChild(li);
    });
}

function completeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    let task = tasks.splice(index, 1)[0]; // Remove from tasks
    completedTasks.push(task); // Add to completed

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    loadTasks(); // Refresh lists
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteCompletedTask(index) {
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks.splice(index, 1);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    loadTasks();
}

function updateTask(index, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index] = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCompletedTask(index, newText) {
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks[index] = newText.trim();
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}
