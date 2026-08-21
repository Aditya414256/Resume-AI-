"""
Mock analysis data for the AI Resume Analyzer frontend.
This module provides realistic, fixed mock data that mirrors the expected
structure of the eventual n8n / backend API response.

Replace this module's data with real backend responses when integrating.
"""


def _section(name, score, status, feedback, details=None):
    """Helper to build a section dict."""
    return {
        "name": name,
        "score": score,
        "status": status,
        "feedback": feedback,
        "details": details or [],
    }


# ── Primary mock analysis (id=1) ─────────────────────────────────────────

ANALYSIS_1 = {
    "id": 1,
    "filename": "Aditya_Patil_Resume.pdf",
    "date": "August 20, 2026",
    "has_jd": True,
    "job_title": "Backend Developer",
    "badge": "Job Match Analysis",

    # Scores
    "overall_score": 78,
    "ats_score": 84,
    "content_score": 76,
    "keyword_match": 71,

    # Section-level analysis
    "sections": {
        "contact": _section(
            "Contact Information", 92, "Excellent",
            "Contact details are complete and well-formatted. Email, phone, LinkedIn, and GitHub are all present.",
            [
                "Email address is professional",
                "LinkedIn URL is included",
                "GitHub profile linked",
                "Phone number present",
            ],
        ),
        "summary": _section(
            "Professional Summary", 68, "Needs Improvement",
            "Your summary is present but could be more targeted toward the specific role you're applying for.",
            [
                "Summary exists but is generic",
                "Consider mentioning target role explicitly",
                "Add 1–2 measurable achievements",
                "Keep it to 2–3 concise sentences",
            ],
        ),
        "experience": _section(
            "Experience", 74, "Needs Improvement",
            "Your experience is relevant, but several bullets describe responsibilities instead of measurable outcomes.",
            [
                "3 experience entries found",
                "Action verbs used inconsistently",
                "Only 1 of 8 bullets includes metrics",
                "Consider adding quantified impact",
            ],
        ),
        "education": _section(
            "Education", 88, "Good",
            "Education section is well-structured with relevant coursework and GPA included.",
            [
                "Degree and institution clearly listed",
                "GPA included (3.7/4.0)",
                "Relevant coursework mentioned",
                "Expected graduation date present",
            ],
        ),
        "skills": _section(
            "Skills", 82, "Good",
            "Strong technical skills section with good variety. Consider organizing by proficiency level.",
            [
                "15 technical skills listed",
                "Mix of languages and frameworks",
                "Could benefit from categorization",
                "Some role-specific keywords missing",
            ],
        ),
        "projects": _section(
            "Projects", 70, "Needs Improvement",
            "Projects are relevant but descriptions lack technical depth and measurable outcomes.",
            [
                "3 projects listed",
                "Tech stack mentioned for each",
                "Descriptions are too brief",
                "No links to live demos or repos",
            ],
        ),
    },

    # Strengths
    "strengths": [
        "Strong technical skills section with relevant technologies",
        "Relevant academic projects aligned with target role",
        "Clear and complete education details",
        "Good use of action verbs in most bullets",
        "Clean, readable resume format",
    ],

    # Weaknesses
    "weaknesses": [
        "Experience bullets lack measurable impact and metrics",
        "Professional summary is too generic for the target role",
        "Keyword coverage could be improved for backend roles",
        "Project descriptions need more technical depth",
        "No certifications or online courses listed",
    ],

    # ATS
    "ats_issues": [
        {"text": "Missing standard 'Work Experience' section heading", "severity": "warning"},
        {"text": "Some bullets exceed recommended 120-character length", "severity": "warning"},
        {"text": "Contact information formatting could be simplified", "severity": "info"},
        {"text": "Consider adding more role-specific keywords", "severity": "warning"},
    ],
    "ats_passes": [
        "PDF format detected",
        "Standard section structure used",
        "Readable font and typography",
        "No tables or complex layouts blocking parsers",
        "Consistent date formatting",
        "No headers/footers that could confuse parsers",
    ],

    # Keywords (only relevant when JD is provided)
    "keywords": {
        "found": ["Python", "SQL", "Flask", "REST API", "Git", "MySQL", "JavaScript", "HTML/CSS"],
        "missing": ["Docker", "PostgreSQL", "CI/CD", "AWS", "Unit Testing", "Redis", "Kubernetes"],
    },

    # Recommendations
    "recommendations": [
        {
            "title": "Add measurable outcomes to experience bullets",
            "description": "Replace responsibility descriptions with impact-driven statements. Example: 'Reduced API response time by 40% by implementing caching layer.'",
        },
        {
            "title": "Tailor your summary toward the target role",
            "description": "Mention the specific role, your years of relevant experience, and 2–3 key skills that match the job description.",
        },
        {
            "title": "Add missing technical keywords where genuinely relevant",
            "description": "Incorporate keywords like Docker, CI/CD, and AWS if you have experience with them. Don't add keywords you can't discuss in an interview.",
        },
        {
            "title": "Improve project descriptions with technical depth",
            "description": "For each project, describe the problem solved, your approach, technologies used, and measurable results.",
        },
        {
            "title": "Simplify formatting for better ATS parsing",
            "description": "Use standard section headings (Work Experience, Education, Skills). Avoid special characters in headers.",
        },
    ],
}


