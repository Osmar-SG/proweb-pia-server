const { User } = require("../db");

const user = [
  {
    nombre: "Pako",
    apellido: "Mercado",
    edad: 39,
    direccion: "Tuxpan, Ver.",
    email: "pako@email.com",
    contraseña: 12345,
    telefono: 12341234,
    status: true,
  },
  {
    nombre: "Juan",
    apellido: "Perez",
    edad: 39,
    direccion: "Tuxpan, Ver.",
    email: "juan@email.com",
    contraseña: 123,
    telefono: 123,
    status: true,
  },
  
  {
    nombre: "Perla",
    apellido: "Chavez",
    edad: 21,
    direccion: "Monterrey",
    email: "perla@email.com",
    contraseña: 12345,
    telefono: 12341234,
    status: true,
  },
  {
    nombre: "Octavio",
    apellido: "Perez",
    edad: 22,
    direccion: "Monterrey",
    email: "octavio@email.com",
    contraseña: 12345,
    telefono: 12341234,
    status: true,
  },
  {
    nombre: "Maria",
    apellido: "Sanchez",
    edad: 20,
    direccion: "Monterrey",
    email: "maria@email.com",
    contraseña: 12345,
    telefono: 12341234,
    status: true,
  },
  {
    nombre: "Emiliano",
    apellido: "Cepeda",
    edad: 19,
    direccion: "Monterrey",
    email: "emiliano@email.com",
    contraseña: 123,
    telefono: 123,
    status: true,
  },
];

module.exports = {
  userDB: async () => {
    const createDb = user.map((el) => {
      const {
        nombre,
        apellido,
        edad,
        direccion,
        email,
        contraseña,
        telefono,
        status,
      } = { ...el };
      return {
        nombre,
        apellido,
        edad,
        direccion,
        email,
        contraseña,
        telefono,
        status,
      };
    });
    await User.bulkCreate(createDb);
  },
};
