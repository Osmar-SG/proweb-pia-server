const server = require("./app");
const { conn } = require("./db");
const cProductoFunctions = require("./initialDatabase/categoriaProducto");
const productoFunctions = require("./initialDatabase/productos");
const ventaDetalleFunctions = require("./initialDatabase/ventaDetalles");

const PORT = process.env.PORT || 3000;

// (async () => {
//   try {
//     await conn.sync({ alter: true });
//     console.log("conexión con exito a la base de datos");
//   } catch (error) {
//     console.log("Error al conectar con la base de datos", error);
//   }
// })();

conn.sync({ force: true }).then(() => {
  //cambiar a force:false para dejar de borrar las tablas al reiniciar el servidor
  server.listen(PORT, async () => {
    await cProductoFunctions.categoriasDb();
    await productoFunctions.productosDB();
    // await ventaDetalleFunctions.ventaDetalleDB();
    console.log(`servidor listo y escuchando en el puerto ${PORT}`);
  });
});
