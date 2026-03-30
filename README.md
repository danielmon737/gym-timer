# Gym Timer PWA

A workout timer with HIIT, Tabata, AMRAP, and Countdown modes.

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
