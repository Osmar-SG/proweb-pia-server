const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("corteCaja", {
    fecha: {
      type: DataTypes.STRING,
    },
    total_efectivo: {
      type: DataTypes.FLOAT,
    },
    total_ventas: {
      type: DataTypes.FLOAT,
    },
  });
};
