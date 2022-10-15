import { Router } from "express";
import { findProduct } from "../controllers/product.controller.js";

export const product_routes = Router()

product_routes.get("/products", findProduct)