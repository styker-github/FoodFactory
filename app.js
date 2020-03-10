const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const cors = require('cors');

const path = require('path');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use(bodyParser.json())
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin: *");
res.header("Access-Control-Allow-Credentials: true ");
res.header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
res.header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");;
 next();
});


//Routes
const users = require('./data/routes/users');
const foods = require('./data/routes/food')
const ingredients = require('./data/routes/ingredients')
const orders = require('./data/routes/orders')

app.use('/users', users);
app.use('/foods', foods);
app.use('/ingredients', ingredients);
app.use('/orders', orders);

app.get('/', (req,res)=>{
	res.send({message:"Souled store app is running app is runing"})
});

module.exports = app;