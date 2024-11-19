const { User } = require("../db");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  createUser: async (req, res) => {
    const { nombre, apellido, edad, direccion, telefono, status, email, rol } =
      req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        res.status(400).json({ message: "Usuario existente" });
      } else {
        const newUser = await User.create({
          nombre,
          apellido,
          edad,
          direccion,
          telefono,
          status,
          email,
          rol,
        });
        res.status(200).json(newUser);
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};
