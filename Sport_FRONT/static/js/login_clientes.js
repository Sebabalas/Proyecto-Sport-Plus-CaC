const form = document.querySelector('form');
const sectionLogin = document.getElementById('container_login');
const sectionConsultas = document.getElementById('container_consultasclientes');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '1234') {
        // Mostrar la sección de consultas de clientes si el inicio de sesión es exitoso
        sectionConsultas.style.display = 'flex';
        // Ocultar la sección de login
        sectionLogin.style.display = 'none';
    } else {
        // Mostrar mensaje de error u otra lógica si el inicio de sesión falla
        alert('Usuario o contraseña incorrectos');
    }

});