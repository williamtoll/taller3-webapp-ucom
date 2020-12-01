var express = require('express');
var cors = require('cors');
var router = express.Router();
const axios = require('axios');

const jwt = require('express-jwt')

var PropertiesReader = require('properties-reader');

const db = require('../../db');

var _ = require('lodash');

const Router = require('express-promise-router')



//Ejemplo de como recibir parametros en la petición GET, en este caso recibido el parametro id
router.get('/:id', cors(), async (req, res, next) => {

  let result = await db.obtenerMascotaPorID(req.params.id);
  console.log("mascotas", result[0]);
  res.send(result.rows);

});





module.exports = router;
