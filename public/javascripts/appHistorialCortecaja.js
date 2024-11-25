

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

document.getElementById('btnJornada').addEventListener('click', function () {
    const btn = this;
    if (btn.innerText.includes('Iniciar')) {
        btn.innerText = 'Cerrar jornada';
        btn.classList.remove('btn-dark');
        btn.classList.add('btn-danger');
    } else {
        btn.innerText = 'Iniciar jornada';
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-dark');
    }
});