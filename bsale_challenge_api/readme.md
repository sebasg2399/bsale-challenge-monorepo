

# COMO FUNCIONA LA API

# Primeros pasos
Ejecutar el comando `npm i` para instalar todas las dependencias.

Ejecutar el comando `node src/index.js` para correr el servidor en local.

## express
Para montar el servidor que contendra nuestra api.

## Sequelize
Sequelize es una libreria de nodejs que nos permite crear y conectarnos a bases de datos por medio de su orm
La implementacion de sequelize en este proyecto se realizo porque necesitaba conectarme remotamente a la base de datos brindada por bsale,
sequelize nos permite hacer eso de una forma muy sencilla al inicializar una instancia de Sequelize.
Luego copiamos los esquemas que tiene esta base de datos y los aplicamos a nuestros modelos.
Esto nos permite hacer consultas de una manera muy sencilla, como por ejemplo: `Product.findAll()` seria una consulta que devuelve todos los productos registrados.

# API
Puede encontrar un ejemplo de la api montada en un servidor mediante el siguiente link:

[Este es un link para acceder a la api](https://bsalestorechallengesebas.herokuapp.com/)

`https://bsalestorechallengesebas.herokuapp.com/`

aqui usted podra acceder a las peticiones expuestas en la parte de abajo, como por ejemplo 

[Este es un link para ver los productos en la api](https://bsalestorechallengesebas.herokuapp.com/products)

`https://bsalestorechallengesebas.herokuapp.com/products`


## `GET: /products/`
retorna todos los productos que se encuentren en la base de datos

## `GET: /products/find?q=query&limit=3`
busca y retorna los productos que cumplan con la condicion del query, los criterios de busqueda son nombre del producto y categoria del producto, asi como se puede definir un limite con `limit` para la cantidad de productos que se devolvera

## `GET: /categories/:category_id`
Retorna todos los productos contenidos en esa categoria pasada como param route.

## `GET: /categories/`
Retorna las categorias existentes en la base de datos.
