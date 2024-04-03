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

//Bot�n finalizar compra/limpiar carrito
function clearCart()
{
    localStorage.clear();
};

//Bot�n sumar cantidad
function addQuantity(id)
{
    let item = JSON.parse(localStorage.getItem(id));
    item.stock++;
    localStorage.setItem(id, JSON.stringify(item));
}

//Bot�n restar cantidad
function removeQuantity(id)
{
    let item = JSON.parse(localStorage.getItem(id));
    item.stock--;
    localStorage.setItem(id, JSON.stringify(item));
}

//Bot�n eliminar articulo
function removeFromCart(id)
{
    localStorage.removeItem(id);
}