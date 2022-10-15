import { Op } from "sequelize";
import { Category } from "../models/category.js";
import { Product } from "../models/product.js";

export const findProduct = async (req, res) => {
  const query = req.query.q;

  console.log(query);
  if (!query) {
    return res.status(400).send({ message: "You must give a valid query" });
  } else {
    try {
      const products = await Product.findAll({
        include: {
          model: Category,
          attributes: ["name"],
        },
      });
      const query_products = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      if (query_products.length < 1) {
        return res.send({ message: "No products found", products: [] });
      }
      return res
        .status(200)
        .send({ message: "Your query result", products: query_products });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
      },
    });
    if (products.length < 1) {
      return res.send({ message: "No products found", products: [] });
    }
    return res.status(200).send({ message: "Your query result", products });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
