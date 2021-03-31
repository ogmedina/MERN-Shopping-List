const express = require('express');
const router = express.Router();

//Bring in Item Model
const Item = require('../../models/Item');

//@ route GET api/items
//@ description GET All Items
//@ access Public
//Check with postman GET request http://localhost:5000/api/items
//should get 200 and an empty array
router.get('/', (req, res) => {
    Item.find()
        //sort by descending (-1) sort by ascending (1)
        .sort({ date: -1 })
        //items into a json file
        .then(items => res.json(items))
});

//@ route POST api/items
//@ description Create A Item
//@ access Public
// has more fields but just need name
//Check with postman POST request http://localhost:5000/api/items
// Change Header to KEY: Content-type, VALUE: Application/json
//Write JSON in body { "name": "milk"}
//Should return _id, Name, __v
//whatever the /api/(namehere) is will be the name of the collection from the DB
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item));
    
});

//@ route DELETE api/items/:id
//@ description Delete a item
//@ access Public
router.delete('/:id', (req, res) => {
   Item.findById(req.params.id)
   .then(item => item.remove().then(() => res.json({success: true})))
   .catch(err => res.status(404).json({success: false}));
});


module.exports = router;