# ── Second mock analysis (id=2) — earlier version, lower score ───────────

ANALYSIS_2 = {
    "id": 2,
    "filename": "Aditya_Patil_Resume_v2.pdf",
    "date": "August 2, 2026",
    "has_jd": False,
    "job_title": None,
    "badge": "General Analysis",

    "overall_score": 75,
    "ats_score": 80,
    "content_score": 72,
    "keyword_match": None,

    "sections": {
        "contact": _section("Contact Information", 90, "Excellent",
                            "Contact details are complete. Consider adding a portfolio link."),
        "summary": _section("Professional Summary", 62, "Needs Improvement",
                            "Summary is too vague. Specify your target role and key qualifications."),
        "experience": _section("Experience", 68, "Needs Improvement",
                               "Experience entries lack quantified achievements and specific results."),
        "education": _section("Education", 86, "Good",
                              "Education is well-presented with GPA and coursework included."),
        "skills": _section("Skills", 78, "Good",
                           "Good skill variety but missing some in-demand technologies."),
        "projects": _section("Projects", 65, "Needs Improvement",
                             "Projects need clearer descriptions of your technical contributions."),
    },

    "strengths": [
        "Clean resume layout and formatting",
        "Relevant educational background",
        "Good variety of technical skills",
        "Projects align with career goals",
    ],
    "weaknesses": [
        "No measurable impact in experience bullets",
        "Summary section is too generic",
        "Missing key industry keywords",
        "Project descriptions lack depth",
        "No certifications listed",
    ],
    "ats_issues": [
        {"text": "Section headings use non-standard names", "severity": "warning"},
        {"text": "Bullet points exceed recommended length", "severity": "warning"},
        {"text": "Consider a simpler contact section layout", "severity": "info"},
    ],
    "ats_passes": [
        "PDF format detected",
        "Readable font and size",
        "No complex tables or graphics",
        "Consistent formatting throughout",
    ],
    "keywords": {"found": [], "missing": []},
    "recommendations": [
        {
            "title": "Add quantified achievements",
            "description": "Include numbers, percentages, or metrics in your experience bullets to show impact.",
        },
        {
            "title": "Write a targeted summary",
            "description": "Replace the generic summary with one tailored to the type of role you want.",
        },
        {
            "title": "Expand project descriptions",
            "description": "Include the problem, your solution, tech stack, and results for each project.",
        },
        {
            "title": "Add relevant certifications",
            "description": "List any certifications or completed courses that support your skill claims.",
        },
        {
            "title": "Use standard section headings",
            "description": "Rename sections to standard ATS-friendly names like 'Work Experience' and 'Technical Skills'.",
        },
    ],
}


# ── Third mock analysis (id=3) ───────────────────────────────────────────

ANALYSIS_3 = {
    "id": 3,
    "filename": "Aditya_Patil_Resume_v1.pdf",
    "date": "July 14, 2026",
    "has_jd": False,
    "job_title": None,
    "badge": "General Analysis",
    "overall_score": 71,
    "ats_score": 76,
    "content_score": 68,
    "keyword_match": None,
    "sections": {
        "contact": _section("Contact Information", 85, "Good", "Basic contact info present. Add LinkedIn and GitHub."),
        "summary": _section("Professional Summary", 55, "Needs Improvement", "Summary is missing. Add a 2–3 sentence professional summary."),
        "experience": _section("Experience", 64, "Needs Improvement", "Experience descriptions are task-oriented rather than achievement-oriented."),
        "education": _section("Education", 84, "Good", "Education section is adequate with degree and GPA."),
        "skills": _section("Skills", 75, "Good", "Decent skills list but lacks organization."),
        "projects": _section("Projects", 60, "Needs Improvement", "Projects listed but descriptions are too short."),
    },
    "strengths": ["Relevant degree", "Some technical skills listed", "Clean formatting"],
    "weaknesses": ["No professional summary", "Experience lacks metrics", "Skills not categorized", "Projects need detail", "Missing LinkedIn"],
    "ats_issues": [
        {"text": "Missing professional summary section", "severity": "critical"},
        {"text": "Non-standard section headings", "severity": "warning"},
    ],
    "ats_passes": ["PDF format", "Readable font", "No tables"],
    "keywords": {"found": [], "missing": []},
    "recommendations": [
        {"title": "Add a professional summary", "description": "Write a 2–3 sentence summary highlighting your skills and career goals."},
        {"title": "Quantify experience", "description": "Add metrics and results to your experience bullets."},
        {"title": "Categorize skills", "description": "Group skills by type: Languages, Frameworks, Tools, etc."},
    ],
}

