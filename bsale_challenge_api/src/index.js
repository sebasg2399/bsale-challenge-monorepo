import { app } from "./app.js";
import { sequelize } from "./database.js";

// Declaramos una funcion asincrona main, 
// que utilizara {sequelize} y nos autenticara,
// de fallar devolvera un error, si continua entonces empezara a escuchar
// nuestras peticiones en el puerto 5000 (desarrolo) 
const main = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({
    //   alter: false
    // });
    console.log("Connection with database has been established");
    app.listen(5000);
    console.log("server is listening on port ", 5000);
    // const products = await Product.findAll({});
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
};
main();
