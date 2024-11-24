const { CategoriaProducto } = require("../db");

const categorias = [
  {
    nombre: "Pizzas",
    descripcion: "Pizzas de diferentes tamaños y sabores",
    imagen: "url de la imagen",
    status: true,
  },
  {
    nombre: "Refrescos",
    descripcion: "Refrescos de diferentes tamaños y sabores",
    imagen: "url de la imagen",
    status: true,
  },
  {
    nombre: "Entradas",
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
