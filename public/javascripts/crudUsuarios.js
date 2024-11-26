function cargarUsuarios() {
    $.ajax({
        url: "/usuario",
        type: "GET",
        dataType: "json",
    }).done(function (result) {
        console.log(result);

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

$(document).ready(function () {
    cargarUsuarios()
})