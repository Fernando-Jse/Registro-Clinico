import { leerDatosFirebase, storage, storageRef, getDownloadURLFromStorage as getDownloadURL } from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;
    const generateButton = document.getElementById('descargarpdf');

    async function obtenerUrlImagen(path) {
        try {
            const imgRef = storageRef(storage, path);
            const url = await getDownloadURL(imgRef);
            return url;
        } catch (error) {
            console.error('Error al obtener la URL de la imagen:', error);
            return null;
        }
    }

    async function obtenerImagenDataUrl(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Error al obtener los datos de la imagen:', error);
            return null;
        }
    }

    async function generarPDF() {
        if (!generateButton) {
            console.error('El botón de generación de PDF no se encontró.');
            return;
        }

        generateButton.disabled = true;
        console.log('Generación de PDF iniciada.');

        try {
            const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            // Añadir el logo en la parte superior
            const imagenUrl = await obtenerUrlImagen('images/ft1.jpg');
            if (imagenUrl) {
                const imgData = await obtenerImagenDataUrl(imagenUrl);
                if (imgData) {
                    doc.addImage(imgData, 'JPEG', 10, 10, 20, 20); // Ajustar el tamaño aquí
                }
            }

            const titulo = 'Fundación Pro Rescate Animal de Oriente (FUNPRAO)';
            doc.setFontSize(16);
            doc.text(titulo, doc.internal.pageSize.width / 2, 35, { align: 'center' });

            const data = await new Promise((resolve) => {
                leerDatosFirebase(resolve);
            });

            if (data) {
                const autors = Object.values(data);

                const rows = await Promise.all(autors.map(async autor => {
                    let imgData = '';
                    if (autor.fotoUrl) {
                        const fotoUrl = await obtenerUrlImagen(autor.fotoUrl);
                        if (fotoUrl) {
                            imgData = await obtenerImagenDataUrl(fotoUrl);
                        }
                    }

                    return [
                        imgData ? { content: '', image: imgData, imageWidth: 15, imageHeight: 15 } : '',
                        autor.nombre || '',
                        autor.esterilizado || '',
                        autor.fechaet || '',
                        autor.especie || '',
                        autor.genero || '',
                        autor.fechaingreso || '',
                        autor.edad || '',
                        autor.color || '',
                        autor.peso || '',
                        autor.estado || '',
                        autor.fechadf || '',
                        autor.desparasitacion || '',
                        autor.rabia || '',
                        autor.moquillo || '',
                        autor.multiple || '',
                        autor.leucemia || ''
                    ];
                }));

                const columns = [
                    { header: "FOTO", dataKey: "foto" },
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
                    startY: 50,
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
                        0: { cellWidth: 15 }, // Ajuste del ancho para la columna de imágenes
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
        } catch (error) {
            console.error('Error durante la generación del PDF:', error);
        } finally {
            if (generateButton) {
                generateButton.disabled = false;
            }
        }
    }

    if (generateButton) {
        generateButton.addEventListener('click', generarPDF);
    }
});
