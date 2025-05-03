let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId, productName, productPrice) {
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
    saveCartToLocalStorage();
}

function updateCart() {
    const cartTable = document.getElementById("cart-table");
    cartTable.innerHTML = '';
    
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity} تومان</td>
            <td><button onclick="removeFromCart(${item.id})">حذف</button></td>
        `;
        cartTable.appendChild(row);
    });

    updateTotal();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToLocalStorage();
}

function updateTotal() {
    let totalPrice = 0;
    cart.forEach(item => totalPrice += item.price * item.quantity);
    document.getElementById("total-price").textContent = totalPrice;
}

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function applyDiscount() {
    const discountCode = document.getElementById("discount-code").value;
    let discount = 0;

    if (discountCode === "SUMMER10") {
        discount = 10; // 10% discount
    }

    const totalPrice = parseInt(document.getElementById("total-price").textContent);
    const newTotal = totalPrice - (totalPrice * discount / 100);
    document.getElementById("grand-total").textContent = newTotal;
}

function checkout() {
    alert("فرآیند خرید موفقیت‌آمیز بود!");
}

function openCart() {
    document.getElementById("cart-modal").style.display = "flex";
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

document.getElementById("cart-button").addEventListener("click", openCart);
