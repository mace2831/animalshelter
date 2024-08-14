const express = require('express');
const router = express.Router();
const Animal = require('../models/animals'); 
const animalController = require('../controllers/animals');
const authController = require('../controllers/authentication');
const jwt = require('jsonwebtoken');


function authenticateJWT(req, res, next){
  const authHeader = req.headers['authorization'];

  if(authHeader == null)
  {
    console.log('Auth Header Required but not present');
    return res.sendStatus(401);
  }

  let headers = authHeader.split(' ');
  if(headers.length <1){
    console.log('Not enough tokens in Auth Header: ' + headers.length);
    return res.sendStatus(501);
  }

  const token = authHeader.split(' ')[1];

  if(token == null)
  {
    console.log('Null bearer token');
    return res.sendStatus(401);
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified)=> {
    if(err)
    {
      return res.sendStatus(401).json('Token Validation Error');
    }
    req.auth = verified;
  });
  next(); //prevent hanging
}

//user registration endpoint
router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);

// Route to fetch animal data
router.get('/animals', async (req, res) => { 
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router
.route('/animals/:rec_num')
.get(animalController.animalsFindByRec)
.put(authenticateJWT, animalController.animalsEditanimal)
.delete(authenticateJWT, animalController.animalsDeleteAnimal);

router.post('/animals', authenticateJWT, animalController.animalsAddAnimal);



module.exports = router;
