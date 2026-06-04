// page-portal.jsx — Member Portal: 3-view OS (Patient / Provider / Clinic Admin)
// Mirrors the Elevate portal, TOH-branded. Provider/Admin = MedLabIQ (TOH's EHR engine).

const PORTAL_MEDS = [
  { name: "Testosterone Cypionate", dose: "100 mg / wk", schedule: "Split E3.5D subcutaneous", refills: 2, next: "Jul 14", titrating: true },
  { name: "Anastrozole", dose: "0.25 mg", schedule: "Twice weekly", refills: 3, next: "Aug 02", titrating: false },
  { name: "Sermorelin", dose: "300 mcg", schedule: "Nightly, 5 on / 2 off", refills: 1, next: "Jul 20", titrating: false },
  { name: "Vitamin D3 + K2", dose: "5000 IU", schedule: "Daily with food", refills: 5, next: "Sep 10", titrating: false },
];

const PORTAL_LABS = [
  { n: "Total Testosterone", v: "612", u: "ng/dL", range: "300–1000", status: "ok" },
  { n: "Free Testosterone", v: "14.2", u: "pg/mL", range: "8.7–25", status: "ok" },
  { n: "Estradiol (E2)", v: "28", u: "pg/mL", range: "10–40", status: "ok" },
  { n: "SHBG", v: "32", u: "nmol/L", range: "16–55", status: "ok" },
  { n: "TSH", v: "2.1", u: "mIU/L", range: "0.4–4.0", status: "ok" },
  { n: "Free T3", v: "3.4", u: "pg/mL", range: "2.3–4.2", status: "ok" },
  { n: "Hematocrit", v: "48", u: "%", range: "38.3–48.6", status: "watch" },
  { n: "PSA", v: "0.8", u: "ng/mL", range: "0–4.0", status: "ok" },
  { n: "HbA1c", v: "5.1", u: "%", range: "4.0–5.6", status: "ok" },
];

const TOH_PATIENTS = [
  { id: "TOH-0481", name: "Michael R.", gender: "M", provider: "NP Carter", program: "TRT + peptides", critFlags: 0, status: "active", labsDue: false },
  { id: "TOH-0479", name: "Daniel K.", gender: "M", provider: "NP Carter", program: "TRT", critFlags: 1, status: "active", labsDue: true },
  { id: "TOH-0472", name: "Anthony S.", gender: "M", provider: "Dr. Vance", program: "Metabolic + TRT", critFlags: 0, status: "active", labsDue: false },
  { id: "TOH-0468", name: "Chris P.", gender: "M", provider: "Dr. Vance", program: "Longevity", critFlags: 0, status: "active", labsDue: true },
  { id: "TOH-0455", name: "Jordan M.", gender: "M", provider: "NP Carter", program: "Peptides", critFlags: 0, status: "active", labsDue: false },
  { id: "TOH-0431", name: "Eric T.", gender: "M", provider: "Dr. Vance", program: "TRT", critFlags: 0, status: "archived", labsDue: false },
];

const subtleBtn = { appearance: "none", background: "var(--bg)", border: "1px solid var(--rule)", padding: "7px 14px", fontSize: 12.5, fontFamily: "var(--sans)", color: "var(--ink)", cursor: "pointer", borderRadius: 10 };
const primaryBtn = { appearance: "none", background: "var(--accent)", border: "1px solid var(--accent)", padding: "7px 14px", fontSize: 12.5, fontFamily: "var(--sans)", color: "#FFFFFF", cursor: "pointer", borderRadius: 10 };
const ghostBtn = { appearance: "none", background: "var(--bg)", border: "1px solid var(--rule)", padding: "8px 14px", fontSize: 12.5, fontFamily: "var(--sans)", color: "var(--ink)", cursor: "pointer", borderRadius: 980 };

