import { Router } from "express";
import { getProducts, getCategories } from "../controllers/category.controller.js";

// Declaramos las rutas de nuestras categorias,
export const category_routes = Router();


// /categories/:category_id ejecutara la funcion getProducts de nuestros controladores
category_routes.get("/categories/:category_id/", getProducts);
// /categories/ ejecutara la funcion getCategories de nuestros controladores
category_routes.get("/categories/", getCategories);
