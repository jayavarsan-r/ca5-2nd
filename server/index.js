const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const usermodel = require('./dbconfig');
const cors = require('cors')


app.use(express.json())
app.use(cors())

app.post('/createuser' , (req,res) =>{
    usermodel.create(req.body)
    .then((user) => res.json(user))
    .catch(err =>{
        console.error(err)
        console.log("Error in creating user");
        res.status(400).send("Unable to create User")       
    })     
})

app.get('/getuser' , (req,res) =>{
    usermodel.find()
    .then(users => res.json(users))
    .catch(err=> {console.error(err); res.status(500).send("Server Error")})        
})

mongoose.connect("mongodb+srv://jayavarsanr:jayavarsan@findyourtoilet.e1nama6.mongodb.net/Findyourtoilet?retryWrites=true&w=majority&appName=Findyourtoilet")
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));