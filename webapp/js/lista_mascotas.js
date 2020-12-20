function listaMascotas() {
    axios
      .get("/mascota/obtener-lista", {
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

        //Agregamos el resultado a nuestra tabla html
        res.data.forEach(function (value, index) {
            console.log("fila: ", value, " indice: " + index);
      
            // Agregamos las filas
            var row = tabla.insertRow(index + 1);
          
            //Agregamos las columnas de la fila
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
        
            // Agregamos a la celda los valores que obtenemos de la lista 
            cell1.innerHTML = "" + value.id;
            cell2.innerHTML = "" + value.nombre_mascota;
            cell3.innerHTML = "" + value.tipo;
            cell4.innerHTML = "" + value.nombre_cliente;
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
  
  var tabla = document.getElementById("tblListaMascotas");
  
  function listaMascotasDemo() {
    console.log("listaMascotasDemo");
    let listaMascotas = [
        {
            "id": 1,
            "id_cliente": 1,
            "nombre_cliente": "Diego Armando",
            "apellido_cliente": "Lopez",
            "id_mascota": 2,
            "nombre_mascota": "tobby",
            "tipo": "perro"
        },
        {
            "id": 5,
            "id_cliente": 1,
            "nombre_cliente": "Diego Armando",
            "apellido_cliente": "Lopez",
            "id_mascota": 10,
            "nombre_mascota": "tortu",
            "tipo": "tortuga"
        },
        {
            "id": 6,
            "id_cliente": 2,
            "nombre_cliente": "Deysi",
            "apellido_cliente": "Fernandez",
            "id_mascota": 11,
            "nombre_mascota": "jorge",
            "tipo": "mono"
        },
        {
            "id": 7,
            "id_cliente": 4,
            "nombre_cliente": "Cristiano",
            "apellido_cliente": "Ronaldo",
            "id_mascota": 12,
            "nombre_mascota": "tapiti",
            "tipo": "conejo"
        },
        {
            "id": 7,
            "id_cliente": 2,
            "nombre_cliente": "Deysi",
            "apellido_cliente": "Fernandez",
            "id_mascota": 13,
            "nombre_mascota": "bunny",
            "tipo": "conejo"
        },
        {
            "id": 7,
            "id_cliente": 4,
            "nombre_cliente": "Cristiano",
            "apellido_cliente": "Ronaldo",
            "id_mascota": 12,
            "nombre_mascota": "tapiti",
            "tipo": "conejo"
        }
    ];
  
    //Recorremos la lista 
    listaMascotas.forEach(function (value, index) {
      console.log("fila: ", value, " indice: " + index);

      // Agregamos las filas
      var row = tabla.insertRow(index + 1);
    
      //Agregamos las columnas de la fila
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
  
      // Agregamos a la celda los valores que obtenemos de la lista 
      cell1.innerHTML = "" + value.id;
      cell2.innerHTML = "" + value.nombre_mascota;
      cell3.innerHTML = "" + value.tipo;
      cell4.innerHTML = "" + value.nombre_cliente;
    });
  }
  
  function addHeader() {
    var table = document.getElementById("tblListaMascotas");
    var head = document.createElement("THEAD");
    var column = document.createElement("TH");
  
    column.innerHTML = "ID";
    head.appendChild(column);
    table.appendChild(head);
  
    column = document.createElement("TH");
    column.innerHTML = "NOMBRE";
    head.appendChild(column);
    table.appendChild(head);
  
    column = document.createElement("TH");
  
    column.innerHTML = "TIPO";
    head.appendChild(column);
    table.appendChild(head);
  
    column = document.createElement("TH");
  
    column.innerHTML = "CLIENTE";
    head.appendChild(column);
    table.appendChild(head);
  

  }
  //Ejecutamos la función lista de mascotas
  //listaMascotasDemo();

  listaMascotas();
  