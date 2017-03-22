self.addEventListener('install', function(){ skipWaiting() });
self.addEventListener('activate', function(){ clients.claim() });
self.addEventListener('notificationclick', function(event){
  event.notification.close();
  event.waitUntil(clients.matchAll().then( function(cs){
    for (var i in cs ){
      var client = cs[i]
      if (client.url == registration.scope)
        return client.focus();
    }
    return clients.openWindow(registration.scope);
  }));
});
