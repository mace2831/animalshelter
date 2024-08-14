const express = require('express');
const router = express.Router();
const Animal = require('../../app_api/models/animals'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//route to fetch animal data
router.get('/api/animals', async (req, res) => { 
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//route to serve animal details page using rec_num
router.get('/animals/:recNum', async (req, res) => { 
  try {
    const animal = await Animal.findOne({ rec_num: req.params.recNum });
    if (!animal) {
      return res.status(404).send('Animal not found');
    }
    //render the animalDetail page with the selected animal
    res.render('animalDetail', { animal });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
