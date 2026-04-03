function MatchRing({ score }) {
  const normalized = Math.max(0, Math.min(100, score));
  const color = normalized >= 85 ? "var(--match-high)" : normalized >= 65 ? "var(--match-mid)" : "var(--match-low)";

  return (
    <div
      className="match-ring"
      style={{
        background: `conic-gradient(${color} ${normalized}%, rgba(11, 34, 58, 0.12) ${normalized}% 100%)`
      }}
      title="Match score from requirement overlap and profile strength."
    >
      <span>{normalized}%</span>
    </div>
  );
}

export default MatchRing;
