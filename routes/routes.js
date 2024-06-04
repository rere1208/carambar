// routes/jokesRoutes.js
const express = require('express');
const router = express.Router();
const jokesController = require('../controllers/blagues.js');

// Route pour récupérer toutes les blagues
router.get('/', jokesController.getAllJokes);

 // Route pour récupérer une blague au hasard
 router.get('/random', jokesController.getRandomJoke);

// Route pour récupérer une blague par ID
 router.get('/:id', jokesController.getJokeById);
 
module.exports = router;
