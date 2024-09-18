
const CACHE_NAME = "burzag-cache";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([
        "/"
      ]))
  );
});

self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME)
      .then(
cache => {
        return cache.match(event.request)
          .then(response => {
            if (response) {
              const dateCached = new Date(response.headers.get("date"));
              const age = (new Date() - dateCached) / (1000 * 60 * 60 * 24); // Age in days

              const isMedia = response.headers.get("content-type").includes("image") ||
                response.headers.get("content-type").includes("video") ||
                response.headers.get("content-type").includes("audio");

              if ((isMedia && age > 7) || (!isMedia && age > 1)) {
                // Delete stale resource from cache
                cache.delete(event.request);
                return fetch(event.request)
                  .then(networkResponse => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                  })
                  .catch(() => new Response("Offline"));
              } else {
                return response;
              }
            }

            return fetch(event.request)

              .then(networkResponse => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              })
              .catch(() => new Response("Offline"));
          });
      })
  );
});
