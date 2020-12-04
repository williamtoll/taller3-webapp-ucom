var express = require('express');
var cors = require('cors');
var router = express.Router();
const db = require('../../db');


router.get('/obtener-por-id/:id', cors(), async (req, res, next) => {
    console.log("obtener categoría por ID ", req.params.id);
  
    let result = await db.obtenerCategoriaPorID(req.params.id);
    console.log("categoria", result);
    console.log("se encontró "+result.rowCount+" categoria")
    res.send(result.rows);
  
});

module.exports = router;
