# Cyrus portfolio

Hugo portfolio with a compact résumé layout inspired by https://unti.framer.website/.

## Run locally

```powershell
hugo server
```

Open the local URL printed by Hugo. Build production files with `hugo` (output: `public/`). Hugo Extended 0.124.1 is configured for Netlify.

The redesigned homepage, case studies, logo gallery, and poster gallery use `assets/css/resume.css` and the shared `layouts/partials/resume/` components. The Geist font is served locally. `static/js/resume.js` handles the Nairobi clock, saved theme preference, and theme controls.

The profile uses an initials tile until a personal photo is supplied. Download CV downloads the supplied PDF from `static/downloads/Cyrus_Kimurgor_CV.pdf`. Print styles remove controls and project thumbnails for a concise résumé. Experience copy uses the existing portfolio content; education and certifications were omitted because no verified details were available.

## Validation

- `hugo` builds successfully (existing missing section/taxonomy template warnings remain).
- `node --check static/js/resume.js` checks JavaScript syntax.
- Local links and image paths were checked for the homepage, four case studies, and both galleries.
- Browser screenshot verification was unavailable because the installed Edge browser failed to initialize its GPU process.
