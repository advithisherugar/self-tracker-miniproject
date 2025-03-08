// Data Arrays
const goals = JSON.parse(localStorage.getItem("goals")) || [];
const progressData = JSON.parse(localStorage.getItem("progressData")) || [];

// DOM References
const goalForm = document.getElementById("goalForm");
const progressForm = document.getElementById("progressForm");
const goalList = document.getElementById("goalList");
const progressList = document.getElementById("progressList");
const goalProgressChart = document.getElementById('goalProgressChart');
const quoteSection = document.getElementById("quoteSection");

// Show/Hiding Sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("progressData", JSON.stringify(progressData));
}

// Function to display goals
function updateGoalList() {
    goalList.innerHTML = "";
    goals.forEach((goal, index) => {
        const li = document.createElement("li");
       // li.textContent = goal.name + ' - ' + goal.category + ' - Target: ' + goal.target + ' by ' + goal.date;
        li.textContent = `${goal.name} - ${goal.category} - Target: ${goal.target} by ${goal.date}`;
        if (goal.completed) {
            li.classList.add("goal-completed");
            li.textContent += " (Completed)";
        }
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.onclick = () => {
            goals.splice(index, 1);
            saveToLocalStorage();
            updateGoalList();
        };
        li.appendChild(removeButton);
        goalList.appendChild(li);
    });
}

// Function to display progress
function updateProgressList() {
    progressList.innerHTML = "";
    progressData.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = entry.task + ' - ' + entry.progress + '%';
     // li.textContent = '${entry.task} - ${entry.progress}%';
        progressList.appendChild(li);
    });
}

// Form submission to add goals
goalForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const goalName = document.getElementById("goalName").value;
    const goalTarget = document.getElementById("goalTarget").value;
    const goalDate = document.getElementById("goalDate").value;
    const category = document.getElementById("category").value;

    const newGoal = {
        name: goalName,
        target: goalTarget,
        date: goalDate,
        category: category,
        completed: false
    };

    goals.push(newGoal);
    saveToLocalStorage();
    updateGoalList();
    goalForm.reset();
});

// Form submission to add progress
progressForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const task = document.getElementById("task").value;
    const progress = document.getElementById("progress").value;

    const newProgress = {
        task: task,
        progress: progress
    };

    progressData.push(newProgress);
    saveToLocalStorage();
    updateProgressList();
    updateProgressChart();
    progressForm.reset();
});

// Update chart
function updateProgressChart() {
    const ctx = goalProgressChart.getContext('2d');
    const goalNames = goals.map(goal => goal.name);
    const goalProgress = goals.map(goal => {
        return progressData.reduce((total, entry) => {
            return total + (entry.task === goal.name ? parseInt(entry.progress) : 0);
        }, 0);
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: goalNames,
            datasets: [{
                label: 'Progress (%)',
                data: goalProgress,
                backgroundColor: 'BABDE2',
                borderColor: 'BABDE2',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Goals'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Progress (%)'
                    },
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

// Display motivational quote
const quotes = [
    "Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together.",
    "Goal setting is the secret to a compelling future.",
    "Either you run the day or the day runs you.",
    "The best way to predict the future is to create it."
];

function displayRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
   quoteSection.innerText = `"${quote}"`;
}

// Initial Load
displayRandomQuote();
showSection('setGoals');
updateGoalList();
updateProgressList();
updateProgressChart();


let progress = 0;
function increaseProgress() {
    if (progress < 100) {
        progress += 10;
        let progressBar = document.getElementById("progress-bar");
        progressBar.style.width = progress + "%";
        progressBar.innerText = progress + "%";

        // Change color as progress increases
        if (progress > 50) {
            progressBar.style.background = "linear-gradient(90deg, #ff9800, #ff5722)";
        }
        if (progress > 80) {
            progressBar.style.background = "linear-gradient(90deg, #f44336, #d32f2f)";
        }
    }
}
