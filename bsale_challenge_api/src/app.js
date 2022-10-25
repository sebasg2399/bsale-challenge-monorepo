import express from "express";
import cors from "cors";

import { category_routes } from "./routers/category.route.js";
import { product_routes } from "./routers/product.route.js";

// Declaramos nuestra variable app como un objeto de express
export const app = express();

// Utilizaremos json para realizar nuestras peticiones y enviar las respuestas
app.use(express.json());

// Utilizamos cors para poder acceder de manera local a esta API (solo en desarrollo)

app.use(cors());

// Indicamos a app a utilizar nuestras rutas declaradas en category_routes
app.use(category_routes);

// Indicamos a app a utilizar nuestras rutas declaradas en product_routes
app.use(product_routes);
