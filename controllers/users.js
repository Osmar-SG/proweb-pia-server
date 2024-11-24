const { User, Rol } = require("../db");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({ include: [{ model: Rol }] });
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  createUser: async (req, res) => {
    const {
      nombre,
      apellido,
      edad,
      direccion,
      telefono,
      status,
      email,
      rol,
      contraseña,
    } = req.body;
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
          contraseña,
        });
        const userRol = await Rol.create({ nombre: rol });
        await newUser.setRol(userRol);
        res.status(200).json(newUser);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id } });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  login: async (req, res, next) => {
    const { email, contraseña } = req.body;
    try {
      const userFinded = await User.findOne({
        where: { email },
      });
      const userRole = await Rol.findOne({ where: { userId: userFinded.id } });
      if (!userFinded) {
        return res
          .status(401)
          .json({ message: "No se encontró al usuario en el sistema." });
      }
      if (userFinded) {
        if (userFinded.contraseña !== contraseña) {
          res.status(401).json({ message: "Contraseña incorrecta" });
        } else {
          req.session.isLoggedIn = true;
          req.session.user = {
            id: userFinded.id,
            nombre: userFinded.nombre,
            email: userFinded.email,
            rol: userRole.nombre,
          };
        }
        res.status(200).json(req.session.user);
      }
      // res.status(200).send("Usuario loggeado con exito! 🤓");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(
          "Error al destruir la sesión o es posible que no haya sesión iniciada",
          err
        );
        return res.status(500).json({ message: "Error al cerrar la sesión" });
      }
      res.clearCookie("connect.sid"); //Borra la cookie de la sesión.
      res.status(200).json({ message: "Sesión terminada con éxito" });
    });
  },
};
