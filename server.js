const express = require('express');
const path = require('path');
const session = require ('express-session');
require('dotenv').config()

const app = express ()
const PORT = process.env.PORT || 4200

const oneDay = 100 * 60 * 60 *24;

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: oneDay
    },
    resave: false,
    saveUninitialized: true
}

app.use(session(sess))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req,res) => {
    console.log('GET', req.session)
    console.log('*******************')
    console.log('GET SESSION ID',  req.session.id)
  
    if(req.session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    } else {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    }
  });
  
  app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
