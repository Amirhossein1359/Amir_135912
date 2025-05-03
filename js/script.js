let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId, productName, productPrice) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
    saveCart();
}

function updateCart() {
    const table = document.getElementById("cart-table");
    table.innerHTML = "";
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price * item.quantity} تومان</td>
          <td><button onclick="removeFromCart(${item.id})">حذف</button></td>
        `;
        table.appendChild(row);
    });
    updateTotal();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    saveCart();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("total-price").textContent = total;
    document.getElementById("grand-total").textContent = total;
}

function applyDiscount() {
    const code = document.getElementById("discount-code").value;
    const total = parseInt(document.getElementById("total-price").textContent);
    let newTotal = total;

    if (code === "OFF10") {
        newTotal = total * 0.9;
    }

    document.getElementById("grand-total").textContent = Math.floor(newTotal);
}

function checkout() {
    alert("پرداخت موفقیت‌آمیز بود!");
    cart = [];
    updateCart();
    saveCart();
    closeCart();
}

function openCart() {
    document.getElementById("cart-modal").style.display = "flex";
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

document.getElementById("cart-button").addEventListener("click", openCart);
