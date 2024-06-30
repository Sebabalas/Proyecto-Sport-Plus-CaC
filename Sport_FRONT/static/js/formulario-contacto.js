
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
    let plan_seleccionado = document.getElementById("plan").value.toLowerCase();
    let servicios_seleccionados = document.querySelectorAll('input[name="servicios"]:checked');
    let limite_servicios;

    // Determinar el límite de selección según el plan elegido
    switch (plan_seleccionado) {
        case 'bronce':
            limite_servicios = 2;
            break;
        case 'plata':
            limite_servicios = 4;
            break;
        case 'oro':
        case 'diamante':
            limite_servicios = servicios_seleccionados.length; // Sin límite para oro y diamante
            break;
        default:
            limite_servicios = 0; // Por defecto, no hay límite
            break;
    }

    let nombre_ingresado = document.getElementById("nombre").value.trim(); 
    let mail_ingresado = document.getElementById("mail").value.trim();
    let telefono_ingresado = document.getElementById("tel").value.trim()
    let resultadoDiv = document.getElementById("resultado"); 
    
    if (nombre_ingresado === ""|| mail_ingresado === "" || telefono_ingresado === "") { 
        resultadoDiv.textContent = 'Los campos no pueden estar vacios, por favor rellénelos.';
        resultadoDiv.style.color = 'yellow';
        return; 
    } 
    if(!expresiones.nombre.test(nombre_ingresado)){
        resultadoDiv.textContent = 'Por favor, ingrese un nombre válido.';
        resultadoDiv.style.color = 'yellow';
        return; 
    }
    if(!expresiones.telefono.test(telefono_ingresado)){
        resultadoDiv.textContent = 'Por favor, ingrese un número válido. Recuerde no incluir +54 ni 0 al comienzo';
        resultadoDiv.style.color = 'yellow';
        return;
    }
    // Validar la cantidad de checkboxes seleccionados
    if (servicios_seleccionados.length > limite_servicios) {
        resultadoDiv.textContent = 'Para el plan '+plan_seleccionado.charAt(0).toUpperCase() + plan_seleccionado.slice(1)+' , solo puede seleccionar '+ limite_servicios +' opciones.';
        resultadoDiv.style.color = 'yellow';
        return;
    }
    let genero_ingresado = obtenerGeneroSeleccionado();
    let observaciones_consulta = document.getElementById("consulta-textarea").value;
    let tieneAptoFisico = document.getElementById("aptofisico").value;
    let datos = {
        nombre: nombre_ingresado,
        mail: mail_ingresado,
        tel: telefono_ingresado,
        genero: genero_ingresado,
        servicios: servicios_seleccionados,
        plan: plan_seleccionado,
        consulta: observaciones_consulta,
        aptofisico: tieneAptoFisico
    }
    console.log(datos);
    
    alert('¡Muchas gracias por inscribirte a Sport+! ¡Te esperamos!');
    enviarDatosAlBackEnd(datos);
    window.location.reload(); 
    
});

function enviarDatosAlBackEnd(datos){
    let url = "http://localhost:5000/clientes"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Devuelve el href (URL) de la página actual
            // window.location.href = "../tabla_productos.html";  
            
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}

function obtenerGeneroSeleccionado() {
    // Obtener todos los elementos de radio con name="genero"
    var radios = document.getElementsByName('genero');
  
    // Recorrer los radios para encontrar el que está seleccionado
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return radios[i].value; // Devolver el valor del radio seleccionado
      }
    }
  
    return null; // Si ningún radio está seleccionado, devolver null o manejar el caso según sea necesario
  }