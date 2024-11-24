const cargarVentas = async () => {
  try {
    const response = await axios.get("/detalleVentas");
    const ventas = response.data;
    console.log("ventas", ventas);
    const tbody = document.querySelector(".table_body");
    tbody.innerHTML = "";
    ventas.map((detalleVenta) => {
      const fila = document.createElement("tr"); // creamos la fila
      const fechaCelda = document.createElement("td");
      fechaCelda.textContent = detalleVenta.venta.fecha;
      const montoCelda = document.createElement("td");
      montoCelda.textContent = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(detalleVenta.venta.total);
      const usuarioCelda = document.createElement("td");
      usuarioCelda.textContent = detalleVenta.venta.user.nombre;
      const codigoProductoCelda = document.createElement("td");
      codigoProductoCelda.textContent = detalleVenta.producto.codigo;
      const nombreProductoCelda = document.createElement("td");
      nombreProductoCelda.textContent = detalleVenta.producto.nombre;
      const precioVentaCelda = document.createElement("td");
      precioVentaCelda.textContent = detalleVenta.producto.precio;

      //Agregamos las celdas a la fila
      fila.appendChild(fechaCelda);
      fila.appendChild(montoCelda);
      fila.appendChild(usuarioCelda);
      fila.appendChild(codigoProductoCelda);
      fila.appendChild(nombreProductoCelda);
      fila.appendChild(precioVentaCelda);

      //Agregamos la fila al elemento tbody
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", cargarVentas);
