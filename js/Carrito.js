let carrito = [];
const verCarrito = document.getElementById('cartBtn');
const modalContainer = document.getElementById('modal-container');

function addToCart(productId) {
   fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);       

            carrito.push({
                id: product.id,
                img: product.image,
                nombre: product.title,
                precio: product.price,                
            });            
            console.log(carrito);
            alert("Se agrego al carrito");
        })
        .catch(error => console.error('Error al agregar producto al carrito:', error));
}

    const pintarCarrito = () =>{
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class = "modal-header-title">Carrito.</h1>
    `;    
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click",() => {
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalButton);

        carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio}$</p>
        `;
        console.log("El product tiene esto: " +product.price);

        modalContainer.append(carritoContent);

        let eliminar = document.createElement("span");
        eliminar.innerText = "❎";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click",eliminarProducto);
    });

    //metodo para sumar el total
    const total = carrito.reduce((acc,el) => acc + el.precio,0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying);

};

verCarrito.addEventListener("click",pintarCarrito);

const eliminarProducto = () =>{
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    pintarCarrito();

}
