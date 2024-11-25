document.addEventListener("DOMContentLoaded", async function () {
  const ventaNombre = document.querySelector(".venta_nombre");
  const ventaCantidad = document.querySelector(".venta_cantidad");
  const ventaCodigo = document.querySelector(".venta_codigo");
  const searchButton = document.querySelector(".search_product");

  //buscamos todas las categorias disponibles en la BD
  const getProductsCategories = await axios.get(
    "/categoriaProducto/obtenerTodos"
  );
  //creamos una funcion para formatear el precio de cada producto
  const formatNumber = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  //creamos una función para buscar el producto por nombre o código
  const buscarProducto = async () => {
    try {
      const response = await axios.post("/productos/busqueda", {
        nombre: ventaNombre.value,
        codigo: ventaCodigo.value,
      });
      const productoEncontrado = response.data[0];

      const tbody = document.querySelector(".table_body");
      const fila = document.createElement("tr");
      fila.className = "tabla-info-fila";

      const productoCelda = document.createElement("td");
      productoCelda.className = "tabla-info-productos";
      productoCelda.innerText = productoEncontrado.nombre;

      const precioCelda = document.createElement("td");
      productoCelda.className = "tabla-info-productos";
      precioCelda.innerText = productoEncontrado.precio;

      const cantidadCelda = document.createElement("td");
      productoCelda.className = "tabla-info-productos";
      cantidadCelda.innerText = ventaCantidad.value;

      const subtotalCelda = document.createElement("td");
      productoCelda.className = "tabla-info-productos";
      const cantidad = parseInt(ventaCantidad.value, 10) || 0;
      const total = cantidad * productoEncontrado.precio;
      subtotalCelda.innerText = formatNumber.format(total);

      const botonAccion = document.createElement("td");
      productoCelda.className = "tabla-info-productos";
      const boton = document.createElement("button");
      boton.innerHTML = `<img class="icon-trash"src="images/ICON-TRASH.png" alt=""/>`;

      boton.addEventListener("click", () => fila.remove());

      fila.appendChild(productoCelda);
      fila.appendChild(precioCelda);
      fila.appendChild(cantidadCelda);
      fila.appendChild(subtotalCelda);
      fila.appendChild(botonAccion);

      tbody.appendChild(fila);
    } catch (error) {
      console.log(error);
    }
  };

  const modals = getProductsCategories.data; //guardamos los resultdos en la constante modals
  //Iteramos en cada elemento recibido y obtenemos los selectores en el html de acuerdo al nombre de cada categoria recibida
  modals.map((modalType) => {
    const button = document.getElementById(
      `${modalType.nombre.toLowerCase()}Button`
    );
    const modal = document.getElementById(
      `${modalType.nombre.toLowerCase()}Modal`
    );
    const closeButton = modal.querySelector(".close-btn");
    const itemList = document.getElementById(
      `${modalType.nombre.toLowerCase()}List`
    );

    async function cargarItems(id) {
      //buscamos los productos disponibles en cada categoria
      const response = await axios.get(`/productos/categoria/${id}`);
      const productos = response.data;
      try {
        itemList.innerHTML = ""; // borramos información en la lista si es que la hubiera
        productos.map((producto) => {
          const fila = document.createElement("tr"); //creamos la fila de la tabla
          //genereamos los items de la tabla a mostrar
          const nombreCelda = document.createElement("td");
          nombreCelda.innerText = producto.nombre;
          const precioCelda = document.createElement("td");
          precioCelda.innerText = formatNumber.format(producto.precio);
          const descripcionCelda = document.createElement("td");
          descripcionCelda.innerText = producto.descripcion;
          const codigoCelda = document.createElement("td");
          codigoCelda.innerText = producto.codigo;

          //agregamos los datos a la fila
          fila.appendChild(nombreCelda);
          fila.appendChild(precioCelda);
          fila.appendChild(descripcionCelda);
          fila.appendChild(codigoCelda);

          //agregamos la fila a itemList
          itemList.appendChild(fila);
        });
      } catch (error) {
        console.error(`Error loading ${modalType}:`, error);
      }
    }

    button.addEventListener("click", () => {
      modal.style.display = "block";
      cargarItems(modalType.id);
    });

    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    searchButton.removeEventListener("click", buscarProducto);
    searchButton.addEventListener("click", buscarProducto);
  });
});
