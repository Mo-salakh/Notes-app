const staticCacheName = 's-v1';
const dynamicCacheName = 'd-v1';

const assetUrls = [
    '../src',
    '../public',
    '../index.html',
];

self.addEventListener('install', async (e) => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetUrls);
});

self.addEventListener('activate', async () => {
    const cacheNames = await caches.keys();

    await Promise.all(
        cacheNames
            .filter(cache => cache !== staticCacheName && cache !== dynamicCacheName)
            .map(cache => caches.delete(cache))
    );
});

// Обработка пуш-уведомлений
self.addEventListener('push', (event) => {
    const notificationData = event.data.json();

    const title = notificationData.title || 'Новое уведомление';
    const options = {
        body: notificationData.body || 'У вас новое уведомление',
        icon: notificationData.icon || '/images/default-icon.png',
        badge: '/images/badge.png',
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Обработка кликов на уведомления
self.addEventListener('notificationclick', (event) => {
    const notification = event.notification;
    const action = event.action;

    // Закрытие уведомления при клике
    notification.close();

    // Перенаправление по URL (если указано)
    if (action === 'open_url') {
        clients.openWindow(notification.data.url);
    }
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;
    } catch (e) {
        const cached = await cache.match(request);
        return cached ?? await caches.match('../src/pages/offline/offline.html');
    }
}
