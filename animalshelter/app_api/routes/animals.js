var express = require('express');
var router = express.Router();
var controller = require('../controllers/animals');

// get the animals page
router.get('/', controller.animals);

// Existing routes
router.get('/animals/:rec', controller.animalsFindByRec);

router.post('/animals', controller.animalsAddAnimal);


module.exports = router;