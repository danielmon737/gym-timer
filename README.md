# Weekly Training (gym-timer PWA)

A workout timer with HIIT, Tabata, AMRAP, and Countdown modes, plus a home for the
week's strength sessions.

## Tabs

The home screen has three tabs along the bottom: **Strength** (this week's sessions, below),
**Runs** (a read-only Mon–Sun calendar of the week's runs), and **Timer** (the free
interval / countdown / stopwatch timers).

**Runs** come from `sessions.json` → `"runs": [{date, name, km, km_label?, key?}]`. `name` is the
type of workout only (e.g. "Easy + strides", "Threshold 4 × 1.2 km") — no HR, no paces in bpm;
the exact targets live on the Garmin watch. `key: true` highlights a quality session or long run.
Days with no run show "Rest", or "No run · strength day" if a strength session is on that date.
Week dates come from `week` (ISO, `YYYY-Www`). Nothing is logged for runs — Garmin is the record.

## Weekly sessions

The Strength tab lists this week's strength sessions from `sessions.json`. A session is a
list of blocks (warm-up, Block A, Block B, …). Each block is started on its own from the
session screen and runs as guided phases: untimed sets with a Done button and a rep
stepper, timed holds, and enforced rest between sets (skip or +30 s). Rest between blocks
is up to you. A finished block gets a check; the session is done when every non-optional
block is. Exercise names and types come from `exercises.json`.

- `sessions.json` is rewritten each week by the coaching review and pushed. The app fetches
  it network-first, so a new week shows up on the next open without a cache bump. Offline,
  the last downloaded copy is used.
- Done state and session logs stay in the phone's localStorage. **"Save log to Files"** (home
  screen) exports every session still on the phone — older weeks included — as
  `gym-log-YYYY-MM-DD.json` through the share sheet; save it to iCloud Drive →
  `Fitness/coach/data/strength/`, where the weekly review reads it. Each file is a full snapshot;
  the newest one wins. "Copy log" / "Copy week log" (clipboard text) remain as a fallback.
  No network write, no token: the log never touches this public repo.
- A finished block shows a note box on its screen (swaps, e.g. "dips instead of push-ups").
  The note is saved with that block's log and appears in the summary and both copy texts.
- Mistakes are cheap: ending a block before any set is recorded saves nothing (after that it
  asks first, and still logs nothing), a finished block can be reset from its own screen, the
  summary has "Discard this log", and the session screen shows "Clear this session's log".
- Block shapes: `{exercise, sets, reps|seconds, rest, load?, note?, optional?, label?}` for
  straight sets; `{type:"block", label:"A", rounds, items:[{exercise, reps|seconds, rest,
  load?, note?, side?}], rest?}` for supersets and circuits (items run A1, A2, … each round,
  each item's `rest` follows it, block `rest` follows the last item if it has none);
  `{type:"amrap", exercise, seconds}`. The exercise `type` decides untimed vs timed and
  per-side: `reps`, `reps_side`, `time`, `time_side`. An item `side: "R"` or `"L"` runs one
  side only. An exercise `badge` (e.g. `WARM-UP`) replaces the SET/HOLD label in the runner.
- Session fields: `id` (`YYYY-MM-DD-slug`, stable within the week), `date`, `day`, `name`,
  `note`, optional `when`, `location`, and `done: true` for a session already logged elsewhere.
  A block with `optional: true` doesn't count toward "session done".

### Example week

```json
{
  "week": "2026-W38",
  "updated": "2026-09-16",
  "sessions": [
    {
      "id": "2026-09-16-core", "date": "2026-09-16", "day": "Wed", "name": "Core + plyo",
      "note": "Rested sets, not a circuit.",
      "blocks": [
        { "exercise": "z2_warmup", "sets": 1, "seconds": 600, "rest": 60, "note": "bike, row or jump rope" },
        { "type": "block", "label": "A", "rounds": 3, "items": [
          { "exercise": "plank", "seconds": 45, "rest": 60 },
          { "exercise": "side_plank", "side": "R", "seconds": 30, "rest": 45 },
          { "exercise": "side_plank", "side": "L", "seconds": 30, "rest": 45 } ] },
        { "type": "block", "label": "B", "rounds": 3, "items": [
          { "exercise": "ab_roller", "reps": 8, "rest": 90, "note": "from knees" },
          { "exercise": "box_jump", "reps": 8, "rest": 90, "note": "step down" } ] },
        { "type": "block", "label": "C", "rounds": 4, "items": [
          { "exercise": "pullup", "reps": 5, "rest": 0 },
          { "exercise": "pushup", "reps": 10, "rest": 90 } ] }
      ]
    }
  ]
}
```

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
