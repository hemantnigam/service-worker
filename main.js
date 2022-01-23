if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(() => console.log("Service Worker is registered"))
    .catch((err) => console.log(err));
}
