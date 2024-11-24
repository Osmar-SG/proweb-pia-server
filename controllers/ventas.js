const { User, Ventas } = require("../db");

module.exports = {
  crearVenta: async (req, res) => {
    const { fecha, total } = req.body;
    const { userId } = req.params;
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (user) {
        const crearVenta = await Ventas.create({ fecha, total });
        const venta = await user.addVenta(crearVenta);
        res.status(200).json(venta);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  obtenerVentas: async (req, res) => {
    try {
      const ventas = await Ventas.findAll({ include: [{ model: User }] });
      res.status(200).json(ventas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  obtenerVentasById: async (req, res) => {
    const { userId } = req.params;
    try {
      const ventas = await Ventas.findAll({
        where: { userId },
        include: [{ model: User }],
      });
      res.status(200).json(ventas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
