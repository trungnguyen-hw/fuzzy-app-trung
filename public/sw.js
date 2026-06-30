const CACHE_NAME = 'fuzzy-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/css/vendors/bootstrap.min.css',
  '/assets/css/vendors/iconsax.css',
  '/assets/js/iconsax.js',
  '/assets/images/logo/favicon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log('PWA cache installation:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        if (response) return response;
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
