const htmlProducts = document.getElementById("products");
const htmlCategories = document.getElementById("categories");
const url = new URL("http://localhost:5000");
let cache = {};
let product_quantity = document.getElementById("product_quantity");
product_quantity.innerText = 0;
const ProductCard = (product) => {
  const dicounted_price =
    product.price - (product.price * product.discount) / 100;
  return `
    <img class="product-card__image" src="${
      product.url_image ||
      "https://www.phswarnerhoward.co.uk/assets/images/no_img_avaliable.jpg"
    }" alt="" />
    ${
      product.discount > 0
        ? `<div class="product-card__discount">${product.discount}%</div> `
        : ""
    }
    <div class="product-card__info">
      <h4 class="product-card__name">
      ${product.name}</h4>
      <div class="flex">
      ${
        product.discount > 0
          ? `<p class="product-card__price product-card__price--nodiscount">$/.${product.price}</p>
            <p class="product-card__price product-card__price--discount">$/.${dicounted_price}</p>`
          : `<p class="product-card__price">$/.${product.price}</p>`
      }
      </div>
      <button class="product-card__button">Agregar</button>
    </div>
  `;
};

const renderProducts = (products) => {
  htmlProducts.innerHTML = "";
  product_quantity.innerText = products.length;
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = ProductCard(product);
    htmlProducts.appendChild(card);
  });
};

// function to fetch all products and calling it when page starts
const getAllProducts = () => {
  console.log(cache);
  const endpoint = `products/`;
  cache[endpoint]
    ? renderProducts(cache[endpoint])
    : fetch(url + endpoint).then(async (res) => {
        const { products } = await res.json();
        cache[endpoint] = products
        renderProducts(products);
      });
};

const getCategories = () => {
  fetch(url + "categories").then(async (res) => {
    htmlProducts.innerHTML = "";
    const { categories } = await res.json();
    categories.forEach((cat) => {
      const category_item = document.createElement("button");
      category_item.addEventListener("click", () => {
        getProductsOf(cat.id);
      });
      category_item.classList.add("category-nav__item");
      category_item.innerText = cat.name;
      htmlCategories.appendChild(category_item);
    });
  });
};
getCategories();
getAllProducts();
const getProductsOf = (category_id) => {
  const endpoint = `categories/${category_id}`;
  cache[endpoint]
    ? renderProducts(cache[endpoint])
    : fetch(url + endpoint).then(async (res) => {
        try {
          const { products } = await res.json();
          renderProducts(products);
          cache[endpoint] = products;
        } catch {
          getAllProducts();
        }
      });
};
