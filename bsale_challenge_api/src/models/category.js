import { sequelize } from "../database.js";
import { Product } from "./product.js";
import { DataTypes } from "sequelize";
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
Category.schema("category");

Category.hasMany(Product, {
  as: "products",
  foreignKey: "category",
  sourceKey: "id",
});
Product.belongsTo(Category, {
  foreignKey: "category",
  targetKey: "id",
});
