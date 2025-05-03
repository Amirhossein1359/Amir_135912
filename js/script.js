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
    if (!cartTable) return;

    cartTable.innerHTML = '';
    
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${(item.price * item.quantity).toLocaleString()} تومان</td>
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

    const totalElement = document.getElementById("total-price");
    const grandTotalElement = document.getElementById("grand-total");

    if (totalElement) totalElement.textContent = totalPrice.toLocaleString();
    if (grandTotalElement) grandTotalElement.textContent = totalPrice.toLocaleString();
}

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function applyDiscount() {
    const discountCodeInput = document.getElementById("discount-code");
    if (!discountCodeInput) return;

    const discountCode = discountCodeInput.value.trim();
    let discount = 0;

    if (discountCode === "SUMMER10") {
        discount = 10;
    }

    const totalText = document.getElementById("total-price").textContent.replace(/,/g, "");
    const totalPrice = parseInt(totalText);
    const newTotal = totalPrice - (totalPrice * discount / 100);

    const grandTotalElement = document.getElementById("grand-total");
    if (grandTotalElement) grandTotalElement.textContent = newTotal.toLocaleString();
}

function checkout() {
    alert("فرآیند خرید با موفقیت انجام شد!");
    cart = [];
    updateCart();
    saveCartToLocalStorage();
}

function openCart() {
    const cartModal = document.getElementById("cart-modal");
    if (cartModal) cartModal.style.display = "flex";
}

function closeCart() {
    const cartModal = document.getElementById("cart-modal");
    if (cartModal) cartModal.style.display = "none";
}

const cartBtn = document.getElementById("cart-button");
if (cartBtn) cartBtn.addEventListener("click", openCart);

// اجرای اولیه برای نمایش سبد خرید
updateCart();
