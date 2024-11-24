const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("categoriaProducto", {
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  });
};
