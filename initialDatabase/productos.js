const { Producto } = require("../db");

const productos = [
  {
    nombre: "Pizza Hawaiana",
    descripcion: "Pizza hecha con los ingredientes: jamón, salchicha y piña",
    precio: 99,
    existencia: 50,
    status: true,
    codigo: "PH1",
    categoriaProductoId: 1,
  },
  {
    nombre: "Pizza Carner Frías",
    descripcion:
      "Pizza hecha con los ingredientes: jamón, salchicha, tocino y chorizo",
    precio: 120,
    existencia: 50,
    status: true,
    codigo: "PC1",
    categoriaProductoId: 1,
  },
  {
    nombre: "Pizza Vegetariana",
    descripcion:
      "Pizza hecha con los ingredientes: Champiñones, Pimientos y Cebolla",
    precio: 99,
    existencia: 50,
    status: true,
    codigo: "PV1",
    categoriaProductoId: 1,
  },
  {
    nombre: "Refresco Manzana",
    descripcion: "Refrescon Manzana",
    precio: 30,
    existencia: 50,
    status: true,
    codigo: "RM2",
    categoriaProductoId: 2,
  },
  {
    nombre: "Refresco Coca-Cola",
    descripcion: "Refresco Coca-Cola",
    precio: 30,
    existencia: 50,
    status: true,
    codigo: "RC2",
    categoriaProductoId: 2,
  },
  {
    nombre: "Jugo Mango",
    descripcion: "Jugo Mango",
    precio: 99,
    existencia: 50,
    status: true,
    codigo: "JM2",
    categoriaProductoId: 2,
  },
  {
    nombre: "Paquete familiar",
    descripcion: "Pizza Grande con papas y refresco de 2 litros",
    precio: 350,
    existencia: 50,
    status: true,
    codigo: "PF3",
    categoriaProductoId: 3,
  },
  {
    nombre: "Paquete Duo",
    descripcion: "Pizza mediana con 2 refrescos de 600 ml ",
    precio: 199,
    existencia: 50,
    status: true,
    codigo: "PD3",
    categoriaProductoId: 3,
  },
  {
    nombre: "Paquete individual",
    descripcion: "Pizza chica con refresco de 600 ml",
    precio: 120,
    existencia: 50,
    status: true,
    codigo: "PI3",
    categoriaProductoId: 3,
  },
  {
    nombre: "Papas fritas",
    descripcion: "Papas fritas",
    precio: 60,
    existencia: 50,
    status: true,
    codigo: "PF4",
    categoriaProductoId: 4,
  },
  {
    nombre: "Alitas",
    descripcion: "Alitas de diferentes sabores",
    precio: 160,
    existencia: 50,
    status: true,
    codigo: "AL4",
    categoriaProductoId: 4,
  },
  {
    nombre: "Boneless",
    descripcion: "Boneless de varios sabores",
    precio: 200,
    existencia: 50,
    status: true,
    codigo: "BL4",
    categoriaProductoId: 4,
  },
];

module.exports = {
  productosDB: async () => {
    const createDB = productos.map((el) => {
      return {
        nombre: el.nombre,
        descripcion: el.descripcion,
        precio: el.precio,
        existencia: el.existencia,
        status: el.status,
        categoriaProductoId: el.categoriaProductoId,
        codigo: el.codigo,
      };
    });
    await Producto.bulkCreate(createDB);
  },
};
