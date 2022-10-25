import { sequelize } from "../database.js";
import { Product } from "./product.js";
import { DataTypes } from "sequelize";

// Definimos el modelo categoria, con las columnas que se requieren,
// el producto sera llamado mycategory debido a que llamarlo category
// generaria un conflicto al inicializar su esquema.
export const Category = sequelize.define(
  "mycategory",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "category",
    timestamps: false,
  }
);

// Generamos el esquema de categoria, que sera recibido desde nuestra base de datos
// mysql de manera remota
Category.schema("category");

// Definimos las relaciones que tienen estos modelos

// Categoria tiene muchos productos, estos se definiran como productos y asignaran
// a cada producto la columna category, que contendra el id de la categoria a la que pertenece
Category.hasMany(Product, {
  as: "products",
  foreignKey: "category",
  sourceKey: "id",
});
Product.belongsTo(Category, {
  foreignKey: "category",
  targetKey: "id",
});
