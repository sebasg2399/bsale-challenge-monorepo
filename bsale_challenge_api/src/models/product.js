import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";


// Definimos el modelo producto, con las columnas que se requieren,
// el producto sera llamado myproduct debido a que llamarlo product
// generaria un conflicto al inicializar su esquema.
export const Product = sequelize.define(
  "myproduct",
  {
    name: {
      type: DataTypes.STRING,
    },
    url_image: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "product",
    timestamps: false,
  }
);
// Generamos el esquema del producto, que sera recibido desde nuestra base de datos
// mysql de manera remota

Product.schema("product");
