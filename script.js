// Show login page initially
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginPage").style.display = "block";
});

// Login Function
function login() {
    let username = document.getElementById("username").value;
    if (username.trim() === "") {
        alert("Please enter a username!");
        return;
    }

    localStorage.setItem("username", username);
    document.getElementById("userDisplay").innerText = username;

    // Show Goal Page
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("goalPage").style.display = "block";
}

// Start Tracking Goal
function startTracking() {
    let goalName = document.getElementById("goalName").value;
    let goalDate = document.getElementById("goalDate").value;

    if (goalName.trim() === "" || goalDate === "") {
        alert("Please enter both a goal name and a date!");
        return;
    }

    localStorage.setItem("goalName", goalName);
    localStorage.setItem("goalDate", goalDate);
    document.getElementById("goalDisplay").innerText = goalName;
    document.getElementById("dateDisplay").innerText = goalDate;

    // Show Progress Tracker Page
    document.getElementById("goalPage").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    loadProgress();
}

// Increase Progress
function increaseProgress() {
    let points = parseInt(localStorage.getItem("points") || "0");
    points += 10;
    localStorage.setItem("points", points);
    document.getElementById("points").innerText = points;

    let progress = Math.min(points, 100);
    document.getElementById("progressBar").style.width = progress + "%";
}

// Reset Progress
function resetProgress() {
    localStorage.setItem("points", "0");
    document.getElementById("points").innerText = "0";
    document.getElementById("progressBar").style.width = "0%";
}

// Load Progress
function loadProgress() {
    let username = localStorage.getItem("username") || "User";
    let goalName = localStorage.getItem("goalName") || "No Goal Set";
    let goalDate = localStorage.getItem("goalDate") || "No Date Set";
    let points = parseInt(localStorage.getItem("points") || "0");

    document.getElementById("userDisplay").innerText = username;
    document.getElementById("goalDisplay").innerText = goalName;
    document.getElementById("dateDisplay").innerText = goalDate;
    document.getElementById("points").innerText = points;
    document.getElementById("progressBar").style.width = Math.min(points, 100) + "%";
}
// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push({ text: taskText, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks();
}

// Load Tasks from Storage
function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.innerText = task.text;
        span.classList.toggle("task-done", task.done);
        span.onclick = () => toggleTask(index);

        let removeBtn = document.createElement("button");
        removeBtn.innerText = "X";
        removeBtn.classList.add("remove-btn");
        removeBtn.onclick = () => removeTask(index);

        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });
}

// Toggle Task Done
function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Remove Task
function removeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}


function toggleMenu() {
    let menu = document.getElementById("sideMenu");
    if (menu.style.left === "0px") {
        menu.style.left = "-250px";
    } else {
        menu.style.left = "0px";
    }
}









