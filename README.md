# Gym Timer PWA

A workout timer with HIIT, Tabata, AMRAP, and Countdown modes, plus a home for the
week's strength sessions.

## Weekly sessions

The home screen lists this week's strength sessions from `sessions.json` and runs each one
as guided phases: untimed sets with a Done button and a rep stepper, timed holds, and
enforced rest between sets (skip or +30 s). Exercise names and types come from
`exercises.json`.

- `sessions.json` is rewritten each week by the coaching review and pushed. The app fetches
  it network-first, so a new week shows up on the next open without a cache bump. Offline,
  the last downloaded copy is used.
- Done state and session logs stay in the phone's localStorage. "Copy log" and "Copy week
  log" put a plain-text summary on the clipboard to paste into the weekly review.
- Mistakes are cheap: ending a session before any set is recorded saves nothing, the summary
  has "Discard this log", and the session screen shows "Clear this session's log" once
  anything is logged for it on that phone.
- Block shapes: `{exercise, sets, reps|seconds, rest, load?, note?, optional?, label?}` for
  straight sets; `{type:"block", label:"A", rounds, items:[{exercise, reps|seconds, rest,
  load?, note?, side?}], rest?}` for supersets and circuits (items run A1, A2, … each round,
  each item's `rest` follows it, block `rest` follows the last item if it has none);
  `{type:"amrap", exercise, seconds}`. The exercise `type` decides untimed vs timed and
  per-side: `reps`, `reps_side`, `time`, `time_side`. An item `side: "R"` or `"L"` runs one
  side only. An exercise `badge` (e.g. `WARM-UP`) replaces the SET/HOLD label in the runner.

## How to deploy (free, 5 minutes)

### Step 1: Create a GitHub account
Go to https://github.com and sign up (free).

### Step 2: Create a new repository
1. Click the **+** button (top right) → **New repository**
2. Name it: `gym-timer`
3. Set it to **Public**
4. Click **Create repository**

### Step 3: Upload the files
1. On your new repo page, click **"uploading an existing file"**
2. Drag ALL 5 files from this folder:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
3. Click **Commit changes**

### Step 4: Enable GitHub Pages
1. Go to your repo → **Settings** tab
2. Scroll to **Pages** (left sidebar)
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait ~1 minute. Your site will be live at:
   `https://YOUR-USERNAME.github.io/gym-timer/`

### Step 5: Add to your iPhone home screen
1. Open the URL above in **Safari**
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add**

Done! You now have a standalone app with its own icon.
No Safari bar, no X button, works offline.

## Updating
To update, just upload the changed files to GitHub again.
The service worker will cache the new version automatically.
