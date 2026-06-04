// page-providers.jsx — The Team

function TeamPage() {
  const [t, setTweak] = useStoredTweaks({ accentShade: "orchid", display: "sans", mode: "light" });
  React.useEffect(() => { applyTheme(t); }, [t]);

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="The Team" />
      <PageHero
        eyebrow="Who you work with"
        title="A founder who lived it, and the clinicians who prescribe it."
        kicker="The brand and the standard come from Jay. The medicine comes from licensed providers. That separation is deliberate, and it's how the practice scales without cutting corners."
      />

      <section style={{ padding: "100px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {window.PROVIDERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div data-collapse="true" style={{
                  display: "grid", gridTemplateColumns: "300px 1fr", gap: 48, alignItems: "center",
                  border: "1px solid var(--rule)", borderRadius: 18, padding: 24, background: i === 0 ? "var(--accent-tint)" : "var(--bg)",
                }}>
                  <div className="img-frame" style={{ aspectRatio: "1 / 1", width: "100%", borderRadius: 14 }}>
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </div>
                  <div style={{ padding: "8px 16px 8px 0" }}>
                    <h2 style={{ fontSize: 30, marginBottom: 8 }}>{p.name}</h2>
                    <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 20 }}>{p.role}</div>
                    <p style={{ fontSize: 16.5, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 24, maxWidth: 620 }}>{p.bio}</p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {p.creds.map((c) => (
                        <span key={c} style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: "0.04em", padding: "6px 12px", borderRadius: 999, background: "var(--bg-2)", border: "1px solid var(--rule)", color: "var(--ink-soft)" }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: "var(--bg-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal><div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 20 }}>How it works</div></Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontSize: "var(--h2)", lineHeight: 1.06, maxWidth: 760, margin: "0 auto 24px" }}>
              You get a brand that holds a standard and clinicians who own the medicine.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
              The Optimized Human is the experience, the education, and the accountability. Your prescriptions and clinical decisions are made by licensed providers under medical oversight. You always know who's doing what.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand />
      <Footer />
      <StickyConsultPill />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TeamPage />);
