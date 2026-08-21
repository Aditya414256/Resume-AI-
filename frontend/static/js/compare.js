/**
 * compare.js — Client-side comparison logic using embedded ANALYSES data.
 */

(function () {
    'use strict';

    var selectA = document.getElementById('compare-a');
    var selectB = document.getElementById('compare-b');
    var btn = document.getElementById('compare-btn');

    function getById(id) {
        for (var i = 0; i < ANALYSES.length; i++) {
            if (ANALYSES[i].id === id) return ANALYSES[i];
        }
        return null;
    }

    function scoreColor(score) {
        if (score < 50) return '#ef4444';
        if (score < 75) return '#f59e0b';
        return '#10b981';
    }

    function renderComparison() {
        var a = getById(parseInt(selectA.value));
        var b = getById(parseInt(selectB.value));
        if (!a || !b) return;

        // Titles
        document.getElementById('title-a').textContent = a.filename + ' — ' + a.date;
        document.getElementById('title-b').textContent = b.filename + ' — ' + b.date;

        // Scores
        var scoreAEl = document.getElementById('score-a');
        var scoreBEl = document.getElementById('score-b');
        scoreAEl.textContent = a.overall_score;
        scoreBEl.textContent = b.overall_score;
        scoreAEl.style.color = scoreColor(a.overall_score);
        scoreBEl.style.color = scoreColor(b.overall_score);

        // Change summary
        var diff = b.overall_score - a.overall_score;
        var changeIcon = document.getElementById('change-icon');
        var changeText = document.getElementById('change-text');

        if (diff > 0) {
            changeIcon.innerHTML = '<svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>';
            changeText.textContent = '+' + diff + ' points improvement';
            changeText.className = 'text-sm font-semibold score-up';
        } else if (diff < 0) {
            changeIcon.innerHTML = '<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>';
            changeText.textContent = diff + ' points regression';
            changeText.className = 'text-sm font-semibold score-down';
        } else {
            changeIcon.innerHTML = '<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"/></svg>';
            changeText.textContent = 'No change';
            changeText.className = 'text-sm font-semibold score-same';
        }

        // Section rows
        var container = document.getElementById('section-rows');
        container.innerHTML = '';

        // Top-level metrics
        var metrics = [
            { label: 'Overall Score', aVal: a.overall_score, bVal: b.overall_score },
            { label: 'ATS Score', aVal: a.ats_score, bVal: b.ats_score },
        ];

        // Section scores
        var sectionKeys = ['contact', 'summary', 'experience', 'education', 'skills', 'projects'];
        for (var i = 0; i < sectionKeys.length; i++) {
            var key = sectionKeys[i];
            var secA = a.sections[key];
            var secB = b.sections[key];
            if (secA && secB) {
                metrics.push({
                    label: secB.name || key,
                    aVal: secA.score,
                    bVal: secB.score,
                });
            }
        }

        for (var j = 0; j < metrics.length; j++) {
            var m = metrics[j];
            var d = m.bVal - m.aVal;
            var row = document.createElement('div');
            row.className = 'flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/50 transition';

            var labelSpan = '<span class="text-sm font-medium text-gray-700">' + m.label + '</span>';

            var valuesHtml = '<div class="flex items-center gap-4 text-sm">';
            valuesHtml += '<span class="font-semibold text-gray-400 w-8 text-right">' + m.aVal + '</span>';
            valuesHtml += '<span class="text-gray-300">→</span>';
            valuesHtml += '<span class="font-semibold w-8 text-right" style="color:' + scoreColor(m.bVal) + '">' + m.bVal + '</span>';

            if (d > 0) {
                valuesHtml += '<span class="inline-flex items-center gap-0.5 text-xs font-semibold score-up bg-emerald-50 px-2 py-0.5 rounded-full">+' + d + '</span>';
            } else if (d < 0) {
                valuesHtml += '<span class="inline-flex items-center gap-0.5 text-xs font-semibold score-down bg-red-50 px-2 py-0.5 rounded-full">' + d + '</span>';
            } else {
                valuesHtml += '<span class="inline-flex items-center text-xs font-semibold score-same bg-gray-50 px-2 py-0.5 rounded-full">—</span>';
            }

            valuesHtml += '</div>';

            row.innerHTML = labelSpan + valuesHtml;
            container.appendChild(row);
        }
    }

    if (btn) btn.addEventListener('click', renderComparison);
    if (selectA) selectA.addEventListener('change', renderComparison);
    if (selectB) selectB.addEventListener('change', renderComparison);

    // Render on page load with defaults
    renderComparison();
})();
