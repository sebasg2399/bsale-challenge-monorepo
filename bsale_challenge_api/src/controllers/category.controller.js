import { Category } from "../models/category.js";
import { Product } from "../models/product.js";

// Funcion getProducts, recibe el req con el parametro category_id
// que nos servira para devolver los productos que pertenecen a esa categoria
export const getProducts = async (req, res) => {
  // Obtenemos el id de la categoria de los params
  const cat_id = req.params.category_id;

  // Si no se brindo un cat_id entonces se devuelve un 400 error y se envia un mensaje
  if (!cat_id) {
    return res.status(400).send({ message: "You must provide a category id" });
  } else {
    try {
      // Buscamos la categoria que tiene el id brindado y la almacenamos en una variable
      const category = await Category.findByPk(cat_id);

      // Si no encontro una categoria se devuelve un status 400 not found
      if (!category) {
        return res.status(400).send({ message: "Category not found" });
      } else {
        // Si la categoria existe entonces invocaremos a nuestros elementos del modelo product
        // y los filtraremos con where, este evaluara si su columna category == category.id

        const products = await Product.findAll({
          where: {
            category: category.id,
          },
        });
        // Devolveremos como respuesta un mensaje con status 200 y los productos
        return res.status(200).send({
          message: `Products with category ${category.name} successfully`,
          products,
        });
      }
    } catch (e) {
      // Si falla entonces devolvera un status 400 y el mensaje de error
      return res.status(400).send({ message: e.message });
    }
  }
};

// Funcion que devuelve todas las categorias
export const getCategories = async (req, res) => {
  // Invocamos a todos los elementos del modelo category
  try {
    const categories = await Category.findAll({});
    if (categories.length === 0) {
      // Si no hay elementos entonces devolvemos un status 400 y un arreglo vacio
      return res
        .status(400)
        .send({ message: "No categories found", categories: [] });
    } else {
      // Devolvemos un status 200 y las categorias
      return res.status(200).send({
        message: `Categories fetched succesfully`,
        categories,
      });
    }
  } catch (e) {
    // Si falla entonces devolvera un status 400 y el mensaje de error
    return res.status(400).send({ message: e.message });
  }
};
