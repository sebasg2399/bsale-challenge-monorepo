// Declaracion de la url base para nuestras peticiones

const url = new URL("https://bsalestorechallengesebas.herokuapp.com/");
// const url = new URL("http://172.21.205.104:5000/");

// Declaracion de nuestra cache de peticiones, esto lo hacemos para no tener
// que llamar a la API todo el tiempo.
let cache = {};

// Variable del DOM que actualizara el numero de elementos que tiene nuestro
// arreglo de productos
const htmlQuantity = document.getElementById("product_quantity");

// Variable del DOM que nos permitira renderizar nuestros productos
const htmlProducts = document.getElementById("products");

// Variable del DOM que nos permitira renderizar nuestras categorias
const htmlCategories = document.getElementById("categories");

// Variable del DOM de una etiqueta select, que nos permitira cambiar
// el orden de nuestros productos y como se muestran
const htmlOrder = document.getElementById("order");

// La cantidad de productos empezara en 0
htmlQuantity.innerText = 0;

// Funcion Product card, recibe un product como parametro y devuelve
// un html correspondiente al producto, si el producto no tiene una url_image.
// se utilizara una imagen por defecto.

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

// Declaramos nuestro carrito de ventas, se le asignara un valor guardado en el local storage
// o de no existir se asignara un arrego vacio.
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Inicializamos nuestros productos como vacios
let current_products = [];

// Funcion que revisara si existe el producto en el carrito.
const checkInCart = (product) => {
  return cart.find((prod) => product.id === prod.id);
};

// Funcion que modifica nuestro arreglo de productos, revisa cuales
// estan almacenados en el carrito y crea una nueva llave in_cart con este valor
const fixProducts = (products) =>
  products.map((prod) => {
    return { ...prod, in_cart: checkInCart(prod) };
  });

// Funcion que recibe un arreglo de productos, limpia la seccion de productos
// y renderiza los productos
const renderProducts = (products) => {
  htmlQuantity.innerText = products.length;
  htmlProducts.innerHTML = "";
  products = fixProducts(products);
  current_products = products;
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = ProductCard(product);
    htmlProducts.appendChild(card);
  });
};

// Funcion que obtiene nuestros productos desde la Api, especificamente en el endpoint
// products/ que devolvera todos los productos de nuestra base de datos
// asi mismo evaluara si esta llamada se realizo antes y utilizara esos datos en
// nuestro cache en vez de llamar otra vez a la API
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

// Funcion que obtiene las categorias desde nuestra API, especificamente desde el endpoint
// /categories para luego actualizar nuestro DOM con esta informacion
const getCategories = () => {
  fetch(url + "categories").then(async (res) => {
    const { categories } = await res.json();
    categories.forEach((cat) => {
      const category_item = document.createElement("div");
      category_item.addEventListener("click", () => {
        getProductsOfCategory(cat.id);
      });
      category_item.classList.add("category-nav__item");
      category_item.innerText = cat.name;
      htmlCategories.appendChild(category_item);
    });
  });
};

// Al ingresar a la pagina cargaremos las categorias y productos.
getCategories();
getAllProducts();

