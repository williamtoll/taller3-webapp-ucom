
var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('app.properties');

var _ = require('lodash');
//conexion a la base de datos Postgres
const {
    Pool,
    Client
} = require('pg');

const Router = require('express-promise-router')


const pool = new Pool({
    host: properties.get('db.host'),
    database: properties.get('db.database'),
    port: properties.get('db.port'),
    user: properties.get('db.username'),
    password: properties.get('db.password'),
});



const SQL_OBTENER_LISTA_MASCOTA_POR_ID="select * from mascota where id_mascota=$1";
const SQL_OBTENER_LISTA_CLIENTES_POR_ID="select * from cliente where id_cliente=$1";
const SQL_OBTENER_LISTA_SERVICIOS_POR_CLIENTES_POR_TIPO="select s.id_cliente , c.nombre , c.apellido , s.fecha_servicio , s.estado from servicio s left join cliente c on c.id_cliente =s.id_cliente left join tipo_servicio ts on ts.id_tipo_servicio =s.id_tipo_servicio WHERE c.id_cliente =$1 and ts.id_tipo_servicio =$2 order by s.id_cliente asc, s.fecha_servicio desc, s.estado desc";
const SQL_ELIMINAR_MASCOTA_POR_ID="delete from mascota where id_mascota=$1";
const SQL_OBTENER_MASCOTA_POR_CATEGORIA="select * from mascota where id_categoria=$1";

const SQL_INSERTAR_MASCOTA="insert into mascota(nombre,id_categoria) values($1,$2) RETURNING id_mascota";
const SQL_ACTUALIZAR_MASCOTA="update mascota set nombre=$1, id_categoria=$2 where id_mascota=$3";
const SQL_OBTENER_CATEGORIA_POR_ID="select * from categoria where id=$1";

const SQL_OBTENER_MASCOTAS_POR_CLIENTE_Y_TIPO="select cm.id, "+
"c.id_cliente ,  "+
"c.nombre,"+
"c.apellido,"+ 
"m.id_mascota,  "+
"m.nombre, "+
"c3.id ,"+
"c3.nombre "+
"from cliente_mascota cm "+ 
"left join cliente c on c.id_cliente = cm.id_cliente " +
"left join mascota m on m.id_mascota =cm.id_mascota "+
"left join categoria c3 on c3.id =m.id_categoria "+ 
"where 2=2  and c.nombre=$1 and c3.nombre=$2 and m.nombre=$3";

const SQL_OBTENER_LISTA_SERVICIOS_POR_CLIENTES_POR_FECHA="select s.id_cliente , c.nombre , c.apellido , "+
"s.fecha_servicio , s.estado "+
"from servicio s left join cliente c on c.id_cliente =s.id_cliente "+
"left join tipo_servicio ts on ts.id_tipo_servicio =s.id_tipo_servicio "+
"WHERE c.id_cliente =$1 and s.fecha_servicio =$2 "+
"order by s.id_cliente asc, s.fecha_servicio desc, s.estado desc";

const SQL_OBTENER_LISTA_SERVICIOS_POR_ESTADO_POR_FECHA="select s.id_cliente , c.nombre , c.apellido , "+
"s.fecha_servicio , s.estado "+
"from servicio s left join cliente c on c.id_cliente =s.id_cliente "+
"left join tipo_servicio ts on ts.id_tipo_servicio =s.id_tipo_servicio "+
"WHERE s.estado =$1 and s.fecha_servicio =$2 "+
"order by s.id_cliente asc, s.fecha_servicio desc, s.estado desc";


const SQL_OBTENER_LISTA_MASCOTAS="select cm.id, "+
"c.id_cliente ,  "+
"c.nombre as nombre_cliente,"+
"c.apellido as apellido_cliente,"+ 
"m.id_mascota,  "+
"m.nombre as nombre_mascota, "+
"c3.id ,"+
"c3.nombre as tipo "+
"from cliente_mascota cm "+ 
"left join cliente c on c.id_cliente = cm.id_cliente " +
"left join mascota m on m.id_mascota =cm.id_mascota "+
"left join categoria c3 on c3.id =m.id_categoria "+ 
"where 2=2 ";

// Consultas Articulos
const SQL_INSERTAR_ARTICULO="insert into articulo(descripcion, precio_publico, precio_mayorista, activo) values($1,$2,$3,$4) RETURNING id_articulo";
const SQL_OBTENER_LISTA_ARTICULOS="select * from articulo ";
const SQL_OBTENER_ARTICULO_POR_ID="select * from articulo where id_articulo=$1";
const SQL_ACTUALIZAR_ARTICULO="update articulo set descripcion=$1, precio_publico=$2, precio_mayorista=$3, activo=$4 where id_articulo=$5";
const SQL_ELIMINAR_ARTICULO_POR_ID="delete from articulo where id_articulo=$1";


const SQL_OBTENER_LISTA_SERVICIOS="select s.id_servicio, "+
" c.nombre , c.apellido , m.nombre as mascota, cat.nombre as categoria, " +
" ts.nombre_servicio, s.fecha_servicio , s.estado "+
"from servicio s left join cliente c on c.id_cliente =s.id_cliente "+
"left join mascota m on m.id_mascota =s.id_mascota "+
"left join categoria cat on cat.id =m.id_categoria "+
"left join tipo_servicio ts on ts.id_tipo_servicio =s.id_tipo_servicio "+
"order by s.fecha_servicio desc";

