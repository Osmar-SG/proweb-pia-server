const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("ventas", {
    fecha: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.FLOAT,
    },
  });
};
