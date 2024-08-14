/*Function to get the homepage*/
const index = (req, res) => {
    res.render('index', {title: "Animal Shelter"});
};

/*export index to be used in other modules*/
module.exports ={
    index
}