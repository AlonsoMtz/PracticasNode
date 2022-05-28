const express = require('express')
require('dotenv').config();
const app = express();
const port = process.env.PORT
const hbs = require('hbs');

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


// Servir contenido estatico
app.use(express.static('public'))

app.get('/', function (req, res) {
    // res.sendFile(__dirname + '/public/index.html')
    //res.send('Home Page')
    res.render('home', {
        nombre: "Alonso Martinez",
        titulo: "Curso NodeJs"
    })
})

app.get('/generic', function (req, res) {
    //res.sendFile(__dirname + '/public/generic.html')
    //res.send('Home Page')
    res.render('generic', {
        nombre: "Alonso Martinez",
        titulo: "Curso NodeJs"
    })
})

app.get('/elements', function (req, res) {
    //res.sendFile(__dirname + '/public/elements.html')
    //res.send('Home Page')
    res.render('elements', {
        nombre: "Alonso Martinez",
        titulo: "Curso NodeJs"
    })
})

app.get('/hola-mundo', function (req, res) {
    res.send('Hola Mundo')
})

app.get('*', function (req, res) {
    // res.send('404 | Page Not Found')
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

