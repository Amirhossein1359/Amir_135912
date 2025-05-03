let cart = [];

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCart();
}

function updateCart() {
    let cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `<p>${item.name} - ${item.price} تومان</p>`;
        cartItems.appendChild(itemDiv);
        totalPrice += item.price;
    });

    document.getElementById('total-price').innerText = `${totalPrice} تومان`;
}

// فعال کردن دکمه‌ها در صفحه اصلی
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const products = [
            { name: 'موبایل سامسونگ', price: 5000000 },
            { name: 'هدفون بلوتوث', price: 1200000 },
            { name: 'لپ‌تاپ ایسوس', price: 10000000 }
        ];
        addToCart(products[index].name, products[index].price);
    });
});
