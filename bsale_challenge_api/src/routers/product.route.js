import { Router } from "express";
import {
  findProduct,
  getAllProducts,
} from "../controllers/product.controller.js";

// Declaramos las rutas de nuestros productos,
export const product_routes = Router();

// /products/find ejecutara la funcion findProduct de nuestros controladores
product_routes.get("/products/find", findProduct);

// /products/ ejecutara la funcion getAllProducts de nuestros controladores
product_routes.get("/products", getAllProducts);
