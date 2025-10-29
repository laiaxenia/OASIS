document.addEventListener('DOMContentLoaded', function() {
    function animateMarquee(imageId) {
        const marqueeImage = document.getElementById(imageId);
        if (!marqueeImage) return;

        const imageWidth = marqueeImage.offsetWidth;
        const screenWidth = window.innerWidth;

        // Posició inicial 
        let currentPos = - (imageWidth + 650); 

        // Velocitat de l'animació 
        const speed = 2;

        // Definim una funció que executa l'animació frame a frame
        function animate() {
            currentPos += speed; 
            if (currentPos > screenWidth) {
                currentPos = - (imageWidth + 650); // Reinicia la posició a l'esquerra i crea un bucle
            }

            // Aplica l'estil CSS a la imatge per moure-la
            marqueeImage.style.left = currentPos + 'px';
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Aquestes funcions animen els banners d'ofertes
    animateMarquee('marquee-image');
    animateMarquee('offers-marquee-top');
    animateMarquee('offers-marquee-bottom');

    // Reinicia l'animació si es redimensiona la finestra (per mantenir l'amplada correcta)
    window.addEventListener('resize', function() {
        const newScreenWidth = window.innerWidth;
        location.reload(); 
    });

    // Sistema de Carret per afegir botons 
let cart = JSON.parse(localStorage.getItem('oasisCart')) || []; 

function updateCartCount() {
    const count = cart.length; 
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = count > 0 ? count : '0';
        cartCount.style.display = count > 0 ? 'flex' : 'flex'; 
    }
    updateCartPanel();
}

function updateCartPanel() {
    const cartBody = document.querySelector('.cart-body');
    if (cartBody && cart.length === 0) {
        cartBody.innerHTML = '<p>La seva cistella esta buida</p><button class="continue-shopping">Continua comprant</button>';
    } else if (cartBody) {
        let html = '<ul style="list-style: none; padding: 0;">';
        cart.forEach((item, index) => {
            html += `<li style="margin-bottom: 10px; padding: 10px; border: 1px solid #eee; border-radius: 4px;">${item.name} - €${item.price} <button onclick="removeFromCart(${index})" style="float: right; background: #556b2f; color: white; border: none; padding: 5px 10px; border-radius: 2px;">Eliminar</button></li>`;
        });
        html += '</ul><button class="continue-shopping" onclick="checkout()">Finalitzar comprar</button>';
        cartBody.innerHTML = html;
    }
}

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('oasisCart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} afegit al carret!`); 
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

// Menú Hamburguesa 
const menuToggle = document.getElementById('menu-toggle');
const subNavLinks = document.querySelector('.sub-nav-links');
menuToggle.addEventListener('change', function() {
    if (this.checked) {
        subNavLinks.style.left = '0'; // Activa slider
        document.body.style.overflow = 'hidden'; 
    } else {
        subNavLinks.style.left = '-100%'; // Amaga
        document.body.style.overflow = ''; 
    }
});

// Tanca menú al clicar una opció
document.querySelectorAll('.sub-nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        menuToggle.checked = false;
        subNavLinks.style.left = '-100%';
        document.body.style.overflow = '';
    });
});

// Dropdown d'idiomes al click
const langToggle = document.querySelector('.lang-toggle');
const languageLi = document.querySelector('.language');
langToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (window.innerWidth <= 768) { 
        languageLi.classList.toggle('active');
    }
});

// Tanca dropdown al clicar fora o seleccionar opció
document.addEventListener('click', function(e) {
    if (!languageLi.contains(e.target)) {
        languageLi.classList.remove('active');
    }
});
document.querySelectorAll('.lang-dropdown a').forEach(link => {
    link.addEventListener('click', function() {
        languageLi.classList.remove('active');
        changeLang(this.textContent.trim()); 
    });
});

// Reinicia dropdown en resize 
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        languageLi.classList.remove('active');
    }
});

// Afegeix botons per afegir al carret 
function addCartButtons() {
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

    // OFERTES
    document.querySelectorAll('.offers-grid-container .product-space .image-container').forEach(container => {
        if (!container.querySelector('.add-cart-btn')) {
            container.parentElement.classList.add('offers-product'); 
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

    // REVENTA
    document.querySelectorAll('.resale-grid .product-space .image-container').forEach(container => {
        if (!container.querySelector('.add-cart-btn')) {
            container.parentElement.classList.add('resale-product'); 
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

addCartButtons();
updateCartCount();

window.removeFromCart = removeFromCart;
window.checkout = checkout;
});

// Slider del Carret
const cartIcon = document.querySelector('.carret a');
const cartPanel = document.getElementById('cart-panel');
const closeCart = document.querySelector('.close-cart');
const continueShopping = document.querySelector('.continue-shopping');

cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    cartPanel.classList.add('active');
});

closeCart.addEventListener('click', function() {
    cartPanel.classList.remove('active');
});

continueShopping.addEventListener('click', function() {
    cartPanel.classList.remove('active');
    document.querySelector('a[href="#VINILS"]').click();
});

document.addEventListener('click', function(e) {
    if (e.target === cartPanel || e.target.classList.contains('cart-overlay')) {
        cartPanel.classList.remove('active');
    }
});

// (Login/Signup)
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

function switchToSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function switchToLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

window.addEventListener('click', function(e) {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

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

// Animació GSAP
gsap.registerPlugin(ScrollTrigger); 

const productCards = gsap.utils.toArray('.product-space, .genre-space');

if (productCards.length > 0) {
    gsap.set(productCards, { opacity: 0, y: 50 });
    gsap.to(productCards, {
        opacity: 1,
        y: 0,
        duration: 0.8, 
        ease: "power2.out",
        stagger: 0.1, 
        scrollTrigger: {
            trigger: ".products-grid, .genres-section, .artists-section, .offers-grid-container, .resale-grid",
            start: "top 80%", 
            toggleActions: "play none none reverse", 
            markers: false 
        }
    });
}

// Opcional: Anima el Spotify button al hero 
const spotifyBtn = document.querySelector('.spotify-button');
if (spotifyBtn) {
    spotifyBtn.addEventListener('mouseenter', () => {
        gsap.to(spotifyBtn, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" });
    });
    spotifyBtn.addEventListener('mouseleave', () => {
        gsap.to(spotifyBtn, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
}
