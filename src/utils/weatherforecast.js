const request = require('postman-request');


// WEATHER FORECAST API USING WEATHER-STACK
const weatherforecast = ({latitude, longitude},callback) => {

    const url_weatherstack = 'http://api.weatherstack.com/current?access_key=e0a5ec1b56cb49d091c2a5699a9b0450&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url: url_weatherstack, json: true }, function (error, response, body) {
        //   console.log('error:', error); // Print the error if one occurred
        //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //   console.log('body:', body);

        if (error) {
            callback('Unable to connect to the weather service !', undefined)
        }
        else if (body.error) {
            callback(body.error.info, undefined)
        }
        else {
            const weather_data = body
            const forecast = 'Weather: ' + weather_data.current.weather_descriptions + '. Temperature: ' + weather_data.current.temperature + '°C  Humidity: ' + weather_data.current.humidity +  ' at ' + weather_data.current.observation_time + ' in ' + weather_data.location.name
            callback(undefined, forecast)
        }

    });
}

module.exports = weatherforecast