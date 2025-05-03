function addToCart(title, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ title, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${title} به سبد خرید اضافه شد!`);
}
