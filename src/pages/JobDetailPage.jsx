import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MatchRing from "../components/MatchRing";

function normalize(value) {
  return value.toLowerCase();
}

function hasMatch(profile, requirement) {
  const bag = [...profile.skills, ...profile.courses, ...profile.experiences].map(normalize);
  return bag.some((item) => item.includes(normalize(requirement)));
}

function JobDetailPage({ jobs, profile }) {
  const { jobId } = useParams();
  const [activeTab, setActiveTab] = useState("alignment");

  const job = jobs.find((item) => item.id === jobId);

  const breakdown = useMemo(() => {
    if (!job) {
      return { matched: [], missing: [] };
    }

    const matched = job.requirements.filter((requirement) => hasMatch(profile, requirement));
    const missing = job.requirements.filter((requirement) => !hasMatch(profile, requirement));
    return { matched, missing };
  }, [job, profile]);

  if (!job) {
    return (
      <section className="detail-page">
        <p>Job not found.</p>
        <Link className="inline-link" to="/dashboard">
          Back to dashboard
        </Link>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <div className="detail-hero">
        <div>
          <p className="eyebrow">{job.company}</p>
          <h2>{job.role}</h2>
          <p>
            {job.location} | {job.salary ? `$${job.salary}/hr` : "Salary not listed"} | Deadline {job.deadline}
          </p>
          <Link className="btn-secondary connect-link" to={`/connect?jobId=${job.id}`}>
            Message past interns for this exact role
          </Link>
        </div>
        <MatchRing score={job.matchScore} />
      </div>

      <div className="tab-row">
        <button
          type="button"
          className={activeTab === "alignment" ? "active" : ""}
          onClick={() => setActiveTab("alignment")}
        >
          Transparent Alignment
        </button>
        <button
          type="button"
          className={activeTab === "peer" ? "active" : ""}
          onClick={() => setActiveTab("peer")}
        >
          Peer Insights
        </button>
      </div>

      {activeTab === "alignment" && (
        <>
          <div className="side-by-side">
            <article>
              <h3>Job requirements</h3>
              <ul>
                {job.requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            </article>

            <article>
              <h3>Your matching evidence</h3>
              <ul>
                {breakdown.matched.length === 0 && <li>No direct matches yet. Add profile details in onboarding.</li>}
                {breakdown.matched.map((match) => (
                  <li key={match}>You have {match} in your profile.</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="gap-panel">
            <h3>Skill gap analysis</h3>
            {breakdown.missing.length === 0 && (
              <p className="positive">No critical gaps found. You are strongly competitive for this role.</p>
            )}
            {breakdown.missing.map((gap) => {
              const learnable = job.learnable.map((item) => item.toLowerCase()).includes(gap.toLowerCase());
              return (
                <div className="gap-row" key={gap}>
                  <div>
                    <p className="gap-skill">{gap}</p>
                    <p className="hint">
                      {learnable
                        ? "Likely learnable on the job with focused prep."
                        : "Potential dealbreaker without concrete evidence in projects."}
                    </p>
                  </div>
                  <span className={learnable ? "badge-learnable" : "badge-dealbreaker"}>
                    {learnable ? "Learnable" : "Dealbreaker Risk"}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === "peer" && (
        <div className="review-list">
          {job.reviews.map((review, index) => (
            <article key={`${review.from}-${index}`}>
              <h4>{review.from} Review</h4>
              <p>
                <strong>Interview difficulty:</strong> {review.interview}
              </p>
              <p>
                <strong>Actual day-to-day:</strong> {review.dayToDay}
              </p>
              <p>{review.quote}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default JobDetailPage;
