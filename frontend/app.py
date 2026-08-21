"""
AI Resume Analyzer — Flask Frontend Application
Serves only the frontend/UI layer with mock data.
No AI/LLM/API integration. Ready for future backend connection.
"""

from flask import Flask, render_template, redirect, url_for
from mock.analysis_data import (
    MOCK_ANALYSES,
    MOCK_HISTORY,
    MOCK_HISTORY_SUMMARY,
    get_analysis_by_id,
)

app = Flask(__name__)


# ─── Routes ──────────────────────────────────────────────────────────────


@app.route("/")
def landing():
    """Landing / marketing page."""
    return render_template("landing.html")


@app.route("/upload")
def upload():
    """Resume upload page."""
    return render_template("upload.html")


@app.route("/results/<int:analysis_id>")
def results(analysis_id):
    """Analysis results dashboard."""
    analysis = get_analysis_by_id(analysis_id)
    if analysis is None:
        # Fallback to the first mock analysis
        analysis = MOCK_ANALYSES[0]
    return render_template("results.html", analysis=analysis)


@app.route("/history")
def history():
    """Analysis history page."""
    return render_template(
        "history.html",
        analyses=MOCK_ANALYSES,
        history=MOCK_HISTORY,
        summary=MOCK_HISTORY_SUMMARY,
    )


@app.route("/compare")
def compare():
    """Compare two analyses side-by-side."""
    return render_template("compare.html", analyses=MOCK_ANALYSES)


# ─── Entry Point ─────────────────────────────────────────────────────────

if __name__ == "__main__":
    app.run(debug=True, port=5000)
