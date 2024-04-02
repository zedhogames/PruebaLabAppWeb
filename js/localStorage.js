function addToCart(id)
{
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
            .then(product => 
                {
                    product.stock = 1;
                    localStorage.setItem(product.id, JSON.stringify(product));
                });
};

//Boton finalizar compra/limpiar carrito
function clearCart()
{
    localStorage.clear();
};

//Boton sumar cantidad
function addQuantity(id)
{
    let item = JSON.parse(localStorage.getItem(id));
    item.stock++;
    localStorage.setItem(id, JSON.stringify(item));
}

//Boton restar cantidad
function removeQuantity(id)
{
    let item = JSON.parse(localStorage.getItem(id));
    item.stock--;
    localStorage.setItem(id, JSON.stringify(item));
}

//Boton eliminar articulo
function removeFromCart(id)
{
    localStorage.removeItem(id);
}