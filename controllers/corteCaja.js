const { CorteCaja, User } = require("../db");

module.exports = {
  crearCorteCaja: async (req, res) => {
    const { fecha, total_efectivo, total_ventas } = req.body;
    const { userId } = req.params;
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (user) {
        const newCorteCaja = await CorteCaja.create({
          fecha,
          total_efectivo,
          total_ventas,
        });
        const corteCaja = await user.addCorteCaja(newCorteCaja);
        res.status(200).json(corteCaja);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  obtenerTodosCorteCaja: async (req, res) => {
    try {
      const corteCajas = await CorteCaja.findAll({
        include: [{ model: User }],
      });
      res.status(200).json(corteCajas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  obtenerCorteCajaById: async (req, res) => {
    const { id } = req.params;
    try {
      const corteCajas = await CorteCaja.findOne({
        where: { id },
        include: [{ model: User }],
      });
      res.status(200).json(corteCajas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  obtenerCortePorUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const corteCaja = await CorteCaja.findAll({ where: { userId } });
      res.status(200).json(corteCaja);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
