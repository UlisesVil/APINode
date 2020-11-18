//Este archivo es un modulo de Node JS exportable

//Aqui se guarda toda la configuracion de Express y 
//las peticiones de Body-Parser

'use strict'

var express = require('express');  //cuando se hace un require de un modulo, se accede al directorio de nodemodules y a la carpeta de la libreria para cargar el objeto correspondiente
var bodyParser = require('body-parser');

var app = express();


//Cargar archivos de rutas
var project_routes = require('./routes/project');

// Middlewares es una capa o metodos que se ejecuta antes de la accion de un controlador

app.use(bodyParser.urlencoded({extended:false})); //configuracion necesaria para body-parser
app.use(bodyParser.json());//esto le indica que cualquier tipo de peticion que llegue por el body de la peticion lo tiene que convertir a json


//CORS
//Esta es una Middleware y permite el acceso cruzado entre dominios
//Activa el acceso cors y configurar las cabeceras y tener el minimo 
//de problemas posibles al realizar peticiones AJAX al backend
// Configurar cabeceras y cors 

app.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Rutas
app.use('/api', project_routes);


//Exportar
module.exports = app; //para usarla en el archivo index.js













//Rutas
/* //Ejemplo de como hacer POST y GET en Postman
app.use('/', project_routes);



app.get('/', (req, res)=>{    //en el navegador ahora la ruta http://localhost:3700/ ahora esta disponible con el mensaje introducido
    res.status(200).send(     //en el programa postman pegando la url y seleccionando get podemos obtener estos datos 
       "<h1>Pagina de Inicio</h1>"
    );
});
app.post('/test/:id', (req, res)=>{    //en el navegador ahora la ruta http://localhost:3700/test ahora esta disponible con el mensaje introducido si colocamos metodo get, si lo cambiamos por post la respuesta la obtenemos con postman en la terminal
    console.log(req.body.nombre);               //nos devuelve en consola la respuesta enviada por postman en este caso el nomble introducido en campo nombre en body y en la opcion x-www-form-urlencoded Key = nombre y value = Ulises
    console.log(req.query.web);    //al escribir http://localhost:3700/test/88?web=youtube.com en postman y lanzar el POST en consola obtenemos la direccion web youteube.com
    console.log(req.params.id);    //al escribir http://localhost:3700/test/88?web=youtube.com en postman y lanzar el POST en consola obtenemos la id con numero 88
    res.status(200).send({          //en el programa postman pegando la url y seleccionando post podemos obtener estos datos 
        message: "Hola Mundo desde mi API de NodeJS"
    });
});
*/