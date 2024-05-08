
//    El sitio web debe incluir un formulario de contacto, con al menos 5
//    campos que incluya (un checkbox o radiobutton), un select y una
//    imagen, con validación realizada mediante JavaScript para que los
//    campos sean obligatorios.



document.getElementById('form-contacto').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    var nombre = document.getElementById("nombre").value.trim(); 
    
    var resultadoDiv = document.getElementById("resultado"); 
    
    if (nombre === "") { 
        resultadoDiv.textContent = 'Por favor, ingrese un nombre.';
        resultadoDiv.style.color = 'red';

    } else {
        resultadoDiv.textContent = 'El nombre es válido.';
        resultadoDiv.style.color = 'green';
    }
});