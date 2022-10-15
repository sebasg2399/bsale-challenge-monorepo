import { Router } from "express";
import { findProduct,getAllProducts } from "../controllers/product.controller.js";

export const product_routes = Router()

product_routes.get("/products/find", findProduct)
product_routes.get("/products", getAllProducts)