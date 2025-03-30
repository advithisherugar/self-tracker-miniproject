document.addEventListener('DOMContentLoaded', function() {
    // Load data from localStorage
    const plannerData = JSON.parse(localStorage.getItem('plannerData')) || {};
    
    // Calculate statistics
    const stats = calculateStatistics(plannerData);
    
    // Update UI with statistics
    updateStatsUI(stats);
    
    // Initialize charts
    initializeCharts(stats);
    
    // Set up time filters
    setupTimeFilters();
    
    // Set up sidebar
    setupSidebar();
});

function calculateStatistics(data) {
    // This would normally analyze historical data
    // For now, we'll use current day data and simulate some trends
    
    const completedTasks = data.taskLists?.todoList?.filter(t => t.checked).length || 0;
    const totalTasks = data.taskLists?.todoList?.length || 1;
    const waterIntake = data.water || 0;
    const exerciseSessions = data.taskLists?.exerciseList?.length || 0;
    const notesTaken = data.taskLists?.notesList?.length || 0;
    
    // Calculate productivity score (0-100)
    const productivityScore = Math.min(
        100,
        Math.round(
            (completedTasks * 5 + 
             waterIntake * 2 + 
             exerciseSessions * 10 + 
             notesTaken * 2) / 2
        )
    );
    
    // Simulate 7-day data for charts
    const last7Days = Array.from({length: 7}, (_, i) => {
        const dayOffset = 6 - i;
        return {
            date: new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000)
                .toLocaleDateString('en-US', {weekday: 'short'}),
            tasksCompleted: Math.max(0, completedTasks - i + Math.floor(Math.random() * 3)),
            waterIntake: Math.max(0, waterIntake - i % 2 + Math.floor(Math.random() * 2)),
            productivity: Math.max(30, productivityScore - i * 5 + Math.floor(Math.random() * 10))
        };
    });
    
    return {
        completedTasks,
        totalTasks,
        waterIntake,
        exerciseSessions,
        notesTaken,
        productivityScore,
        last7Days
    };
}

function updateStatsUI(stats) {
    // Update overview cards
    document.getElementById('tasksCompleted').textContent = 
        `${stats.completedTasks}/${stats.totalTasks}`;
    document.getElementById('waterAverage').textContent = 
        `${stats.waterIntake}/8`;
    document.getElementById('productivityScore').textContent = 
        `${stats.productivityScore}`;
    document.getElementById('exerciseFrequency').textContent = 
        `${stats.exerciseSessions}`;
    
    // Update progress bars
    document.getElementById('taskProgress').style.width = 
        `${(stats.completedTasks / stats.totalTasks) * 100}%`;
    document.getElementById('taskMasterProgress').style.width = 
        `${Math.min(100, (stats.completedTasks / 50) * 100)}%`;
    document.getElementById('hydrationProgress').style.width = 
        `${Math.min(100, (stats.waterIntake / 8) * 100)}%`;
    document.getElementById('fitnessProgress').style.width = 
        `${Math.min(100, (stats.exerciseSessions / 20) * 100)}%`;
    
    // Update points
    const totalPoints = 
        stats.completedTasks * 5 + 
        (stats.waterIntake >= 8 ? 10 : 0) + 
        stats.exerciseSessions * 15 + 
        stats.notesTaken * 2;
    document.getElementById('totalPoints').textContent = totalPoints;
}

function initializeCharts(stats) {
    // Task completion chart
    const taskCtx = document.getElementById('taskChart').getContext('2d');
    new Chart(taskCtx, {
        type: 'bar',
        data: {
            labels: stats.last7Days.map(day => day.date),
            datasets: [{
                label: 'Tasks Completed',
                data: stats.last7Days.map(day => day.tasksCompleted),
                backgroundColor: '#4478a6',
                borderColor: '#2a3353',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Productivity chart
    const productivityCtx = document.getElementById('productivityChart').getContext('2d');
    new Chart(productivityCtx, {
        type: 'line',
        data: {
            labels: stats.last7Days.map(day => day.date),
            datasets: [{
                label: 'Productivity Score',
                data: stats.last7Days.map(day => day.productivity),
                backgroundColor: 'rgba(186, 168, 98, 0.2)',
                borderColor: '#baa862',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

function setupTimeFilters() {
    document.querySelectorAll('.time-filter').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.time-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update date range display
            const days = parseInt(this.dataset.range);
            let rangeText = '';
            
            if (days === 7) rangeText = 'Last 7 Days';
            else if (days === 30) rangeText = 'Last 30 Days';
            else if (days === 90) rangeText = 'Last 90 Days';
            
            document.getElementById('dateRange').textContent = rangeText;
            
            // In a real app, we would reload data for this time range
        });
    });
}

function setupSidebar() {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.sidebar nav li');
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}