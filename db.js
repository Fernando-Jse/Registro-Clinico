import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDr0ussJ3btqOa1tWkGvC2O2Cr-XI4hnF4",
    authDomain: "clinica-f528a.firebaseapp.com",
    databaseURL: "https://clinica-f528a-default-rtdb.firebaseio.com",
    projectId: "clinica-f528a",
    storageBucket: "clinica-f528a.appspot.com",
    messagingSenderId: "804902804550",
    appId: "1:804902804550:web:eb97d8be8197516d45fe47",
    measurementId: "G-P71TDR7NM2"
};

// Inicializa Firebase y la base de datos
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

var db;
const funcdb = () => {
    let indexDB = indexedDB.open('db_USSS002422_USSS017922_libreria', 1);
    indexDB.onupgradeneeded = e => {
        let req = e.target.result,
            tblautor = req.createObjectStore('autors', { keyPath: 'idAutor' });
        tblautor.createIndex('idAutor', 'idAutor', { unique: true });
        tblautor.createIndex('nombre', 'nombre', { unique: true });
    };
    indexDB.onsuccess = e => {
        db = e.target.result;
    };
    indexDB.onerror = e => {
        console.error('Error al crear la base de datos', e.message);
    };
};

funcdb();

// Firebase Realtime Database Functions
const escribirDatosFirebase = (id, data) => {
    set(ref(database, 'autors/' + id), data);
};

const leerDatosFirebase = (callback) => {
    const dbRef = ref(database, 'autors/');
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
};

// IndexedDB Functions
const abrirStore = (store, modo) => {
    let ltx = db.transaction(store, modo);
    return ltx.objectStore(store);
};

// Exportar funciones para usar en otros archivos
export { escribirDatosFirebase, leerDatosFirebase, abrirStore };