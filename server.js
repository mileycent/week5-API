const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const Fifth = require('./model/user.js');
const dotenv = require('dotenv');
const nodemon = require('nodemon');

const app = express();
dotenv.config()

app.use(express.static('public'));
app.use(express.json({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello')
});

// adding info to the database
app.get('/meat', async(req, res) => {
    const scary = await Fifth.create ([{
        bookName: 'Heaven on Earth',
        author: 'Hannah Montana',
        genre: 'Religious'
    }, {
        bookName: 'Catch that thief',
        author: 'Hadley Chase',
        genre: 'Thriller'
    }, {
        bookName: 'Eat that frog',
        author: 'Steve Jacobs',
        genre: 'Motivational'
    }])
    console.log(scary);
});


// returning all users
app.get('/all-scary', (req,res) => {
    Fifth.find()
    .then ((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

// adding a info to the database 
app.get('/add-scary', (req, res) => {
    const scar = new Fifth({
        bookName: 'Catch me if you can',
        author: 'Ronaldo Da Vinci',
        genre: 'Crime'
});
    scar.save()
    .then ((result) => {
        res.send(result)
        console.log(result);

    })
    .catch ((err) => {
        console.log(err)
    });
})

// find all info on database
app.get('/all-data', (req, res) => {
    Fifth.find()
   .then((result) => {
    res.send(result);
   })
   .catch((err) => {
    console.log(err);
   })
});

// adding a user to the database
app.post('/all-post', async(req, res) => {
    const bookish = new Fifth({
        bookName: req.body.bookName,
        author: req.body.author,
        genre: req.body.genre,
    });
    bookish.save()
    .then ((result) => {
        res.send(result)
        console.log(result);

    })
    .catch((err) => {
        console.log(err)
    });
})

app.put('/upper/:id',async(req, res) => {
    const look = await Fifth.findByIdAndUpdate(req.params.id, req.body)
    console.log(look)
    res.send(look);
})

app.delete('/lower/:id', async(req, res) => {
    const hurry = await Fifth.findByIdAndRemove(req.params.id)
    console.log(hurry)
    res.send(hurry);
})


const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(5000, console.log('listening on port 5000')))
.catch((err) => console.log(err));


