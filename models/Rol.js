const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("rol", {
    nombre: {
      type: DataTypes.STRING,
    },
  });
};
