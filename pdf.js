document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;

    function generarPDF() {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

        // Ruta de la imagen que se incluirá en el PDF
       // const imagenUrl = '/images/ft.png'; // Ruta relativa a la imagen en tu proyecto

        // Cargar la imagen
        /*fetch(imagenUrl)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = function () {
                    const imgData = reader.result;

                    // Tamaño de la imagen (ajusta según el tamaño real de la imagen)
                    const imagenWidth = 28; // Ajusta según el tamaño de tu imagen
                    const imagenHeight = 28; // Ajusta según el tamaño de tu imagen

                    // Agregar la imagen en la parte superior izquierda
                    doc.addImage(imgData, 'PNG', 5, 5, imagenWidth, imagenHeight);*/

        // Título del documento
        const titulo = ' Fundación Pro Rescate Animal de Oriente (FUNPRAO)';
        const tituloY = 24; // Posición vertical del título

        // Agregar el título
        doc.setFontSize(20);
        doc.text(titulo, doc.internal.pageSize.width / 2, tituloY, { align: 'center' });

        let store = abrirStore('autors', 'readonly'),
            data = store.getAll();

        data.onsuccess = function(event) {
            const autors = event.target.result;

            const rows = autors.map(autor => [
                autor.nombre, 
                autor.esterilizado, 
                autor.especie, 
                autor.fechaingreso, 
                autor.edad, 
                autor.color, 
                autor.peso, 
                autor.genero, 
                autor.estado, 
                autor.desparasitacion, 
                autor.rabia, 
                autor.quintuple, 
                autor.moquillo, 
                autor.fechac, 
                autor.tratamientos, 
                autor.dosis, 
                autor.tiempot
            ]);

            const columns = [
                { header: "NOMBRE", dataKey: "nombre" },
                { header: "ESTERILIZADO", dataKey: "esterilizado" },
                { header: "ESPECIE", dataKey: "especie" },
                { header: "FECHA INGRESO", dataKey: "fechaingreso" },
                { header: "EDAD", dataKey: "edad" },
                { header: "COLOR", dataKey: "color" },
                { header: "PESO", dataKey: "peso" },
                { header: "GÉNERO", dataKey: "genero" },
                { header: "ESTADO", dataKey: "estado" },
                { header: "DESPARASITACIÓN", dataKey: "desparasitacion" },
                { header: "RABIA", dataKey: "rabia" },
                { header: "QUINTUPLE", dataKey: "quintuple" },
                { header: "MOQUILLO", dataKey: "moquillo" },
                { header: "FECHA VACUNACIÓN", dataKey: "fechac" },
                { header: "TRATAMIENTOS", dataKey: "tratamientos" },
                { header: "DOSIS", dataKey: "dosis" },
                { header: "TIEMPO TRATAMIENTO", dataKey: "tiempot" }
            ];

            doc.autoTable({
                head: [columns.map(col => col.header)],
                body: rows,
                theme: 'striped',
                startY: 40,
                margin: { top: 10 },
                styles: {
                    fontSize: 10, // Tamaño de fuente para los registros
                    cellPadding: 2, // Espaciado entre celdas
                    halign: 'center',
                    valign: 'middle',
                },
                headStyles: {
                    fontSize: 6, // Tamaño de fuente para el encabezado
                    cellPadding:2,
                    textColor: [0, 0, 0],
                    halign: 'center',
                    valign: 'middle',
                },
                columnStyles: {
                    0: { cellWidth: 'auto' },  // NOMBRE
                    1: { cellWidth: 'auto' },  // ESTERILIZADO
                    2: { cellWidth: 'auto' },  // ESPECIE
                    3: { cellWidth: 'auto' },  // FECHA INGRESO
                    4: { cellWidth: 'auto' },  // EDAD
                    5: { cellWidth: 'auto' },  // COLOR
                    6: { cellWidth: 'auto' },  // PESO
                    7: { cellWidth: 'auto' },  // GÉNERO
                    8: { cellWidth: 'auto' },  // ESTADO
                    9: { cellWidth: 'auto' },  // DESPARASITACIÓN
                    10: { cellWidth: 'auto' }, // RABIA
                    11: { cellWidth: 'auto' }, // QUINTUPLE
                    12: { cellWidth: 'auto' }, // MOQUILLO
                    13: { cellWidth: 'auto' }, // FECHA VACUNACIÓN
                    14: { cellWidth: 'auto' }, // TRATAMIENTOS
                    15: { cellWidth: 'auto' }, // DOSIS
                    16: { cellWidth: 'auto' }, // TIEMPO TRATAMIENTO
                },
                didDrawPage: function (data) {
                    // Agregar un pie de página
                    const pieDePagina = 'Lic. Criseida Jeannette Martínez Gonzáles';
                    const pieY = doc.internal.pageSize.height - 20; // Posición vertical del pie de página

                    doc.setFontSize(10);
                    doc.text(pieDePagina, doc.internal.pageSize.width / 2, pieY, { align: 'center' });

                    // Agregar un salto de página si es necesario
                    if (data.cursor.y > doc.internal.pageSize.height - 40) {
                        doc.addPage();
                    }
                }
            });

            doc.save('Listado_Clinico.pdf');
        };

        data.onerror = function(event) {
            console.error('Error al obtener los datos:', event);
        };
    };
    reader.readAsDataURL(blob);
            });
    }
            
    // Asigna la función al evento onclick del botón
    document.getElementById('generateButton').onclick = generarPDF;
});