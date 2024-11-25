document.addEventListener("DOMContentLoaded", async function () {
  const ventaNombre = document.querySelector(".venta_nombre");
  const ventaCantidad = document.querySelector(".venta_cantidad");
  const ventaCodigo = document.querySelector(".venta_codigo");
  const searchButton = document.querySelector(".search_product");

  let productos = [];

  //buscamos todas las categorias disponibles en la BD
  const getProductsCategories = await axios.get(
    "/categoriaProducto/obtenerTodos"
  );
  //creamos una funcion para formatear el precio de cada producto
  const formatNumber = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  //creamos una función para buscar el producto por nombre o código y lo agregamos a la lista de compra
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

      const idCelda = document.createElement("td");
      idCelda.className = "producto_id";
      idCelda.style.display = "none";
      idCelda.textContent = productoEncontrado.id;

      const productoCelda = document.createElement("td");
      productoCelda.className = "tabla-info-productos producto_nombre";
      productoCelda.innerText = productoEncontrado.nombre;

      const precioCelda = document.createElement("td");
      precioCelda.className = "tabla-info-productos producto_precio";
      precioCelda.innerText = productoEncontrado.precio;

      const cantidadCelda = document.createElement("td");
      cantidadCelda.className = "tabla-info-productos producto_cantidad";
      cantidadCelda.innerText = ventaCantidad.value;

      const subtotalCelda = document.createElement("td");
      subtotalCelda.className = "tabla-info-productos producto_subtotal";
      const cantidad = parseInt(ventaCantidad.value, 10) || 0;
      const total = cantidad * productoEncontrado.precio;
      subtotalCelda.innerText = formatNumber.format(total);

      const botonAccion = document.createElement("td");
      botonAccion.className = "tabla-info-productos";
      const boton = document.createElement("button");
      const imageTrash = document.createElement("img");
      imageTrash.className = "icon-trash";
      imageTrash.src = "images/ICON-TRASH.png";
      imageTrash.alt = "delete element";
      boton.appendChild(imageTrash);
      botonAccion.appendChild(boton);

      boton.addEventListener("click", () => fila.remove());

      fila.appendChild(idCelda);
      fila.appendChild(productoCelda);
      fila.appendChild(precioCelda);
      fila.appendChild(cantidadCelda);
      fila.appendChild(subtotalCelda);
      fila.appendChild(botonAccion);

      tbody.appendChild(fila);
      pagoVenta();
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
  });
  searchButton.addEventListener("click", buscarProducto);

  //creamos la función para que tome los datos del subtotal y generar la venta
  const crearVenta = async () => {
    const filas = document.querySelectorAll(".tabla-info-fila");
    const userId = user.id;
    const fecha = document.querySelector(".fecha_venta");

    filas.forEach(async (fila) => {
      try {
        const cantidad = fila.querySelector(
          ".tabla-info-productos.producto_cantidad"
        );
        const productoId = fila.querySelector(".producto_id");

        const cantidadValor = cantidad ? cantidad.textContent.trim() : null;
        const productoIdValor = productoId
          ? productoId.textContent.trim()
          : null;

        await axios.post("/detalleVentas", {
          cantidad: cantidadValor,
          productoId: productoIdValor,
          fecha: fecha.value,
          userId: userId,
        });
        console.log("venta creada con exito");
      } catch (error) {
        console.log(error);
      }
    });
    alert("Venta creada con exito");
    window.location.href = "/iniciarventa";
  };
  const crearVentaButton = document.querySelector(".crearVenta_button");
  crearVentaButton.addEventListener("click", crearVenta);

  //Hacemos la funcion para controlar el monto a pagar y el cambio a devolver si es necesario
  const pagoVenta = () => {
    const filas = document.querySelectorAll(".tabla-info-fila");
    const total = document.querySelector("#total");
    const montoRecibido = document.querySelector("#pago");
    const cambio = document.querySelector("#cambio");
    const pagoBoton = document.querySelector("#pago_boton");
    let subtotalMonto = 0;

    filas.forEach((fila) => {
      const subtotal = fila.querySelector(
        ".tabla-info-productos.producto_subtotal"
      );
      const valor = subtotal ? subtotal.textContent.trim() : "0";

      // Elimina el formato de moneda y convierte el valor a número
      const numero = parseFloat(valor.replace(/[^0-9.-]+/g, "")); // Solo deja dígitos, puntos y guiones
      subtotalMonto += numero;
    });

    total.value = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(subtotalMonto);

    pagoBoton.addEventListener("click", (event) => {
      event.preventDefault();
      const cambioValor = parseFloat(montoRecibido.value) - subtotalMonto || 0;
      cambio.value = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(cambioValor);
    });
  };
});
