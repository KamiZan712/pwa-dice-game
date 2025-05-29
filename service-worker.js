const cacheName = "dice-game-v5";
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
                // ネットから取得成功したのでキャッシュも更新
                const responseClone = response.clone();
                caches.open(cacheName).then((cache) => {
                    cache.put(event.request, responseClone);
                });
                // クライアントへ通知
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.postMessage({ source: 'network' , cacheName: cacheName });
                    });
                });
                return response;
            })
            .catch(() => {
                // ネットが使えなければキャッシュから返す
                return caches.match(event.request).then(cachedResponse => {
                    // クライアントへ通知
                    self.clients.matchAll().then(clients => {
                        clients.forEach(client => {
                            client.postMessage({ source: 'cache' , cacheName: cacheName });
                        });
                    });
                    return cachedResponse;
                });
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