var cacheName = 'app-v1';
var assets = [
 'index.html',
 'main_javascript.js'
];

//install event
self.addEventListener('install', evt=> {
  console.log('Service Worker Installed');
  evt.waitUntil(caches.open(cacheName).then(cache=>{
        console.log('Adding Cache');
        cache.addAll(assets);                        
      })
    );
});

//activate event
self.addEventListener('activate', evt=>{
      console.log('Service Worker Activated');
});

//fetch event
self.addEventListener('fetch', evt=>{
//           console.log('Fetching: ', evt);
         evt.respondWith(
             caches.match(evt.request).then(cacheRes =>{
                 return cacheRes || fetch(evt.request);
             })
         );
});