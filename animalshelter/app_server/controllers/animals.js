const animalsEndpoint = 'http://localhost:3000/api/animals';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

//get animals from the api endpoint
const animals = async function(req,res,next){
    await fetch(animalsEndpoint, options)
    .then(res => res.json())
    .then(json => {
        let message = null;
        if(!(json instanceof Array)){
            message = 'API lookup error';
            json = [];
        } else {
            if(!json.length){
                message = 'No animals in the database.'
            }
        }
        res.render('animals', {title: 'Animal Shelter', animals: json});
    })
    .catch(err=> res.status(500).send(e.message));
}

module.exports ={
    animals
}