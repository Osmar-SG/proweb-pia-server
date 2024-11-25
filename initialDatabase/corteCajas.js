const { CorteCaja } = require("../db");

const corteCajas = [
  {
    fecha: "24/11/2024",
    total_efectivo: 1500,
    total_ventas: 20,
    userId: 1,
  },
  {
    fecha: "23/11/2024",
    total_efectivo: 2000,
    total_ventas: 40,
    userId: 1,
  },
  {
    fecha: "20/11/2024",
    total_efectivo: 2300,
    total_ventas: 25,
    userId: 1,
  },
  {
    fecha: "24/11/2024",
    total_efectivo: 1500,
    total_ventas: 20,
    userId: 3,
  },
  {
    fecha: "23/11/2024",
    total_efectivo: 500,
    total_ventas: 20,
    userId: 4,
  },
];

module.exports = {
  corteCajasDB: async () => {
    const createDB = corteCajas.map((el) => {
      const { fecha, total_efectivo, total_ventas, userId } = { ...el };
      return { fecha, total_efectivo, total_ventas, userId };
    });
    await CorteCaja.bulkCreate(createDB);
  },
};
