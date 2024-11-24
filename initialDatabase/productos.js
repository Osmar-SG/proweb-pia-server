const { Producto } = require("../db");

const productos = [
  {
    nombre: "Pizza Hawaiana",
    descripcion: "Pizza hecha con los ingredientes: jamón, salchicha y piña",
    precio: 99,
    existencia: 50,
    status: true,
    categoriaProductoId: 1,
  },
];

module.exports = {
  productosDB: async () => {
    const createDB = productos.map((el) => {
      return {
        nombre: el.nombre,
        descripcion: el.descripcion,
        precio: el.precio,
        existencia: el.existencia,
        status: el.status,
        categoriaProductoId: el.categoriaProductoId,
        codigo: "PH1",
      };
    });
    await Producto.bulkCreate(createDB);
  },
};
