// page-blog.jsx — The Journal

function JournalPage() {
  const [t, setTweak] = useStoredTweaks({ accentShade: "orchid", display: "sans", mode: "light" });
  React.useEffect(() => { applyTheme(t); }, [t]);

  const [filter, setFilter] = React.useState("All");
  const cats = ["All", ...Array.from(new Set(window.POSTS.map((p) => p.cat)))];
  const posts = filter === "All" ? window.POSTS : window.POSTS.filter((p) => p.cat === filter);
  const [feat, ...rest] = window.POSTS;

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Journal" />
      <PageHero
        eyebrow="The Journal"
        title="The why behind the protocol."
        kicker="Mechanism over hype. We teach how the therapies work, what the labs mean, and what we're actually seeing in member panels."
      />

      {/* Featured */}
      <section style={{ padding: "80px 0 40px" }}>
        <div className="wrap">
          <Reveal>
            <a href="#" data-collapse="true" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center", border: "1px solid var(--rule)", borderRadius: 18, overflow: "hidden", background: "var(--bg)" }}>
              <div className="img-frame" style={{ aspectRatio: "16 / 11", width: "100%" }}>
                <img src={feat.image} alt={feat.title} loading="eager" />
              </div>
              <div style={{ padding: "40px 48px 40px 8px" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>{feat.cat}</span>
                  <span style={{ fontSize: 12.5, color: "var(--ink-mute)" }}>{feat.date} · {feat.read}</span>
                </div>
                <h2 style={{ fontSize: "clamp(26px, 2.6vw, 36px)", lineHeight: 1.1, marginBottom: 16 }}>{feat.title}</h2>
                <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 24, maxWidth: 480 }}>{feat.excerpt}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontWeight: 600, fontSize: 14.5 }}>Read article <Arrow /></span>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Filter + grid */}
      <section style={{ padding: "40px 0 100px" }}>
        <div className="wrap">
          <Reveal>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
              {cats.map((c) => {
                const on = filter === c;
                return (
                  <button key={c} onClick={() => setFilter(c)} style={{
                    appearance: "none", fontFamily: "var(--sans)", fontSize: 13.5, padding: "9px 18px", cursor: "pointer",
                    border: `1px solid ${on ? "var(--accent)" : "var(--rule)"}`, background: on ? "var(--accent)" : "var(--bg)",
                    color: on ? "#FFFFFF" : "var(--ink)", borderRadius: 999, transition: "all 160ms ease", fontWeight: 500,
                  }}>{c}</button>
                );
              })}
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="edu-grid">
            {posts.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <a href="#" style={{ display: "flex", flexDirection: "column", border: "1px solid var(--rule)", borderRadius: 16, overflow: "hidden", background: "var(--bg)", height: "100%", color: "var(--ink)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  <div className="img-frame" style={{ aspectRatio: "16 / 10", width: "100%" }}>
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                  <div style={{ padding: "24px 24px 26px", display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>{p.cat}</span>
                      <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>{p.read}</span>
                    </div>
                    <h3 style={{ fontSize: 20, lineHeight: 1.2 }}>{p.title}</h3>
                    <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.55, flexGrow: 1 }}>{p.excerpt}</p>
                    <span style={{ fontSize: 12.5, color: "var(--ink-mute)", marginTop: 4 }}>{p.date}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
      <Footer />
      <StickyConsultPill />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<JournalPage />);
