// home-sections.jsx — Hero, ServicesGrid (+ symptom filter), Approach, Peptides, Testimonials, QuizTeaser

function Hero() {
  return (
    <section style={{ position: "relative", padding: "64px 0 80px", overflow: "hidden" }}>
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 28 }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>Men's hormone optimization</span>
          <span className="eyebrow" style={{ color: "var(--ink-mute)" }}>Telehealth · Self-pay</span>
        </Reveal>

        <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center" }}>
          <div>
            <Reveal>
              <h1 style={{ fontSize: "clamp(40px, 5.4vw, 76px)", lineHeight: 1.02, marginBottom: 28, maxWidth: 720 }}>
                You built the career. The body and energy didn't keep up. <span style={{ color: "var(--accent)" }}>Fix that</span>.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 540, color: "var(--ink-soft)", marginBottom: 36 }}>
                The Optimized Human finds the hormonal root cause and builds a protocol around your labs. Testosterone, peptides, metabolic, longevity. Physician-supervised, self-pay, no fifteen-minute insurance visit.
              </p>
            </Reveal>
            <Reveal delay={200} style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginBottom: 48 }}>
              <BtnPrimary href="assessment.html">Take the 2-minute assessment</BtnPrimary>
              <BtnGhost href="contact.html">Book a consult</BtnGhost>
            </Reveal>

            <Reveal delay={280}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--rule)", paddingTop: 24 }}>
                {[
                  { k: "Men only", v: "One patient, not everyone" },
                  { k: "48hr", v: "Median to first visit" },
                  { k: "$0", v: "First consult" },
                ].map((s, i) => (
                  <div key={i} style={{ paddingRight: 16, borderLeft: i === 0 ? "none" : "1px solid var(--rule)", paddingLeft: i === 0 ? 0 : 24 }}>
                    <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 26, letterSpacing: "-0.02em" }}>{s.k}</div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 4 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div style={{ position: "relative" }}>
              <div className="img-frame" style={{ aspectRatio: "4 / 5", width: "100%", borderRadius: 12, boxShadow: "var(--shadow)" }}>
                <img src={window.IMG.hero} alt="High performer" loading="eager" />
              </div>
              <div style={{
                position: "absolute", bottom: -20, left: -28, background: "var(--bg)", border: "1px solid var(--rule)",
                padding: "18px 22px", width: 250, boxShadow: "var(--shadow)", display: "flex", flexDirection: "column", gap: 8, borderRadius: 12,
              }}>
                <div className="eyebrow" style={{ color: "var(--green-2)" }}>↑ 90-day outcome</div>
                <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 38, lineHeight: 1, letterSpacing: "-0.02em" }}>
                  +41<span style={{ fontSize: 20 }}>%</span>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Reported energy &amp; drive on protocol.</div>
              </div>
              <div style={{
                position: "absolute", top: 20, right: 20, background: "var(--green)", color: "var(--ink)",
                padding: "6px 12px", borderRadius: 999, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em",
                textTransform: "uppercase", fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink)" }}/>
                Accepting members
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{
          marginTop: 80, borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", padding: "14px 0",
          overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}>
          <div style={{ display: "flex", gap: 56, animation: "marq 40s linear infinite", whiteSpace: "nowrap", fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-soft)", fontWeight: 500 }}>
            {Array.from({ length: 3 }).map((_, k) => (
              <React.Fragment key={k}>
                <span><span style={{ color: "var(--accent)" }}>—</span>&nbsp; Testosterone Optimization</span>
                <span><span style={{ color: "var(--green-2)" }}>—</span>&nbsp; Sermorelin · BPC-157 · Ipamorelin</span>
                <span><span style={{ color: "var(--accent)" }}>—</span>&nbsp; Tirzepatide / Retatrutide</span>
                <span><span style={{ color: "var(--green-2)" }}>—</span>&nbsp; Full Thyroid Panel</span>
                <span><span style={{ color: "var(--accent)" }}>—</span>&nbsp; NAD+ · MOTS-c</span>
                <span><span style={{ color: "var(--green-2)" }}>—</span>&nbsp; Longevity &amp; Performance</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

function ServiceCard({ service: s, dimmed, recommended }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={s.href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "flex", flexDirection: "column", background: "var(--bg)",
      border: `1px solid ${recommended ? "var(--accent)" : "var(--rule)"}`, borderRadius: 14, overflow: "hidden",
      opacity: dimmed ? 0.4 : 1, transition: "opacity 200ms ease, transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
      transform: hover ? "translateY(-2px)" : "translateY(0)", boxShadow: hover ? "var(--shadow)" : "0 0 0 rgba(0,0,0,0)",
      position: "relative", textDecoration: "none", color: "var(--ink)",
    }}>
      {recommended && (
        <div style={{ position: "absolute", top: 14, right: 14, background: "var(--accent)", color: "#FFFFFF", padding: "4px 10px", borderRadius: 999, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, zIndex: 2 }}>
          ✓ Recommended
        </div>
      )}
      <div className="img-frame" style={{ aspectRatio: "16 / 10", width: "100%" }}>
        <img src={s.image} alt={s.title} loading="lazy" style={{ transition: "transform 600ms cubic-bezier(0.2, 0.7, 0, 1)", transform: hover ? "scale(1.04)" : "scale(1)" }}/>
      </div>
      <div style={{ padding: "24px 26px 26px", flexGrow: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>{s.no}</span>
          <span className="eyebrow" style={{ color: "var(--ink-mute)" }}>{s.id}</span>
        </div>
        <h3 style={{ fontSize: 26, lineHeight: 1.1, marginTop: 4 }}>{s.title}</h3>
        <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.5, flexGrow: 1 }}>{s.blurb}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 13.5, fontWeight: 600, marginTop: 6 }}>
          Learn more <Arrow />
        </div>
      </div>
    </a>
  );
}

function ServicesGrid() {
  const [picked, setPicked] = React.useState([]);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const relevantIds = React.useMemo(() => {
    if (picked.length === 0) return new Set();
    const set = new Set();
    picked.forEach((sid) => { const sym = window.SYMPTOMS.find((s) => s.id === sid); sym?.maps.forEach((id) => set.add(id)); });
    return set;
  }, [picked]);

  return (
    <section id="services" style={{ padding: "120px 0 60px" }}>
      <div className="wrap">
        <SectionLabel no="01" label="Services" />
        <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "end", marginBottom: 56 }}>
          <Reveal>
            <h2 style={{ fontSize: "var(--h1)", lineHeight: 1.03, maxWidth: 780 }}>
              Five pillars. <span style={{ color: "var(--accent)" }}>One body</span>, addressed in concert.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ fontSize: 16.5, color: "var(--ink-soft)", maxWidth: 480 }}>
              Every service runs the full panel. We treat what the labs show, not a checkbox of symptoms.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div style={{ padding: "20px 24px", background: "var(--bg-2)", border: "1px solid var(--rule)", borderRadius: 14, marginBottom: 28, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <span className="eyebrow" style={{ color: "var(--accent)" }}>Filter ↓</span>
            <span style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>What have you been feeling?</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {window.SYMPTOMS.map((s) => {
                const on = picked.includes(s.id);
                return (
                  <button key={s.id} onClick={() => toggle(s.id)} style={{
                    appearance: "none", fontFamily: "var(--sans)", fontSize: 12.5, padding: "6px 12px",
                    border: `1px solid ${on ? "var(--accent)" : "var(--rule)"}`, background: on ? "var(--accent)" : "var(--bg)",
                    color: on ? "#FFFFFF" : "var(--ink)", cursor: "pointer", borderRadius: 999, transition: "all 160ms ease",
                    display: "inline-flex", alignItems: "center", gap: 6,
                  }}>
                    {on && <Tick />}{s.label}
                  </button>
                );
              })}
              {picked.length > 0 && (
                <button onClick={() => setPicked([])} style={{ appearance: "none", background: "transparent", border: "none", color: "var(--ink-mute)", fontSize: 12, cursor: "pointer", fontFamily: "var(--mono)", letterSpacing: "0.05em", padding: "6px 8px" }}>
                  ↺ clear
                </button>
              )}
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {window.SERVICES.map((s, i) => {
            const span = i < 3 ? 2 : 3;
            const dimmed = picked.length > 0 && !relevantIds.has(s.id);
            const isRecommended = relevantIds.has(s.id);
            return (
              <Reveal key={s.id} delay={i * 70} style={{ gridColumn: `span ${span}` }} data-collapse="true">
                <ServiceCard service={s} dimmed={dimmed} recommended={isRecommended} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QuizTeaser() {
  return (
    <section style={{ padding: "80px 0" }}>
      <div className="wrap">
        <Reveal>
          <div style={{
            background: "var(--accent-tint)", border: "1px solid var(--rule)", borderRadius: 18,
            padding: "56px 56px", display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 48, alignItems: "center",
          }} data-collapse="true">
            <div>
              <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 18 }}>Not sure where you stand?</div>
              <h2 style={{ fontSize: "var(--h2)", lineHeight: 1.05, marginBottom: 18, maxWidth: 560 }}>
                Two minutes. Four questions. A straight read on whether your symptoms are hormonal.
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", maxWidth: 520, marginBottom: 28 }}>
                No email wall to see your result. If it points to something worth testing, we'll tell you. If it doesn't, we'll tell you that too.
              </p>
              <BtnPrimary href="assessment.html">Start the assessment</BtnPrimary>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 160, height: 160 }}>
                <svg viewBox="0 0 160 160" width="160" height="160">
                  <circle cx="80" cy="80" r="68" fill="none" stroke="var(--rule)" strokeWidth="10" />
                  <circle cx="80" cy="80" r="68" fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray="427" strokeDashoffset="120" transform="rotate(-90 80 80)" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 40, lineHeight: 1 }}>2:00</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>minutes</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section style={{ padding: "120px 0", background: "var(--bg-2)" }}>
      <div className="wrap">
        <SectionLabel no="02" label="Our approach" />
        <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 80, alignItems: "start", marginBottom: 0 }}>
          <div style={{ position: "sticky", top: 100 }}>
            <Reveal>
              <h2 style={{ fontSize: "var(--h1)", lineHeight: 1.03, marginBottom: 28, maxWidth: 540 }}>
                The opposite of the <span style={{ color: "var(--accent)" }}>fifteen-minute</span> visit.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: 460, marginBottom: 28 }}>
                We're self-pay by design. That buys us time, to read your full panel, to write a real protocol, and to recalibrate as your body responds.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="img-frame" style={{ aspectRatio: "5 / 4", width: "100%", borderRadius: 12 }}>
                <img src={window.IMG.consult} alt="Consultation" loading="lazy" />
              </div>
            </Reveal>
          </div>
          <div>
            {window.PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 32, padding: "32px 0", borderTop: "1px solid var(--rule)", borderBottom: i === window.PROCESS.length - 1 ? "1px solid var(--rule)" : "none", alignItems: "start" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.06em", color: "var(--accent)", paddingTop: 6 }}>{p.n}</div>
                  <div>
                    <h3 style={{ fontSize: 28, lineHeight: 1.05, marginBottom: 12 }}>{p.t}</h3>
                    <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.55, maxWidth: 520 }}>{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PeptidesShowcase() {
  const toneColor = (tone) => tone === "accent" ? "var(--accent)" : tone === "green" ? "var(--green-2)" : "var(--ink)";
  return (
    <section style={{ padding: "120px 0" }}>
      <div className="wrap">
        <SectionLabel no="03" label="Peptide therapy" />
        <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 56 }}>
          <Reveal>
            <h2 style={{ fontSize: "var(--h1)", lineHeight: 1.03, maxWidth: 520 }}>
              Targeted signaling. <span style={{ color: "var(--accent)" }}>Not a shotgun</span>.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: 480 }}>
              Peptides are precise messengers, prescribed in research-backed dosing windows and paired with your hormone protocol, not stacked at random.
            </p>
          </Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="edu-grid">
          {window.PEPTIDES.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <div style={{ border: "1px solid var(--rule)", borderRadius: 14, padding: "28px 26px", background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: toneColor(p.tone), opacity: 0.16 }} />
                <h3 style={{ fontSize: 22 }}>{p.name}</h3>
                <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>{p.use}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "First time in a decade a doctor actually read my whole panel and explained it. Energy's back, training's back, I feel like myself.", n: "Member, 43", d: "TRT + peptides" },
    { q: "I'd written off how I felt as just getting older. Turns out it was fixable. Three months in and the difference is night and day.", n: "Member, 47", d: "Hormone + metabolic" },
    { q: "No upsell, no fifteen-minute brush-off. They told me straight what to test and built the plan around it.", n: "Member, 39", d: "Longevity panel" },
  ];
  return (
    <section style={{ padding: "120px 0", background: "var(--ink)", color: "#FFFFFF" }}>
      <div className="wrap">
        <SectionLabel no="04" label="Members" light />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="edu-grid">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 90}>
              <div style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 16, padding: "32px 30px", height: "100%", display: "flex", flexDirection: "column", gap: 24, background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 40, lineHeight: 1, color: "var(--accent-3)" }}>"</div>
                <p style={{ fontSize: 16.5, lineHeight: 1.5, flexGrow: 1, color: "rgba(255,255,255,0.9)" }}>{t.q}</p>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{t.n}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: "0.05em", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{t.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", marginTop: 32, fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>
            Composite testimonials shown for layout. Replace with real, consented member quotes before launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
