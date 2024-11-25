const { Ventas } = require("../db");

const ventas = [
  {
    fecha: "24/11/2024",
    total: 297,
    userId: 1,
  },
  {
    fecha: "24/11/2024",
    total: 350,
    userId: 1,
  },
  {
    fecha: "24/11/2024",
    total: 60,
    userId: 2,
  },
  {
    fecha: "24/11/2024",
    total: 495,
    userId: 3,
  },
  {
    fecha: "24/11/2024",
    total: 199,
    userId: 3,
  },
  {
    fecha: "24/11/2024",
    total: 297,
    userId: 4,
  },
  {
    fecha: "24/11/2024",
    total: 240,
    userId: 4,
  },
];

module.exports = {
  ventasDB: async () => {
    const createDB = ventas.map((el) => {
      return {
        fecha: el.fecha,
        total: el.total,
        userId: el.userId,
      };
    });
    await Ventas.bulkCreate(createDB);
  },
};
