const crearProductoButton = document.querySelector("#crearProducto");
const botonBuscar = document.querySelector(".boton_buscar");
const limpiarBuscar = document.querySelector(".limpiar_buscar");
const guardarBoton = document.querySelector(".guardar_boton");
const formatNumber = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});
const renderizarProductos = (producto) => {
  //creamos la lista de productos obtenidos de la base de datos
  const tbody = document.querySelector(".table_body");
  tbody.innerHTML = "";

  producto.map((el) => {
    const { codigo, nombre, descripcion, status, precio } = {
      ...el,
    };
    const fila = document.createElement("tr");

    const borrarCelda = document.createElement("td");
    const botonBorrar = document.createElement("button");
    botonBorrar.innerHTML = `<img src="/images/borrar.png" alt="borrar" class="icon-lupa" />`;
    borrarCelda.appendChild(botonBorrar);

    const editarCelda = document.createElement("td");
    const botonEditar = document.createElement("button");
    botonEditar.innerHTML = `<img src="/images/editar.png" alt="editar" class="icon-lupa"/>`;
    editarCelda.appendChild(botonEditar);

    const codigoCelda = document.createElement("td");
    codigoCelda.innerText = codigo;
    codigoCelda.className = "tabla-info-productos";

    const nombreCelda = document.createElement("td");
    nombreCelda.innerText = nombre;
    nombreCelda.className = "tabla-info-productos";

    const descripcionCelda = document.createElement("td");
    descripcionCelda.innerText = descripcion;
    descripcionCelda.className = "tabla-info-productos";

    const statusCelda = document.createElement("td");
    const statusValor = status ? "Activo" : "Inactivo";
    statusCelda.innerText = statusValor;
    statusCelda.className = "tabla-info-productos";

    const precioCelda = document.createElement("td");
    precioCelda.innerText = formatNumber.format(precio);
    precioCelda.className = "tabla-info-productos";
    precioCelda.style.textAlign = "center";

    fila.appendChild(borrarCelda);
    fila.appendChild(editarCelda);
    fila.appendChild(codigoCelda);
    fila.appendChild(nombreCelda);
    fila.appendChild(descripcionCelda);
    fila.appendChild(statusCelda);
    fila.appendChild(precioCelda);

    tbody.appendChild(fila);
    botonBorrar.addEventListener("click", () => borrarProdcuto(el.id));
    botonEditar.addEventListener("click", () => cargarFormulario(el));
  });
};
const getCategoriesAndProducts = async () => {
  try {
    const productsResponse = await axios.get("/productos/obtenerTodos");
    const productos = productsResponse.data;

    const categoriesResponse = await axios.get(
      "/categoriaProducto/obtenerTodos"
    );
    const categorias = categoriesResponse.data;

    //creamos los elementos para mostrar el select con las categorias
    const select = document.querySelector("#categoria_select");
    categorias.map((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.nombre;
      option.innerText = categoria.nombre;
      select.appendChild(option);
    });

    renderizarProductos(productos);
  } catch (error) {
    console.log(error);
  }
};
//función para crear un nuevo producto
const crearProducto = async () => {
  try {
    const codigoProducto = document.querySelector(".codigoProducto");
    const nombreProducto = document.querySelector(".nombreProducto");
    const descripcionProducto = document.querySelector(".descripcionProducto");
    const categoriaProducto = document.querySelector(".categoriaProducto");
    const statusProducto = document.querySelector(".estadoProducto");
    const precioProducto = document.querySelector(".precioProducto");
    const existenciaProducto = document.querySelector(".existenciaProducto");

    const buscarResponse = await axios.post(
      "/categoriaProducto/buscar/nombre",
      { nombre: categoriaProducto.value }
    );
    const categoria = buscarResponse.data;
    console.log("categoria", categoria[0].id);

    const productoResponse = await axios.post("/productos/crear", {
      nombre: nombreProducto.value,
      descripcion: descripcionProducto.value,
      precio: precioProducto.value,
      existencia: existenciaProducto.value,
      status: statusProducto.value,
      codigo: codigoProducto.value,
      categoriaProductoId: categoria[0].id,
    });

    alert(
      `Se ha creado con exito el producto: ${productoResponse.data.nombre}`
    );
    limpiarFormulario();
    getCategoriesAndProducts();
  } catch (error) {
    console.log(error);
  }
};
//función para filtrar por nombre y/o código
const filtrarProductos = async () => {
  const codigoBuscar = document.querySelector(".codigo_buscar");
  const nombreBuscar = document.querySelector(".nombre_buscar");
  const busquedaResponse = await axios.post("/productos/busqueda", {
    codigo: codigoBuscar.value,
    nombre: nombreBuscar.value,
  });
  const productos = busquedaResponse.data;
  renderizarProductos(productos);
};

const limpiarFormulario = () => {
  document.querySelector(".codigoProducto").value = "";
  document.querySelector(".nombreProducto").value = "";
  document.querySelector(".descripcionProducto").value = "";
  document.querySelector(".categoriaProducto").value = "";
  document.querySelector(".estadoProducto").value = "";
  document.querySelector(".precioProducto").value = "";
  document.querySelector(".existenciaProducto").value = "";
};

const borrarProdcuto = async (id) => {
  try {
    await axios.delete(`/productos/borrar/${id}`);
    alert("Producto borrado con éxito");
    getCategoriesAndProducts();
  } catch (error) {
    console.log(error);
  }
};

const cargarFormulario = async (producto) => {
  limpiarFormulario();
  document.querySelector(".productoId").value = producto.id;
  document.querySelector(".codigoProducto").value = producto.codigo;
  document.querySelector(".nombreProducto").value = producto.nombre;
  document.querySelector(".descripcionProducto").value = producto.descripcion;
  document.querySelector(".categoriaProducto").value =
    producto.categoriaProducto.nombre;
  document.querySelector(".estadoProducto").value = producto.status;
  document.querySelector(".precioProducto").value = producto.precio;
  document.querySelector(".existenciaProducto").value = producto.existencia;
};

const editarProducto = async (id) => {
  const codigo = document.querySelector(".codigoProducto").value;
  const nombre = document.querySelector(".nombreProducto").value;
  const descripcion = document.querySelector(".descripcionProducto").value;
  const status = document.querySelector(".estadoProducto").value;
  const precio = document.querySelector(".precioProducto").value;
  const existencia = document.querySelector(".existenciaProducto").value;

  await axios.put(`/productos/editar/${id}`, {
    codigo,
    nombre,
    descripcion,
    status,
    precio,
    existencia,
  });

  alert("Producto actualizado con éxito");
  getCategoriesAndProducts();
  limpiarFormulario();
};

crearProductoButton.addEventListener("click", crearProducto);
botonBuscar.addEventListener("click", filtrarProductos);
limpiarBuscar.addEventListener("click", getCategoriesAndProducts);
document.addEventListener("DOMContentLoaded", getCategoriesAndProducts);
guardarBoton.addEventListener("click", () => {
  const id = document.querySelector(".productoId").value;
  if (id) {
    editarProducto(id);
  } else {
    alert("No se seleccionó ningún producto para editar");
  }
});
