  const CACHE = 'rac-v4';
const ARCHIVOS_ESTATICOS = ['./manifest.json', './icon-192.png', './icon-512.png'];

// Al instalar: solo cachear archivos estáticos, NUNCA el index.html
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ARCHIVOS_ESTATICOS))
  );
  self.skipWaiting();
});

// Al activar: limpiar cachés viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: index.html siempre desde red, resto desde caché
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // APIs externas: nunca interceptar
  if (url.hostname.includes('graph.microsoft.com') ||
      url.hostname.includes('login.microsoftonline.com') ||
      url.hostname.includes('cdn.jsdelivr.net')) {
    return;
  }

  // index.html: siempre red primero, sin caché
  if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Resto: caché primero
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
