import { Link } from "react-router-dom";

const pillars = [
  {
    title: "No manual filtering marathon",
    body: "Skip endless scrolling and keyword guessing. We sort opportunities by your competitiveness first."
  },
  {
    title: "Transparent match scores",
    body: "Every recommendation explains what matched, what is missing, and whether gaps are learnable on the job."
  },
  {
    title: "Peer reviews that reduce uncertainty",
    body: "See role-specific interview difficulty, team culture, and day-to-day responsibilities from upper-year students."
  },
  {
    title: "Feedback after rejection",
    body: "Trade silent outcomes for concrete insights. Learn why similar candidates were rejected and how to improve."
  }
];

function LandingPage() {
  return (
    <section className="landing-page">
      <div className="hero-panel">
        <h2>Stop Guessing. Start Matching. The Smarter Way to Find Your Next Co-op.</h2>
        <p>
          Co-op Compass helps risk-averse students apply strategically with confidence. You see match logic,
          skill gaps, and real student feedback before spending hours on applications.
        </p>
        <div className="hero-actions">
          <Link className="btn-primary" to="/onboarding">
            Upload Resume to See Your Matches
          </Link>
          <Link className="btn-secondary" to="/dashboard">
            Explore Sample Feed
          </Link>
        </div>
      </div>

      <div className="pillar-grid">
        {pillars.map((pillar) => (
          <article className="pillar-card" key={pillar.title}>
            <h3>{pillar.title}</h3>
            <p>{pillar.body}</p>
          </article>
        ))}
      </div>

      <div className="comparison-strip">
        <div>
          <h4>Traditional Portals</h4>
          <ul>
            <li>Hundreds of vague listings</li>
            <li>Unclear qualification fit</li>
            <li>No post-rejection closure</li>
          </ul>
        </div>
        <div>
          <h4>Co-op Compass</h4>
          <ul>
            <li>Curated recommendations by confidence</li>
            <li>Transparent scoring + missing skill analysis</li>
            <li>Crowdsourced rejection learning loop</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
