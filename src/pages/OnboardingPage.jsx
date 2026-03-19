import { useMemo, useState } from "react";
import { INDUSTRIES, KEYWORD_COURSES, KEYWORD_SKILLS } from "../data/mockData";

function parseResumeText(rawText) {
  const text = rawText.toLowerCase();

  const skills = KEYWORD_SKILLS.filter((skill) => text.includes(skill)).map((skill) =>
    skill === "c++" ? "C++" : skill.charAt(0).toUpperCase() + skill.slice(1)
  );

  const courses = KEYWORD_COURSES.filter((course) => text.includes(course)).map((course) =>
    course
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );

  const experiences = [];
  if (text.includes("intern") || text.includes("co-op")) {
    experiences.push("Previous internship exposure");
  }
  if (text.includes("hackathon")) {
    experiences.push("Hackathon projects");
  }
  if (text.includes("teaching assistant")) {
    experiences.push("Teaching assistant experience");
  }

  return {
    skills: Array.from(new Set(skills)),
    courses: Array.from(new Set(courses)),
    experiences: Array.from(new Set(experiences))
  };
}

function TagInput({ label, values, onAdd, onRemove, placeholder }) {
  const [draft, setDraft] = useState("");

  function submitTag(event) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }
    onAdd(trimmed);
    setDraft("");
  }

  return (
    <div className="tag-block">
      <h4>{label}</h4>
      <div className="tag-list">
        {values.length === 0 && <p className="hint">No {label.toLowerCase()} extracted yet.</p>}
        {values.map((value) => (
          <button type="button" className="tag" key={value} onClick={() => onRemove(value)}>
            {value} x
          </button>
        ))}
      </div>
      <form onSubmit={submitTag} className="tag-form">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={placeholder}
          aria-label={`Add ${label}`}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function OnboardingPage({ profile, setProfile, preferences, setPreferences }) {
  const [step, setStep] = useState(1);
  const [uploadName, setUploadName] = useState("No resume uploaded yet.");
  const [status, setStatus] = useState("Upload your resume to auto-detect skills and coursework.");

  const completion = useMemo(() => {
    if (step === 1) return 33;
    if (step === 2) return 66;
    return 100;
  }, [step]);

  function addUniqueValue(field, value) {
    setProfile((current) => {
      const existing = new Set(current[field].map((entry) => entry.toLowerCase()));
      if (existing.has(value.toLowerCase())) {
        return current;
      }
      return { ...current, [field]: [...current[field], value] };
    });
  }

  function removeValue(field, value) {
    setProfile((current) => ({
      ...current,
      [field]: current[field].filter((entry) => entry !== value)
    }));
  }

  function handleResumeFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = String(event.target?.result ?? "");
      const parsed = parseResumeText(content);
      setProfile(parsed);
      setStatus("We parsed your resume. Please verify and add anything missing in Step 2.");
      setUploadName(file.name);
      setStep(2);
    };
    reader.readAsText(file);
  }

  function onDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    handleResumeFile(file);
  }

  function onFileInput(event) {
    const file = event.target.files?.[0];
    handleResumeFile(file);
  }

  function toggleIndustry(industry) {
    setPreferences((current) => {
      if (current.industries.includes(industry)) {
        return { ...current, industries: current.industries.filter((item) => item !== industry) };
      }
      return { ...current, industries: [...current.industries, industry] };
    });
  }

  function toggleLocation(location) {
    setPreferences((current) => {
      if (current.locations.includes(location)) {
        return { ...current, locations: current.locations.filter((item) => item !== location) };
      }
      return { ...current, locations: [...current.locations, location] };
    });
  }

  return (
    <section className="onboarding-page">
      <div className="section-head">
        <h2>Onboarding: Build your confidence profile</h2>
        <p>{status}</p>
      </div>

      <div className="progress-track" aria-label="Onboarding progress">
        <span style={{ width: `${completion}%` }} />
      </div>

      <div className="step-tabs">
        <button className={step === 1 ? "active" : ""} onClick={() => setStep(1)} type="button">
          Step 1: Resume Upload
        </button>
        <button className={step === 2 ? "active" : ""} onClick={() => setStep(2)} type="button">
          Step 2: Verify Parsing
        </button>
        <button className={step === 3 ? "active" : ""} onClick={() => setStep(3)} type="button">
          Step 3: Preferences
        </button>
      </div>

      {step === 1 && (
        <div className="upload-card">
          <div
            className="dropzone"
            onDrop={onDrop}
            onDragOver={(event) => event.preventDefault()}
            role="button"
            tabIndex={0}
          >
            <p>Drag and drop your resume here</p>
            <p className="hint">or upload a text-based resume file to simulate parsing</p>
            <label className="btn-secondary file-label" htmlFor="resumeFile">
              Select Resume File
            </label>
            <input id="resumeFile" type="file" onChange={onFileInput} />
          </div>
          <p className="upload-name">Uploaded file: {uploadName}</p>
        </div>
      )}

      {step === 2 && (
        <div className="verify-grid">
          <div className="verify-panel">
            <h3>Auto-parsed profile</h3>
            <TagInput
              label="Skills"
              values={profile.skills}
              onAdd={(value) => addUniqueValue("skills", value)}
              onRemove={(value) => removeValue("skills", value)}
              placeholder="Add a missing skill"
            />
            <TagInput
              label="Courses"
              values={profile.courses}
              onAdd={(value) => addUniqueValue("courses", value)}
              onRemove={(value) => removeValue("courses", value)}
              placeholder="Add a relevant course"
            />
            <TagInput
              label="Experiences"
              values={profile.experiences}
              onAdd={(value) => addUniqueValue("experiences", value)}
              onRemove={(value) => removeValue("experiences", value)}
              placeholder="Add a project or work experience"
            />
          </div>

          <aside className="verify-help">
            <h4>Why this matters</h4>
            <p>
              Your feed and match confidence are only as accurate as this profile. Add missing skills, coursework,
              or experiences so you do not under-estimate your competitiveness.
            </p>
            <button type="button" className="btn-primary" onClick={() => setStep(3)}>
              Looks good, continue
            </button>
          </aside>
        </div>
      )}

      {step === 3 && (
        <div className="preferences-card">
          <h3>Set your preferences</h3>
          <label>
            Minimum hourly salary: <strong>${preferences.minSalary}/hr</strong>
            <input
              type="range"
              min="20"
              max="50"
              value={preferences.minSalary}
              onChange={(event) =>
                setPreferences((current) => ({ ...current, minSalary: Number(event.target.value) }))
              }
            />
          </label>

          <div className="toggle-group">
            <p>Preferred industries</p>
            <div className="toggle-list">
              {INDUSTRIES.map((industry) => (
                <button
                  type="button"
                  key={industry}
                  onClick={() => toggleIndustry(industry)}
                  className={preferences.industries.includes(industry) ? "active" : ""}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          <div className="toggle-group">
            <p>Preferred locations</p>
            <div className="toggle-list">
              {["Waterloo", "Toronto", "Remote", "Vancouver"].map((location) => (
                <button
                  type="button"
                  key={location}
                  onClick={() => toggleLocation(location)}
                  className={preferences.locations.includes(location) ? "active" : ""}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={preferences.openToRemote}
              onChange={(event) =>
                setPreferences((current) => ({ ...current, openToRemote: event.target.checked }))
              }
            />
            Open to remote opportunities
          </label>

          <p className="hint">
            Tip: Hover over match scores in the dashboard to see how confidence is calculated.
          </p>
        </div>
      )}
    </section>
  );
}

export default OnboardingPage;
