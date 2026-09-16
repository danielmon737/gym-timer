# gym-timer — CLAUDE.md

Workout timer PWA plus the home for the week's strength sessions. Single-file app: `index.html`
(free timers + block runner), `sw.js`, `manifest.json`, icons, `sessions.json`, `exercises.json`.
Parent folder `../` is the Fitness workspace; the coaching project is `../coach/`.

- This folder **is** a git repo linked to https://github.com/danielmon737/gym-timer (`main` tracks
  `origin/main`). Publish with commit + push; GitHub Pages deploys `main` to
  https://danielmon737.github.io/gym-timer/ in about a minute. Git auth goes through `gh`.
- **The site is public.** `sessions.json` holds prescriptions only: exercise, sets or rounds, reps
  or seconds, load, rest, a short cue. Never HR, sleep, HRV, weight, or recovery notes. Those
  live in `../coach/` and stay there.
- Bump `CACHE_NAME` (`gym-timer-vN`) in `sw.js` whenever `index.html`, `manifest.json`, or the
  icons change, or installed phones keep showing the old version. JSON changes need no bump
  (the service worker fetches them network-first).
- Session ids are `YYYY-MM-DD-slug`. The phone keys per-block results on them, so never rename an
  id mid-week.
- **Block format is the norm (since 2026-09-16).** Every session is a list of blocks (warm-up,
  A, B, C…), each runnable on its own from the session screen; items inside a block alternate each
  round (A1, A2…) and carry their own rest; rest between blocks is free. Shapes and a full example
  are in `README.md`. Sessions are written by the coaching review in `../coach/` (its CLAUDE.md §5
  step 8), not by hand here.
- Local preview: `../.claude/launch.json` starts `python3 -m http.server 8765` on this folder.
  The service worker caches `index.html` cache-first, so after editing it either bump the version
  or unregister the SW and clear caches in the page before reloading.
- Test checklist after any runner change: a timed-hold block, a rep block with the stepper, a
  two-sided item, END before any set is recorded (nothing logged), reset of a finished block,
  finishing the last block (session done + summary), and the Copy log text.
