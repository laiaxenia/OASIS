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

    // Sistema de Carret (afegeix botons i gestiona ítems)
let cart = JSON.parse(localStorage.getItem('oasisCart')) || []; // Persisteix al localStorage

function updateCartCount() {
    const count = cart.length; // O suma quantitats si vols
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = count > 0 ? count : '0';
        cartCount.style.display = count > 0 ? 'flex' : 'flex'; // Sempre visible, però amb 0 si buit
    }
    // Actualitza panell carret (opcional, afegeix llista)
    updateCartPanel();
}

function updateCartPanel() {
    const cartBody = document.querySelector('.cart-body');
    if (cartBody && cart.length === 0) {
        cartBody.innerHTML = '<p>Su cesta está vacía</p><button class="continue-shopping">Continuar comprando</button>';
    } else if (cartBody) {
        let html = '<ul style="list-style: none; padding: 0;">';
        cart.forEach((item, index) => {
            html += `<li style="margin-bottom: 10px; padding: 10px; border: 1px solid #eee; border-radius: 4px;">${item.name} - €${item.price} <button onclick="removeFromCart(${index})" style="float: right; background: #556b2f; color: white; border: none; padding: 5px 10px; border-radius: 2px;">Eliminar</button></li>`;
        });
        html += '</ul><button class="continue-shopping" onclick="checkout()">Finalizar compra</button>';
        cartBody.innerHTML = html;
    }
}

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('oasisCart', JSON.stringify(cart));
    updateCartCount();
    // Opcional: toast "Añadido al carrito!"
    alert(`${productName} afegit al carret!`); // Canvia per un modal suau si vols
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('oasisCart', JSON.stringify(cart));
    updateCartCount();
}

function checkout() {
    alert('Pagament simulat! Total: €' + cart.reduce((sum, item) => sum + parseFloat(item.price), 0));
    cart = [];
    localStorage.removeItem('oasisCart');
    updateCartCount();
}

// Afegeix botons dinàmicament a les seccions rellevants
function addCartButtons() {
    // VINILS: .products-grid .product-space
    document.querySelectorAll('.products-grid .product-space .image-container').forEach(container => {
        if (!container.querySelector('.add-cart-btn')) {
            const btn = document.createElement('button');
            btn.className = 'add-cart-btn';
            btn.textContent = '+';
            btn.onclick = function(e) {
                e.stopPropagation();
                const productName = container.parentElement.querySelector('h3').textContent;
                const productPrice = container.parentElement.querySelector('.price').textContent;
                addToCart(productName, productPrice);
            };
            container.appendChild(btn);
        }
    });

    // OFERTES: .offers-grid-container .product-space (o com es digui, ajusta si cal)
    document.querySelectorAll('.offers-grid-container .product-space .image-container').forEach(container => {
        if (!container.querySelector('.add-cart-btn')) {
            container.parentElement.classList.add('offers-product'); // Helper per CSS
            const btn = document.createElement('button');
            btn.className = 'add-cart-btn';
            btn.textContent = '+';
            btn.onclick = function(e) {
                e.stopPropagation();
                const productName = container.parentElement.querySelector('h3').textContent;
                const productPrice = container.parentElement.querySelector('.price').textContent;
                addToCart(productName, productPrice);
            };
            container.appendChild(btn);
        }
    });

    // REVENTA: .resale-grid .product-space
    document.querySelectorAll('.resale-grid .product-space .image-container').forEach(container => {
        if (!container.querySelector('.add-cart-btn')) {
            container.parentElement.classList.add('resale-product'); // Helper per CSS
            const btn = document.createElement('button');
            btn.className = 'add-cart-btn';
            btn.textContent = '+';
            btn.onclick = function(e) {
                e.stopPropagation();
                const productName = container.parentElement.querySelector('h3').textContent;
                const productPrice = container.parentElement.querySelector('.price').textContent;
                addToCart(productName, productPrice);
            };
            container.appendChild(btn);
        }
    });
}

// Inicialitza
addCartButtons();
updateCartCount();

// Exposes funcions globals per botons del panell
window.removeFromCart = removeFromCart;
window.checkout = checkout;
});

// Panell del Carret
const cartIcon = document.querySelector('.carret a');
const cartPanel = document.getElementById('cart-panel');
const closeCart = document.querySelector('.close-cart');
const continueShopping = document.querySelector('.continue-shopping');

cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    cartPanel.classList.add('active');
    // Opcional: afegeix overlay si vols
    // document.body.insertAdjacentHTML('beforeend', '<div class="cart-overlay active"></div>');
});

closeCart.addEventListener('click', function() {
    cartPanel.classList.remove('active');
    // Tanca overlay si n'hi ha
    // document.querySelector('.cart-overlay')?.remove();
});

continueShopping.addEventListener('click', function() {
    cartPanel.classList.remove('active');
    // Redirigeix a vinils, ex
    document.querySelector('a[href="#VINILS"]').click();
});

// Tanca si cliques fora (opcional, afegeix si vols overlay)
document.addEventListener('click', function(e) {
    if (e.target === cartPanel || e.target.classList.contains('cart-overlay')) {
        cartPanel.classList.remove('active');
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