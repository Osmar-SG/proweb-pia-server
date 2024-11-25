const { VentaDetalle } = require("../db");

const detalleVenta = [
  {
    cantidad: 3,
    precio_unitario: 99,
    subtotal: 297,
    ventaId: 1,
    productoId: 1,
  },
  {
    cantidad: 1,
    precio_unitario: 350,
    subtotal: 350,
    ventaId: 2,
    productoId: 7,
  },
  {
    cantidad: 2,
    precio_unitario: 30,
    subtotal: 60,
    ventaId: 3,
    productoId: 5,
  },
  {
    cantidad: 5,
    precio_unitario: 99,
    subtotal: 495,
    ventaId: 4,
    productoId: 3,
  },
  {
    cantidad: 1,
    precio_unitario: 199,
    subtotal: 199,
    ventaId: 5,
    productoId: 8,
  },
  {
    cantidad: 3,
    precio_unitario: 99,
    subtotal: 297,
    ventaId: 6,
    productoId: 1,
  },
  {
    cantidad: 2,
    precio_unitario: 240,
    subtotal: 240,
    ventaId: 7,
    productoId: 9,
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
        ventaId: el.ventaId,
      };
    });
    await VentaDetalle.bulkCreate(createDb);
  },
};
