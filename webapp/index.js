var botonPost = document.getElementById("btn-enviar");
botonPost.addEventListener("click", function () {
  //Ejemplo de como enviar datos con POST
  const nombre = document.getElementById("nombre");
  const categoria = document.getElementById("categoria");

  console.log("nombre ", nombre.value);
  console.log("categoria ", categoria.value);
  let params = {
    id_categoria: categoria.value,
    nombre: nombre.value
  };

  axios( {
    method:'POST',
    // url:'http://localhost:3005/mascota/insertar'
    url:'/mascota/insertar',
    data: params,
    headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then(function (res) {
      console.log("respuesta del servidor ", res);
      alert("La mascota se agrego correctamente");
    })
    .catch(function (err) {
      console.log("Error en la peticion POST");
      console.log(err);
      alert("Error no se pudo agregar la mascota");

    })
    .finally(function () {});
});