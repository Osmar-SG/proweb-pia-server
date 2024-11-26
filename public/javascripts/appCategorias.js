const { getAdapter } = require("axios");

function cargarCategorias() {
    $.ajax({
        url: "/categoriaProducto/obtenerTodos",
        type: "GET",
        dataType: "json",
    }).done(function (result) {
        console.log(result);
        $("#tbody").empty()
        result.forEach(usuario => {

        })

    }).fail(function (xhr, status, error) {
        alert(`Error: ${error}`)
    })
}

$(document).ready(function () {
    console.log("works");
    cargarCategorias()
})