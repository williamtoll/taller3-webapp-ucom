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
  console.log("obtener cliente por ID ", req.params.id);

  let result = await db.obtenerClientePorID(req.params.id);
  console.log("clientes", result[0]);
  res.send(result.rows);

});

router.get('/obtener-lista', cors(), async (req, res, next) => {
  console.log("obtener lista de clientes");
  console.log("request ",req)

  let result =await db.obtenerListaClientes()
  console.log("result ",result.rows);
  res.send(result.rows);

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
