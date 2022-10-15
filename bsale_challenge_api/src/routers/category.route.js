import { Router } from "express";
import { getProducts, getCategories } from "../controllers/category.controller.js";

export const category_routes = Router();

category_routes.get("/categories/:category_id/", getProducts);
category_routes.get("/categories/", getCategories);
