const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('navbar');

menuBtn.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
});

///////service worker/////////
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Service Worker registrado"));
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.getElementById("installBtn");
  btn.style.display = "block";

  btn.addEventListener("click", () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === "accepted") {
        console.log("App instalada");
      } else {
        console.log("Instalación cancelada");
      }
      deferredPrompt = null;
    });
  });
});