ANALYSIS_4 = {
    "id": 4,
    "filename": "Aditya_Patil_Resume_draft.pdf",
    "date": "June 28, 2026",
    "has_jd": False,
    "job_title": None,
    "badge": "General Analysis",
    "overall_score": 67,
    "ats_score": 72,
    "content_score": 64,
    "keyword_match": None,
    "sections": {
        "contact": _section("Contact Information", 80, "Good", "Contact info present but missing GitHub link."),
        "summary": _section("Professional Summary", 50, "Critical", "No summary section found."),
        "experience": _section("Experience", 60, "Needs Improvement", "Experience is listed but bullets are vague."),
        "education": _section("Education", 82, "Good", "Education adequately listed."),
        "skills": _section("Skills", 70, "Needs Improvement", "Skills listed but not organized or prioritized."),
        "projects": _section("Projects", 55, "Needs Improvement", "Only 1 project listed with minimal description."),
    },
    "strengths": ["Clean format", "Education section is solid"],
    "weaknesses": ["No summary", "Vague experience bullets", "Only one project", "Missing GitHub"],
    "ats_issues": [{"text": "Missing summary section", "severity": "critical"}, {"text": "Too few sections", "severity": "warning"}],
    "ats_passes": ["PDF format", "Readable font"],
    "keywords": {"found": [], "missing": []},
    "recommendations": [
        {"title": "Add more projects", "description": "Include 2–3 projects with detailed descriptions."},
        {"title": "Write a summary", "description": "Add a targeted professional summary."},
    ],
}

ANALYSIS_5 = {
    "id": 5,
    "filename": "Aditya_Patil_Resume_initial.pdf",
    "date": "June 12, 2026",
    "has_jd": False,
    "job_title": None,
    "badge": "General Analysis",
    "overall_score": 62,
    "ats_score": 68,
    "content_score": 58,
    "keyword_match": None,
    "sections": {
        "contact": _section("Contact Information", 75, "Good", "Basic contact info. Missing LinkedIn, GitHub, portfolio."),
        "summary": _section("Professional Summary", 45, "Critical", "No professional summary found."),
        "experience": _section("Experience", 55, "Needs Improvement", "Only internship listed with generic descriptions."),
        "education": _section("Education", 80, "Good", "Education section is present and clear."),
        "skills": _section("Skills", 65, "Needs Improvement", "Few skills listed. Add frameworks and tools."),
        "projects": _section("Projects", 48, "Critical", "No projects section found."),
    },
    "strengths": ["Education is clear", "Basic formatting is clean"],
    "weaknesses": ["No summary", "Very few skills", "No projects section", "Generic experience", "Missing online profiles"],
    "ats_issues": [{"text": "Missing summary", "severity": "critical"}, {"text": "Missing projects section", "severity": "critical"}, {"text": "Too few keywords", "severity": "warning"}],
    "ats_passes": ["PDF format", "Readable"],
    "keywords": {"found": [], "missing": []},
    "recommendations": [
        {"title": "Add projects section", "description": "List 2–3 technical projects with descriptions."},
        {"title": "Add a summary", "description": "Write a concise professional summary."},
        {"title": "Expand skills", "description": "Add frameworks, tools, and technologies you've used."},
    ],
}


# ── Aggregated collections ───────────────────────────────────────────────

MOCK_ANALYSES = [ANALYSIS_1, ANALYSIS_2, ANALYSIS_3, ANALYSIS_4, ANALYSIS_5]

MOCK_HISTORY = [
    {"date": "Jun 12", "score": 62},
    {"date": "Jun 28", "score": 67},
    {"date": "Jul 14", "score": 71},
    {"date": "Aug 2", "score": 75},
    {"date": "Aug 20", "score": 78},
]

MOCK_HISTORY_SUMMARY = {
    "total": 5,
    "best": 78,
    "latest": 78,
    "average": 71,
}


def get_analysis_by_id(analysis_id):
    """Look up an analysis by its integer id. Returns None if not found."""
    for a in MOCK_ANALYSES:
        if a["id"] == analysis_id:
            return a
    return None
