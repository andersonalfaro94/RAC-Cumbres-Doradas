const CACHE = 'rac-v3';
const ARCHIVOS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('graph.microsoft.com') ||
      e.request.url.includes('login.microsoftonline.com') ||
      e.request.url.includes('cdn.jsdelivr.net')) return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }).catch(() => caches.match(e.request))
  );
});
