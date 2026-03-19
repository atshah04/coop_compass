import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PEER_CHANNELS } from "../data/mockData";

function PeerConnectPage({ jobs }) {
  const [params] = useSearchParams();
  const jobIdFromUrl = params.get("jobId") ?? "";

  const [activeChannelId, setActiveChannelId] = useState(() => {
    const initial = PEER_CHANNELS.find((channel) => channel.jobId === jobIdFromUrl);
    return initial?.id ?? PEER_CHANNELS[0]?.id ?? "";
  });

  const [draft, setDraft] = useState("");
  const [channels, setChannels] = useState(PEER_CHANNELS);

  const jobLookup = useMemo(() => Object.fromEntries(jobs.map((job) => [job.id, job])), [jobs]);

  const filteredChannels = useMemo(() => {
    if (!jobIdFromUrl) {
      return channels;
    }
    return channels.filter((channel) => channel.jobId === jobIdFromUrl);
  }, [channels, jobIdFromUrl]);

  const activeChannel = channels.find((channel) => channel.id === activeChannelId) ?? filteredChannels[0] ?? null;

  function sendMessage(event) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || !activeChannel) {
      return;
    }

    setChannels((current) =>
      current.map((channel) => {
        if (channel.id !== activeChannel.id) {
          return channel;
        }

        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        return {
          ...channel,
          messages: [...channel.messages, { from: "student", text: message, time }]
        };
      })
    );

    setDraft("");
  }

  return (
    <section className="connect-page">
      <div className="section-head">
        <h2>Peer Connect Portal</h2>
        <p>
          Talk directly with students who interned in this exact company and position. Use these chats to get
          practical clarity before applying.
        </p>
      </div>

      <div className="connect-layout">
        <aside className="connect-sidebar">
          <h3>Available channels</h3>
          {filteredChannels.length === 0 && (
            <p className="empty">No channel found for this role yet. Try the general list from the top nav.</p>
          )}
          {filteredChannels.map((channel) => {
            const job = jobLookup[channel.jobId];
            return (
              <button
                key={channel.id}
                type="button"
                className={channel.id === activeChannel?.id ? "channel-button active" : "channel-button"}
                onClick={() => setActiveChannelId(channel.id)}
              >
                <strong>{channel.company}</strong>
                <span>{channel.role}</span>
                <small>{job ? `Match context: ${job.matchScore}%` : "Role context unavailable"}</small>
              </button>
            );
          })}
        </aside>

        <div className="chat-panel">
          {!activeChannel && (
            <div className="chat-empty">
              <p>Select a channel to start talking with past interns.</p>
            </div>
          )}

          {activeChannel && (
            <>
              <div className="chat-header">
                <div>
                  <p className="eyebrow">{activeChannel.company}</p>
                  <h3>{activeChannel.role}</h3>
                  <p>
                    Mentor: {activeChannel.mentor} | Class of {activeChannel.gradYear}
                  </p>
                </div>
                <p className="hint">{activeChannel.responseTime}</p>
              </div>

              <div className="chat-tags">
                {activeChannel.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="chat-stream">
                {activeChannel.messages.map((message, index) => (
                  <article
                    key={`${message.time}-${index}`}
                    className={message.from === "mentor" ? "bubble mentor" : "bubble student"}
                  >
                    <p>{message.text}</p>
                    <small>{message.from === "mentor" ? "Mentor" : "You"} · {message.time}</small>
                  </article>
                ))}
              </div>

              <form className="chat-input" onSubmit={sendMessage}>
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask about the interview, role expectations, or day-to-day work"
                />
                <button type="submit" className="btn-primary">
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default PeerConnectPage;
