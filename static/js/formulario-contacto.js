
El sitio web debe incluir un formulario de contacto, con al menos 5
campos que incluya (un checkbox o radiobutton), un select y una
imagen, con validación realizada mediante JavaScript para que los
campos sean obligatorios.


//    Trae el formulario             Agrega un método de escucha
//                                   que ocurre cuando se envia el 
//                                   formulario
document.getElementById('form-contacto').addEventListener('submit', function(event) {
    
    // Despúes del evento se ejecuta la función preventDefault
    // Esta línea previene el comportamiento predeterminado del
    // evento submit. Normalmente, cuando se envía un formulario,
    // la página se recarga. preventDefault() evita que eso suceda,
    // lo que nos permite manejar el envío del formulario mediante JS.
    event.preventDefault(); 
    
    var numero = parseFloat(document.getElementById('numero').value);
    var resultadoDiv = document.getElementById('resultado');
    
    if (isNaN(numero)) {
        resultadoDiv.textContent = 'Por favor, ingrese un número válido.';
        resultadoDiv.style.color = 'red';
    } else if (numero > 0) {
        resultadoDiv.textContent = 'El número es positivo.';
        resultadoDiv.style.color = 'green';
    } else if (numero < 0) {
        resultadoDiv.textContent = 'El número es negativo.';
        resultadoDiv.style.color = 'blue';
    } else {
        resultadoDiv.textContent = 'El número es igual a cero.';
        resultadoDiv.style.color = 'orange';
    }
});