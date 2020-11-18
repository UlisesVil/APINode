//este archivo sera el controlador de los proyectos
'use strict'

var Project = require('../models/project');
const { restart } = require('nodemon');
var fs = require('fs');    //esta libreria (file Sistem) se carga para la funcion uploadImage() la usaremos para borrar un archivo o un unlink
var path = require('path');

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la Home'
        });
    },

    test: function(req, res){
         return res.status(200).send({
            message: "Soy el metodo o accion test del controlador de project"
         });
    },

    saveProject: function(req, res) {
        var project = new Project();

        var params = req.body;
        project.name=params.name;
        project.description=params.description;
        project.category=params.category;
        project.year=params.year;
        project.langs=params.langs;
        project.image=null;

        project.save((err,projectStored)=> {
            if(err) return res.status(500).send({message: 'Error al guardar  el documento.'});
            
            if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

            return res.status(200).send({project: projectStored});
        });
    },

    getProject: function (req, res){
        var projectId = req.params.id;

        if(projectId==null) return res.status(404).send({message:'El proyecto no Existe'});
        
        Project.findById(projectId,(err, project)=>{
            if (err) return res.status(500).send({message: 'Error al  devolver los datos.'});

            if(!project) return res.status(404).send({message:'El proyecto no Existe'});

            return res.status(200).send({
                project
            });
        });
    },

    getProjects: function(req, res){
        //Project.find({}).exec((err,projects)=>{ //muestra todos los objetos de mi base de datos
            //Project.find({year:2004}).exec((err,projects)=>{ //Muestra los objetos que contienen el dato solicitado
            //Project.find({}).sort('year').exec((err,projects)=>{ // Muestra los objetos que contienen el dato solicitado ordenado de menor a mayor
            Project.find({}).sort('-year').exec((err,projects)=>{ // Muestra los objetos que contienen el dato solicitado ordenado de mayor a menor
            if (err) return res.status(500).send({message:'Error el devolver los datos'});
            
            if(!projects) return res.status(404).send({message:'No hay proyectos que mostrar'});

            return res.status(200).send({projects});
        });
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true},(err,projectUpdated)=>{ //el {new:true} es para que postman no me regrese la tabla antigua cuando actualice datos y me devuelva los datos que acabamos de actualizar
            if(err) return res.status(505).send({message:'Error  al actualizar'});

            if(!projectUpdated) return res.status(404).send({message:'No existe  el proyecto para ser actualizado'});

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: function(req, res){
        var projectID = req.params.id;

        Project.findByIdAndRemove(projectID, (err, projectRemoved)=> { // se cambio findByIdAndDelete por findByIdAndRemove pero ambos funcionan
            if(err) return res.status(500).send({message:"No se puede eleminar el proyecto"});

            if(!projectRemoved) return res.status(404).send({message:"No se puede eliminar ese proyecto"});

            return res.status(200).send({
                project: projectRemoved
            });

        });
    },

    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida...';

        if(req.files){
            var filePath = req.files.image.path; 
            var fileSplit = filePath.split('\\'); //con esto sacamos el nombre de la imagen con el que se guardo al subir 
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt =='png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt =='gif'){

                Project.findByIdAndUpdate(projectId,{image:fileName}, {new:true}, (err, projectUpdated)=>{
                    if(err) return res.status(500).send({message:'La Imagen no se ha subido'});

                    if(!projectUpdated) return res.status(404).send({message:'El proyecto no existe'})
                    
                    return res.status(200).send({
                        files: projectUpdated
                    });
                });
            }else{
               fs.unlink(filePath, (err) =>{
                    return res.status(200).send({message: 'La extencion no es valida'});
                     
               });
            }
           
        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    },


    getImageFile: function(req,res){
        var file = req.params.image;
        var path_file ='./uploads/'+ file;

        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file)); //para esto se importa require('path') en la variable path al principio de este archivo

            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        });
    }
};


module.exports = controller;