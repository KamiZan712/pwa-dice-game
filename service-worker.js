const cacheName = "dice-game-v3";
const filesToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png"
];

// インストール（キャッシュ登録）
self.addEventListener("install", (event) => {
      self.skipWaiting(); // 手動で更新を即時反映
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// リクエスト対応
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(cacheName).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

//古いキャッシュを能動的に消す
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (!cacheWhitelist.includes(name)) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim(); // ←手動即時反映
});