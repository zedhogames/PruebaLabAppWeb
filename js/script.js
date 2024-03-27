document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById('productList');
    const productModal = document.getElementById('productModal');
    const closeModalButton = productModal.querySelector('.close');

    // Función para obtener y mostrar la lista de productos
    function displayProducts() {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            let productCardsHTML = '';

            data.forEach(product => {
                // Generar HTML de la tarjeta de producto
                productCardsHTML += `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${truncateDescription(product.description)}</p>
                                <p class="card-text"><strong>Precio:</strong> $${product.price}</p>
                                <button class="btn btn-primary view-details" data-product-id="${product.id}">Ver Detalles</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            productList.innerHTML = productCardsHTML;

            // Agregar evento click a los botones "Ver Detalles"
            const detailButtons = document.querySelectorAll('.view-details');
            detailButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-product-id');
                    showProductDetails(productId);
                });
            });
        })
        .catch(error => console.error('Error al obtener la lista de productos:', error));
    }

    // Función para truncar la descripción si es demasiado larga
    function truncateDescription(description) {
        if (description.length > 100) { // Establecer el límite de caracteres
            return description.slice(0, 100) + '...'; // Truncar el texto y agregar puntos suspensivos
        }
        return description; // Devolver la descripción sin cambios si no excede el límite
    }

    // Función para mostrar los detalles del producto en el modal
    function showProductDetails(productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}">
                <h5>${product.title}</h5>
                <p>${product.description}</p>
                <p><strong>Precio:</strong> $${product.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            `;
            productModal.style.display = 'block'; // Mostrar el modal
        })
        .catch(error => console.error('Error al obtener los detalles del producto:', error));
    }

    // Llama a la función después de cargar los productos
    displayProducts();

    // Evento para cerrar el modal al hacer clic en la "x"
    closeModalButton.addEventListener('click', function() {
        productModal.style.display = 'none';
    });
});
