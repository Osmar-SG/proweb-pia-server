function cargarUsuarios() {
    $.ajax({
        url: "/usuario",
        type: "GET",
        dataType: "json",
    }).done(function (result) {
        console.log(result);
        $("#tbody").empty()
        result.forEach(usuario => {
            let estado = "";
            if (usuario.status) {
                estado = "Activo"
            } else {
                estado = "Inactivo"
            }

            $("#tbody").append(`
            <tr>
                <td class="tabla-info-productos user-id">
                    <input class="btn btn-danger" type="button" data-user="${usuario.id}" value="Eliminar">
                </td>
                <td class="tabla-info-productos">${usuario.nombre}</td>
                <td class="tabla-info-productos">${usuario.rol.nombre}</td>
                <td class="tabla-info-productos">${estado}</td>
            </tr>
        `)
        })

    }).fail(function (xhr, status, error) {
        alert(`Error: ${error}`)
    })
}

function eliminarUsuarios(id) {
    $.ajax({
        url: `/usuario/borrar/${id}`,
        type: "DELETE",
        dataType: "json",
    }).done(function (result) {
        alert(`Exito: ${result.message}`)
        cargarUsuarios()
    }).fail(function (xhr, status, error) {
        alert(`Error: ${error.message}`)
    })
}

$(document).ready(function () {
    cargarUsuarios()

    console.log("WORKS");

    $(document).on("click", ".btn-danger", function () {
        console.log("Borrado user", $(this).attr("data-user"))
        let userID = $(this).attr("data-user")
        eliminarUsuarios(userID)
    })
})

