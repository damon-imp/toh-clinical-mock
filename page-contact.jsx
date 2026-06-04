// page-contact.jsx — Contact / consult booking

function ContactPage() {
  const [t, setTweak] = useStoredTweaks({ accentShade: "orchid", display: "sans", mode: "light" });
  React.useEffect(() => { applyTheme(t); }, [t]);

  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", goal: "Testosterone optimization", note: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = () => { if (form.name && form.email) setSent(true); };

  const field = {
    width: "100%", fontFamily: "var(--sans)", fontSize: 16, padding: "14px 16px",
    border: "1px solid var(--rule)", borderRadius: 12, background: "var(--bg)", color: "var(--ink)", outline: "none",
  };

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Contact" />
      <PageHero
        eyebrow="Book a consult"
        title="Fifteen minutes. No card on file."
        kicker="Tell us what's going on. We'll review your symptoms, explain what a full panel would show, and tell you straight whether we're the right fit."
      />

      <section style={{ padding: "100px 0" }}>
        <div className="wrap">
          <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "1fr 0.85fr", gap: 72, alignItems: "start" }}>
            {/* Form */}
            <Reveal>
              {!sent ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 540 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="edu-grid">
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 8 }}>Name</label>
                      <input style={field} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name"
                        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")} onBlur={(e) => (e.target.style.borderColor = "var(--rule)")} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 8 }}>Email</label>
                      <input style={field} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com"
                        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")} onBlur={(e) => (e.target.style.borderColor = "var(--rule)")} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 8 }}>What are you most focused on?</label>
                    <select style={{ ...field, appearance: "none" }} value={form.goal} onChange={(e) => set("goal", e.target.value)}>
                      {window.SERVICES.map((s) => <option key={s.id}>{s.title}</option>)}
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 8 }}>Anything you want us to know?</label>
                    <textarea style={{ ...field, minHeight: 120, resize: "vertical" }} value={form.note} onChange={(e) => set("note", e.target.value)} placeholder="Symptoms, history, questions…"
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")} onBlur={(e) => (e.target.style.borderColor = "var(--rule)")} />
                  </div>
                  <div>
                    <BtnPrimary onClick={submit} style={{ width: "100%", justifyContent: "center", padding: "16px 24px", fontSize: 15 }}>Request my consult</BtnPrimary>
                    <p style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 14, textAlign: "center" }}>No card required. We'll reply within one business day.</p>
                  </div>
                </div>
              ) : (
                <div style={{ background: "var(--accent-tint)", border: "1px solid var(--rule)", borderRadius: 18, padding: "48px 44px", maxWidth: 540 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: "var(--green)", color: "var(--ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Tick /></div>
                  <h2 style={{ fontSize: 28, marginBottom: 14 }}>Got it, {form.name.split(" ")[0]}.</h2>
                  <p style={{ fontSize: 16.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                    We'll reach out within one business day to get your free consult booked. In the meantime, take the assessment if you haven't, it gives your provider a head start.
                  </p>
                  <div style={{ marginTop: 28 }}><BtnGhost href="Assessment.html">Take the assessment</BtnGhost></div>
                </div>
              )}
            </Reveal>

            {/* Sidebar */}
            <Reveal delay={120}>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { h: "What happens next", b: "A quick reply to schedule, a 15-minute call to align, then labs if it's a fit. No pressure, no card on file for the consult." },
                  { h: "Who this is for", b: "High-performing men who are done feeling like a worse version of themselves and want a real protocol, not a fifteen-minute brush-off." },
                  { h: "Where we operate", b: "Telehealth, where licensed. We'll confirm coverage for your state on the call." },
                ].map((c, i) => (
                  <div key={i} style={{ borderTop: "1px solid var(--rule)", paddingTop: 20 }}>
                    <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 10 }}>{c.h}</div>
                    <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6 }}>{c.b}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ContactPage />);
