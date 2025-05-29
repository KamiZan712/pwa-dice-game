const cacheName = "dice-game-v1";
const filesToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png"
];

// インストール（キャッシュ登録）
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// リクエスト対応
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
