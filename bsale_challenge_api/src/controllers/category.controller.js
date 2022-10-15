import { Category } from "../models/category.js";
import { Product } from "../models/product.js";

export const getProducts = async (req, res) => {
  const cat_id = req.params.category_id;

  if (!cat_id) {
    return res.status(400).send({ message: "You must provide a category id" });
  } else {
    try {
      const category = await Category.findByPk(cat_id);
      if (!category) {
        return res.status(400).send({ message: "Category not found" });
      } else {
        const products = await Product.findAll({
          where: {
            category: category.id,
          },
        });
        return res.status(200).send({
          message: `Products with category ${category.name} successfully`,
          products,
        });
      }
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({});
    if (categories.length === 0) {
      return res
        .status(400)
        .send({ message: "No categories found", categories: [] });
    } else {
      return res.status(200).send({
        message: `Categories fetched succesfully`,
        categories,
      });
    }
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};
