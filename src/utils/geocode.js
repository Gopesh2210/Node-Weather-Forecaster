const request = require('postman-request');


// GEO CODE API USING MAPBOX
const geocode = (address, callback) => {
    
    const url_mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ29wZXNociIsImEiOiJja2NscDNqZ28waXJkMnNyemdyaGJ2NzFqIn0.69rTBUq58yhTumDxesePzg&limit=1'

    request({ url: url_mapbox, json: true }, function (error, response, body) {

        if (error) {
            callback('Unable to connect to the geocoding service !', undefined)
        }
        else if (body.message) {
            callback('No address entered !', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another location!', undefined)
        }
        else {
            const map_data = body
            var coordinates = map_data.features[0].center
         
            const data = {
                label: 'coordinates',
                location: map_data.features[0].text,
                latitude: coordinates[1],
                longitude: coordinates[0]
            }
            callback(undefined,data)
        }

    });
}

module.exports = geocode