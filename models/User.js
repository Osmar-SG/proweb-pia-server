const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      apellido: {
        type: DataTypes.STRING,
      },
      edad: {
        type: DataTypes.INTEGER,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      telefono: {
        type: DataTypes.BIGINT,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      email: {
        type: DataTypes.STRING,
      },
      rol: {
        type: DataTypes.ENUM("Administrador", "Vendedor", "Cliente"),
      },
    }
    // { freezeTableName: true }
  );
};
