import { escribirDatosFirebase, leerDatosFirebase } from './db.js';

var app = new Vue({
    el: '#app',
    data: {
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
        }
    },
    mounted() {
        this.cargarDatos();
    }
});
