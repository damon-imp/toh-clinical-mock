// app.jsx — Homepage root

const TWEAK_DEFAULTS = {
  accentShade: "orchid",
  display: "sans",
  mode: "light",
};

function App() {
  const [t, setTweak] = useStoredTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTheme(t); }, [t]);

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Home" />
      <Hero />
      <ServicesGrid />
      <QuizTeaser />
      <Approach />
      <PeptidesShowcase />
      <Testimonials />
      <CTABand />
      <Footer />
      <StickyConsultPill />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
