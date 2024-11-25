const { Rol } = require("../db");

const rol = [
  {
    nombre: "Vendedor",
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
