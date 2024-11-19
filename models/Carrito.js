const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("carrito", {
    cantidad: {
      type: DataTypes.INTEGER,
    },
  });
};
