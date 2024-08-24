import { escribirDatosFirebase, leerDatosFirebase } from './db.js';

new Vue({
    el: '#app',
    data: {
        authenticated: localStorage.getItem('authenticated') === 'true',
        forms: {
            autor: { mostrar: false, datos: [] },
        }
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
