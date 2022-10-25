// Declaramos el carrito, este obtendra su valor desde el localStorage o si no existe en el localstorage
// se le asignara un array vacio

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elemento del DOM que almacena la informacion de los productos en el carrito
const HtmlCart = document.getElementById("cart-list");

// renderizamos los productos en el carrito dentro de htmlcart
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

// Elemento del DOM que almacena el valor del subtotal del carrito
const htmlSubtotal = document.getElementById("subtotal");
// Elemento del DOM que almacena el valor del descuento total del carrito
const htmlDescuento = document.getElementById("descuento");
// Elemento del DOM que almacena el valor del total del carrito
const htmlTotal = document.getElementById("total");

// Hallamos el subtotal con la funcion reduce, que sumara el precio
// sin el descuento aplicado
let subtotal = cart.reduce((curr, prev) => {
  console.log(prev);
  return curr + prev.price;
}, 0);

// Hallamos el descuento total de todos los productos
let discount = cart.reduce((curr, prev) => {
  const discount = (prev.price * prev.discount) / 100;
  return curr + discount;
}, 0);

// Asignamos nuestro subtotal al innertext del elemento en el dom htmlsubtotal
htmlSubtotal.innerText = `$/${subtotal}`;
// Asignamos nuestro discount  al innertext del elemento en el dom htmldescuento
htmlDescuento.innerText = `$/-${discount}`;
// Asignamos a nuestro elemento del dom htmltotal el subtotal - discount que vendria a ser nuestro total
htmlTotal.innerText = `$/${subtotal - discount}`;

// Elemento del DOM que almacena nuestro boton de pagar
const htmlPay = document.getElementById("paybtn");

// Asignamos el evento click a nuestro boton, que reiniciara el estado y nos devolvera a la pagina principal
htmlPay.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location = "./index.html";
});
