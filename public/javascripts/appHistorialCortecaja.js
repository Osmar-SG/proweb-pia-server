document.getElementById('btnFiltrar').addEventListener('click', function () {
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    const rows = document.querySelectorAll('#tablaVentas tbody tr');
    rows.forEach(row => {
        const fechaRegistro = row.cells[0].innerText;

        // Convertir la fecha de la tabla de formato DD/MM/YY a YYYY-MM-DD
        const [dia, mes, anio] = fechaRegistro.split('/');
        const fechaFormateada = `${anio}-` + (mes.padStart(2, '0')) + `-${dia.padStart(2, '0')}`;

        // Comparar las fechas
        if (fechaInicio && fechaFin) {
            if (fechaFormateada >= fechaInicio && fechaFormateada <= fechaFin) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        } else {
            row.style.display = '';
        }
    });
});

$(document).ready(function () {
    console.log("works");

    $.ajax({
        url: "/cortecaja/obtenertodos",
        type: "GET",
        dataType: "json",
    }).done(function (result) {
        console.log(result);
        const sortedData = result.sort((a, b) => {
            // Convertir las fechas de formato "dd/mm/yyyy" a objetos Date
            const dateA = new Date(a.fecha.split("/").reverse().join("-"));
            const dateB = new Date(b.fecha.split("/").reverse().join("-"));
            return dateA - dateB; // Orden ascendente
        });
        console.log(sortedData);

        sortedData.forEach(data => {
            $("#tbody").append(`
                <tr>
                    <td>${data.fecha}</td>
                    <td>${data.total_efectivo}</td>
                    <td>Cierre</td>
                    <td>${data.usuario.nombre}</td>
                    <td>${data.total_ventas}</td>
                    <td>${data.diferencia}</td>
                </tr>
            `)
        })

    }).fail(function (xhr, status, error) {
        alert(`Error: ${error}`)
    })
})