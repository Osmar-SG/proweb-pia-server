const { VentaDetalle, Producto, Ventas, User } = require("../db");

module.exports = {
  crearDetalleVenta: async (req, res) => {
    const { cantidad, productoId, fecha, userId } = req.body;
    try {
      const producto = await Producto.findOne({ where: { id: productoId } });
      if (producto) {
        const ventaDetalle = await VentaDetalle.create({
          cantidad,
          precio_unitario: producto.precio,
          subtotal: cantidad * producto.precio,
        });
        await producto.addVentaDetalles(ventaDetalle);
        const venta = await Ventas.create({
          fecha,
          total: ventaDetalle.subtotal,
        });
        const user = await User.findOne({ where: { id: userId } });
        await venta.addVentaDetalles(ventaDetalle);
        const crearVenta = await user.addVentas(venta);
        // const venta = await Ventas.findOne({ where: { fecha } });
        // if (venta) {
        //   venta.total += ventaDetalle.subtotal;
        //   await venta.save();
        // } else {
        //   const user = await User.findOne({ where: { id: userId } });
        //   const ventas = await Ventas.create({
        //     fecha,
        //     total: ventaDetalle.subtotal,
        //   });
        //   await user.addVentas(ventas);
        //}
        res.status(200).json(crearVenta);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  obtenerVentaDetalles: async (req, res) => {
    try {
      const detalles = await VentaDetalle.findAll({
        include: [
          { model: Producto },
          { model: Ventas, include: [{ model: User }] },
        ],
      });
      res.status(200).json(detalles);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
