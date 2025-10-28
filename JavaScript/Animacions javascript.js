// Fitxer d'animacions amb JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Funció reutilitzable per animar qualsevol imatge de marquee
    function animateMarquee(imageId) {
        const marqueeImage = document.getElementById(imageId);
        if (!marqueeImage) return;

        // Calcula l'amplada de la imatge (en píxels)
        const imageWidth = marqueeImage.offsetWidth;
        const screenWidth = window.innerWidth;

        // Posició inicial: completament fora per l'esquerra 
        let currentPos = - (imageWidth + 650); 

        // Velocitat de l'animació 
        const speed = 2;

        // Definim una funció que executa l'animació frame a frame
        function animate() {
            // Mou la imatge cap a la dreta
            currentPos += speed;

            // Si ha sortit completament per la dreta, reinicia des de l'esquerra 
            if (currentPos > screenWidth) {
                currentPos = - (imageWidth + 650); // Reinicia la posició a l'esquerra i crea un bucle
            }

            // Aplica l'estil CSS a la imatge per moure-la
            marqueeImage.style.left = currentPos + 'px';

            // Continua l'animació en el següent frame
            requestAnimationFrame(animate);
        }

        // Cridem a la funció per iniciar l'animació
        animate();
    }

    // Anima el banner superior (Black Friday)
    animateMarquee('marquee-image');

    // Anima el banner d'ofertes superior
    animateMarquee('offers-marquee-top');

    // Anima el banner d'ofertes inferior
    animateMarquee('offers-marquee-bottom');

    // Reinicia l'animació si es redimensiona la finestra (per mantenir l'amplada correcta)
    // Nota: Per simplicitat, reiniciem les posicions per a tots els banners
    window.addEventListener('resize', function() {
        const newScreenWidth = window.innerWidth;
        // Aquí pots ajustar les posicions globals si cal, però per ara reiniciem les animacions
        location.reload(); // Opció simple: recarrega la pàgina per recalcular tot (pots millorar-ho si vols)
    });
});

// Buscador
const searchIcon = document.querySelector('.búsqueda a');
const searchModal = document.getElementById('search-modal');
const closeSearch = document.querySelector('.close-search');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchIcon.addEventListener('click', function(e) {
    e.preventDefault();
    searchModal.style.display = 'flex';
});

closeSearch.addEventListener('click', function() {
    searchModal.style.display = 'none';
    searchInput.value = '';
    searchResults.innerHTML = '';
});

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = ''; // Neteja resultats anteriors

    // Busca en tots els productes (pots expandir a gèneres, etc.)
    const products = document.querySelectorAll('.product-details h3');
    let found = false;
    products.forEach(function(product) {
        if (product.textContent.toLowerCase().includes(query)) {
            const result = document.createElement('div');
            result.innerHTML = `<h4>${product.textContent}</h4><p>Producte trobat! Ves a <a href="#VINILS">VINILS</a> o <a href="#OFERTES">OFERTES</a>.</p>`;
            searchResults.appendChild(result);
            found = true;
        }
    });

    if (!found) {
        searchResults.innerHTML = '<p>No s\'han trobat resultats. Prova un altre terme.</p>';
    }
});

// Tanca modal clicant fora
window.addEventListener('click', function(e) {
    if (e.target === searchModal) {
        searchModal.style.display = 'none';
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

// Auth Modal (Login/Signup)
const profileIcon = document.querySelector('.usuari a');
const authModal = document.getElementById('auth-modal');
const closeAuth = document.querySelector('.close-auth');

profileIcon.addEventListener('click', function(e) {
    e.preventDefault();
    authModal.style.display = 'flex';
});

closeAuth.addEventListener('click', function() {
    authModal.style.display = 'none';
});

// Funcions per toggle entre login i signup
function switchToSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function switchToLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Tanca modal clicant fora
window.addEventListener('click', function(e) {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

// Handles de submit (pots connectar a un backend després)
document.querySelector('#login-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login exitós! (Simulat)');
    authModal.style.display = 'none';
});

document.querySelector('#signup-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Registre exitós! (Simulat)');
    authModal.style.display = 'none';
});
