// shared.jsx — Nav, Footer, AnnouncementBar, CTABand, PageHero, theme applier

function applyTheme(t) {
  const root = document.documentElement;
  const body = document.body;
  body.setAttribute("data-display", t.display || "sans");
  body.setAttribute("data-mode", t.mode === "dark" ? "dark" : "light");
  if (t.accentShade) {
    const map = {
      orchid:  { "--accent": "#AC66A7", "--accent-2": "#8E4F8A", "--accent-3": "#C68CC2", "--accent-tint": "#F3E9F2" },
      plum:    { "--accent": "#8E4F8A", "--accent-2": "#6E3C6B", "--accent-3": "#AC66A7", "--accent-tint": "#EFE3EE" },
      magenta: { "--accent": "#B5478F", "--accent-2": "#93396F", "--accent-3": "#D072AE", "--accent-tint": "#F7E5F0" },
    };
    const set = map[t.accentShade] || map.orchid;
    Object.entries(set).forEach(([k, v]) => root.style.setProperty(k, v));
  }
}

const MENU = [
  { label: "Services",      href: "services.html" },
  { label: "Assessment",    href: "assessment.html" },
  { label: "The Team",      href: "team.html" },
  { label: "Member Portal", href: "member-portal.html" },
  { label: "Journal",       href: "journal.html" },
  { label: "Contact",       href: "contact.html" },
];

function AnnouncementBar() {
  return (
    <div className="announce" style={{
      background: "var(--ink)", color: "#FFFFFF", fontFamily: "var(--sans)",
      fontSize: 12.5, letterSpacing: "0.005em", fontWeight: 500, padding: "9px 0", textAlign: "center",
    }}>
      <span style={{ color: "var(--green)" }}>●</span>
      &nbsp;Accepting new members · Telehealth · Free 15-minute consultation
    </div>
  );
}

