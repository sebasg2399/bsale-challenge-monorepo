import { Op } from "sequelize";
import { Category } from "../models/category.js";
import { Product } from "../models/product.js";

// Funcion findProduct, recibe en su request el valor de la query como q y el limite
// de productos devueltos como limit, de no ser mandado un limit este se le asignara un valor de 80 por defecto
// si la query no existe entonces devolvera un status 400
export const findProduct = async (req, res) => {
  const query = req.query.q;

  const limit = req.query.limit ? parseInt(req.query.limit) + 1 : 80;

  if (!query) {
    return res.status(400).send({ message: "You must give a valid query" });
  } else {
    try {
      // De nuestro modelo productos recogera todos los elementos
      const products = await Product.findAll({
        include: {
          model: Category,
          attributes: ["name"],
        },
      });

      // definimos un contador que nos indicara cuantos productos ha encontrado
      let count = 0;

      // De nuestro arreglo de productos se filtrara segun el nombre y categoria
      // y si el contador es menor al limite
      const query_products = products.filter((product) => {
        if (
          count < limit &&
          (product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.mycategory.name.toLowerCase().includes(query.toLowerCase()))
        ) {
          count++;
          return product;
        }
      });
      // Si no encontro productos devolvera el mensaje y un arreglo de productos vacio
      if (query_products.length == 0) {
        return res.send({ message: "No products found", products: [] });
      }
      // si Encontro productos entonces devolvera un status 200 ok, un mensaje y los productos encontrados
      return res
        .status(200)
        .send({ message: "Your query result", products: query_products });
    } catch (e) {
      // Si falla entonces devolvera un status 400 y el mensaje de error
      res.status(400).send({ message: e.message });
    }
  }
};

// funcion getAllProducts
export const getAllProducts = async (req, res) => {
  // Intentamos recolectar todos los elementos del modelo product
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
      },
    });
    // Si no hay elementos en products entonces devolvemos no products found y un arreglo vacio
    if (products.length == 0) {
      return res.send({ message: "No products found", products: [] });
    }
    // Si existen elementos entonces devolvera un status 200 ok y los productos con un mensaje

    return res.status(200).send({ message: "Your query result", products });
  } catch (e) {
    // Si falla entonces devolvera un status 400 y el mensaje de error
    res.status(400).send({ message: e.message });
  }
};
