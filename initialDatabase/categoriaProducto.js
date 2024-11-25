const { CategoriaProducto } = require("../db");

const categorias = [
  {
    nombre: "Pizza",
    descripcion: "Pizzas de diferentes tamaños y sabores",
    imagen: "url de la imagen",
    status: true,
  },
  {
    nombre: "Bebidas",
    descripcion: "Refrescos de diferentes tamaños y sabores",
    imagen: "url de la imagen",
    status: true,
  },
  {
    nombre: "Combos",
    descripcion: "Paquetes de pizza y adicionales a mejor precio",
    imagen: "url de la imagen",
    status: true,
  },
  {
    nombre: "Extras",
    descripcion: "Papas fritas, boneless, alitas, etc",
    imagen: "url de la imagen",
    status: true,
  },
];

module.exports = {
  categoriasDb: async () => {
    const createDB = categorias.map((el) => {
      return {
        nombre: el.nombre,
        descripcion: el.descripcion,
        imagen: el.imagen,
        status: el.status,
      };
    });
    await CategoriaProducto.bulkCreate(createDB);
  },
};
