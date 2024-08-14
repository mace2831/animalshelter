const mongoose = require('mongoose');

//animal database schema
const animalsSchema = new mongoose.Schema({
    rec_num: {type: String, required: true, index: true},
    age_upon_outcome: {type: String, required: true},
    animal_id: {type: String, required: true, index: true },
    animal_type: {type: String, required: true, index: true},
    breed: {type: String, required: true, index: true},
    color: {type: String, required: true},
    date_of_birth: {type: String, required: true,},
    datetime: {type: String, required: true},
    monthyear: {type: String, required: true},
    name: {type: String, required: true, index: true},
    outcome_subtype: {type: String, required: true},
    sex_upon_outcome: {type: String, required: true},
    location_lat: {type: Number, required: true},
    location_long: {type: Number, required: true},
    age_upon_outcome_in_weeks: {type: Number, required: true}
});

//Create model
const Animal = mongoose.model('animals', animalsSchema);
module.exports =  Animal;