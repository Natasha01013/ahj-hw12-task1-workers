importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js'
);

self.workbox.routing.registerRoute(
  ({ request }) => request.destination === 'document',
  new self.workbox.strategies.NetworkFirst()
);