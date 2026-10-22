// Offline cache: app shell first; data files cached on first use.
const CACHE = 'quransearch-v57';
const SHELL = ['./', 'index.html', 'style.css', 'app.js', 'manifest.webmanifest', 'icon.svg', 'logo.png', 'data/labels.json',
  'fonts/amiri-quran-arabic-400-normal.woff2', 'fonts/noto-naskh-arabic-arabic-400-normal.woff2', 'fonts/noto-naskh-arabic-arabic-600-normal.woff2'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // network first (so new content reaches students), fall back to cache when offline
  e.respondWith(fetch(e.request).then(res => {
    const copy = res.clone();
    if (res.ok && new URL(e.request.url).origin === location.origin) caches.open(CACHE).then(c => c.put(e.request, copy));
    return res;
  }).catch(() => caches.match(e.request)));
});
