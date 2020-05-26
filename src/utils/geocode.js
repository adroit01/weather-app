const request = require('postman-request');
const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiYW1pdGtlc2hyaTAxIiwiYSI6ImNrYW05aTBzZzB5amQycm82Nmg5dmwzZWIifQ.rCT9A5rq0ynLxP8VHpbaMQ&limit=1'
    
    request({url,json:true}, (error,response,body) => {
        if(error){
            console.log("unable to connect to geocode service");
            callback(error,undefined);
        }else if(body.features.length === 0){
            exactError =  "Location:"+ address + " geocode not found";
            callback(exactError,undefined);
        }else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });

}

module.exports = geocode;