const SQL_OBTENER_LISTA_CLIENTES="select * from cliente ";
const SQL_OBTENER_MASCOTA_POR_CLIENTE="select m.id_mascota, m.nombre from mascota m "+
"left join cliente_mascota cm on cm.id_mascota=m.id_mascota "+
"where cm.id_cliente=$1";

const SQL_OBTENER_LISTA_TIPO_SERVICIOS="select * from tipo_servicio ";

const SQL_INSERTAR_SERVICIO="insert into servicio(id_cliente,id_mascota,"+
"id_tipo_servicio,fecha_servicio,estado) values($1,$2,$3,$4,$5) RETURNING id_servicio";

const SQL_INSERTAR_VENTA="insert into venta(fecha_venta, id_cliente, monto_total, nro_factura, activo) " + 
" values($1,$2,$3,$4,$5) RETURNING id_venta";
const SQL_OBTENER_LISTA_VENTAS="select * from venta v inner join cliente c on v.id_cliente=c.id_cliente ";

function insertarMascota(datos){
    console.log("db => insertarMascota ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_MASCOTA,[56,datos.nombre,datos.id_categoria]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function actualizarMascota(datos){
    console.log("db => actualizarMascota ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_ACTUALIZAR_MASCOTA,[datos.nombre,datos.id_categoria,datos.id_mascota]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

async function obtenerMascotasPorClienteTipo(parametros){
    console.log("parametros ", parametros)
    console.log("SQL ",SQL_OBTENER_MASCOTAS_POR_CLIENTE_Y_TIPO)
    const client = await pool.connect()
    try {
        const res = await client.query(SQL_OBTENER_MASCOTAS_POR_CLIENTE_Y_TIPO, [parametros.nombre_cliente,parametros.tipo_mascota,parametros.nombre_mascota])
        console.log(res.rows[0])
        return res.rows;
    } finally {
        client.release()
    }
}

function insertarArticulo(datos){
    console.log("db => insertarArticulo ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_ARTICULO,[datos.descripcion,datos.precio_publico, datos.precio_mayorista, datos.activo]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function actualizarArticulo(datos){
    console.log("db => actualizarArticulo ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_ACTUALIZAR_ARTICULO,[datos.descripcion,datos.precio_publico,datos.precio_mayorista,datos.activo,datos.id_articulo]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function insertarServicio(datos){
    console.log("db => insertarServicio ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_SERVICIO,[datos.id_cliente,datos.id_mascota,datos.id_tipo_servicio,datos.fecha_servicio,datos.estado]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function insertarVenta(datos){
    console.log("db => insertarVenta ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_VENTA,[datos.fecha_venta,datos.id_cliente, datos.monto_total, datos.nro_factura,datos.activo]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

module.exports = {
    obtenerMascotaPorID: (id)=>pool.query(SQL_OBTENER_LISTA_MASCOTA_POR_ID,[id]),
    obtenerListaMascotas: ()=>pool.query(SQL_OBTENER_LISTA_MASCOTAS,[]),
    insertarMascota: insertarMascota,
    obtenerClientePorID: (id)=>pool.query(SQL_OBTENER_LISTA_CLIENTES_POR_ID,[id]),
    obtenerServicioPorCliente: (cliente,tipo)=>pool.query(SQL_OBTENER_LISTA_SERVICIOS_POR_CLIENTES_POR_TIPO,[cliente, tipo]),
    eliminarMascota: (id)=>pool.query(SQL_ELIMINAR_MASCOTA_POR_ID,[id]),
    obtenerMascotasPorCategoria: (id_categoria)=>pool.query(SQL_OBTENER_MASCOTA_POR_CATEGORIA,[id_categoria]),
    obtenerMascotasPorClienteTipo:obtenerMascotasPorClienteTipo ,
    actualizarMascota: actualizarMascota,
    obtenerCategoriaPorID: (id)=>pool.query(SQL_OBTENER_CATEGORIA_POR_ID,[id]),
    obtenerServicioPorClienteFecha: (cliente,fecha)=>pool.query(SQL_OBTENER_LISTA_SERVICIOS_POR_CLIENTES_POR_FECHA,[cliente, fecha]),
    obtenerServicioPorEstadoFecha: (estado,fecha)=>pool.query(SQL_OBTENER_LISTA_SERVICIOS_POR_ESTADO_POR_FECHA,[estado, fecha]),
    
    insertarArticulo: insertarArticulo,
    obtenerListaArticulos: ()=>pool.query(SQL_OBTENER_LISTA_ARTICULOS,[]),
    obtenerArticuloPorID: (id)=>pool.query(SQL_OBTENER_ARTICULO_POR_ID,[id]),
    actualizarArticulo:actualizarArticulo,
    eliminarArticulo: (id)=>pool.query(SQL_ELIMINAR_ARTICULO_POR_ID,[id]),

    obtenerListaServicios: ()=>pool.query(SQL_OBTENER_LISTA_SERVICIOS,[]),
    obtenerListaClientes: ()=>pool.query(SQL_OBTENER_LISTA_CLIENTES,[]),
    obtenerMascotasPorCliente: (id_cliente)=>pool.query(SQL_OBTENER_MASCOTA_POR_CLIENTE,[id_cliente]),
    obtenerListaTipoServicios: ()=>pool.query(SQL_OBTENER_LISTA_TIPO_SERVICIOS,[]),
    insertarServicio: insertarServicio,

    insertarVenta: insertarVenta,
    obtenerListaVentas: ()=>pool.query(SQL_OBTENER_LISTA_VENTAS,[]),
    



}
