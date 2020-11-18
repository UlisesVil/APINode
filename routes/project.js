'use strict'

var express = require('express');
var ProjectController= require('../controllers/project');

var router = express.Router();

var multipart= require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);  //el signo de ? quiere decir que el parametro es opcional en este caso el id es opcional si lo haces opcional debes agregar esta linea en controllers/project.js    if(projectId==null) return res.status(404).send({message:'El proyecto no Existe'});
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);//aqui el id si es obligatorio y por eso no lleva el ? 
router.delete('/project/:id', ProjectController.deleteProject);//aqui el id si es obligatorio y por eso no lleva el ? 
router.post('/upload-image/:id',multipartMiddleware, ProjectController.uploadImage);//aqui el id si es obligatorio y por eso no lleva el ? 
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;