require("dotenv").config;
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

//Hacemos la conexión a la base de datos por medio de sequelize
let sequelize = new Sequelize(
  `mysql://root:Tigre$22@localhost:3306/pia_proweb`,

  // Conexion Enrique
  //`mysql://root:papu123@localhost:3306/pia_proweb`,

  //`mysql://root:osmar2429@localhost:3306/pia_proweb`,

  // `mysql://root:Tigre$22@localhost:3306/pia_proweb`,
  {
    logging: false,
    native: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];

//Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

//Inyectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

//Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//En sequelize.models están todos los modelos importados como propiedadaes
//Para relacionarlos hacemos un destructuring. E.j. const {Usuario, Producto} = sequelize.models
const {
  User,
  Ventas,
  VentaDetalle,
  Producto,
  CategoriaProducto,
  Carrito,
  CorteCaja,
  Rol,
} = sequelize.models;

//Aquí deben de ir las relaciones de las tablas a crear

User.hasMany(CorteCaja);
CorteCaja.belongsTo(User);

User.hasMany(Ventas);
Ventas.belongsTo(User);

Ventas.hasMany(VentaDetalle);
VentaDetalle.belongsTo(Ventas);

Producto.hasMany(VentaDetalle);
VentaDetalle.belongsTo(Producto);

CategoriaProducto.hasMany(Producto);
Producto.belongsTo(CategoriaProducto);

User.hasOne(Rol);
Rol.belongsTo(User);

module.exports = {
  ...sequelize.models, //para poder importar los modelos así: const {Usuario, Producto} = require('./db.js')
  conn: sequelize, // para importar la conexión {conn} = require('./db.js')
};
