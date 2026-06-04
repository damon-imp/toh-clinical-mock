// page-services.jsx — Services detail page

function ServicesPage() {
  const [t, setTweak] = useStoredTweaks({ accentShade: "orchid", display: "sans", mode: "light" });
  React.useEffect(() => { applyTheme(t); }, [t]);

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Services" />
      <PageHero
        eyebrow="What we treat"
        title="The full panel. A real protocol. Ongoing optimization."
        kicker="Five focused services, each built on comprehensive labs and physician oversight. We treat the man, not the symptom checklist."
      />

      {window.SERVICES.map((s, i) => (
        <section key={s.id} id={s.id} style={{ padding: "96px 0", background: i % 2 ? "var(--bg-2)" : "var(--bg)", borderBottom: "1px solid var(--rule)" }}>
          <div className="wrap">
            <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: i % 2 ? "1fr 1.05fr" : "1.05fr 1fr", gap: 64, alignItems: "center" }}>
              <Reveal style={{ order: i % 2 ? 2 : 1 }}>
                <div className="img-frame" style={{ aspectRatio: "4 / 3", width: "100%", borderRadius: 14, boxShadow: "var(--shadow)" }}>
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
              </Reveal>
              <div style={{ order: i % 2 ? 1 : 2 }}>
                <Reveal>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 18 }}>
                    <span className="eyebrow" style={{ color: "var(--accent)" }}>{s.no}</span>
                    <span className="eyebrow" style={{ color: "var(--ink-mute)" }}>{s.id}</span>
                  </div>
                  <h2 style={{ fontSize: "var(--h2)", lineHeight: 1.05, marginBottom: 20 }}>{s.title}</h2>
                </Reveal>
                <Reveal delay={80}>
                  <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.55, marginBottom: 28, maxWidth: 520 }}>{s.detail}</p>
                </Reveal>
                <Reveal delay={140}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32, maxWidth: 480 }}>
                    {s.treats.map((tr) => (
                      <div key={tr} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, color: "var(--ink)" }}>
                        <span style={{ width: 20, height: 20, borderRadius: 999, background: "var(--accent-tint)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Tick /></span>
                        {tr}
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={200}>
                  <BtnPrimary href="Assessment.html">See if this fits you</BtnPrimary>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: "100px 0" }}>
        <div className="wrap-tight">
          <SectionLabel no="—" label="How pricing works" />
          <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="edu-grid">
            {[
              { t: "Free consult", p: "$0", d: "15 minutes. We review your symptoms and tell you honestly whether testing makes sense." },
              { t: "Comprehensive panel", p: "From lab cost", d: "Full hormonal, metabolic, and thyroid workup. Drawn locally or shipped." },
              { t: "Membership", p: "Monthly", d: "Protocol, medication, monitoring, and recalibration. Flat self-pay, no insurance." },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ border: "1px solid var(--rule)", borderRadius: 14, padding: "30px 28px", height: "100%", background: i === 2 ? "var(--accent-tint)" : "var(--bg)" }}>
                  <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 14 }}>{c.t}</div>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 32, marginBottom: 12 }}>{c.p}</div>
                  <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.55 }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 24, fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>
              Placeholder pricing structure for layout. Real numbers set during the build.
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
root.render(<ServicesPage />);
