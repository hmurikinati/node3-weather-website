    const request = require('request')

    const forecast = (latitude, longitude, callback) => {
        const url = 'https://api.darksky.net/forecast/0e57dd303e1024e4512e0149d10097db/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si&lang=en'

        request({url, json: true}, (error, response) => {

            if (error) {
                callback('Unable to connect to weather service', undefined)
            } else if (response.body.error) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, response.body.daily.data[0].summary+' It is currently '+ response.body.currently.temperature+ ' degress out. There is a '+ response.body.currently.precipProbability+ ' % chance of rain')
            }
        }) 

    }

    module.exports = forecast