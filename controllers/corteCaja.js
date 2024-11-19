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
};
