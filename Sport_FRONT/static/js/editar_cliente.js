function modificar() {
    let id = document.getElementById("id").value
    let nombre_ingresado = document.getElementById("nombre").value.trim(); 
    let mail_ingresado = document.getElementById("mail").value.trim();
    let telefono_ingresado = document.getElementById("tel").value.trim()
    let genero_ingresado = obtenerGeneroSeleccionado();
    let servicios_seleccionados = document.querySelectorAll('input[name="servicios"]:checked');
    let plan_seleccionado = document.getElementById("plan").value;
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
    enviarDatosAlBackEnd(datos);

}

function enviarDatosAlBackEnd(datos){
        let url = "http://127.0.0.1:5000/clientes/"+id
        var options = {
            body: JSON.stringify(datos),
            method: 'PUT',
            
            headers: { 'Content-Type': 'application/json' },
            // el navegador seguirá automáticamente las redirecciones y
            // devolverá el recurso final al que se ha redirigido.
            redirect: 'follow'
        }
        fetch(url, options)
            .then(function () {
                console.log("modificado")
                alert("Registro modificado")
    
                //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
               window.location.href = "../tabla_clientes.html";
              
            })
            .catch(err => {
                this.error = true
                console.error(err);
                alert("Error al Modificar")
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