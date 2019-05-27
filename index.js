const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let request = require('request');
const apiKey = 'ae9ae0e4a88bfad5ae238e6f95194603';
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./assets'));

app.get('/', function (req, res) {
    res.render('index',{weather: null, error: null});
})


app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} fahrenheit in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })
  
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})