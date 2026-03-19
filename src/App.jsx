import { NavLink, Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import JobDetailPage from "./pages/JobDetailPage";
import TrackerPage from "./pages/TrackerPage";
import { JOBS, STATUS_COLUMNS } from "./data/mockData";

const INITIAL_PROFILE = {
  skills: [],
  courses: [],
  experiences: []
};

const INITIAL_PREFERENCES = {
  minSalary: 28,
  industries: ["FinTech", "SaaS"],
  locations: ["Waterloo", "Toronto"],
  openToRemote: true
};

function normalize(value) {
  return value.trim().toLowerCase();
}

function hasSkill(profile, requirement) {
  const target = normalize(requirement);
  return [...profile.skills, ...profile.courses, ...profile.experiences].some((entry) =>
    normalize(entry).includes(target)
  );
}

export function calculateMatchScore(profile, job) {
  const requirementsMet = job.requirements.filter((requirement) => hasSkill(profile, requirement)).length;
  const requirementScore = Math.round((requirementsMet / job.requirements.length) * 80);
  const bonus = profile.skills.length >= 6 ? 12 : profile.skills.length * 2;
  const finalScore = Math.min(98, requirementScore + bonus + 6);
  return Number.isFinite(finalScore) ? finalScore : 0;
}

function App() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);
  const [applications, setApplications] = useState(() =>
    JOBS.map((job, index) => ({
      jobId: job.id,
      status: index < 2 ? "Saved" : "Applied",
      notes: ""
    }))
  );

  const jobsWithScore = useMemo(
    () =>
      JOBS.map((job) => ({
        ...job,
        matchScore: calculateMatchScore(profile, job)
      })),
    [profile]
  );

  function updateApplicationStatus(jobId, status) {
    setApplications((current) =>
      current.map((application) =>
        application.jobId === jobId ? { ...application, status } : application
      )
    );
  }

  function updateApplicationNotes(jobId, notes) {
    setApplications((current) =>
      current.map((application) =>
        application.jobId === jobId ? { ...application, notes } : application
      )
    );
  }

  return (
    <div className="app-shell">
      <header className="top-nav-wrapper">
        <div className="top-nav">
          <div className="brand-block">
            <span className="brand-kicker">Co-op Compass</span>
            <h1>Strategic co-op decisions, not blind applications.</h1>
          </div>
          <nav>
            <NavLink to="/" end>
              Landing
            </NavLink>
            <NavLink to="/onboarding">Onboarding</NavLink>
            <NavLink to="/dashboard">Smart Feed</NavLink>
            <NavLink to="/tracker">Tracker</NavLink>
          </nav>
        </div>
      </header>

      <main className="page-body">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/onboarding"
            element={
              <OnboardingPage
                profile={profile}
                setProfile={setProfile}
                preferences={preferences}
                setPreferences={setPreferences}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<DashboardPage jobs={jobsWithScore} preferences={preferences} />}
          />
          <Route
            path="/jobs/:jobId"
            element={<JobDetailPage jobs={jobsWithScore} profile={profile} />}
          />
          <Route
            path="/tracker"
            element={
              <TrackerPage
                jobs={jobsWithScore}
                applications={applications}
                statuses={STATUS_COLUMNS}
                updateApplicationStatus={updateApplicationStatus}
                updateApplicationNotes={updateApplicationNotes}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
