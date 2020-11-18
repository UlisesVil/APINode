'use strict'

var mongoose = require('mongoose');
var app = require('./app');//no hace falta poner extencion js
var port = 3700; //numero del puerto que utilizara nuestro proyecto

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
        .then(()=>{
            console.log('Conexion a la base de datos establecida satisfactoriamente');
        
        //creacion del servidor
        app.listen(port, ()=> {
            console.log("Servidor corriendo correctamente en la url localhost:3700");
        });
        
        })
        .catch(err=> console.log(err));
        //Usar en la consola dentro de la carpeta del proyecto el 
        //comando $npm start para comprobar que se conecto a la base de datos de Mongo DB
        
     
//Con esto se arregla el proble del error Deprecated "Portfolio es el nombre de tu base de datos"
        mongoose.connect("mongodb://localhost/portafolio", {
            keepAlive: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
     