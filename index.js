const server = require("./app");
const { conn } = require("./db");
const cProductoFunctions = require("./initialDatabase/categoriaProducto");
const productoFunctions = require("./initialDatabase/productos");
const ventaDetalleFunctions = require("./initialDatabase/ventaDetalles");
const ventasFunctions = require("./initialDatabase/ventas");
const userFunctions = require("./initialDatabase/usuario");
const rolFunctions = require("./initialDatabase/rol");
const corteCajaFunctions = require("./initialDatabase/corteCajas");

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
    await userFunctions.userDB();
    await rolFunctions.rolDB();
    await cProductoFunctions.categoriasDb();
    await productoFunctions.productosDB();
    await ventasFunctions.ventasDB();
    await ventaDetalleFunctions.ventaDetalleDB();
    await corteCajaFunctions.corteCajasDB();
    console.log(`servidor listo y escuchando en el puerto ${PORT}`);
  });
});
