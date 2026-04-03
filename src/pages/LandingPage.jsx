import { Link } from "react-router-dom";
import landingJourneyVisual from "../assets/illustrations/landing-journey.svg";

const quickWins = [
  {
    label: "Listings triaged by confidence"
  },
  {
    label: "Skill gaps explained instantly"
  },
  {
    label: "Mentor + peer insights in one place"
  },
  {
    label: "Application tracker with momentum cues"
  }
];

const journeySteps = [
  {
    step: "Step 1",
    title: "Upload your resume",
    body: "Auto-parse skills and coursework in under a minute.",
    cta: "Start onboarding",
    to: "/onboarding"
  },
  {
    step: "Step 2",
    title: "Review your smart feed",
    body: "See the highest-confidence roles first so you know where to focus.",
    cta: "Open dashboard",
    to: "/dashboard"
  },
  {
    step: "Step 3",
    title: "Keep momentum",
    body: "Track every application and unblock gaps with mentor advice.",
    cta: "Go to tracker",
    to: "/tracker"
  }
];

function LandingPage() {
  return (
    <section className="landing-page">
      <div className="hero-layout">
        <div className="hero-panel">
          <p className="eyebrow">Built for students who need a clear next move</p>
          <h2>Know your best next co-op action in the first 30 seconds.</h2>
          <p>
            Parse your profile, see your strongest roles first, and track every application in one place.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/onboarding">
              Start with Resume Upload
            </Link>
            <Link className="btn-secondary" to="/dashboard">
              View Smart Feed Preview
            </Link>
          </div>

          <div className="quick-win-row" aria-label="Platform strengths at a glance">
            {quickWins.map((item) => (
              <span key={item.label}>{item.label}</span>
            ))}
          </div>
        </div>

        <aside className="hero-next-card" aria-label="Recommended first action">
          <img src={landingJourneyVisual} alt="Guided journey illustration" className="section-visual-image" />
          <p className="eyebrow">Start Here</p>
          <h3>First-time user checklist</h3>
          <ul>
            <li>Upload resume</li>
            <li>Set preferences</li>
            <li>Apply and track progress</li>
          </ul>
          <Link className="btn-primary" to="/onboarding">
            Complete Step 1 Now
          </Link>
        </aside>
      </div>

      <div className="journey-panel">
        <div className="section-head compact">
          <h3>Your guided journey</h3>
          <p>Follow this path to stay focused and fast.</p>
        </div>
        <div className="journey-grid">
          {journeySteps.map((step) => (
            <article className="journey-card" key={step.title}>
              <p className="journey-step">{step.step}</p>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
              <Link className="inline-link" to={step.to}>
                {step.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="comparison-strip">
        <div>
          <h4>Without Co-op Compass</h4>
          <ul>
            <li>High volume listings with low signal</li>
            <li>Unclear if you should spend time applying</li>
            <li>Little guidance after rejection</li>
          </ul>
        </div>
        <div>
          <h4>With Co-op Compass</h4>
          <ul>
            <li>Prioritized feed with visible confidence buckets</li>
            <li>Role-level gap breakdown and learnability labels</li>
            <li>Peer and mentor signals to improve next decisions</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
