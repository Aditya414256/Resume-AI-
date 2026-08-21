/**
 * history.js — Chart.js line chart for score trend on the history page.
 */

function initHistoryChart(labels, scores) {
    var canvas = document.getElementById('historyChart');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');

    // Gradient fill
    var gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.01)');

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Resume Score',
                data: scores,
                borderColor: '#6366f1',
                backgroundColor: gradient,
                borderWidth: 2.5,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.35,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: { size: 12, family: 'Inter' },
                        color: '#9ca3af',
                    },
                    grid: {
                        color: '#f3f4f6',
                    },
                    border: { display: false },
                },
                x: {
                    ticks: {
                        font: { size: 12, family: 'Inter' },
                        color: '#9ca3af',
                    },
                    grid: { display: false },
                    border: { display: false },
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1f2937',
                    titleFont: { family: 'Inter', size: 13 },
                    bodyFont: { family: 'Inter', size: 12 },
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return 'Score: ' + context.parsed.y + '/100';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart',
            },
        }
    });
}
