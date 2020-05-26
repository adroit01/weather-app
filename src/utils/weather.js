const request = require('postman-request');

const weather = ({latitude,longitude},callback) => 
   {
    const url = 'http://api.weatherstack.com/current?access_key=375bba3d3e2732985d7eb7a1a428a395&query=' + latitude +','+ longitude;
    request({url,json: true}, function (error, response, body) {
    if(error){
      console.log("Unable to connect to weather service!");
      callback(error,undefined);
    } else if(body.error) {
        callback(body.error,undefined);
    }
    else{
        callback(undefined, {
        name: body.location.name,
        localtime: body.location.localtime,
        weather_description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        humidity: body.current.humidity
      });
    }
  });
}

module.exports = weather;