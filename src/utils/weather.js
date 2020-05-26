const request = require('postman-request');

const weather = ({latitude,longitude},callback) => 
   {
    const url = 'http://api.weatherstack.com/forecast?access_key=375bba3d3e2732985d7eb7a1a428a395&query=' + latitude +','+ longitude;
    request({url,json: true}, function (error, response, body) {
    if(error){
      console.log("Unable to connect to weather service!");
      callback(error,undefined);
    } else if(body.error) {
        callback(body.error,undefined);
    }
    else{
      const today  = new Date().toISOString().slice(0,10);
      const dailyData = body.forecast[today]; 
      console.log(dailyData);
        callback(undefined, {
        name: body.location.name,
        localtime: body.location.localtime,
        weather_description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        humidity: body.current.humidity,
        mintemp: dailyData?dailyData.mintemp:"NA",
        maxtemp: dailyData?dailyData.maxtemp:"NA",
        avgtemp: dailyData?dailyData.avgtemp:"NA",
        windSpeed: body.current.wind_speed
      });
    }
  });
}

module.exports = weather;