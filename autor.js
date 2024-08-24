import { escribirDatosFirebase, leerDatosFirebase, abrirStore } from './db.js';

Vue.component('componente-autors', {
    data() {
        return {
            valor: '',
            autors: [],
            accion: 'nuevo',
            autor: {
                idAutor: new Date().getTime(),
                nombre: '',
                esterilizado: '',
                fechaet: '',
                especie: '',
                fechaingreso: '',
                edad: '',
                color: '',
                peso: '',
                genero: '',
                estado: '',
                desparasitacion: '',
                rabia: '',
                quintuple: '',
                moquillo: '',
                fechac: '',
                tratamientos: '',
                dosis: '',
                tiempot: '',
                registroNumero: 0, 
            }
        }
    },
    methods: {
        buscarAutor() {
            this.listar();
        },
        eliminarAutor(idAutor) {
            if (confirm(`¿Está seguro de eliminar el registro?`)) {
                // Eliminar de Firebase
                escribirDatosFirebase(idAutor, null); // Borra el registro en Firebase

                // Eliminar de IndexedDB si también lo usas
                let store = abrirStore('autors', 'readwrite'),
                    query = store.delete(idAutor);
                query.onsuccess = () => {
                    this.nuevoAutor();
                    this.listar();
                };
                query.onerror = e => {
                    console.error('Error al eliminar el registro', e);
                };
            }
        },
        modificarAutor(autor) {
            this.accion = 'modificar';
            this.autor = { ...autor };
        },
        guardarAutor() {
            if (this.accion === 'nuevo') {
                // Guardar en Firebase
                escribirDatosFirebase(this.autor.idAutor, this.autor);
            } else {
                // Actualizar en Firebase
                escribirDatosFirebase(this.autor.idAutor, this.autor);
            }

            // Guardar en IndexedDB si también lo usas
            let store = abrirStore('autors', 'readwrite'),
                query = store.put({ ...this.autor });
            query.onsuccess = () => {
                this.nuevoAutor();
                this.listar();
            };
            query.onerror = e => {
                console.error('Error al guardar en el registro', e);
            };
        },
        nuevoAutor() {
            this.accion = 'nuevo';
            this.autor = {
                idAutor: new Date().getTime(),
                nombre: '',
                esterilizado: '',
                fechaet: '',
                especie: '',
                fechaingreso: '',
                edad: '',
                color: '',
                peso: '',
                genero: '',
                estado: '',
                desparasitacion: '',
                rabia: '',
                quintuple: '',
                moquillo: '',
                fechac: '',
                tratamientos: '',
                dosis: '',
                tiempot: '',
                registroNumero: this.autors.length + 1
            };
        },
        listar() {
            leerDatosFirebase((data) => {
                this.autors = Object.values(data || {}).map((autor, index) => {
                    autor.registroNumero = index + 1;
                    return autor;
                }).filter(autor =>
                    autor.nombre.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.esterilizado.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.fechaet.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.especie.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.fechaingreso.toString().includes(this.valor) ||
                    autor.edad.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.color.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.peso.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.genero.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.estado.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.desparasitacion.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.rabia.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.quintuple.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.moquillo.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.fechac.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.tratamientos.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.dosis.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.tiempot.toLowerCase().includes(this.valor.toLowerCase())
                );
            });
        },
    },
    template: `
    <div class="my-4">
        <div class="row">
            <div class="col-md-6">
                <div class="card text-bg">
                    <div class="card-header">REGISTRO CLÍNICO</div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Nombre</div>
                            <div class="col-md-6">
                                <input v-model="autor.nombre" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Esterilizado</div>
                            <div class="col-md-6">
                                <select v-model="autor.esterilizado" type="text" class="form-control">
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Fecha Esterilización</div>
                            <div class="col-md-6">
                                <input v-model="autor.fechaet" type="date" class="form-control">                               
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Especie</div>
                            <div class="col-md-6">
                                <select v-model="autor.especie" class="form-control">
                                <option value="Canino">Canino</option>
                                <option value="Felino">Felino</option>
                                </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Fecha de Ingreso</div>
                            <div class="col-md-6">
                                <input v-model="autor.fechaingreso" type="date" min="0" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Edad</div>
                            <div class="col-md-6">
                                <input v-model="autor.edad" type="number" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Color</div>
                            <div class="col-md-6">
                                <input v-model="autor.color" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Peso</div>
                            <div class="col-md-6">
                                <input v-model="autor.peso" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Genero</div>
                            <div class="col-md-6">
                                <select v-model="autor.genero" type="text" class="form-control">
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                                </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Estado</div>
                            <div class="col-md-6">
                                <select v-model="autor.estado" type="text" class="form-control">
                                <option value="Vivo">Vivo</option>
                                <option value="Fallecido">Fallecido</option>
                                </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Desparasitacion</div>
                            <div class="col-md-6">
                                <input v-model="autor.desparasitacion" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Rabia</div>
                            <div class="col-md-6">
                                <input v-model="autor.rabia" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Quintuple</div>
                            <div class="col-md-6">
                                <input v-model="autor.quintuple" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Moquillo</div>
                            <div class="col-md-6">
                                <input v-model="autor.moquillo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Fecha de consulta</div>
                            <div class="col-md-6">
                                <input v-model="autor.fechac" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Tratamientos</div>
                            <div class="col-md-6">
                                <input v-model="autor.tratamientos" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Dosis</div>
                            <div class="col-md-6">
                                <input v-model="autor.dosis" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-md-3 text-nowrap">Tiempo Tratamiento</div>
                            <div class="col-md-6">
                                <input v-model="autor.tiempot" type="text" class="form-control">
                            </div>
                        </div>
                        
                        <div class="row p-1">
                            <div class="col text-center">
                                <div class="d-flex justify-content-center">
                                    <button @click.prevent="guardarAutor" class="btn btn-outline-success">GUARDAR</button>
                                    <div style="margin-right: 20px;"></div>
                                    <button @click.prevent="nuevoAutor" class="btn btn-outline-warning">NUEVO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-4">
            <div class="col-md-12">
                <div class="card text-bg">
                    <div class="card-header">LISTADO CLÍNICO</div>
                    <div class="card-body">
                        <form id="frmAutor">
                            <div style="overflow-x:auto;">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>BUSCAR</th>
                                            <th colspan="5">
                                                <input placeholder="nombre, especie, fecha ingreso, edad" type="search" v-model="valor" @keyup="buscarAutor" class="form-control">
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>N°</th>
                                            <th>NOMBRE</th>
                                            <th>ESTERILIZADO</th>
                                            <th>FECHA_ESTERILIZADO</th>
                                            <th>ESPECIE</th>
                                            <th>FECHA_INGRESO</th>
                                            <th>EDAD</th>                                           
                                            <th>COLOR</th>
                                            <th>PESO</th>
                                            <th>GENERO</th>
                                            <th>ESTADO</th>
                                            <th>DESPARASITACIÓN</th>
                                            <th>RABIA</th>
                                            <th>QUINTUPLE</th>
                                            <th>MOQUILLO</th>
                                            <th>FECHA_CONSULTA</th>
                                            <th>TRATAMIENTOS</th>
                                            <th>DOSIS</th>
                                            <th>TIEMPO_TRATAMIENTO</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr @click="modificarAutor(autor)" v-for="autor in autors" :key="autor.idAutor">
                                            <td>{{ autor.registroNumero }}</td>
                                            <td>{{ autor.nombre }}</td>
                                            <td>{{ autor.esterilizado }}</td>
                                            <td>{{ autor.fechaet }}</td>
                                            <td>{{ autor.especie }}</td>
                                            <td>{{ autor.fechaingreso }}</td>
                                            <td>{{ autor.edad }}</td>
                                            <td>{{ autor.color }}</td>
                                            <td>{{ autor.peso }}</td>
                                            <td>{{ autor.genero }}</td>
                                            <td>{{ autor.estado }}</td>
                                            <td>{{ autor.desparasitacion }}</td>
                                            <td>{{ autor.rabia }}</td>
                                            <td>{{ autor.quintuple }}</td>
                                            <td>{{ autor.moquillo }}</td>
                                            <td>{{ autor.fechac }}</td>
                                            <td>{{ autor.tratamientos }}</td>
                                            <td>{{ autor.dosis }}</td>
                                            <td>{{ autor.tiempot }}</td>
                                            <td>
                                                <button @click.prevent="eliminarAutor(autor.idAutor)" class="btn btn-outline-danger">Eliminar</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
});