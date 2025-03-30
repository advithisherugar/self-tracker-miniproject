document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    renderTaskChart();
    renderHabitChart();
    renderProductivityChart();
    renderCategoryChart();
    
    // Set up time period selector
    document.getElementById('timePeriod').addEventListener('change', function() {
        updateAllCharts(this.value);
    });
});

function renderTaskChart() {
    const ctx = document.getElementById('taskChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Completed Tasks',
                data: [12, 15, 8, 14, 10, 5, 7],
                backgroundColor: '#6c5ce7',
                borderRadius: 6,
                borderWidth: 0
            }, {
                label: 'Planned Tasks',
                data: [15, 18, 12, 16, 14, 8, 10],
                backgroundColor: '#a29bfe',
                borderRadius: 6,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#2d3436',
                    padding: 12,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            }
        }
    });
}

function renderHabitChart() {
    const ctx = document.getElementById('habitChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Missed', 'Partial'],
            datasets: [{
                data: [18, 4, 2],
                backgroundColor: [
                    '#00b894',
                    '#fd79a8',
                    '#fdcb6e'
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#2d3436',
                    padding: 12,
                    usePointStyle: true
                }
            }
        }
    });
}

function renderProductivityChart() {
    const ctx = document.getElementById('productivityChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Productivity Score',
                data: [65, 72, 80, 68],
                borderColor: '#6c5ce7',
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#6c5ce7',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#2d3436',
                    padding: 12,
                    usePointStyle: true
                }
            }
        }
    });
}

function renderCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Work', 'Personal', 'Health', 'Learning', 'Social'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#6c5ce7',
                    '#00b894',
                    '#fd79a8',
                    '#fdcb6e',
                    '#0984e3'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#2d3436',
                    padding: 12,
                    usePointStyle: true
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

function updateAllCharts(timeRange) {
    // In a real app, you would fetch new data based on the time range
    // Here we'll just simulate it by slightly randomizing the existing data
    
    console.log(`Updating charts for time range: ${timeRange}`);
    
    // This is where you would normally make an API call or filter your data
    // For this example, we'll just add some random variation
    
    // Reload all charts with slightly modified data
    renderTaskChart();
    renderHabitChart();
    renderProductivityChart();
    renderCategoryChart();
}