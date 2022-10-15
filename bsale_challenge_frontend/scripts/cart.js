const url = new URL("http://localhost:5000");
let cache = {};

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
console.log(cart);

const HtmlCart = document.getElementById("cart-list");

cart.forEach((prod) => {
  const row = document.createElement("tr");
  // row.classList.add("cart__row");
  const dicounted_price = prod.price - (prod.price * prod.discount) / 100;
  row.innerHTML = `
  <td >
    <div class="product">
      <img  class="product__image" src=${prod.url_image} alt="" />
      <p class="product__name">${prod.name}</p>
    </div>
  </td>
  <td >
    <div class="product__price">
      <p class="product-card__price product-card__price--nodiscount">
        $/${prod.price}
      </p>
      <p class="product-card__price product-card__price--discount">
        $/${dicounted_price}
      </p>
    </div>
  </td>
  
  `;
  HtmlCart.appendChild(row);
});
const htmlSubtotal = document.getElementById("subtotal");
const htmlDescuento = document.getElementById("descuento");
const htmlTotal = document.getElementById("total");

let subtotal = cart.reduce((curr, prev) => {
  console.log(prev);
  return curr + prev.price;
}, 0);
let discount = cart.reduce((curr, prev) => {
  const discount = (prev.price * prev.discount) / 100;
  return curr + discount;
}, 0);

htmlSubtotal.innerText = `$/${subtotal}`;
htmlDescuento.innerText = `$/-${discount}`;
htmlTotal.innerText = `$/${subtotal - discount}`;

htmlPay = document.getElementById("paybtn");
htmlPay.addEventListener("click", () => {
  cart = [];
  sessionStorage.setItem("cart", JSON.stringify(cart));
  window.location = "./index.html";
});