function Nav({ current }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(255,255,255,0.9)" : "var(--bg)",
      backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
      borderBottom: "1px solid var(--rule)",
      transition: "background 200ms ease",
    }}>
      <div className="nav-wrap" style={{
        display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center",
        gap: 40, padding: "16px 40px", maxWidth: 1440, margin: "0 auto",
      }}>
        <Logo />
        <nav className="nav-desktop" style={{ display: "flex", justifyContent: "center", gap: 30 }}>
          {MENU.map((l) => {
            const active = current === l.label;
            return (
              <a key={l.label} href={l.href} style={{
                fontSize: 13.5, fontWeight: 500,
                color: active ? "var(--accent)" : "var(--ink)",
                position: "relative", paddingBottom: 4, transition: "color 180ms ease",
                borderBottom: active ? "1.5px solid var(--accent)" : "1.5px solid transparent",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? "var(--accent)" : "var(--ink)")}
              >{l.label}</a>
            );
          })}
        </nav>
        <div className="nav-cta-desktop" style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <BtnPrimary href="contact.html" style={{ padding: "10px 18px", fontSize: 13 }}>Book consult</BtnPrimary>
        </div>
        <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(!open)} style={{
          display: "none", appearance: "none", background: "transparent", border: "none",
          cursor: "pointer", padding: 8, flexDirection: "column", gap: 5, justifySelf: "end",
        }}>
          <span style={{ display: "block", width: 24, height: 2, background: "var(--ink)", borderRadius: 2, transition: "transform 200ms ease", transform: open ? "translateY(7px) rotate(45deg)" : "none" }}/>
          <span style={{ display: "block", width: 24, height: 2, background: "var(--ink)", borderRadius: 2, opacity: open ? 0 : 1, transition: "opacity 150ms ease" }}/>
          <span style={{ display: "block", width: 24, height: 2, background: "var(--ink)", borderRadius: 2, transition: "transform 200ms ease", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}/>
        </button>
      </div>

      {open && (
        <div className="nav-mobile-drawer" style={{ borderTop: "1px solid var(--rule)", background: "var(--bg)", padding: "8px 0 24px" }}>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {MENU.map((l) => {
              const active = current === l.label;
              return (
                <a key={l.label} href={l.href} style={{
                  fontSize: 16, fontWeight: 500, color: active ? "var(--accent)" : "var(--ink)",
                  padding: "15px 40px", borderBottom: "1px solid var(--rule-soft)",
                }}>{l.label}</a>
              );
            })}
            <div style={{ padding: "20px 40px 0" }}>
              <BtnPrimary href="contact.html" style={{ width: "100%", textAlign: "center", padding: "14px 18px", fontSize: 15, display: "block", justifyContent: "center" }}>Book consult</BtnPrimary>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function PageHero({ eyebrow, title, kicker }) {
  return (
    <section style={{
      position: "relative", padding: "80px 0 96px", background: "var(--bg-2)",
      borderBottom: "1px solid var(--rule)", overflow: "hidden",
    }}>
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal><div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 24 }}>{eyebrow}</div></Reveal>
        <Reveal delay={80}>
          <h1 style={{ fontSize: "clamp(40px, 5.4vw, 76px)", lineHeight: 1.02, maxWidth: 1000, marginBottom: 24 }}>{title}</h1>
        </Reveal>
        {kicker && (
          <Reveal delay={140}>
            <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 660, lineHeight: 1.55 }}>{kicker}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section style={{ position: "relative", padding: "120px 0", background: "var(--ink)", color: "#FFFFFF", overflow: "hidden" }}>
      <div style={{
        position: "absolute", right: "-12%", top: "-30%", width: 620, height: 620, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(172,102,167,0.35), transparent 65%)", pointerEvents: "none",
      }}/>
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal><div className="eyebrow" style={{ color: "var(--green)", marginBottom: 28 }}>Begin</div></Reveal>
        <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "end" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.0, marginBottom: 0, color: "#FFFFFF" }}>
              Your labs.<br/>Your protocol.<br/><span style={{ color: "var(--green)" }}>Your timeline.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", marginBottom: 32, lineHeight: 1.55 }}>
                A 15-minute consult, no card on file. We'll review your symptoms, walk you through what a full panel measures, and tell you straight whether we're the right fit.
              </p>
              <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                <BtnPrimary href="contact.html" style={{ background: "var(--green)", color: "var(--ink)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--green-2)"; e.currentTarget.style.color = "#FFFFFF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.color = "var(--ink)"; }}
                >Book free consult</BtnPrimary>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.06em", color: "rgba(255,255,255,0.55)" }}>
                  no card on file · 15 minutes
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: "Practice", links: ["Testosterone optimization", "Peptide therapy", "Metabolic & weight", "Longevity & performance"] },
    { h: "Company",  links: ["The Team", "Journal", "Member Portal", "Contact"] },
    { h: "Legal",    links: ["Privacy", "Terms", "Telehealth consent", "Self-pay policy"] },
  ];
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--rule)", padding: "72px 0 40px" }}>
      <div className="wrap">
        <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
          <div>
            <Logo />
            <p style={{ fontSize: 14, color: "var(--ink-soft)", maxWidth: 280, marginTop: 20, lineHeight: 1.6 }}>
              A men's hormone optimization practice for the high performer who's done feeling like a worse version of himself. Telehealth. Self-pay. Built around your labs.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 18 }}>{c.h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.links.map((l) => (
                  <a key={l} href="#" style={{ fontSize: 14, color: "var(--ink-soft)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-soft)")}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="rule" style={{ marginBottom: 24 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 12.5, color: "var(--ink-mute)" }}>© 2026 The Optimized Human. Telehealth services where licensed.</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--ink-mute)" }}>Self-pay · No insurance · Men only</div>
        </div>
        <p style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 24, lineHeight: 1.6, maxWidth: 900 }}>
          The information on this site is for educational purposes and is not medical advice. Therapies described are prescribed only after consultation, labs, and clinical evaluation by a licensed provider. Individual results vary.
        </p>
      </div>
    </footer>
  );
}

function StickyConsultPill() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href="contact.html" style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 60,
      display: "inline-flex", alignItems: "center", gap: 10,
      background: "var(--accent)", color: "#FFFFFF", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14,
      padding: "13px 20px", borderRadius: 999, boxShadow: "var(--shadow-accent)",
      opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)",
      pointerEvents: show ? "auto" : "none", transition: "opacity 300ms ease, transform 300ms ease",
    }}>
      Book free consult <Arrow />
    </a>
  );
}
