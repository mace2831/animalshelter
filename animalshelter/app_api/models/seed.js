//bring in db connection
const Mongoose = require('./db');
const Animal = require('./animals');

//read seed data
var fs = require('fs');
var animals = JSON.parse(fs.readFileSync('./data/animals.json', 'utf8'));

//delete existing records and insert seed data
const seedDB = async() =>{
    await Animal.deleteMany({});
    await Animal.insertMany(animals);
};

//close db connection
seedDB().then(async()=>{
    await Mongoose.connection.close();
    process.exit();
});