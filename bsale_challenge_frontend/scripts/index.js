const htmlProducts = document.getElementById("products");
const htmlCategories = document.getElementById("categories");

const url = new URL("https://bsalestorechallengesebas.herokuapp.com/");
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
      ${
        product.in_cart
          ? `<button class="product-card__button product-card__button--oncart" onclick="removeFromCart(${product.id})">Quitar</button>`
          : `<button class="product-card__button" onclick="addToCart(${product.id})">Agregar</button>`
      }
    </div>
  `;
};

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
let global_products = [];
let order_products = [];

const checkInCart = (product) => {
  return cart.find((prod) => product.id === prod.id);
};

const renderProducts = (products) => {
  product_quantity.innerText = products.length;
  htmlProducts.innerHTML = "";
  products = products.map((prod) => {
    if (checkInCart(prod)) {
      return { ...prod, in_cart: true };
    } else {
      return { ...prod, in_cart: false };
    }
  });
  global_products = products;
  order_products = products;
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = ProductCard(product);
    htmlProducts.appendChild(card);
  });
};
// function to fetch all products and calling it when page starts
const getAllProducts = () => {
  htmlProducts.innerHTML = "Cargando productos....";
  const endpoint = `products/`;
  cache[endpoint]
    ? renderProducts(cache[endpoint])
    : fetch(url + endpoint).then(async (res) => {
        const { products } = await res.json();
        cache[endpoint] = products;
        renderProducts(products);
      });
};

const getCategories = () => {
  fetch(url + "categories").then(async (res) => {
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

const htmlOrder = document.getElementById("order");

const getProductsOf = (category_id) => {
  htmlProducts.innerHTML = "Cargando productos....";
  htmlOrder.value = "id";
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

// let search_products = []

const htmlInputSearch = document.getElementById("search_input");
const htmlSearchList = document.getElementById("search_list");
const htmlDivSearch = document.getElementById("search");
const renderSearch = (products) => {
  htmlSearchList.innerHTML = "";
  products.forEach((product) => {
    const item = document.createElement("li");
    item.classList.add("search__item");
    item.innerHTML = product.name;
    htmlSearchList.appendChild(item);
  });
};

let active_state = false;
let search_products = [];

const handleSearch = (e) => {
  const query = e.currentTarget.value;
  const endpoint = `products/find?q=${query}&limit=3`;
  if (query === "") {
    htmlDivSearch.classList.remove("search--active");
    active_state = false;
    htmlSearchList.innerHTML = ``;
    return;
  }
  if (active_state == false) {
    console.log(active_state);
    htmlDivSearch.classList.toggle("search--active");
    active_state = true;
  }
  if (query.length > 3) {
    fetch(url + endpoint).then(async (res) => {
      try {
        const { products, message } = await res.json();
        if (products.length > 0) {
          search_products = products;
          renderSearch(products);
        } else {
          htmlSearchList.innerHTML = `<li class="search__item">No se encontraron productos</li>`;
        }
      } catch {
        htmlSearchList.innerHTML = `<li class="search__item">No se encontraron productos</li>`;
      }
    });
  } else {
    htmlSearchList.innerHTML = `<li class="search__item">Introduzca como minimo 3 caracteres</li>`;
  }
};
htmlInputSearch.addEventListener("keyup", handleSearch);

htmlOrder.addEventListener("change", (e) => {
  console.log(e.target.value);
  OrderProducts(e.target.value);
});

const compareStrings = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  if (a == b) return 0;
};

const OrderProducts = (by) => {
  const sortFn = (a, b) => {
    if (by === "name") {
      return compareStrings(a[by].toLowerCase(), b[by].toLowerCase());
    } else if (by === "discount") {
      return b[by] - a[by];
    } else {
      return a[by] - b[by];
    }
  };
  global_products.sort(sortFn);
  renderProducts(global_products);
};

const addToCart = (product_id) => {
  const productFound = global_products.find((prod) => prod.id === product_id);
  cart.push(productFound);
  
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderProducts(global_products);
};

const removeFromCart = (product_id) => {
  cart = cart.filter((prod) => prod.id !== product_id);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderProducts(global_products);
};

const renderSearchProducts = () => {
  htmlDivSearch.classList.remove("search--active");
  active_state = false;
  htmlSearchList.innerHTML = ``;
  renderProducts(search_products);
};
