const products = [
    { id: 1, name: 'Product- 1  100'  , price: 100 },
    { id: 2, name: 'Product-2 200 ', price: 200 },
    { id: 3, name: 'Product-3 300', price: 300 },
];

const cart = {};

const productsBox = document.getElementById('products-box');
const cartBox = document.getElementById('cart-box');
const cartItemsUl = document.getElementById('cart-items');
const totalPriceSpan = document.getElementById('total-price');
const emptyCartMessage = document.getElementById('empty-cart-message');

function renderProducts() {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        
        const productName = document.createElement('span');
        productName.textContent = product.name;
        
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.onclick = () => addToCart(product);

        const quantitySpan = document.createElement('span');
        quantitySpan.id = `quantity-${product.id}`;
        quantitySpan.textContent = 0;

        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.onclick = () => removeFromCart(product);

        productDiv.appendChild(productName);
        productDiv.appendChild(addButton);
        productDiv.appendChild(quantitySpan);
        productDiv.appendChild(removeButton);

        productsBox.appendChild(productDiv);
    });
}

function renderCart() {
    cartItemsUl.innerHTML = '';
    let totalPrice = 0;
    let cartEmpty = true;

    Object.values(cart).forEach(item => {
        cartEmpty = false;
        totalPrice += item.price * item.quantity;

        const cartItemLi = document.createElement('li');
        cartItemLi.className = 'cart-item';
        cartItemLi.textContent = `${item.name} - ${item.quantity} x $${item.price} = $${item.quantity * item.price}`;

        cartItemsUl.appendChild(cartItemLi);
    });

    totalPriceSpan.textContent = totalPrice;
    emptyCartMessage.className = cartEmpty ? '' : 'hidden';
}

function addToCart(product) {
    if (cart[product.id]) {
        cart[product.id].quantity += 1;
    } else {
        cart[product.id] = { ...product, quantity: 1 };
    }
    
    document.getElementById(`quantity-${product.id}`).textContent = cart[product.id].quantity;
    renderCart();
}

function removeFromCart(product) {
    if (cart[product.id]) {
        cart[product.id].quantity -= 1;
        if (cart[product.id].quantity === 0) {
            delete cart[product.id];
        } else {
            document.getElementById(`quantity-${product.id}`).textContent = cart[product.id].quantity;
        }
    }
    renderCart();
}

renderProducts();