const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ventaDetalle", {
    cantidad: {
      type: DataTypes.INTEGER,
    },
    precio_unitario: {
      type: DataTypes.FLOAT,
    },
    subtotal: {
      type: DataTypes.FLOAT,
    },
  });
};
