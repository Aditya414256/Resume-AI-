/**
 * upload.js — Handles the resume upload page interactions.
 *
 * Responsibilities:
 *  - Drag-and-drop + file input handling
 *  - PDF validation (type + size)
 *  - Job description toggle + character counter
 *  - Simulated loading animation (replace with backend call later)
 */

(function () {
    'use strict';

    // ── DOM References ──────────────────────────────────────────────
    const zone         = document.getElementById('upload-zone');
    const fileInput    = document.getElementById('file-input');
    const defaultUI    = document.getElementById('upload-default');
    const selectedUI   = document.getElementById('upload-selected');
    const fileNameEl   = document.getElementById('file-name');
    const fileSizeEl   = document.getElementById('file-size');
    const removeBtn    = document.getElementById('remove-file-btn');
    const fileError    = document.getElementById('file-error');
    const analyzeBtn   = document.getElementById('analyze-btn');
    const jdToggle     = document.getElementById('jd-toggle');
    const jdSection    = document.getElementById('jd-section');
    const jdChevron    = document.getElementById('jd-chevron');
    const jdInput      = document.getElementById('jd-input');
    const jdCount      = document.getElementById('jd-count');
    const overlay      = document.getElementById('loading-overlay');
    const loadingMsg   = document.getElementById('loading-message');
    const progressBar  = document.getElementById('loading-progress');

    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    let selectedFile = null;

    // ── Helpers ─────────────────────────────────────────────────────

    function formatBytes(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
    }

    function showError(msg) {
        fileError.textContent = msg;
        fileError.classList.remove('hidden');
        zone.classList.add('has-error');
        zone.classList.remove('has-file');
    }

    function clearError() {
        fileError.classList.add('hidden');
        zone.classList.remove('has-error');
    }

    function setFile(file) {
        clearError();

        // Validate type
        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
            showError('Please upload a PDF file.');
            resetFile();
            return;
        }
        // Validate size
        if (file.size > MAX_SIZE) {
            showError('File exceeds 5 MB limit. Please choose a smaller file.');
            resetFile();
            return;
        }

        selectedFile = file;
        fileNameEl.textContent = file.name;
        fileSizeEl.textContent = formatBytes(file.size);
        defaultUI.classList.add('hidden');
        selectedUI.classList.remove('hidden');
        zone.classList.add('has-file');
        fileInput.classList.add('pointer-events-none');
        analyzeBtn.disabled = false;
    }

    function resetFile() {
        selectedFile = null;
        fileInput.value = '';
        fileInput.classList.remove('pointer-events-none');
        defaultUI.classList.remove('hidden');
        selectedUI.classList.add('hidden');
        zone.classList.remove('has-file');
        analyzeBtn.disabled = true;
    }

    // ── File Input Events ───────────────────────────────────────────

    fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            setFile(this.files[0]);
        }
    });

    removeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        clearError();
        resetFile();
    });

    // ── Drag & Drop ─────────────────────────────────────────────────

    ['dragenter', 'dragover'].forEach(function (evt) {
        zone.addEventListener(evt, function (e) {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
    });

    ['dragleave', 'drop'].forEach(function (evt) {
        zone.addEventListener(evt, function (e) {
            e.preventDefault();
            zone.classList.remove('drag-over');
        });
    });

    zone.addEventListener('drop', function (e) {
        var files = e.dataTransfer.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    });

    // Keyboard accessibility
    zone.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInput.click();
        }
    });

    // ── JD Toggle ───────────────────────────────────────────────────

    jdToggle.addEventListener('click', function () {
        var expanded = jdSection.classList.toggle('expanded');
        jdToggle.setAttribute('aria-expanded', expanded);
        jdChevron.style.transform = expanded ? 'rotate(180deg)' : '';
    });

    jdInput.addEventListener('input', function () {
        jdCount.textContent = this.value.length;
    });

    // ── Simulated Analysis ──────────────────────────────────────────
    // NOTE: Replace this block with a real API call when the backend
    //       is connected. The loading UI can stay the same.

    var LOADING_STEPS = [
        { message: 'Uploading resume...', progress: 10 },
        { message: 'Extracting resume content...', progress: 25 },
        { message: 'Analyzing sections...', progress: 45 },
        { message: 'Checking ATS compatibility...', progress: 65 },
        { message: 'Comparing keywords...', progress: 80 },
        { message: 'Preparing your report...', progress: 95 },
    ];

    document.getElementById('upload-form').addEventListener('submit', function (e) {
        e.preventDefault();
        if (!selectedFile) return;

        // Show loading overlay
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        var stepIndex = 0;

        function nextStep() {
            if (stepIndex >= LOADING_STEPS.length) {
                // Done — navigate to mock results
                progressBar.style.width = '100%';
                setTimeout(function () {
                    window.location.href = '/results/1';
                }, 400);
                return;
            }

            var step = LOADING_STEPS[stepIndex];
            loadingMsg.style.opacity = '0';

            setTimeout(function () {
                loadingMsg.textContent = step.message;
                loadingMsg.style.opacity = '1';
                progressBar.style.width = step.progress + '%';
                stepIndex++;
                setTimeout(nextStep, 900 + Math.random() * 400);
            }, 200);
        }

        nextStep();
    });

})();
