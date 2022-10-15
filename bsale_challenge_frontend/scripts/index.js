const htmlProducts = document.getElementById("products");
const url = new URL("http://localhost:5000");

const ProductCard = (product) => {
  return `
    <img class="product-card__image" src="${product.url_image}" alt="" />
    <div className="product-card__info">
    <h4 className="product-card__name">
    ${product.name}</h4>
    ${
      product.disccount > 0
        ? `<p className="product-card__price--discount">${product.price}</p>`
        : `<p className="product-card__price">${product.price}</p>`
    }
    </div>
  `;
};

products = fetch(url + "products").then(async (res) => {
  const { products } = await res.json();
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = ProductCard(product);
    htmlProducts.appendChild(card);
  });
});
