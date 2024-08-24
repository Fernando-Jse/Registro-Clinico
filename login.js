import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

// Configura tu Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDr0ussJ3btqOa1tWkGvC2O2Cr-XI4hnF4",
    authDomain: "clinica-f528a.firebaseapp.com",
    projectId: "clinica-f528a",
    storageBucket: "clinica-f528a.appspot.com",
    messagingSenderId: "804902804550",
    appId: "1:804902804550:web:eb97d8be8197516d45fe47"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

new Vue({
    el: '#login',
    data: {
        username: '',
        password: '',
        error: ''
    },
    methods: {
        login() {
            signInWithEmailAndPassword(auth, this.username, this.password)
                .then((userCredential) => {
                    // Usuario autenticado
                    console.log('Usuario autenticado:', userCredential.user);
                    localStorage.setItem('authenticated', 'true');
                    window.location.href = 'index.html'; // Redirige a la página principal
                })
                .catch((error) => {
                    // Maneja los errores
                    this.error = 'Usuario o contraseña incorrectos';
                    console.error('Error al iniciar sesión:', error.message);
                });
        }
    }
});
