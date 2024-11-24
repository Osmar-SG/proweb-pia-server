const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("producto", {
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    precio: {
      type: DataTypes.FLOAT,
    },
    existencia: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    codigo: {
      type: DataTypes.STRING,
    },
  });
};
