const mongoose = require('mongoose');
const Animal = require('../models/animals');
const Model = mongoose.model('animals');

//Get all of the trips
const animalsList = async(req, res) => {
    const q = await Model.find({}).exec();

    if(!q)
    { //database didn't return any values
        return res.status(404).json(err);
    }
    else
    {
        return res.status(200).json(q);
    }
};

//find animal by rec_num
const animalsFindByRec = async(req, res)=>{
    const q = await Model.find({'rec_num': req.params.rec_num}).exec();

    if(!q)
    {
        const err = {"message": "Animal not found"}
        return res.status(404).json(err);
    }
    else
    {
        return res.status(200).json(q);
    }
};

const animalsEditanimal = async(req, res) => {

    const q = await Model
        .findOneAndUpdate(
            {'rec_num' : req.params.rec_num},
            {
                rec_num: req.body.rec_num,
                age_upon_outcome: req.body.age_upon_outcome,
                animal_id: req.body.animal_id,
                animal_type: req.body.animal_type,
                breed: req.body.breed,
                color: req.body.color,
                date_of_birth: req.body.date_of_birth,
                datetime: req.body.datetime,
                monthyear: req.body.monthyear,
                name: req.body.name,
                outcome_subtype: req.body.outcome_subtype,
                sex_upon_outcome: req.body.sex_upon_outcome,
                location_lat: req.body.location_lat,
                location_long: req.body.location_lat,
                age_upon_outcome_in_weeks: req.body.age_upon_outcome 
            }
        )
        .exec();

        if(!q)
        {
            const err = {"message": "Animal not found or unable to update."}
            return res.status(400).json(err);
        }
        else
        {
            return res.status(201).json(q);
        }
};


//add animal
const animalsAddAnimal = async(req, res) => {
    const newAnimal = new Animal({
        rec_num: req.body.rec_num,
      age_upon_outcome: req.body.age_upon_outcome,
      animal_id: req.body.animal_id,
      animal_type: req.body.animal_type,
      breed: req.body.breed,
      color: req.body.color,
      date_of_birth: req.body.date_of_birth,
      datetime: req.body.datetime,
      monthyear: req.body.monthyear,
      name: req.body.name,
      outcome_subtype: req.body.outcome_subtype,
      sex_upon_outcome: req.body.sex_upon_outcome,
      location_lat: req.body.location_lat,
      location_long: req.body.location_lat,
      age_upon_outcome_in_weeks: req.body.age_upon_outcome
    });

    const q = await newAnimal.save();

    if(!q)
    {
        const err = {"message": "Unable to add animal."}
        return res.status(400).json(err);

    }
    else
    {
        return res.status(201).json(q);
    }
}

// DELETE: 
const animalsDeleteAnimal = async (req, res) => {
    try {
      const animal = await Model.findOneAndDelete({ 'rec_num': req.params.rec_num }).exec();
      if (!animal) {
        return res.status(404).json({ message: 'Animal not found' });
      }
      return res.status(200).json({ message: 'Animal deleted successfully' });
    } catch (err) {
      return res.status(500).json(err);
    }
  };


module.exports = {
    animalsList,
    animalsFindByRec,
    animalsAddAnimal,
    animalsEditanimal,
    animalsDeleteAnimal
};