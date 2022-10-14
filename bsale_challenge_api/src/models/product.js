import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

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
Product.schema("product");
