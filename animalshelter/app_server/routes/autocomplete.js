const express = require('express');
const router = express.Router();
const { trie } = require('../initializeTrie');
const Animal = require('../../app_api/models/animals'); 

//get the information from the search bar to find selected animal
router.get('/autocomplete', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }
    try {
        //get suggestion from trie data structure
        const suggestions = trie.suggest(query);
        //get rec_num from animal name
        const animals = await Animal.find({ name: { $in: suggestions } }).select('name rec_num -_id');
        //get results from search
        const results = animals.map(animal => ({
            name: animal.name,
            rec_num: animal.rec_num
        }));
        //return resuts
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
