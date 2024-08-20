document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;

    function generarPDF() {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a3' });

        
        const imagenUrl = 'ft1.jpg'; // Ruta relativa a la imagen 

        // Cargar la imagen
        fetch(imagenUrl)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = function () {
                    const imgData = reader.result;

                    // Tamaño de la imagen
                    const imagenWidth = 28; 
                    const imagenHeight = 28; 
                    
                    doc.addImage(imgData, 'JPEG', 5, 5, imagenWidth, imagenHeight);

                    // Título del documento
                    const titulo = 'Fundación Pro Rescate Animal de Oriente (FUNPRAO)';
                    const tituloY = 30;
                    // Agregar el título
                    doc.setFontSize(20);
                    doc.text(titulo, doc.internal.pageSize.width / 2, tituloY, { align: 'center' });

                    let store = abrirStore('autors', 'readonly'),
                        data = store.getAll();

                    data.onsuccess = function(event) {
                        const autors = event.target.result;

                        const rows = autors.map((autor, index) => [
                            index + 1,
                            autor.nombre, 
                            autor.esterilizado, 
                            autor.fechaet, 
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
                            { header: "N°", dataKey: "numeroRegistro" },
                            { header: "NOMBRE", dataKey: "nombre" },
                            { header: "ESTERILIZADO", dataKey: "esterilizado" },
                            { header: "FECHA ESTERILIZADO", dataKey: "fechaet" },
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
                            { header: "FECHA CONSULTA", dataKey: "fechac" },
                            { header: "TRATAMIENTOS", dataKey: "tratamientos" },
                            { header: "DOSIS", dataKey: "dosis" },
                            { header: "TIEMPO TRATAMIENTO", dataKey: "tiempot" }
                        ];

                        doc.autoTable({
                            head: [columns.map(col => col.header)],
                            body: rows,
                            theme: 'striped',
                            startY: 40,
                            margin: { top: 10, left: 5, right: 5 }, // Ajuste de márgenes
                            styles: {
                                fontSize: 8,             // Tamaño de fuente general
                                cellPadding: 2,          // Espaciado interno de celdas
                                halign: 'center',
                                valign: 'middle',
                                overflow: 'linebreak',     // Evita que el texto se corte
                            },
                            headStyles: {
                                fontSize: 8,             // Tamaño de fuente para encabezados
                                fontStyle: 'bold',       // Estilo de fuente para encabezados
                                textColor: [0, 0, 0],
                                halign: 'center',
                                valign: 'middle',
                                cellPadding: 2,
                                overflow: 'linebreak',
                            },
                            columnStyles: {
                                0: { cellWidth: 'auto' }, // NUMERO DE REGISTRO
                                1: { cellWidth: 'auto' }, // NOMBRE
                                2: { cellWidth: 'auto' }, // ESTERILIZADO
                                3: { cellWidth: 'auto' }, // FECHA ESTERILIZADO
                                4: { cellWidth: 'auto' }, // ESPECIE
                                5: { cellWidth: 'auto' }, // FECHA INGRESO
                                6: { cellWidth: 'auto' }, // EDAD
                                7: { cellWidth: 'auto' }, // COLOR
                                8: { cellWidth: 'auto' }, // PESO
                                9: { cellWidth: 'auto' }, // GÉNERO
                                10: { cellWidth: 'auto' }, // ESTADO
                                11: { cellWidth: 'auto' }, // DESPARASITACIÓN
                                12: { cellWidth: 'auto' }, // RABIA
                                13: { cellWidth: 'auto' }, // QUINTUPLE
                                14: { cellWidth: 'auto' }, // MOQUILLO
                                15: { cellWidth: 'auto' }, // FECHA CONSULTA
                                16: { cellWidth: 'auto' }, // TRATAMIENTOS
                                17: { cellWidth: 'auto' }, // DOSIS
                                18: { cellWidth: 'auto' }, // TIEMPO TRATAMIENTO
                            },
                            didDrawPage: function (data) {
                                
                                const pieDePagina = 'Lic. Criseida Jeannette Martínez Gonzáles';
                                const pieY = doc.internal.pageSize.height - 6;

                                doc.setFontSize(10);
                                doc.text(pieDePagina, doc.internal.pageSize.width / 2, pieY, { align: 'center' });
                            }
                        });

                        doc.save('Listado_Clinico.pdf');
                    };

                    data.onerror = function(event) {
                        console.error('Error al obtener los datos:', event);
                    };
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => console.error('Error al cargar la imagen:', error));
    }

    
    document.getElementById('generateButton').onclick = generarPDF;
});