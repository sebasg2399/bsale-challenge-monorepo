import express from "express";
import cors from "cors";
import { category_routes } from "./routers/category.route.js";
import { product_routes } from "./routers/product.route.js";
export const app = express();

app.use(express.json());
app.use(cors());
app.use(category_routes);
app.use(product_routes);
