// page-quiz.jsx — The Assessment (interactive symptom quiz)

function AssessmentPage() {
  const [t, setTweak] = useStoredTweaks({ accentShade: "orchid", display: "sans", mode: "light" });
  React.useEffect(() => { applyTheme(t); }, [t]);

  const [phase, setPhase] = React.useState("intro"); // intro | quiz | result
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});

  const Q = window.QUIZ_FULL;
  const total = Q.length;
  const q = Q[step];
  const isLast = step === total - 1;

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const max = total * 3;
  const pct = max ? score / max : 0;
  const band = pct < 0.34 ? "low" : pct < 0.67 ? "mid" : "high";

  const choose = (v) => {
    setAnswers((a) => ({ ...a, [q.id]: v }));
    if (isLast) setTimeout(() => setPhase("result"), 280);
    else setTimeout(() => setStep((s) => s + 1), 220);
  };
  const reset = () => { setPhase("intro"); setStep(0); setAnswers({}); };

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Assessment" />
      {phase === "intro" && <QuizIntro onStart={() => setPhase("quiz")} />}
      {phase === "quiz" && <QuizExperience step={step} total={total} q={q} answers={answers} onChoose={choose} onBack={() => setStep((s) => Math.max(0, s - 1))} />}
      {phase === "result" && <QuizResult band={band} reset={reset} />}
      <CTABand />
      <Footer />
    </React.Fragment>
  );
}

function QuizIntro({ onStart }) {
  return (
    <section style={{ padding: "80px 0 120px", background: "var(--bg-2)", position: "relative", overflow: "hidden" }}>
      <div className="wrap-tight" style={{ position: "relative", textAlign: "center" }}>
        <Reveal><div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 24 }}>The Assessment</div></Reveal>
        <Reveal delay={80}>
          <h1 style={{ fontSize: "clamp(38px, 5vw, 64px)", lineHeight: 1.04, marginBottom: 24, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
            Seven questions. A straight read on whether what you're feeling is hormonal.
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.55 }}>
            No email wall. You see your result the moment you finish. About two minutes.
          </p>
        </Reveal>
        <Reveal delay={200} style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <BtnPrimary onClick={onStart} arrow>Begin</BtnPrimary>
        </Reveal>
        <Reveal delay={260}>
          <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.05em", color: "var(--ink-mute)" }}>
            <span>2 MINUTES</span><span>·</span><span>7 QUESTIONS</span><span>·</span><span>NO SIGNUP</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function QuizExperience({ step, total, q, answers, onChoose, onBack }) {
  const pct = Math.round((step / total) * 100);
  return (
    <section style={{ padding: "60px 0 120px", minHeight: "70vh" }}>
      <div className="wrap-tight" style={{ maxWidth: 760 }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--ink-mute)" }}>QUESTION {step + 1} / {total}</span>
            {step > 0 && (
              <button onClick={onBack} style={{ appearance: "none", background: "transparent", border: "none", color: "var(--ink-soft)", fontSize: 13, cursor: "pointer", fontFamily: "var(--sans)" }}>← Back</button>
            )}
          </div>
          <div style={{ height: 4, background: "var(--bg-3)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "var(--accent)", borderRadius: 999, transition: "width 300ms cubic-bezier(0.2,0.7,0,1)" }} />
          </div>
        </div>

        <Reveal key={q.id}>
          <h2 style={{ fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, marginBottom: 40, maxWidth: 640 }}>{q.q}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {q.a.map((opt) => {
              const on = answers[q.id] === opt.v;
              return (
                <button key={opt.v} onClick={() => onChoose(opt.v)} style={{
                  appearance: "none", textAlign: "left", fontFamily: "var(--sans)", fontSize: 17,
                  padding: "20px 24px", borderRadius: 14, cursor: "pointer",
                  border: `1px solid ${on ? "var(--accent)" : "var(--rule)"}`,
                  background: on ? "var(--accent-tint)" : "var(--bg)", color: "var(--ink)",
                  transition: "all 160ms ease", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                }}
                  onMouseEnter={(e) => { if (!on) { e.currentTarget.style.borderColor = "var(--accent-3)"; e.currentTarget.style.background = "var(--bg-2)"; } }}
                  onMouseLeave={(e) => { if (!on) { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.background = "var(--bg)"; } }}
                >
                  <span>{opt.label}</span>
                  <span style={{ width: 22, height: 22, borderRadius: 999, border: `2px solid ${on ? "var(--accent)" : "var(--rule)"}`, background: on ? "var(--accent)" : "transparent", color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {on && <Tick />}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function QuizResult({ band, reset }) {
  const r = window.RESULTS[band];
  const tone = band === "high" ? "var(--accent)" : band === "mid" ? "var(--accent)" : "var(--green-2)";
  return (
    <section style={{ padding: "80px 0 120px", background: "var(--bg-2)" }}>
      <div className="wrap-tight" style={{ maxWidth: 760 }}>
        <Reveal>
          <div style={{ background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 18, padding: "56px 48px", boxShadow: "var(--shadow)" }}>
            <div className="eyebrow" style={{ color: tone, marginBottom: 18 }}>Your result</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "clamp(36px, 4.4vw, 56px)", lineHeight: 1 }}>{r.band}</h1>
              <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.05em" }}>symptom signal</span>
            </div>
            <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 36, maxWidth: 560 }}>{r.copy}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
              <BtnPrimary href="Contact.html">Book your free consult</BtnPrimary>
              <BtnGhost onClick={reset} arrow={false}>Retake</BtnGhost>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ink-mute)", marginTop: 24, lineHeight: 1.6 }}>
              This assessment is educational and not a diagnosis. A licensed provider reviews your symptoms and labs before any protocol.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AssessmentPage />);
