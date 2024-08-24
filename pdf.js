import { leerDatosFirebase } from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;
    const generateButton = document.getElementById('generateButton');

    let pdfGenerationInProgress = false;

    function generarPDF() {
        if (pdfGenerationInProgress) return;

        pdfGenerationInProgress = true;
        generateButton.disabled = true; // Desactivar el botón para evitar múltiples clics

        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const imagenUrl = 'ft1.jpg'; // Ruta relativa a la imagen

        fetch(imagenUrl)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imgData = reader.result;
                    const imagenWidth = 28;
                    const imagenHeight = 28;

                    doc.addImage(imgData, 'JPEG', 5, 5, imagenWidth, imagenHeight);
                    const titulo = 'Fundación Pro Rescate Animal de Oriente (FUNPRAO)';
                    doc.setFontSize(16);
                    doc.text(titulo, doc.internal.pageSize.width / 2, 25, { align: 'center' });

                    leerDatosFirebase(data => {
                        if (data) {
                            const autors = Object.values(data);
                            const rows = autors.map((autor, index) => [
                                index + 1,
                                autor.nombre,
                                autor.esterilizado,
                                autor.fechaet,
                                autor.especie,
                                autor.genero,
                                autor.fechaingreso,
                                autor.edad,
                                autor.color,
                                autor.peso,
                                autor.estado,
                                autor.fechadf,
                                autor.desparasitacion,
                                autor.rabia,
                                autor.moquillo,
                                autor.multiple,
                                autor.leucemia
                            ]);

                            const columns = [
                                { header: "N°", dataKey: "numeroRegistro" },
                                { header: "NOMBRE", dataKey: "nombre" },
                                { header: "ESTERILIZADO", dataKey: "esterilizado" },
                                { header: "FECHA ESTERILIZADO", dataKey: "fechaet" },
                                { header: "ESPECIE", dataKey: "especie" },
                                { header: "GÉNERO", dataKey: "genero" },
                                { header: "FECHA INGRESO", dataKey: "fechaingreso" },
                                { header: "EDAD", dataKey: "edad" },
                                { header: "COLOR", dataKey: "color" },
                                { header: "PESO", dataKey: "peso" },
                                { header: "ESTADO", dataKey: "estado" },
                                { header: "FECHA DEFUNCION", dataKey: "fechadf" },
                                { header: "DESPARASITACIÓN", dataKey: "desparasitacion" },
                                { header: "RABIA", dataKey: "rabia" },
                                { header: "MOQUILLO", dataKey: "moquillo" },
                                { header: "MULTIPLE", dataKey: "multiple" },
                                { header: "LEUCEMIA", dataKey: "leucemia" }
                            ];

                            doc.autoTable({
                                head: [columns.map(col => col.header)],
                                body: rows,
                                theme: 'striped',
                                startY: 40,
                                margin: { top: 10, left: 5, right: 5 },
                                styles: {
                                    fontSize: 6,
                                    cellPadding: 1,
                                    halign: 'center',
                                    valign: 'middle',
                                    overflow: 'linebreak',
                                },
                                headStyles: {
                                    fontSize: 6,
                                    fontStyle: 'bold',
                                    textColor: [0, 0, 0],
                                    halign: 'center',
                                    valign: 'middle',
                                    cellPadding: 1,
                                    overflow: 'linebreak',
                                },
                                columnStyles: {
                                    0: { cellWidth: 'auto' },
                                    1: { cellWidth: 'auto' },
                                    2: { cellWidth: 'auto' },
                                    3: { cellWidth: 'auto' },
                                    4: { cellWidth: 'auto' },
                                    5: { cellWidth: 'auto' },
                                    6: { cellWidth: 'auto' },
                                    7: { cellWidth: 'auto' },
                                    8: { cellWidth: 'auto' },
                                    9: { cellWidth: 'auto' },
                                    10: { cellWidth: 'auto' },
                                    11: { cellWidth: 'auto' },
                                    12: { cellWidth: 'auto' },
                                    13: { cellWidth: 'auto' },
                                    14: { cellWidth: 'auto' },
                                    15: { cellWidth: 'auto' },
                                    16: { cellWidth: 'auto' },
                                },
                                didDrawPage: (data) => {
                                    const pieDePagina = 'Lic. Criseida Jeannette Martínez Gonzáles';
                                    const pieY = doc.internal.pageSize.height - 10;

                                    doc.setFontSize(10);
                                    doc.text(pieDePagina, doc.internal.pageSize.width / 2, pieY, { align: 'center' });
                                },
                                pageBreak: 'auto'
                            });

                            doc.save('Listado_Clinico.pdf');
                        } else {
                            console.error('No se encontraron datos para generar el PDF.');
                        }
                        pdfGenerationInProgress = false;
                        generateButton.disabled = false;
                    });
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                console.error('Error al cargar la imagen:', error);
                pdfGenerationInProgress = false;
                generateButton.disabled = false;
            });
    }

    if (generateButton) {
        generateButton.addEventListener('click', () => {
            generarPDF();
        });
    }
});
