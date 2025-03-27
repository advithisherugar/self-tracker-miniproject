// Load total points from localStorage
if (!localStorage.getItem("totalPoints")) {
    localStorage.setItem("totalPoints", "0");
}

let totalPoints = parseInt(localStorage.getItem("totalPoints")) || 0;
const goals = JSON.parse(localStorage.getItem("goals")) || [];

// DOM Elements
const totalPointsDisplay = document.getElementById("totalPointsDisplay");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const completedTasksList = document.getElementById("completedTasksList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const resetButton = document.getElementById("resetPointsButton");

// Maximum progress limit
const maxPoints = 500;

// Function to play sound effect
function playCompletionSound() {
    const audio = new Audio("point-sound.mp3"); // Ensure correct path
    audio.volume = 0.5;
    audio.play();
}

// Function to save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("totalPoints", totalPoints.toString());
}

// Function to display total points
function displayTotalPoints() {
    totalPointsDisplay.textContent = totalPoints;
}

// Function to update the progress bar
function updateProgressBar() {
    const progress = Math.min((totalPoints / maxPoints) * 100, 100);
    progressBar.style.transition = "width 0.5s ease-in-out";
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${totalPoints} / ${maxPoints}`;

    if (totalPoints >= 500) {
        showBadge();
    } else {
        hideBadge(); // Hide badge if points are below 500
    }
}

// Function to mark task as completed and update points
function completeTask(index) {
    if (!goals[index].completed) {
        goals[index].completed = true;
        totalPoints += 10;
        saveToLocalStorage();
        updateTaskList();
        displayTotalPoints();
        updateProgressBar();
        playPointEffect();
        playCompletionSound();
    }
}

// Function to add a task
function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName === "") return;

    const newTask = { name: taskName, completed: false };
    goals.push(newTask);
    saveToLocalStorage();
    updateTaskList();
    taskInput.value = "";
}

// Add event listener to task input for Enter key
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Function to update task list
function updateTaskList() {
    taskList.innerHTML = "";
    completedTasksList.innerHTML = "";

    goals.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.name;

        if (task.completed) {
            li.classList.add("completed");
            completedTasksList.appendChild(li);
        } else {
            const completeButton = document.createElement("button");
            completeButton.textContent = "Complete";
            completeButton.onclick = () => completeTask(index);
            li.appendChild(completeButton);
            taskList.appendChild(li);
        }

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
            goals.splice(index, 1);
            saveToLocalStorage();
            updateTaskList();
        };
        li.appendChild(removeButton);
    });
}

// Function to reset points
resetButton.addEventListener("click", () => {
    totalPoints = 0;
    localStorage.setItem("totalPoints", "0");
    displayTotalPoints();
    updateProgressBar();
    hideBadge(); // ✅ Hide badge when resetting points
});

// Function to create explosion effect
function playPointEffect() {
    console.log("Particle effect triggered!");

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        document.body.appendChild(particle);

        const xMove = (Math.random() - 0.5) * 200;
        const yMove = (Math.random() - 0.5) * 200;

        const rect = totalPointsDisplay.getBoundingClientRect();
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top + rect.height / 2}px`;

        particle.animate([
            { transform: `translate(0, 0) scale(1)`, opacity: 1 },
            { transform: `translate(${xMove}px, ${yMove}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: "ease-out",
            fill: "forwards"
        });

        setTimeout(() => particle.remove(), 1000);
    }
}

// Function to show badge when reaching 500 points
function showBadge() {
    let badgeContainer = document.querySelector(".badge-container");

    // Create badge container if it doesn't exist
    if (!badgeContainer) {
        badgeContainer = document.createElement("div");
        badgeContainer.className = "badge-container";
        badgeContainer.style.position = "absolute";
        badgeContainer.style.top = "10px";
        badgeContainer.style.right = "285px";
        badgeContainer.style.zIndex = "1000";
        badgeContainer.style.background = "rgba(0, 0, 0, 0)";
        badgeContainer.style.padding = "10px";
        badgeContainer.style.borderRadius = "10px";
        document.body.appendChild(badgeContainer);

        const canvas = document.createElement("canvas");
        canvas.id = "badgeCanvas";
        canvas.width = 120;
        canvas.height = 120;
        badgeContainer.appendChild(canvas);
    }

    let canvas = document.getElementById("badgeCanvas");
    let ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the golden circle
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(60, 60, 50, 0, Math.PI * 2);
    ctx.fill();

    // Draw the border
    ctx.strokeStyle = "#ffcc00";
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw text
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Good Job", 60, 65);
}

// Function to hide badge when resetting points
function hideBadge() {
    let badgeContainer = document.querySelector(".badge-container");
    if (badgeContainer) {
        badgeContainer.remove(); // ✅ Badge is removed when points reset
    }
}

// Function to update progress
function updateProgress() {
    totalPointsDisplay.textContent = totalPoints;
    progressText.textContent = `${totalPoints} / 500`;

    let percentage = Math.min((totalPoints / 500) * 100, 100);
    progressBar.style.width = percentage + "%";

    if (totalPoints >= 500) {
        showBadge();
    } else {
        hideBadge(); // ✅ Hide badge when points are below 500
    }
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    displayTotalPoints();
    updateTaskList();
    updateProgressBar();
});
