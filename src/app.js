const path = require('path')
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3030;

const publicDir = path.join(__dirname,"../public");
const veiwsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//setup handlebars and view location
app.set('view engine', 'hbs');
app.set("views",veiwsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDir));

app.get('',(req,res) =>{
    res.render('index', {
        title: "Weather Reporting"
    });
})

app.get('/about',(req,res) =>{
    res.render('about', {
        title: "Weather Reporting",
        author:"Amit Keshri, Email: Amit.keshri01@gmail.com"

    });
})

app.get('/help',(req,res) =>{
    res.render('help', {
        title: "Help Weather App"
    });
})

app.get('/weather',(req,res) => {
    const location = req.query.location;
    if(!location){
        return res.send({
            error:"You must provide a location"
        });
    }
    geocode(location,(error,data) => {
        if(error){
            return res.send( {
                error: JSON.stringify(error)
            });
        }
        weather(data, (weatherError,weatherData) => {
            if(weatherError){
                return res.send( {
                    error: JSON.stringify(weatherError)
                })
            } 
            const degreeCelcius = '\u00B0' + "c";
            res.send({
                "location": data.location,
                "weatherDetail": "Current Temperature is " + weatherData.temperature + degreeCelcius 
                + " (Avg.Temp:" + weatherData.avgtemp + degreeCelcius+ ", Max Temp:" + weatherData.maxtemp + degreeCelcius+ ", Min Temp:" + weatherData.mintemp + degreeCelcius
                + ")  Humidity is " + weatherData.humidity + "mm and Wind Speed:" + weatherData.windSpeed + "kmph. It is " + 
                 weatherData.weather_description + " observed at " + weatherData.localtime
            });
        });
    });
})

app.get('/help/*',(req,res) =>{
    res.render('404', {
        title:"404",
        errorMessage: "Help Page Not Found"
    });
});

app.get('*',(req,res) =>{
    res.render('404', {
        title:"404",
        errorMessage: "Page Not Found"
    });
});

app.listen(port);
console.log("weather app server started on " + port);
