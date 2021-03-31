const express = require('express');
const mongoose = require('mongoose');

//body parser is now included in express so its now commented out
//remember to remove from dependencies later
//const bodyParser = require('body-parser');

const items = require('./routes/api/items');



const app = express();

//Bodyparser Middleware
app.use(express.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));