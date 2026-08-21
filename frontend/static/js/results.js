/**
 * results.js — Chart.js helpers for the results dashboard.
 */

/**
 * Create a doughnut score gauge on a given canvas.
 * @param {string} canvasId - The canvas element ID.
 * @param {number} score - Score value 0–100.
 */
function initScoreGauge(canvasId, score) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var color;
    if (score < 50) color = '#ef4444';       // red
    else if (score < 75) color = '#f59e0b';  // amber
    else color = '#10b981';                   // emerald

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [score, 100 - score],
                backgroundColor: [color, '#f3f4f6'],
                borderWidth: 0,
                borderRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '78%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
            },
            animation: {
                animateRotate: true,
                duration: 1200,
                easing: 'easeOutQuart',
            },
        }
    });
}

/**
 * Toggle section detail visibility.
 */
function toggleDetails(id) {
    var el = document.getElementById(id);
    var btn = document.getElementById('toggle-btn-' + id);
    if (!el) return;

    if (el.style.maxHeight && el.style.maxHeight !== '0px') {
        el.style.maxHeight = '0px';
        el.style.opacity = '0';
        if (btn) btn.textContent = 'View details';
    } else {
        el.style.maxHeight = el.scrollHeight + 'px';
        el.style.opacity = '1';
        if (btn) btn.textContent = 'Hide details';
    }
}

/**
 * Display a temporary floating toast notification.
 */
function showToast(message) {
    var toast = document.getElementById('toast-notification');
    var toastMsg = document.getElementById('toast-message');
    if (!toast) return;

    if (toastMsg) toastMsg.textContent = message;
    toast.classList.remove('hidden', 'translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(function () {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(function () {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}
