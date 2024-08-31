import { escribirDatosFirebase, leerDatosFirebase, subirImagenFirebase } from './db.js'; // Importa la función de subir imágenes

new Vue({
    el: '#app',
    data: {
        authenticated: localStorage.getItem('authenticated') === 'true',
        forms: {
            autor: { mostrar: false, datos: [] },
        },
        selectedFile: null 
    },
    methods: {
        abrirFormulario(form) {
            this.forms[form].mostrar = !this.forms[form].mostrar;
            if (this.forms[form].mostrar) {
                this.$refs[form].listar();
            }
        },
        guardarDatos(id, data) {
            escribirDatosFirebase(id, data);
        },
        cargarDatos() {
            leerDatosFirebase((data) => {
                this.forms.autor.datos = data || [];
            });
        },
        logout() {
            localStorage.removeItem('authenticated');
            window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const path = `images/${file.name}`;
                subirImagenFirebase(file, path).then((downloadURL) => {
                    console.log('Archivo disponible en:', downloadURL);
                    alert('Foto subida con éxito.');
                }).catch((error) => {
                    console.error('Error al subir archivo:', error);
                });
            }
        }
    },
    mounted() {
        if (this.authenticated) {
            this.cargarDatos();
        } else {
            window.location.href = 'login.html'; // Redirige a la página de inicio de sesión si no está autenticado
        }
    }
});
