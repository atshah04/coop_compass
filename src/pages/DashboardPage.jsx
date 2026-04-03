import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import dashboardFeedVisual from "../assets/illustrations/dashboard-feed.svg";

function groupByConfidence(jobs) {
  return {
    high: jobs.filter((job) => job.matchScore >= 85),
    stretch: jobs.filter((job) => job.matchScore >= 65 && job.matchScore < 85),
    safe: jobs.filter((job) => job.matchScore < 65)
  };
}

function DashboardPage({ jobs, preferences }) {
  const [sortBy, setSortBy] = useState("match");
  const [minimumMatch, setMinimumMatch] = useState(0);

  const filtered = useMemo(() => {
    const relevant = jobs.filter((job) => {
      const salaryPass = !job.salary || job.salary >= preferences.minSalary;
      const industryPass =
        preferences.industries.length === 0 || preferences.industries.includes(job.industry);
      const locationPass =
        preferences.locations.length === 0 ||
        preferences.locations.includes(job.location) ||
        (preferences.openToRemote && job.location === "Remote");
      return salaryPass && industryPass && locationPass && job.matchScore >= minimumMatch;
    });

    return [...relevant].sort((a, b) => {
      if (sortBy === "salary") return (b.salary ?? 0) - (a.salary ?? 0);
      if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
      return b.matchScore - a.matchScore;
    });
  }, [jobs, minimumMatch, preferences, sortBy]);

  const grouped = useMemo(() => groupByConfidence(filtered), [filtered]);
  const nextRecommendedRole = filtered[0];

  return (
    <section className="dashboard-page">
      <div className="section-head">
        <h2>Your Smart Job Feed</h2>
        <p>Roles ranked by fit, not posting order.</p>
      </div>

      <div className="section-visual-card">
        <img src={dashboardFeedVisual} alt="Smart feed board illustration" className="section-visual-image" />
      </div>

      <div className="next-step-banner" aria-label="Recommended next actions">
        <div className="next-step-heading">
          <p className="eyebrow">What should I do now?</p>
          <h3>Use this sequence</h3>
        </div>
        <div className="next-step-grid">
          <article>
            <p className="next-step-title">1. Apply to your strongest fit</p>
            <p className="hint">
              {nextRecommendedRole
                ? `${nextRecommendedRole.role} at ${nextRecommendedRole.company} currently has your top score.`
                : "No role yet. Lower filters to surface options."}
            </p>
          </article>
          <article>
            <p className="next-step-title">2. Save one stretch role</p>
            <p className="hint">Balance safe picks with growth.</p>
          </article>
          <article>
            <p className="next-step-title">3. Track everything</p>
            <p className="hint">Keep status and notes current.</p>
            <Link className="inline-link" to="/tracker">
              Open tracker
            </Link>
          </article>
        </div>
      </div>

      <div className="filter-bar">
        <label>
          Sort by
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="match">Match Percentage</option>
            <option value="salary">Salary</option>
            <option value="deadline">Application Deadline</option>
          </select>
        </label>
        <label>
          Minimum match: {minimumMatch}%
          <input
            type="range"
            min="0"
            max="95"
            value={minimumMatch}
            onChange={(event) => setMinimumMatch(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="feed-columns">
        <div className="feed-column">
          <h3>Highly Competitive For You</h3>
          <p className="hint">Strong role fit.</p>
          {grouped.high.length === 0 && <p className="empty">No roles in this category yet.</p>}
          {grouped.high.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="feed-column">
          <h3>Stretch Roles</h3>
          <p className="hint">Close fit with learnable gaps.</p>
          {grouped.stretch.length === 0 && <p className="empty">No roles in this category yet.</p>}
          {grouped.stretch.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="feed-column">
          <h3>Safe Bets</h3>
          <p className="hint">Lower risk options.</p>
          {grouped.safe.length === 0 && <p className="empty">No roles in this category yet.</p>}
          {grouped.safe.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
