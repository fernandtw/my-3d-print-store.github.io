// cart.js

let cart = [];

function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCartDisplay();
    showNotification(`${productName} added to cart`);
}

function removeFromCart(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartDisplay();
        showNotification(`${productName} removed from cart`);
    }
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    cartElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.className = 'list-group-item d-flex justify-content-between align-items-center';
        itemElement.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name}')">Eliminar</button>
        `;
        cartElement.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    
    // Update cart icon
    const cartIcon = document.getElementById('cart-icon');
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.textContent = itemCount;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize cart display
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});