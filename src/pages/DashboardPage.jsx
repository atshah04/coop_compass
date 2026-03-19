import { useMemo, useState } from "react";
import JobCard from "../components/JobCard";

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

  return (
    <section className="dashboard-page">
      <div className="section-head">
        <h2>Your Smart Job Feed</h2>
        <p>
          We prioritize clarity over quantity. These listings are ranked by how competitive you are, not by who
          posted most recently.
        </p>
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
          <p className="hint">Strong alignment across required skills and courses.</p>
          {grouped.high.length === 0 && <p className="empty">No roles in this category yet.</p>}
          {grouped.high.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="feed-column">
          <h3>Stretch Roles</h3>
          <p className="hint">You are close. A few missing capabilities are likely learnable.</p>
          {grouped.stretch.length === 0 && <p className="empty">No roles in this category yet.</p>}
          {grouped.stretch.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="feed-column">
          <h3>Safe Bets</h3>
          <p className="hint">Lower uncertainty roles to maintain momentum in competitive cycles.</p>
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
