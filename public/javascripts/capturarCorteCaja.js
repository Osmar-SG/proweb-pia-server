function obtenerFechaHora() {
    let fechaHora = new Date();
    return fechaHora;
}

function obtenerFechaFormateada() {
    const fechaActual = new Date();

    // Obtener componentes de la fecha
    const dia = String(fechaActual.getDate()).padStart(2, '0'); // Día (siempre dos dígitos)
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Mes (0-11, suma 1)
    const anio = fechaActual.getFullYear(); // Año completo

    // Formatear la fecha
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    return fechaFormateada;
}

$(document).ready(function () {
    //Mostrar fecha de hoy
    $("#fechaHoy").val(obtenerFechaFormateada())

    // Desactivar "Cerrar Jornada" al inicio
    $('#cerrarJornada').prop('disabled', true);
    $('#efectivoCaja').prop('disabled', true);
    $('#ingreso').prop('disabled', true);

    // Evento para iniciar jornada
    $('#iniciarJornada').click(function () {
        inicioJornada = obtenerFechaHora();
        console.log("Inicio de jornada:", inicioJornada);

        // Desactivar botón "Iniciar Jornada" y activar "Cerrar Jornada"
        $(this).prop('disabled', true);
        $('#cerrarJornada').prop('disabled', false);
        $('#cerrarJornada').prop('disabled', false);
        $('#efectivoCaja').prop('disabled', false);
        $('#ingreso').prop('disabled', false);
    });

    let efectivoCaja, ingreso, diferencia

    // Evento para cerrar jornada
    $('#cerrarJornada').click(function () {
        finJornada = obtenerFechaHora();
        console.log("Fin de jornada:", finJornada);

        // Reactivar botón "Iniciar Jornada" y desactivar "Cerrar Jornada"
        $(this).prop('disabled', true);
        $('#iniciarJornada').prop('disabled', false);
        $('#cerrarJornada').prop('disabled', true);
        $('#efectivoCaja').prop('disabled', true);
        $('#ingreso').prop('disabled', true);

        efectivoCaja = $('#efectivoCaja').val()
        ingreso = $('#ingreso').val()
        diferencia = $('#diferencia').val()

        console.log(efectivoCaja, ingreso, diferencia)

        $.ajax({
            url: `/cortecaja/${user.id}`,
            type: "POST",
            dataType: "json",
            data: {
                fecha: $("#fechaHoy").val(),
                total_efectivo: efectivoCaja,
                total_ventas: ingreso,
                diferencia: diferencia
            }
        }).done(function (response) {
            alert(`Exito: ${response}`)
        }).fail(function (xhr, status, error) {
            alert(`Error: ${error}`)
        })
    });

    $('#efectivoCaja').on("keyup", function () {
        let valor1 = $('#efectivoCaja').val(),
            valor2 = $('#ingreso').val(),
            diferencia = valor2 - valor1
        $('#diferencia').val(diferencia)
    })

    $('#ingreso').on("keyup", function () {
        let valor1 = $('#efectivoCaja').val(),
            valor2 = $('#ingreso').val(),
            diferencia = valor2 - valor1
        $('#diferencia').val(diferencia)
    })
});
