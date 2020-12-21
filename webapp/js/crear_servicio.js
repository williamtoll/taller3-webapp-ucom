  function listaClientes() {
    axios
      .get("/cliente/obtener-lista", {
        params: {
        },
        responseType: "json"
      })
      .then(function (res) {
        //cuando obtenemos una respuesta satisfactoria del lado del servidor
        //la peticion se proceso correctamente
  
        console.log("lista de clientes")
        console.log(res);
        console.log("cantidad: " + res.data.length);

        //Agregamos el resultado a nuestra tabla html
        res.data.forEach(function (value, index) {
            console.log("fila: ", value, " indice: " + index);
            var opcion = document.createElement('option');
            opcion.value = value.id_cliente;
            opcion.text = value.nombre + " " + value.apellido;
            selectClientes.add(opcion);
          
          });

      })
      .catch(function (err) {
        //cuando hubo un error al procesar la peticion en el servidor
        console.log("Error en la peticion GET");
        console.log(err);
      })
      .finally(function () {
        //esta peticion siempre se ejecuta al finalizar el procesamiento del lado del servidor
        console.log("ejecutamos la funcion finally");
      });
  } 

  function listaMascotas(cliente) {
    axios
      .get("/mascota/obtener-por-cliente/"+cliente, {
        params: {
            
        },
        responseType: "json"
      })
      .then(function (res) {
        //cuando obtenemos una respuesta satisfactoria del lado del servidor
        //la peticion se proceso correctamente
  
        console.log("lista de mascotas")
        console.log(res);
        console.log("cantidad: " + res.data.length);

        var i, L = mascota.options.length - 1;
   for(i = L; i > 0; i--) {
    mascota.remove(i);
   }
        //Agregamos el resultado a nuestra tabla html
        res.data.forEach(function (value, index) {
            console.log("fila: ", value, " indice: " + index);
            var opcion = document.createElement('option');
            opcion.value = value.id_mascota;
            opcion.text = value.nombre ;
            mascota.add(opcion);
          
          });

      })
      .catch(function (err) {
        //cuando hubo un error al procesar la peticion en el servidor
        console.log("Error en la peticion GET");
        console.log(err);
      })
      .finally(function () {
        //esta peticion siempre se ejecuta al finalizar el procesamiento del lado del servidor
        console.log("ejecutamos la funcion finally");
      });
  } 

  function listaTipoServicio() {
    axios
      .get("/tipo_servicio/obtener-lista", {
        params: {
        },
        responseType: "json"
      })
      .then(function (res) {
        //cuando obtenemos una respuesta satisfactoria del lado del servidor
        //la peticion se proceso correctamente
  
        console.log("lista de tipos de servicios")
        console.log(res);
        console.log("cantidad: " + res.data.length);

        //Agregamos el resultado a nuestra tabla html
        res.data.forEach(function (value, index) {
            console.log("fila: ", value, " indice: " + index);
            var opcion = document.createElement('option');
            opcion.value = value.id_tipo_servicio;
            opcion.text = value.nombre_servicio;
            selectTipoServicio.add(opcion);
          
          });

      })
      .catch(function (err) {
        //cuando hubo un error al procesar la peticion en el servidor
        console.log("Error en la peticion GET");
        console.log(err);
      })
      .finally(function () {
        //esta peticion siempre se ejecuta al finalizar el procesamiento del lado del servidor
        console.log("ejecutamos la funcion finally");
      });
  }  

   var selectClientes = document.getElementById("cliente");
   listaClientes();

   var selectTipoServicio = document.getElementById("tipo_servicio");
   listaTipoServicio();

var botonPost = document.getElementById("btn-enviar");


botonPost.addEventListener("click", function () {
  //Ejemplo de como enviar datos con POST
  const fecha = document.getElementById("fecha");
  const cliente = document.getElementById("cliente");
  const mascota = document.getElementById("mascota");
  const tipo_servicio = document.getElementById("tipo_servicio");


  console.log("fecha ", fecha.value);
  console.log("cliente ", cliente.value);
  console.log("mascota ", mascota.value);
  console.log("tipo_servicio ", tipo_servicio.value);
  let params = {
    id_cliente: cliente.value,
    id_mascota: mascota.value,
    id_tipo_servicio: tipo_servicio.value,
    fecha_servicio: fecha.value,
    estado:"Pendiente"
  };

  axios( {
    method:'POST',
    // url:'http://localhost:3005/servicio/insertar'
    url:'/servicio/insertar',
    data: params,
    headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then(function (res) {
      console.log("respuesta del servidor ", res);
      alert("El servicio se agrego correctamente");
    })
    .catch(function (err) {
      console.log("Error en la peticion POST");
      console.log(err);
      alert("Error no se pudo agregar el servicio");

    })
    .finally(function () { location.href = './lista_servicios.html';});   
});