const { Rol } = require("../db");

const rol = [
  {
    nombre: "Administrador",
    userId: 1,
  },
  {
    nombre: "Vendedor",
    userId: 2,
  },
  {
    nombre: "Vendedor",
    userId: 3,
  },
  {
    nombre: "Vendedor",
    userId: 4,
  },
  {
    nombre: "Vendedor",
    userId: 5,
  },
  {
    nombre: "Administrador",
    userId: 6,
  },
];

module.exports = {
  rolDB: async () => {
    const createDB = rol.map((el) => {
      const { nombre, userId } = { ...el };
      return { nombre, userId };
    });
    await Rol.bulkCreate(createDB);
  },
};
