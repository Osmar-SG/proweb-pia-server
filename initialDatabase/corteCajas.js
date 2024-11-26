const { CorteCaja } = require("../db");

const corteCajas = [
  {
    fecha: "24/11/2024",
    total_efectivo: 1500,
    total_ventas: 1500,
    diferencia: 0,
    userId: 1,
  },
  {
    fecha: "23/11/2024",
    total_efectivo: 2000,
    total_ventas: 2000,
    diferencia: 0,
    userId: 1,
  },
  {
    fecha: "20/11/2024",
    total_efectivo: 2300,
    total_ventas: 2400,
    diferencia: -100,
    userId: 1,
  },
  {
    fecha: "24/11/2024",
    total_efectivo: 1500,
    total_ventas: 1450,
    diferencia: 50,
    userId: 3,
  },
  {
    fecha: "23/11/2024",
    total_efectivo: 500,
    total_ventas: 500,
    diferencia: 0,
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
