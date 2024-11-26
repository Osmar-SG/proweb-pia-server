function cargarCategorias() {
    $.ajax({
        url: "/categoriaProducto/obtenerTodos",
        type: "GET",
        dataType: "json",
    }).done(function (result) {
        $("#tbody").empty()
        result.forEach(categoria => {
            let estado = "";
            if (categoria.status) {
                estado = "Activo"
            } else {
                estado = "Inactivo"
            }

            $("#tbody").append(`
                <tr>
                    <td class="tabla-info-productos user-id">
                        <input class="btn btn-danger" type="button" data-id="${categoria.id}" value="Eliminar">
                    </td>
                    <td class="tabla-info-productos user-id">
                        <input class="btn btn-warning" type="button" data-id="${categoria.id}" value="Editar">
                    </td>
                    <td class="tabla-info-productos nombre">${categoria.nombre}</td>
                    <td class="tabla-info-productos estado">${estado}</td>
                </tr>
            `)
        })

    }).fail(function (xhr, status, error) {
        alert(`Error: ${error}`)
    })
}

function crearCategoria(nombre, descripcion, imagen, status) {
    $.ajax({
        url: `/categoriaProducto/crear`, // Endpoint correcto
        type: "POST", // Método correcto
        data: JSON.stringify({ nombre, descripcion, imagen, status }), // Cuerpo de la solicitud como JSON
        contentType: "application/json", // Especifica que el contenido es JSON
        dataType: "json", // Espera una respuesta JSON
    }).done(function (result) {
        alert(`Éxito: ${result.message}`);
        cargarCategorias();
    }).fail(function (xhr, status, error) {
        console.error(xhr.responseText);
        alert(`Error: ${xhr.responseText || error}`);
    });
}

function eliminarCategoria(id) {
    $.ajax({
        url: `/categoriaProducto/eliminar/${id}`,
        type: "DELETE",
        dataType: "json",
    }).done(function (result) {
        alert(`Exito: ${result.message}`)
        cargarCategorias()
    }).fail(function (xhr, status, error) {
        alert(`Error: ${error.message}`)
    })
}

function actualizarCategoria(id, name, estado) {
    $.ajax({
        url: `/categoriaProducto/editar/${id}`, // Endpoint correcto
        type: "PUT", // Método correcto
        data: JSON.stringify({ nombre: name, status: estado }), // Cuerpo de la solicitud como JSON
        contentType: "application/json", // Especifica que el contenido es JSON
        dataType: "json", // Espera una respuesta JSON
    }).done(function (result) {
        alert(`Éxito: ${result.message}`);
        cargarCategorias();
    }).fail(function (xhr, status, error) {
        console.error(xhr.responseText);
        alert(`Error: ${xhr.responseText || error}`);
    });
}



$(document).ready(function () {

    // Referencia a los inputs
    const $inputNombre = $('.input-texto-historial-busqueda').eq(0); // Primer input
    const $inputEstado = $('.input-texto-historial-busqueda').eq(1); // Segundo input

    // Botones de búsqueda y limpieza
    const $btnBuscar = $('.texto-informacion-venta').eq(0); // Botón de búsqueda
    const $btnLimpiar = $('.texto-informacion-venta').eq(1); // Botón de limpieza

    // Evento del botón buscar
    $btnBuscar.on('click', function () {
        const filtroNombre = $inputNombre.val().toLowerCase();
        const filtroEstado = $inputEstado.val().toLowerCase();

        $('#tbody tr').each(function () {
            const nombre = $(this).find('td').eq(1).text().toLowerCase();
            const estado = $(this).find('td').eq(2).text().toLowerCase();

            // Mostrar solo las filas que coinciden con ambos filtros
            if (
                (filtroNombre === '' || nombre.includes(filtroNombre)) &&
                (filtroEstado === '' || estado.includes(filtroEstado))
            ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Evento del botón limpiar
    $btnLimpiar.on('click', function () {
        $inputNombre.val('');
        $inputEstado.val('');
        $('#tbody tr').show(); // Mostrar todas las filas
    });

    cargarCategorias()

    // Agregar evento al botón de limpiar
    $(".btn-crud-colors-2").click(function () {
        // Limpiar el campo de descripción
        $(".descricpcionCategoria").val("");

        // Restablecer el estado al primer valor (INACTIVO)
        $(".estadoCategoria").val("0");
    });

    $(document).on("click", ".btn-danger", function () {
        console.log("Borrada categoria", $(this).attr("data-id"))
        let categoriaID = $(this).attr("data-id")
        eliminarCategoria(categoriaID)
    })

    $(document).on('click', '.btn-warning', function () {
        let nombre = $(this).closest('tr').find('.nombre').text(),
            estado = $(this).closest('tr').find('.estado').text(),
            id = $(this).attr('data-id')

        if (estado == "Activo") {
            estado = 1
        } else {
            estado = 0
        }

        $('.descricpcionCategoria').val(nombre)
        $('.estadoCategoria').val(estado)
        $('#guardar').attr('data-id', id)
    })

    $(document).on('click', '#guardar', function () {
        let nombre = $('.descricpcionCategoria').val(),
            estado = $('.estadoCategoria').val(),
            id = parseInt($('#guardar').attr('data-id'))

        actualizarCategoria(id, nombre, estado)
    })

    $(document).on('click', '#crear', function () {
        let nombre = $('.descricpcionCategoria').val(),
            estado = ($('.estadoCategoria').val())

        console.log(nombre, "texto de ejemplo", "url de ejemplo", estado);

        crearCategoria(nombre, "texto de ejemplo", "url de ejemplo", estado)
    })
})