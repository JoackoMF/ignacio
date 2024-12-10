document.addEventListener('DOMContentLoaded', () => {
    const products = [
        // Remeras
        { id: 1, category: 'remeras', name: 'Remera Deportiva Dry-Fit', price: 30.00, image: 'img1.jpeg' },
        { id: 2, category: 'remeras', name: 'Remera Casual Algodón', price: 25.00, image: 'img2.jpeg' },
        { id: 3, category: 'remeras', name: 'Remera Running Tech', price: 35.00, image: 'img3.jpeg' },
        { id: 4, category: 'remeras', name: 'Remera Compression', price: 40.00, image: 'img4.jpg' },

        // Camperas
        { id: 5, category: 'camperas', name: 'Campera Ligera Cortavientos', price: 50.00, image: 'https://redsport.vtexassets.com/arquivos/ids/829038-800-auto?v=636632743640130000&width=800&height=auto&aspect=true' },
        { id: 6, category: 'camperas', name: 'Campera de Invierno Térmica', price: 75.00, image: 'https://redsport.vtexassets.com/arquivos/ids/829038-800-auto?v=636632743640130000&width=800&height=auto&aspect=true' },
        { id: 7, category: 'camperas', name: 'Campera Deportiva Impermeable', price: 65.00, image: 'https://redsport.vtexassets.com/arquivos/ids/829038-800-auto?v=636632743640130000&width=800&height=auto&aspect=true' },
        { id: 8, category: 'camperas', name: 'Campera Running Reflectiva', price: 55.00, image: 'https://redsport.vtexassets.com/arquivos/ids/829038-800-auto?v=636632743640130000&width=800&height=auto&aspect=true' },

        // Shorts
        { id: 9, category: 'shorts', name: 'Short Deportivo Básico', price: 20.00, image: 'https://bocashop.vteximg.com.br/arquivos/ids/168486-1000-1000/HE6334_1.jpg?v=637934176872970000' },
        { id: 10, category: 'shorts', name: 'Short Casual Algodón', price: 18.00, image: 'https://bocashop.vteximg.com.br/arquivos/ids/168486-1000-1000/HE6334_1.jpg?v=637934176872970000' },
        { id: 11, category: 'shorts', name: 'Short Running Compression', price: 25.00, image: 'https://bocashop.vteximg.com.br/arquivos/ids/168486-1000-1000/HE6334_1.jpg?v=637934176872970000' },
        { id: 12, category: 'shorts', name: 'Short Entrenamiento Técnico', price: 22.00, image: 'https://bocashop.vteximg.com.br/arquivos/ids/168486-1000-1000/HE6334_1.jpg?v=637934176872970000' },

        // Accesorios
        { id: 13, category: 'accesorios', name: 'Gorra Deportiva', price: 15.00, image: 'https://cdn3.futbin.com/content/fifa25/img/players/204539.png?fm=png&ixlib=java-2.1.0&verzion=1&w=512&s=6010e815fc4468a1b59bf2f80cdfebdb' },
        { id: 14, category: 'accesorios', name: 'Botella de Agua Deportiva', price: 12.00, image: 'https://cdn3.futbin.com/content/fifa25/img/players/204539.png?fm=png&ixlib=java-2.1.0&verzion=1&w=512&s=6010e815fc4468a1b59bf2f80cdfebdb' },
        { id: 15, category: 'accesorios', name: 'Bandana Multifunción', price: 10.00, image: 'https://cdn3.futbin.com/content/fifa25/img/players/204539.png?fm=png&ixlib=java-2.1.0&verzion=1&w=512&s=6010e815fc4468a1b59bf2f80cdfebdb' },
        { id: 16, category: 'accesorios', name: 'Calcetines Técnicos (Par)', price: 8.00, image: 'https://cdn3.futbin.com/content/fifa25/img/players/204539.png?fm=png&ixlib=java-2.1.0&verzion=1&w=512&s=6010e815fc4468a1b59bf2f80cdfebdb' }
    ];
    const productContainer = document.getElementById('product-container');
    const categoryFilter = document.getElementById('category-filter');
    const cartIcon = document.querySelector('.cart-icon span');
    const cartContainer = document.createElement('div');
    cartContainer.className = 'cart-container hidden';
    document.body.appendChild(cartContainer);

    let cart = [];

    function renderProducts(filteredProducts) {
        const categories = [...new Set(filteredProducts.map(p => p.category))];

        productContainer.innerHTML = '';

        categories.forEach(category => {
            const categorySection = document.createElement('section');
            categorySection.id = category;
            categorySection.className = 'section';

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = capitalize(category);
            categorySection.appendChild(categoryTitle);

            const productGrid = document.createElement('div');
            productGrid.className = 'product-grid';

            const categoryProducts = filteredProducts.filter(p => p.category === category);

            categoryProducts.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'product';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" id="product-image-${product.id}">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
                `;

                // Agrega un evento para cambiar la imagen del 4to producto de remeras
                if (product.category === 'remeras' && index === 3) {
                    const productImage = productCard.querySelector(`#product-image-${product.id}`);
                    const originalImage = product.image;
                    const hoverImage = 'https://aika-store.com/cdn/shop/files/3_7825428a-390a-4e2b-a710-3cff5365d79f.png?v=1711588021&width=1445'; // Reemplaza con la ruta de la imagen alternativa

                    productImage.addEventListener('mouseover', () => {
                        productImage.src = hoverImage;
                    });

                    productImage.addEventListener('mouseout', () => {
                        productImage.src = originalImage;
                    });
                }

                productGrid.appendChild(productCard);
            });

            categorySection.appendChild(productGrid);
            productContainer.appendChild(categorySection);
        });
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            cartIcon.textContent = `🛒 Carrito (${cart.length})`;
        }
    };

    document.querySelector('.cart-icon').addEventListener('click', () => {
        cartContainer.classList.toggle('hidden');
        renderCart();
    });

    function renderCart() {
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
            return;
        }

        const cartList = document.createElement('ul');
        cart.forEach((product, index) => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.style.marginLeft = '10px';
            removeButton.onclick = () => {
                removeFromCart(index);
            };

            cartItem.appendChild(removeButton);
            cartList.appendChild(cartItem);
        });

        cartContainer.appendChild(cartList);

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Comprar carrito';
        buyButton.className = 'buy-cart-button';
        buyButton.onclick = () => {
            alert('¡Gracias por tu compra!');
            cart = [];
            renderCart();
            cartIcon.textContent = '🛒 Carrito (0)';
        };

        cartContainer.appendChild(buyButton);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        renderCart();
        cartIcon.textContent = `🛒 Carrito (${cart.length})`;
    }

    categoryFilter.addEventListener('change', (e) => {
        const category = e.target.value;
        if (category === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(product => product.category === category);
            renderProducts(filtered);
        }
    });

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderProducts(products);
});