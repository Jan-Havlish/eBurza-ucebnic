// sw.js
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("your-cache-name").then(function (cache) {
      return cache.keys().then(function (keys) {
        // Vymaže cache při prvním načtení aplikace v měsíci
        const now = new Date();
        const month = now.getMonth();
        const request = indexedDB.open("cache-metadata", 1);

        request.onupgradeneeded = function (event) {
          const db = event.target.result;
          const store = db.createObjectStore("metadata", { keyPath: "id" });
          store.put({ id: "lastCacheReset", value: month });
        };

        request.onsuccess = function (event) {
          const db = event.target.result;
          const transaction = db.transaction(["metadata"], "readwrite");
          const objectStore = transaction.objectStore("metadata");
          const getRequest = objectStore.get("lastCacheReset");

          getRequest.onsuccess = function (event) {
            const data = getRequest.result;
            if (!data || data.value !== month) {
              const updateRequest = objectStore.put({
                id: "lastCacheReset",
                value: month,
              });
              updateRequest.onsuccess = function () {
                cache.clear();
              };
            }
          };
        };
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method === "POST") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            networkResponse.status === 200 ||
            networkResponse.status === 304
          ) {
            const clonedResponse = networkResponse.clone();
            caches.open("your-cache-name").then((cache) => {
              cache.put(event.request, clonedResponse);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request);
        });
    })
  );
});