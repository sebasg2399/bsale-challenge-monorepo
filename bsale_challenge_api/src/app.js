import express from "express";
import { category_routes } from "./routers/category.route.js";

export const app = express();

app.use(express.json());
app.use(category_routes);
