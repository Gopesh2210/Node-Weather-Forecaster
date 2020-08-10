const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherforecast = require('./utils/weatherforecast')


const app = express()
const port = process.env.PORT || 3000

// define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// handlebar setup and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicDirPath))

// routing paths
app.get('', (req, res) => {
    res.render('index',{
        title : "Home",
        name : "Weather",
        weather : "Enter location to get the weather details",
        creator : "Gopesh Rajderkar"
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        title : "Help",
        creator : "Gopesh Rajderkar"
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title : "About",
        creator : "Gopesh Rajderkar"
    })
})
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.render('error',{
            title : 'Error',
            message : 'No address entered',
            creator : "Gopesh Rajderkar"
        })
    }
    geocode(req.query.address, (error, geoCodeData) => {

        if(error){
            return res.send({error})
        }
    
        weatherforecast(geoCodeData,(error, weatherData) => {
    
             if(error){
                 return res.send({error})
            }
            res.send({
                address : req.query.address,
                location : geoCodeData.location,
                weather : weatherData
            })
        
        })
    })

})


app.get('/help/*', (req, res) => {
    res.render('error',{
        title : "Error",
        message : 'Help link not found!',
        creator : "Gopesh Rajderkar"
    })
})
app.get('*', (req, res) => {
    res.render('error',{
        title : "Error",
        message : 'Page not found 404 Error!',
        creator : "Gopesh Rajderkar"
    })
})


app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))