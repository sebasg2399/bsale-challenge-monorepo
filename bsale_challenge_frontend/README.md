# FRONTEND
Para ejecutarse basta con abrir el archivo html o montar un servidor con la carpeta
podra encontrar la pagina deployada en netlify en el siguiente enlace:

https://glistening-kulfi-7ee2af.netlify.app/

# Estructura del proyecto
* Este proyecto sera inicializado en el archivo index.html

  * En la carpeta principal se encontraran las paginas html,

  * En la carpeta scripts se encontraran los archivos de javascript,

  * En la carpeta styles se encontraran los archivos de css

# La pagina bsale test
Esta pagina es una tienda, nos permite buscar, ordenar y listar por categoria una diversidad de productos que tenemos en nuestra base de datos,
asi como una pequenha funcionalidad agregada para en el futuro complementarse con un sistema de carrito y pagos, utilizando sessionstorage para no perder
informacion de los productos en el carro

## Agregar un producto al carrito
Para agregar un producto al carrito basta con dar click en el boton de agregar, este cambiara de color y texto a quitar.

## Quitar un producto del carrito
Para quitar un producto al carrito basta con dar click en el boton de quitar, este cambiara de color y texto a agregar.

## Realizar una busqueda
Para buscar un producto, escriba en el cuadro de texto que encuentra en la barra de navegacion. El cuadro activara su funcionalidad cuando empiece a escribir
y su busqueda tenga mas de 3 letras, debajo apareceran los productos que se encuentran con un maximo de 3 items, si da al boton de search estos preoductos se mostraran
en la pantalla para agregarse al carrito

## Cambiar de categoria
La categoria principal es all, que mostrara todos los productos cambiar de categoria hara una peticion nueva a la api con los productos que se requieran,
estos se almacenaran en cache para reducir tiempos de espera.

## Carrito
En el carrito podra ver sus items agregados asi como la opcion de pagar, de momento el pagar solo vaciara el carrito y lo llevara a la pagina principal.

## Ordenar por
Este select ordenara segun el criterio elegido, nombre sera de manera alfabetica, precio de menor a mayor y descuento de mayor a menor.

# Muchas gracias :D
