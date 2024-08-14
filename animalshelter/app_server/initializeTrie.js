const Trie = require('./trie');
const Animal = require('../app_api/models/animals');

const trie = new Trie();

//function to initialize the Trie data structure 
async function populateTrie(){
    try { 
        //add the animals by name to the data structure
        const animals = await Animal.find().select('name -_id');
        //iterate through every animal and add it to the structure
        animals.forEach(animal => trie.insert(animal.name));
        //log how many animals were added for testing
        console.log(animals.length + ' animals added to the trie');
    }
    catch(error)
    {
        console.error('Error populating the trie: ', error);
    }
}

module.exports = {
    trie,
    populateTrie
}