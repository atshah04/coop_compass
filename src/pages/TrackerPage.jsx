import { useMemo, useState } from "react";

function TrackerPage({
  jobs,
  applications,
  statuses,
  updateApplicationStatus,
  updateApplicationNotes
}) {
  const [activeInsightJobId, setActiveInsightJobId] = useState(null);

  const jobsById = useMemo(
    () => Object.fromEntries(jobs.map((job) => [job.id, job])),
    [jobs]
  );

  const grouped = useMemo(() => {
    return statuses.reduce((accumulator, status) => {
      accumulator[status] = applications.filter((application) => application.status === status);
      return accumulator;
    }, {});
  }, [applications, statuses]);

  function handleStatusChange(jobId, status) {
    updateApplicationStatus(jobId, status);
    if (status === "Rejected") {
      setActiveInsightJobId(jobId);
    }
  }

  const activeJob = activeInsightJobId ? jobsById[activeInsightJobId] : null;

  return (
    <section className="tracker-page">
      <div className="section-head">
        <h2>Application Tracker & Feedback Hub</h2>
        <p>
          Move cards through each stage and get closure after rejection with aggregated patterns from similar
          applicants.
        </p>
      </div>

      <div className="kanban-grid">
        {statuses.map((status) => (
          <div className="kanban-column" key={status}>
            <h3>{status}</h3>
            {grouped[status].length === 0 && <p className="empty">No applications in this stage.</p>}
            {grouped[status].map((application) => {
              const job = jobsById[application.jobId];
              if (!job) return null;

              return (
                <article className="kanban-card" key={application.jobId}>
                  <h4>{job.role}</h4>
                  <p>{job.company}</p>
                  <label>
                    Move to
                    <select
                      value={application.status}
                      onChange={(event) => handleStatusChange(application.jobId, event.target.value)}
                    >
                      {statuses.map((nextStatus) => (
                        <option key={nextStatus} value={nextStatus}>
                          {nextStatus}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Notes
                    <textarea
                      rows="3"
                      value={application.notes}
                      placeholder="Add interview notes or reminders"
                      onChange={(event) => updateApplicationNotes(application.jobId, event.target.value)}
                    />
                  </label>
                </article>
              );
            })}
          </div>
        ))}
      </div>

      {activeJob && (
        <div className="insight-modal" role="dialog" aria-modal="true">
          <div className="insight-content">
            <h3>Post-rejection post-mortem: {activeJob.role}</h3>
            <p>
              You are not left guessing. Here is what previous applicants reported for similar rejections at this
              company and role type.
            </p>
            <ul>
              {activeJob.rejectionInsights.map((insight) => (
                <li key={insight}>{insight}</li>
              ))}
            </ul>
            <button type="button" className="btn-primary" onClick={() => setActiveInsightJobId(null)}>
              Close and plan next steps
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default TrackerPage;
