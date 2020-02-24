if ('workbox' in self) {
  //console.log(self);
  //console.log(self.__precacheManifest);
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
}