// Funcion que recibe un numero {category_id} y nos devuelve los productos desde el API, utilizando como endpoint
// categories/{category_id}, este se almacenara en cache el cual sera utilizado si la funcion se llama nuevamente con el mismo
// {category_id}, de fallar en la peticion se llamara a la funcion getAllProducts() para renderizar todos los productos
const getProductsOfCategory = (category_id) => {
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

// Variable del DOM que almacena el input de busqueda
const htmlInputSearch = document.getElementById("search_input");

// Variable del DOM que almacena la lista de busqueda
const htmlSearchList = document.getElementById("search_list");

// Variable del DOM que almacena el formulario de busqueda
const htmlDivSearch = document.getElementById("search_form");

// Funcion que recibe {products} un arreglo de productos,
// y los renderiza en nuestra lista de productos encontrados {htmlSearchList}
// como un li con clase search__item
const renderSearch = (products) => {
  htmlSearchList.innerHTML = "";
  products.forEach((product) => {
    const item = document.createElement("li");
    item.classList.add("search__item");
    item.innerHTML = product.name;
    htmlSearchList.appendChild(item);
  });
};

// Variable que almacena el estado de la busqueda, este cambiara cuando empecemos
// a escribir en nuestro input de busqueda
let active_state = false;

// Variable que almacena los productos que han sido encontrados
let search_products = [];

// Funcion que maneja nuestra busqueda, recibe el evento del input con el query
// este se utiliza para mandar la peticion a la API, con un maximo de 3 productos
// para no traer todos los productos que coinciden si no unos pocos, asi el usuario
// debera ingresar mas caracteres si desea tener una busqueda mas precisa

const handleSearch = (e) => {
  const query = e.currentTarget.value;
  const endpoint = `products/find?q=${query}&limit=3`;
  // Si la query esta en blanco entonces no pasara nada, se reiniciara todo a su estado
  // inicial,
  if (query === "") {
    htmlDivSearch.classList.remove("search--active");
    active_state = false;
    htmlSearchList.innerHTML = ``;
    return;
  }
  // si {active_state} es falso entonces se activara el estado, se mostrara
  // la lista debido a que la clase search--active sera anhadida a nuestro elemento
  if (active_state == false) {
    htmlDivSearch.classList.toggle("search--active");
    active_state = true;
  }
  // Si la query tiene mas de 3 caracteres entonces proseguira a buscar los productos
  // en nuestra api para luego renderizarlos, si no encuentra productos mostrara el mensaje
  // y si la query tiene menos de 3 caracteres entonces mostrara un mensaje de ingresar mas caracteres
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

// Agregamos el evento keyup a nuestro elemento htmlinputsearch que ejecutara la funcion handlesearch
// cada vez que se termine de presionar una tecla
htmlInputSearch.addEventListener("keyup", handleSearch);

// Agregamos el evento change a nuestro elemento htmlorder que ejecutara la funcion orderproducts
// enviando el valor del select en ese momento.
htmlOrder.addEventListener("change", (e) => {
  OrderProducts(e.target.value);
});

// funcion que recibe dos strings y los compara, devuelve -1 si a < b, 1 si a > b y 0 si son iguales
const compareStrings = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  if (a == b) return 0;
};

/**
 *
 *
 */

// Funcion que ordena los productos segun el criterio enviado, este criterio puede ser el nombre descuento precio
// id, para el name utilizara la funcion de comparestrings, y enviara nuestros strings en lowercase
// para el caso de recibir el criterio discount entonces devolvera los descuentos de mayor a menor,
// para los demas casos se devolvera el array de menor a mayor
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
  current_products.sort(sortFn);
  renderProducts(current_products);
};

// Funcion que nos permite agregar al carrito los productos, recibe un number {product_id}
// obtendra el producto de nuestro {current_products} mediante la funcion find y almacenara su resultado
// en el carrito mandandolo tambien al localstorage y luego renderizar nuevamente los productos actuales,
// para que se actualicen el estado de si esta en el carrito o no.
const addToCart = (product_id) => {
  const productFound = current_products.find((prod) => prod.id === product_id);
  cart.push(productFound);

  localStorage.setItem("cart", JSON.stringify(cart));
  renderProducts(current_products);
};

// Funcion que nos permite quitar los productos del carrito, recibe un number {product_id}
// hara un filter con el id pasado y se asignara a nuestro cart, luego se mandara al local storage
// y se renderizara nuevamente los productos actuales para que ya no aparezca el quitar en el producto

const removeFromCart = (product_id) => {
  cart = cart.filter((prod) => prod.id !== product_id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderProducts(current_products);
};

// Agregaremos un evento al elemento htmldivsearch, este ejecutara renderSearchProducts()
// si existen productos encontrados
htmlDivSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search_products.length === 0) {
    return;
  }
  renderSearchProducts();
});

// Funcion que renderiza los productos encontrados en la barra de busqueda en nuestro
// contenedor principal de productos para que puedan ser anhadidos al carrito
// y reinicia el estado de la busqueda
const renderSearchProducts = () => {
  htmlDivSearch.classList.remove("search--active");
  active_state = false;
  htmlSearchList.innerHTML = ``;
  renderProducts(search_products);
};
