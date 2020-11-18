'use strict'

//el nombre de este archivo se asocia con a base de datos que creamos en Mongo Robo 3T

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema ({ //a continuaceon se definen los campos del objeto de acuerdo a los elementos de la base de datos de Mongo DB
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);
//la palabra Project no concuerda con el nombre de mi coleccion 
//en Mongo la cual es projects pero lo que hace Mongo es cambiar 
//a minusculas y pluralizar por lo que si escribo Project Mongo 
//lo traduce como projects lo cual concuerda con mi coleccion en 
//Mongo y si la coleecion ya existe se guarda directamente 
//lo que le enviemos


