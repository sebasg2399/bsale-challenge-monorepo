import { Router } from "express";
import { getProducts } from "../controllers/category.controller.js";

export const category_routes = Router();

category_routes.get("/category/:category_id/", getProducts);
