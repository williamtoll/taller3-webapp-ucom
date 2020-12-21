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

//Ejemplo de como recibir parametros en la petición GET, en este caso recibido el parametro cliente
router.get('/obtener-por-cliente/:cliente/:tipo', cors(), async (req, res, next) => {
  console.log("obtener servicio por cliente y tipo ", req.params.cliente+"-"+req.params.tipo);
  let result = await db.obtenerServicioPorCliente(req.params.cliente,req.params.tipo);
  console.log("servicios", result[0]);
  res.send(result.rows);

});

//Ejemplo de como recibir parametros en la petición GET, en este caso recibido el parametro cliente
router.get('/obtener-por-fecha-cliente/:cliente/:fecha', cors(), async (req, res, next) => {
  console.log("obtener servicio por cliente y fecha ", req.params.cliente+"-"+req.params.fecha);
  let result = await db.obtenerServicioPorClienteFecha(req.params.cliente,req.params.fecha);
  console.log("servicios por fecha", result[0]);
  res.send(result.rows);

});

//Ejemplo de como recibir parametros en la petición GET, en este caso recibido el parametro cliente
router.get('/obtener-por-fecha-estado/:estado/:fecha', cors(), async (req, res, next) => {
  console.log("obtener servicio por estado y fecha ", req.params.estado+"-"+req.params.fecha);
  let result = await db.obtenerServicioPorEstadoFecha(req.params.estado,req.params.fecha);
  console.log("servicios por estado y fecha", result[0]);
  res.send(result.rows);

});

router.get('/obtener-lista', cors(), async (req, res, next) => {
  console.log("obtener lista de servicios");
  console.log("request ",req)

  let result =await db.obtenerListaServicios()
  console.log("result ",result.rows);
  res.send(result.rows);

});

router.post('/insertar',cors(),async(req,res,next)=>{
  console.log("insertar servicio")
  var result={};
  console.log("params", req.body);

  var servicio=req.body;
  result= await db.insertarServicio(servicio);

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
