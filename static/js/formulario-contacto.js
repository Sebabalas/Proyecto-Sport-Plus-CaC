
//    El sitio web debe incluir un formulario de contacto, con al menos 5
//    campos que incluya (un checkbox o radiobutton), un select y una
//    imagen, con validación realizada mediante JavaScript para que los
//    campos sean obligatorios.
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	telefono: /^(11|[2-9]\d{1,4})\d{6,8}$/ // 7 a 14 numeros.
}

document.getElementById('form-contacto').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let planSeleccionado = document.getElementById("plan").value.toLowerCase();
    let checkboxesSeleccionados = document.querySelectorAll('input[name="servicios"]:checked');
    let limiteCheckbox;

    // Determinar el límite de selección según el plan elegido
    switch (planSeleccionado) {
        case 'bronce':
            limiteCheckbox = 2;
            break;
        case 'plata':
            limiteCheckbox = 4;
            break;
        case 'oro':
        case 'diamante':
            limiteCheckbox = checkboxesSeleccionados.length; // Sin límite para oro y diamante
            break;
        default:
            limiteCheckbox = 0; // Por defecto, no hay límite
            break;
    }

    let nombre = document.getElementById("nombre").value.trim(); 
    let mail = document.getElementById("mail").value.trim();
    let telefono = document.getElementById("tel").value.trim()
    let resultadoDiv = document.getElementById("resultado"); 
    
    if (nombre === ""|| mail === "" || telefono === "") { 
        resultadoDiv.textContent = 'Los campos no pueden estar vacios, por favor rellénelos.';
        resultadoDiv.style.color = 'red';
        return; 
    } 
    if(!expresiones.nombre.test(nombre)){
        resultadoDiv.textContent = 'Por favor, ingrese un nombre válido.';
        resultadoDiv.style.color = 'red';
        return; 
    }
    if(!expresiones.telefono.test(telefono)){
        resultadoDiv.textContent = 'Por favor, ingrese un número válido. Recuerde no incluir +54 ni 0 al comienzo';
        resultadoDiv.style.color = 'red';
        return;
    }
    // Validar la cantidad de checkboxes seleccionados
    if (checkboxesSeleccionados.length > limiteCheckbox) {
        resultadoDiv.textContent = 'Para el plan '+planSeleccionado.charAt(0).toUpperCase() + planSeleccionado.slice(1)+' , solo puede seleccionar '+ limiteCheckbox +' opciones.';
        resultadoDiv.style.color = 'red';
        return;
    }
    alert('Muchas gracias por inscribirse a Sport+! Lo/a esperamos!');
    window.location.reload(); 
});
