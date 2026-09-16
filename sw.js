const CACHE_NAME = 'gym-timer-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './exercises.json',
  './sessions.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;600;900&display=swap'
];

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Plan data (sessions.json, exercises.json): network first so a new week shows up
// without a cache bump, falling back to the last copy when offline.
function isPlanData(url) {
  return url.origin === self.location.origin && /\/(sessions|exercises)\.json$/.test(url.pathname);
}

// Fetch: plan data network-first; everything else cache-first
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (isPlanData(url)) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(url.href, copy));
        }
        return res;
      }).catch(() => caches.match(url.href))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
