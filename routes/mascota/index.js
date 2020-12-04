var express = require('express');
var cors = require('cors');
var router = express.Router();
const axios = require('axios');

const jwt = require('express-jwt')

var PropertiesReader = require('properties-reader');

const db = require('../../db');

var _ = require('lodash');

const Router = require('express-promise-router')
const {
  Pool,
  Client
} = require('pg');


//Ejemplo de como recibir parametros en la petición GET, en este caso recibido el parametro id
router.get('/obtener-por-id/:id', cors(), async (req, res, next) => {
  console.log("obtener mascota por ID ", req.params.id);

  let result = await db.obtenerMascotaPorID(req.params.id);
  console.log("mascotas", result[0]);
  res.send(result.rows);

});

router.post('/insertar',cors(),async(req,res,next)=>{
  console.log("insertar mascota")
  var result={};
  console.log("params", req.body);

  var mascota=req.body;
  result= await db.insertarMascota(mascota);

  if(result.rows){
      res.send(result.rows[0]);
  }else{
      res.send("No se pudo insertar");
  }

});


router.get('/test',cors(), async (req, res, next) => {
  console.log("test")
  const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'apigot',
    password: 'postgres',
    port: 5432,
  })
  client.connect()
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
    return res;
  })

  return "";
})




module.exports = router;
