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

///////////////// paginacion //////////////
let pagina = 0;
const postsPorPagina = 4;
let posts = [];

// Cargar posts desde el archivo JSON
fetch("posts.json")
  .then(response => response.json())
  .then(data => {
    posts = data;
    mostrarPosts();
  });

///////////// posts /////////////
function mostrarPosts() {
  const contenedor = document.getElementById("posts");
  const inicio = pagina * postsPorPagina;
  const fin = inicio + postsPorPagina;
  const nuevosPosts = posts.slice(inicio, fin);

  nuevosPosts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
                <div class="col-12 col-md-12">
                    <div class="blog-item wow fadeInUp" data-wow-delay="0.3s">
                        <div class="blog-img">
                            <img src="${post.video}"
                                alt="${post.titulo}" loading="lazy">
                        </div>
                        <div class="blog-text">
                            <h2>${post.titulo}</h2>
                            <div class="blog-meta">
                                <p><i class="far fa-user"></i>${post.autor}</p>
                                <p><i class="far fa-list-alt"></i>${post.tema}</p>
                                <p><i class="far fa-calendar-alt"></i>${post.fecha}</p>
                            </div>
                            <p>${post.contenido}</p>
                        </div>
                    </div>
                </div>

    `;
    contenedor.appendChild(div);
  });

  if (fin >= posts.length) {
    document.getElementById("verMas").style.display = "none";
  }
}
document.getElementById("verMas").addEventListener("click", () => {
  pagina++;
  mostrarPosts();
});

//////// blog videos ////////////
const data = [
    {
      "video": "videos/convertido.mp4",
      "titulo": "¿En que te convertiste Tandil?",
      "autor": "PP",
      "tema": "Gustavo limpia parabrisas",
      "fecha": "8 de Marzo 2025",
      "contenido": "Muestra de productos de tiendasPP y el parabrisas deja de estar limpio despues de la 'limpieza'",
    },
    {
      "video": "videos/ruta30.mp4",
      "titulo": "Ruta 30",
      "autor": "PP",
      "tema": "Camioneta Rota",
      "fecha": "20 de Marzo 2025",
      "contenido": "La camioneta sufre problemas eléctricos y son llevados de vuelta a Tandil hasta tiendasPP",
    },
    {
      "video": "videos/mcdonalds.mp4",
      "titulo": "McDonald's",
      "autor": "PP",
      "tema": "Inauguración de McDonald's en Tandil",
      "fecha": "21 de Agosto 2025",
      "contenido": "Día de nauguración de la sucursal McDonald's en la ciudad de Tandil",
    }

];

// Seleccionamos el contenedor
const postsContainer = document.getElementById("posts");

// Recorremos el JSON y generamos el HTML
data.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("col-md-6"); // ejemplo de Bootstrap

    postDiv.innerHTML = `
        <video controls width="100%">
            <source src="${post.video}" type="video/mp4">
            Tu navegador no soporta el elemento de video.
        </video>
        <h3>${post.titulo}</h3>
        <p><strong>Autor:</strong> ${post.autor}</p>
        <p><strong>Tema:</strong> ${post.tema}</p>
        <p><strong>Fecha:</strong> ${post.fecha}</p>
        <p>${post.contenido}</p>
    `;

    postsContainer.appendChild(postDiv);
});
