const { VentaDetalle } = require("../db");

const detalleVenta = [
  {
    cantidad: 3,
    precio_unitario: 99,
    subtotal: 297,
    productoId: 1,
  },
];

module.exports = {
  ventaDetalleDB: async () => {
    const createDb = detalleVenta.map((el) => {
      return {
        cantidad: el.cantidad,
        precio_unitario: el.precio_unitario,
        subtotal: el.subtotal,
        productoId: el.productoId,
      };
    });
    await VentaDetalle.bulkCreate(createDb);
  },
};
