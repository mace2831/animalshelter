var express = require('express');
var router = express.Router();
var controller = require('../controllers/animals');

//get the animals page
router.get('/', controller.animals);

module.exports = router;