const { getAll, create, getOne, remove, update } = require('../controllers/director.controllers');
const express = require('express');
const { setDirectors } = require('../controllers/movie.controllers');

const routerDirector = express.Router();

routerDirector.route('/')
    .get(getAll)
    .post(create);
    
//directors/:id/genres
routerDirector.route('/:id/genres')
  .post(setDirectors)
    
routerDirector.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerDirector;