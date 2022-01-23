const CACHE_NAME = "v1";
const assets = ["/", "./main.js", "./styles.css"];
self.addEventListener("install", (e) => {
  console.log("Service worker installed");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(assets);
      console.log("File caching completed");
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        console.log("Reponse from cache");
        return response;
      }
      return fetch(e.request).then((response) => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const cacheRespone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, cacheRespone);
        });
        return response;
      });
    })
  );
});