function PortalPage() {
  const [t, setTweak] = useStoredTweaks({ accentShade: "orchid", display: "sans", mode: "light" });
  React.useEffect(() => { applyTheme(t); }, [t]);

  const [authed, setAuthed] = React.useState(false);
  const [portal, setPortal] = React.useState("patient");
  const [tab, setTab] = React.useState("dashboard");

  const PORTALS = [
    { id: "patient", label: "Patient" },
    { id: "provider", label: "Provider" },
    { id: "admin", label: "Clinic Admin" },
  ];
  const PATIENT_TABS = [
    { id: "dashboard", label: "Dashboard" },
    { id: "appointments", label: "Appointments" },
    { id: "labs", label: "Labs & trends" },
    { id: "intelligence", label: "Lab intelligence" },
    { id: "protocol", label: "Protocol" },
    { id: "plan", label: "Plan of Care" },
    { id: "education", label: "Education" },
    { id: "pharmacy", label: "Pharmacy" },
    { id: "messages", label: "Messages" },
    { id: "billing", label: "Payment" },
  ];

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Member Portal" />
      {!authed ? (
        <PortalLogin onEnter={() => setAuthed(true)} />
      ) : (
        <div style={{ background: "var(--bg-2)", minHeight: "calc(100vh - 200px)" }}>
          <div className="wrap" style={{ paddingTop: 40, paddingBottom: 80 }}>
            <div className="portal-switch" style={{ display: "inline-flex", gap: 4, padding: 4, background: "var(--bg-3)", borderRadius: 980, marginBottom: 28 }}>
              {PORTALS.map((p) => {
                const on = portal === p.id;
                return (
                  <button key={p.id} onClick={() => setPortal(p.id)} style={{ appearance: "none", border: "none", cursor: "pointer", padding: "9px 20px", borderRadius: 980, fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: on ? 600 : 500, background: on ? "var(--bg)" : "transparent", color: on ? "var(--ink)" : "var(--ink-soft)", boxShadow: on ? "var(--shadow-sm)" : "none", transition: "all 160ms ease" }}>{p.label}</button>
                );
              })}
            </div>

            {portal === "patient" && (
              <React.Fragment>
                <PortalHeader />
                <div className="portal-tabs" style={{ display: "flex", gap: 4, marginTop: 28, marginBottom: 32, borderBottom: "1px solid var(--rule)" }}>
                  {PATIENT_TABS.map((tb) => {
                    const on = tab === tb.id;
                    return <button key={tb.id} onClick={() => setTab(tb.id)} style={{ appearance: "none", background: "transparent", border: "none", padding: "12px 18px", fontSize: 14, fontWeight: 500, color: on ? "var(--accent)" : "var(--ink-soft)", borderBottom: on ? "2px solid var(--accent)" : "2px solid transparent", cursor: "pointer", transition: "color 180ms ease", marginBottom: -1, fontFamily: "var(--sans)", whiteSpace: "nowrap" }}>{tb.label}</button>;
                  })}
                </div>
                {tab === "dashboard" && <DashboardView />}
                {tab === "appointments" && <AppointmentsView />}
                {tab === "labs" && <LabsView />}
                {tab === "intelligence" && <LabIntelligenceView />}
                {tab === "protocol" && <ProtocolView />}
                {tab === "plan" && <PlanView />}
                {tab === "education" && <EducationView />}
                {tab === "pharmacy" && <PharmacyView />}
                {tab === "messages" && <MessagesView />}
                {tab === "billing" && <BillingView />}
              </React.Fragment>
            )}
            {portal === "provider" && <MLQProviderView />}
            {portal === "admin" && <MLQAdminView />}
          </div>
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
}

function PortalLogin({ onEnter }) {
  return (
    <section style={{ padding: "100px 0 140px", background: "var(--bg-2)", minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="wrap" style={{ width: "100%" }}>
        <Reveal>
          <div style={{ maxWidth: 420, margin: "0 auto", background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 18, padding: "44px 40px", boxShadow: "var(--shadow)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><OHMark size={42} /></div>
            <h1 style={{ fontSize: 26, textAlign: "center", marginBottom: 8 }}>Member sign in</h1>
            <p style={{ fontSize: 14.5, color: "var(--ink-soft)", textAlign: "center", marginBottom: 32 }}>Powered by MedLabIQ · your labs, protocol, and care team in one place.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input placeholder="Email" style={{ width: "100%", fontFamily: "var(--sans)", fontSize: 15, padding: "14px 16px", border: "1px solid var(--rule)", borderRadius: 12, background: "var(--bg)", outline: "none" }} onFocus={(e) => (e.target.style.borderColor = "var(--accent)")} onBlur={(e) => (e.target.style.borderColor = "var(--rule)")} />
              <input placeholder="Password" type="password" style={{ width: "100%", fontFamily: "var(--sans)", fontSize: 15, padding: "14px 16px", border: "1px solid var(--rule)", borderRadius: 12, background: "var(--bg)", outline: "none" }} onFocus={(e) => (e.target.style.borderColor = "var(--accent)")} onBlur={(e) => (e.target.style.borderColor = "var(--rule)")} />
              <BtnPrimary onClick={onEnter} style={{ width: "100%", justifyContent: "center", padding: "15px", fontSize: 15 }}>Sign in</BtnPrimary>
            </div>
            <p style={{ fontSize: 12, color: "var(--ink-mute)", textAlign: "center", marginTop: 20 }}>Demo portal · click sign in to preview all three views</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PortalHeader() {
  return (
    <div style={{ background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 16, padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ width: 48, height: 48, borderRadius: 999, background: "var(--accent)", color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 600 }}>MR</span>
        <div>
          <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 4 }}>Welcome back</div>
          <h1 style={{ fontSize: 24 }}>Michael R.</h1>
        </div>
      </div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[{ k: "Week 6", v: "Of 12" }, { k: "92%", v: "Adherence" }, { k: "Jun 14", v: "Next visit" }].map((s, i) => (
          <div key={i} style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 20 }}>{s.k}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ title, children, action }) {
  return (
    <div style={{ background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 16, padding: "26px 26px" }}>
      {title && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600 }}>{title}</h3>
          {action && <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>{action}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

function DashboardView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }} className="edu-grid">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Card title="Next appointment" action="Reschedule">
          <div className="appt-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: "var(--accent-tint)", color: "var(--accent)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 20, lineHeight: 1 }}>14</span>
              <span style={{ fontSize: 10, letterSpacing: "0.05em" }}>JUN</span>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>Titration review</div>
              <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>with NP Carter · 10:30 AM · Telehealth</div>
            </div>
            <BtnGhost arrow={false} style={{ padding: "9px 16px", fontSize: 13 }}>Join</BtnGhost>
          </div>
        </Card>
        <Card title="Protocol adherence" action="Details">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[{ k: "92%", v: "This week" }, { k: "18", v: "Day streak" }, { k: "Wk 6", v: "Of 12" }].map((s, i) => (
              <div key={i} style={{ background: "var(--bg-2)", borderRadius: 12, padding: "18px 16px" }}>
                <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 26 }}>{s.k}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 4 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Recent labs" action="View all">
          <div className="lab-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {PORTAL_LABS.slice(0, 3).map((l) => (
              <div key={l.n} style={{ background: "var(--bg-2)", borderRadius: 12, padding: "16px 16px" }}>
                <div style={{ fontSize: 12, color: "var(--ink-mute)", marginBottom: 6 }}>{l.n}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 24 }}>{l.v}</span>
                  <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{l.u}</span>
                </div>
                <div style={{ fontSize: 11, color: l.status === "ok" ? "var(--green-2)" : "var(--accent)", marginTop: 4 }}>{l.status === "ok" ? "● optimal" : "● watch"}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Card title="Your protocol">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PORTAL_MEDS.map((m, i) => (
              <div key={m.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottom: i < PORTAL_MEDS.length - 1 ? "1px solid var(--rule-soft)" : "none" }}>
                <span style={{ fontSize: 14.5 }}>{m.name}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--ink-mute)" }}>active</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Care team" action="Message">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {window.PROVIDERS.slice(1).map((p) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src={p.image} alt={p.name} style={{ width: 40, height: 40, borderRadius: 999, objectFit: "cover" }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{p.role.split("·")[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function AppointmentsView() {
  const upcoming = [
    { date: "Jun 14", time: "10:30 AM", type: "Titration review", who: "NP Carter", method: "Telehealth", flag: "Intake due" },
    { date: "Sep 12", time: "11:00 AM", type: "Quarterly re-test", who: "NP Carter", method: "Telehealth", flag: null },
  ];
  const past = [
    { date: "May 02", type: "Lab review", who: "NP Carter", method: "Telehealth" },
    { date: "Apr 04", type: "Initial consult", who: "Dr. Vance", method: "Telehealth" },
    { date: "Mar 28", type: "Onboarding", who: "Care coordinator", method: "Phone" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="appt-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "center", padding: "14px 18px", background: "var(--accent-tint)", border: "1px solid var(--rule)", borderRadius: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}><Tick /></div>
        <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.5 }}><span style={{ fontWeight: 600 }}>Already booked.</span> Your Jun 14 titration review is confirmed. No need to schedule again.</div>
      </div>
      <Card title="Upcoming">
        {upcoming.map((a, i) => (
          <div key={i} className="appt-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "center", padding: "16px 0", borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}>
            <div style={{ minWidth: 64, textAlign: "center", padding: "8px 12px", background: "var(--accent-tint)", borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.06em" }}>{a.date.split(" ")[0].toUpperCase()}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--accent)" }}>{a.date.split(" ")[1]}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{a.type}{a.flag && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 600, color: "#8A5A00", background: "#FCF3E6", padding: "2px 8px", borderRadius: 6 }}>{a.flag}</span>}</div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>{a.time} · {a.who} · {a.method}</div>
            </div>
            <button style={subtleBtn}>Reschedule</button>
          </div>
        ))}
      </Card>
      <Card title="History">
        {past.map((a, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 1fr auto", gap: 16, alignItems: "center", padding: "13px 0", borderTop: i === 0 ? "none" : "1px solid var(--rule)", fontSize: 13.5 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--ink-soft)" }}>{a.date}</div>
            <div><span style={{ fontWeight: 500 }}>{a.type}</span> · <span style={{ color: "var(--ink-soft)" }}>{a.who}</span></div>
            <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>{a.method}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function LabsView() {
  return (
    <div>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 14.5, color: "var(--ink-soft)" }}>Last panel drawn May 28, 2026 · next re-test at week 12</p>
        <button style={ghostBtn}>Download PDF</button>
      </div>
      <div className="lab-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {PORTAL_LABS.map((l) => (
          <div key={l.n} style={{ background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 14, padding: "22px 22px" }}>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 10 }}>{l.n}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginBottom: 10 }}>
              <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 30 }}>{l.v}</span>
              <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>{l.u}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>{l.range}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: l.status === "ok" ? "var(--green-2)" : "var(--accent)" }}>{l.status === "ok" ? "● optimal" : "● watch"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sparkline({ data, color }) {
  const w = 160, h = 40, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LabIntelligenceView() {
  const trends = [
    { n: "Total Testosterone", series: [483, 1288, 601, 612], delta: "Stabilizing in optimal band", up: true },
    { n: "Hematocrit", series: [48.9, 51.1, 49.2, 48.0], delta: "Watching — keep hydrated", up: false },
    { n: "Estradiol", series: [28.6, 34, 31, 28], delta: "Well-managed on anastrozole", up: true },
    { n: "Free T3", series: [3.3, 3.4, 3.3, 3.4], delta: "Steady, thyroid stable", up: true },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card title="Lab intelligence">
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 640 }}>MedLabIQ tracks every marker across every draw and flags what's moving. This is the trend view your provider sees, translated into plain language.</p>
      </Card>
      <div className="lab-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {trends.map((tr) => (
          <div key={tr.n} style={{ background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 14, padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{tr.n}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>4 draws</span>
            </div>
            <Sparkline data={tr.series} color={tr.up ? "var(--green-2)" : "var(--accent)"} />
            <div style={{ fontSize: 13, color: tr.up ? "var(--green-2)" : "var(--accent)", marginTop: 14 }}>{tr.up ? "↑ " : "→ "}{tr.delta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProtocolView() {
  const [reporting, setReporting] = React.useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card title="Your optimization protocol">
        {PORTAL_MEDS.map((m, i) => (
          <div key={m.name} style={{ padding: "20px 0", borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}>
            <div className="appt-row" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr auto", gap: 24, alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{m.name}{m.titrating && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 600, color: "var(--accent)", background: "var(--accent-tint)", padding: "2px 8px", borderRadius: 6, verticalAlign: "middle" }}>TITRATING</span>}</div>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 2 }}>{m.dose}</div>
              </div>
              <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{m.schedule}</div>
              <div style={{ fontSize: 13.5, color: m.titrating ? "var(--ink-soft)" : "var(--green-2)" }}>{m.titrating ? "Adjust as needed" : `${m.refills} refills · ${m.next}`}</div>
              {m.titrating ? <button style={subtleBtn} onClick={() => setReporting(reporting === m.name ? null : m.name)}>Report dose change</button> : <button style={primaryBtn}>Refill</button>}
            </div>
            {m.titrating && reporting === m.name && (
              <div style={{ marginTop: 16, padding: 16, background: "var(--bg-2)", borderRadius: 12 }}>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 10, lineHeight: 1.5 }}>Adjusting based on how you feel? Tell us your new amount so your provider has it at your next review, no call needed.</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <input placeholder="e.g. 0.4 mL twice weekly" style={{ flex: 1, minWidth: 180, padding: "9px 14px", borderRadius: 980, border: "1px solid var(--rule)", fontFamily: "var(--sans)", fontSize: 13.5, background: "var(--bg)", color: "var(--ink)" }} />
                  <button style={primaryBtn} onClick={() => setReporting(null)}>Send to provider</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </Card>
      <Card title="Why titrating meds work differently">
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 640 }}>Some protocols get adjusted often based on how you respond. Instead of a fixed refill countdown, titrating meds let you report your current amount the moment you change it, so your provider always knows what you're actually taking.</p>
      </Card>
    </div>
  );
}

function PlanView() {
  const flags = [
    { sev: "watch", t: "Hematocrit trending up", d: "At 48%, within range but worth watching on TRT. Increase hydration; we'll recheck at week 12. Donating blood is an option if it climbs." },
    { sev: "good", t: "Free T in the optimal band", d: "You've moved from 11.9 to 14.2 pg/mL. This is the range where most men report the energy and drive returning. Hold the current dose." },
    { sev: "good", t: "Estradiol well-managed", d: "28 pg/mL on a low anastrozole dose. No symptoms of high or low E2 reported. No change needed." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card title="Your plan of care">
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 620 }}>Your provider's plan, written so it actually makes sense. What we found, what it means, and what we're doing about it.</p>
      </Card>
      <Card title="What your provider recommends">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {flags.map((f, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 18px", background: "var(--bg-2)", borderRadius: 12, alignItems: "start" }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, marginTop: 5, background: f.sev === "good" ? "var(--green)" : "var(--accent)" }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{f.t}</div>
                <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55 }}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function EducationView() {
  const GUIDES = [
    { cat: "Getting started", title: "What to expect in your first 30 days on protocol", type: "Guide", min: "5 min read" },
    { cat: "Testosterone", title: "Subcutaneous injection — full how-to walkthrough", type: "Video", min: "6 min" },
    { cat: "Peptides", title: "Reconstituting and dosing your peptides safely", type: "Video", min: "7 min" },
    { cat: "Labs", title: "How to read your panel (and what we watch)", type: "Guide", min: "8 min read" },
    { cat: "Estradiol", title: "Why E2 management matters on TRT", type: "Guide", min: "4 min read" },
    { cat: "Sleep", title: "Sermorelin, sleep architecture, and recovery", type: "Video", min: "5 min" },
    { cat: "Nutrition", title: "Eating for body composition on protocol", type: "Guide", min: "6 min read" },
    { cat: "Coaching", title: "The 12 Keys — your optimization framework", type: "Guide", min: "10 min read" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card title="Your education hub">
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 640 }}>Every guide, how-to video, and coaching resource for your protocol lives here. Watch how to give an injection, learn what each therapy does, and work through the 12 Keys at your own pace. No more digging through email.</p>
      </Card>
      <Card title="Guides, videos & coaching">
        <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {GUIDES.map((g, i) => {
            const isVideo = g.type === "Video";
            return (
              <button key={i} style={{ appearance: "none", textAlign: "left", background: "var(--bg-2)", border: "1px solid var(--rule)", borderRadius: 14, padding: 18, cursor: "pointer", fontFamily: "var(--sans)", color: "var(--ink)", display: "flex", gap: 16, alignItems: "center", transition: "border-color 180ms ease, background 180ms ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "var(--bg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.background = "var(--bg-2)"; }}>
                <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 8, background: isVideo ? "var(--accent-tint)" : "var(--green-tint)", color: isVideo ? "var(--accent)" : "var(--green-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{isVideo ? "▶" : "📄"}</div>
                <div style={{ minWidth: 0 }}>
                  <div className="eyebrow" style={{ marginBottom: 5, color: "var(--accent)" }}>{g.cat}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 5 }}>{g.title}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-mute)", fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>{g.type} · {g.min}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function PharmacyView() {
  const [requested, setRequested] = React.useState({});
  const CATALOG = window.PEPTIDES || [];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card title="Pharmacy & peptide menu">
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 620 }}>Browse what we offer, read what each one does, and request anything you're curious about. Tap "Request" and your care team reviews it with you. Nothing is ordered until your provider approves it.</p>
      </Card>
      <Card title="Supplements — powered by Fullscript" action="Open dispensary →">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center", padding: "20px 24px", background: "var(--bg-2)", border: "1px solid var(--rule)", borderRadius: 14 }}>
          <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 10, background: "var(--green-tint)", color: "var(--green-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>℞</div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 500, marginBottom: 4 }}>Your provider-built supplement protocol</div>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>Order practitioner-grade supplements at your member pricing, shipped to your door. Your recommendations sync straight from your protocol.</div>
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 11.5, color: "var(--ink-mute)", fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>Fullscript API integration — connects to live dispensary</div>
      </Card>
      <Card title="TOH peptide & therapy catalogue">
        <div className="pharm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {CATALOG.map((p, i) => {
            const on = requested[p.name];
            return (
              <div key={i} style={{ background: "var(--bg-2)", border: "1px solid var(--rule)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, flex: 1 }}>{p.use}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--ink-mute)" }}>member pricing</span>
                  <button onClick={() => setRequested({ ...requested, [p.name]: !on })} style={{ appearance: "none", padding: "8px 16px", fontSize: 13, fontWeight: 500, fontFamily: "var(--sans)", cursor: "pointer", borderRadius: 10, border: on ? "1px solid var(--green-2)" : "1px solid var(--accent)", background: on ? "var(--green-tint)" : "var(--accent)", color: on ? "var(--green-2)" : "#FFFFFF", transition: "all 160ms ease" }}>{on ? "✓ Request sent" : "Request"}</button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 18, fontSize: 12.5, color: "var(--ink-mute)", lineHeight: 1.55 }}>Requests go to your care team as a message. A provider reviews every request before anything is prescribed or ordered.</div>
      </Card>
    </div>
  );
}

function MessagesView() {
  const thread = [
    { from: "provider", t: "Labs look strong. Hematocrit ticked up to 48 — not alarming, but let's keep an eye. Hydration, and we'll recheck at week 12.", time: "Mon 9:14 AM" },
    { from: "me", t: "Good to know. Energy's been noticeably better the last two weeks.", time: "Mon 10:02 AM" },
    { from: "provider", t: "That tracks with Free T moving into the optimal band. Keep the protocol steady through your next review.", time: "Mon 10:20 AM" },
  ];
  return (
    <Card title="Messages">
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        {thread.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === "me" ? "flex-end" : "flex-start", maxWidth: "78%" }}>
            <div style={{ background: m.from === "me" ? "var(--accent)" : "var(--bg-2)", color: m.from === "me" ? "#FFFFFF" : "var(--ink)", border: m.from === "me" ? "none" : "1px solid var(--rule)", borderRadius: 16, padding: "14px 18px", fontSize: 15, lineHeight: 1.5 }}>{m.t}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-mute)", marginTop: 5, textAlign: m.from === "me" ? "right" : "left" }}>{m.time}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input placeholder="Message your care team…" style={{ flex: 1, fontFamily: "var(--sans)", fontSize: 15, padding: "14px 16px", border: "1px solid var(--rule)", borderRadius: 12, background: "var(--bg)", outline: "none" }} onFocus={(e) => (e.target.style.borderColor = "var(--accent)")} onBlur={(e) => (e.target.style.borderColor = "var(--rule)")} />
        <BtnPrimary arrow={false} style={{ padding: "14px 22px" }}>Send</BtnPrimary>
      </div>
    </Card>
  );
}

function BillingView() {
  return (
    <Card title="Payment method">
      <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 24, maxWidth: 560 }}>Your card on file is used for your membership and any approved orders. Update it anytime.</p>
      <div className="appt-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center", padding: "22px 24px", background: "var(--bg-2)", border: "1px solid var(--rule)", borderRadius: 14, maxWidth: 560 }}>
        <div style={{ width: 52, height: 34, borderRadius: 5, background: "linear-gradient(135deg, var(--accent), var(--accent-3))", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.08em" }}>VISA</div>
        <div>
          <div style={{ fontWeight: 500, fontSize: 15, fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>•••• •••• •••• 4242</div>
          <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 3 }}>Expires 08 / 28</div>
        </div>
        <button style={primaryBtn}>Update card</button>
      </div>
    </Card>
  );
}

function MLQProviderView() {
  const [sub, setSub] = React.useState("overview");
  const subTabs = [
    { id: "overview", label: "Overview" },
    { id: "charting", label: "Labs & charting" },
    { id: "plan", label: "Plan of Care" },
    { id: "meds", label: "Medications" },
  ];
  const flags = [
    { sev: "critical", t: "Hematocrit 48% and rising", d: "Trending up over last 3 draws on TRT. Recommend hydration counseling; consider dose frequency adjustment or therapeutic phlebotomy if >50%." },
    { sev: "warning", t: "LDL elevated (167 mg/dL)", d: "Up from baseline. Recommend lipid panel recheck and lifestyle review at next visit." },
    { sev: "ok", t: "Free T optimal (14.2 pg/mL)", d: "In target band. Hold current dose." },
  ];
  const sevColor = (s) => s === "critical" ? "#E5484D" : s === "warning" ? "#B7791F" : "var(--green-2)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="appt-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center", padding: "20px 22px", background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 16, boxShadow: "var(--shadow)" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent-tint)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>MR</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}>Patient chart · MedLabIQ</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Michael R.</div>
          <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>DOB 03/14/1984 · TOH-0481 · SC · Monthly TRT + peptides</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button style={ghostBtn}>Message</button>
          <button style={ghostBtn}>Order meds</button>
          <button style={primaryBtn}>Send notes</button>
        </div>
      </div>
      <div className="lab-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[{ n: 1, l: "Critical flags", c: "#E5484D" }, { n: 1, l: "To watch", c: "#B7791F" }, { n: 6, l: "Lab draws", c: "var(--ink)" }, { n: "May 02", l: "Last contact", c: "var(--ink)" }].map((s, i) => (
          <div key={i} style={{ padding: 16, background: "var(--bg-2)", borderRadius: 14 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.c, fontFamily: "var(--mono)" }}>{s.n}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div className="portal-tabs" style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--rule)" }}>
        {subTabs.map((tb) => {
          const on = sub === tb.id;
          return <button key={tb.id} onClick={() => setSub(tb.id)} style={{ appearance: "none", background: "transparent", border: "none", cursor: "pointer", padding: "12px 14px", fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: on ? 600 : 500, color: on ? "var(--accent)" : "var(--ink-soft)", borderBottom: on ? "2px solid var(--accent)" : "2px solid transparent", marginBottom: -1, whiteSpace: "nowrap" }}>{tb.label}</button>;
        })}
      </div>
      {sub === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Active flags &amp; recommendations</div>
          {flags.map((f, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 18px", background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 12, alignItems: "start" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: sevColor(f.sev), border: `1px solid ${sevColor(f.sev)}`, borderRadius: 6, padding: "3px 7px", marginTop: 2, whiteSpace: "nowrap" }}>{f.sev}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{f.t}</div>
                <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55 }}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {sub === "charting" && (
        <div className="lab-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {PORTAL_LABS.map((l) => (
            <div key={l.n} style={{ background: "var(--bg)", border: `1px solid ${l.status === "watch" ? "#B7791F" : "var(--rule)"}`, borderRadius: 14, padding: "20px 22px" }}>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8 }}>{l.n}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}><span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 26 }}>{l.v}</span><span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{l.u}</span></div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-mute)", marginTop: 6 }}>{l.range}</div>
            </div>
          ))}
        </div>
      )}
      {sub === "plan" && <div style={{ fontSize: 14, color: "var(--ink-soft)", padding: 20, background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 14, lineHeight: 1.6 }}>Provider plan-of-care editor. Document findings, set the protocol, and publish the plain-language version to the patient's portal. (Editor UI placeholder.)</div>}
      {sub === "meds" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PORTAL_MEDS.map((m) => (
            <div key={m.name} className="appt-row" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr auto", gap: 16, alignItems: "center", padding: "16px 18px", background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 12, fontSize: 14 }}>
              <div style={{ fontWeight: 600 }}>{m.name}</div>
              <div style={{ color: "var(--ink-soft)" }}>{m.dose}</div>
              <div style={{ color: "var(--ink-soft)" }}>{m.schedule}</div>
              <button style={primaryBtn}>e-Prescribe</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MLQAdminView() {
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const pts = TOH_PATIENTS;
  const total = pts.length;
  const active = pts.filter((p) => p.status === "active").length;
  const critFlags = pts.reduce((s, p) => s + (p.critFlags || 0), 0);
  const labsDue = pts.filter((p) => p.labsDue).length;
  const filtered = pts.filter((p) => {
    if (status !== "all" && p.status !== status) return false;
    if (q && !(`${p.name} ${p.id} ${p.provider}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="lab-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[{ n: total, l: "Total patients" }, { n: active, l: "Active" }, { n: critFlags, l: "Critical flags", c: "#E5484D" }, { n: labsDue, l: "Labs overdue", c: "#B7791F" }].map((s, i) => (
          <div key={i} style={{ padding: 16, background: "var(--bg-2)", borderRadius: 14 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.c || "var(--ink)", fontFamily: "var(--mono)" }}>{s.n}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, ID, provider" style={{ flex: 1, minWidth: 200, padding: "10px 14px", borderRadius: 980, border: "1px solid var(--rule)", fontFamily: "var(--sans)", fontSize: 14, background: "var(--bg)", color: "var(--ink)", outline: "none" }} />
        {["all", "active", "archived"].map((s) => (
          <button key={s} onClick={() => setStatus(s)} style={{ appearance: "none", cursor: "pointer", padding: "9px 16px", borderRadius: 980, fontFamily: "var(--sans)", fontSize: 13, fontWeight: 500, border: status === s ? "1px solid var(--accent)" : "1px solid var(--rule)", background: status === s ? "var(--accent)" : "var(--bg)", color: status === s ? "#fff" : "var(--ink-soft)", textTransform: "capitalize" }}>{s}</button>
        ))}
      </div>
      <div style={{ border: "1px solid var(--rule)", borderRadius: 14, overflow: "hidden", background: "var(--bg)" }}>
        <div className="mlq-roster-head" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr 0.8fr", gap: 12, padding: "12px 18px", background: "var(--bg-2)", fontSize: 11, fontWeight: 600, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          <div>Patient</div><div>Provider</div><div>Program</div><div>Flags</div><div>Status</div>
        </div>
        {filtered.map((p) => (
          <div key={p.id} className="mlq-roster-row" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr 0.8fr", gap: 12, padding: "14px 18px", borderTop: "1px solid var(--rule)", alignItems: "center", fontSize: 13.5 }}>
            <div>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-mute)", fontFamily: "var(--mono)" }}>{p.id} · {p.gender}</div>
            </div>
            <div style={{ color: "var(--ink-soft)" }}>{p.provider}</div>
            <div style={{ color: "var(--ink-soft)" }}>{p.program}</div>
            <div>{p.critFlags ? <span style={{ fontSize: 11, fontWeight: 700, color: "#E5484D", background: "#FDECEC", padding: "2px 8px", borderRadius: 6 }}>{p.critFlags}</span> : <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>—</span>}</div>
            <div><span style={{ fontSize: 11, fontWeight: 600, textTransform: "capitalize", color: p.status === "active" ? "var(--green-2)" : "var(--ink-mute)", background: p.status === "active" ? "var(--green-tint)" : "var(--bg-2)", padding: "3px 9px", borderRadius: 6 }}>{p.status}</span></div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: "var(--ink-mute)", fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>MedLabIQ · TOH clinic roster · demo data</div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PortalPage />);
