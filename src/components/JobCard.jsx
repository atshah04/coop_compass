import { Link } from "react-router-dom";
import MatchRing from "./MatchRing";

function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card-main">
        <div>
          <p className="eyebrow">{job.company}</p>
          <h4>{job.role}</h4>
          <p>
            {job.location} | {job.industry}
          </p>
        </div>
        <MatchRing score={job.matchScore} />
      </div>

      <div className="meta-row">
        <span>{job.salary ? `$${job.salary}/hr` : "Salary not listed"}</span>
        <span>Apply by {job.deadline}</span>
      </div>

      <div className="chip-row">
        {job.requirements.slice(0, 4).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <Link className="inline-link" to={`/jobs/${job.id}`}>
        View transparent alignment breakdown
      </Link>
    </article>
  );
}

export default JobCard;
