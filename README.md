# The Optimized Human — Website Mock (v1)

A multi-page, mobile-optimized mock of the TOH men's hormone optimization practice site.
Apple-clean aesthetic, TOH brand (purple #E352FE accent, Outfit display), light-mode-first.

## This is a staging mock
Reference only, to be staged OUTSIDE the current live site. Not production, not wired to any backend.
Forms, login, and the portal are front-end mock interactions (no data is sent or stored).

## Pages
- **index.html** — homepage (hero, services + symptom filter, assessment teaser, approach, peptides, members, CTA)
- **services.html** — five service pillars in detail + pricing structure
- **assessment.html** — interactive 7-question symptom quiz with scored result
- **team.html** — founder + clinical providers, and how the MSO/clinician split works
- **member-portal.html** — login → tabbed dashboard (labs, protocol, education, messages)
- **journal.html** — article index with category filter
- **contact.html** — consult request form

## How to run
It's a static site using React + Babel loaded from CDN (unpkg). Two options:

1. **Open directly** — double-click `index.html`. (Some browsers block local `file://`
   loading of the `.jsx` files; if pages render blank, use option 2.)
2. **Serve locally** (recommended) — from this folder run:
   `python3 -m http.server 8000`
   then open `http://localhost:8000/index.html`

Requires an internet connection (React/Babel load from CDN).

## File structure
- `base.css` — design system (TOH brand on Apple-calm tokens) + full mobile layer
- `data.jsx` — all content (services, symptoms, peptides, quiz, providers, posts)
- `ui.jsx` — primitives (buttons, logo/OH mark, reveal animation, section labels)
- `shared.jsx` — Nav, Footer, announcement bar, CTA band, page hero, theme applier
- `home-sections.jsx` — homepage sections
- `app.jsx` + `page-*.jsx` — page roots

## Notes before this becomes real
- Photos are Unsplash placeholders. Swap for real TOH/brand photography.
- Testimonials are composite placeholders. Replace with real, consented member quotes.
- Pricing blocks are layout placeholders. Set real numbers.
- The OH logo is drawn as inline SVG to keep the mock self-contained; swap for the real asset.
- Provider names/credentials are placeholders except Jay.

Built by Damon Aleczander · 2026
