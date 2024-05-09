
//    El sitio web debe incluir un formulario de contacto, con al menos 5
//    campos que incluya (un checkbox o radiobutton), un select y una
//    imagen, con validación realizada mediante JavaScript para que los
//    campos sean obligatorios.



document.getElementById('form-contacto').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    let nombre = document.getElementById("nombre").value.trim(); 
    let mail = document.getElementById("mail").value.trim();
    let telefono = document.getElementById("tel").value.trim()
    let resultadoDiv = document.getElementById("resultado"); 
    
    if (nombre === "") { 
        resultadoDiv.textContent = 'Por favor, ingrese un nombre.';
        return; 
    } 

    if (mail === "") { 
        resultadoDiv.textContent = 'Por favor, ingrese un mail.';
        return; 
    } 


});
