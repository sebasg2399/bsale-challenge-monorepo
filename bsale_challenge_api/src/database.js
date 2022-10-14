import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  username: "bsale_test",
  password: "bsale_test",
  database: "bsale_test",
  logging: (...msg) => console.log(msg)
})