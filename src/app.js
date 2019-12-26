const path = require('path')
const express = require('express')
const hbs = require('hbs')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const publicDirectoryPath = path.join(__dirname, '../public')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('/help', (req, res) => {
//     res.send([{
//         name: "Harish",
//         age: 27
//     }, {
//         name: "Janardhan",
//         age: 28
//     }
//     ])
// })


// app.get('/about', (req, res) => {
// res.send('<h1>About me </h1>')
// })

app.get('', (req, res) => {
res.render('index', {
    title: 'Weather',
    name: "Harish Murikinati"
})
})

app.get('/about', (req, res) => {
res.render('about', {
    title: 'About Me',
    name: 'Harish Murikinati'
    
})
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Harish Murikinati'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } else {

        geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                       })
                } 
                
                forecast(latitude, longitude, (error, forecastdata) => {
                    if (error) {
                        return res.send({
                     error
                        })
                    }
                    
                    res.send({
                        forecast: forecastdata,
                        location: location,
                        address: req.query.address
                    })
                    
                })
        
            })

    }

})  

app.get('/products', (req, res) =>{
    if(!req.query.search) {
return res.send({
    error: 'You must provide search time'
})
    }
console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
res.render('404', {
    title:'404',
    name: "Harish Murikinati",
    errorMessage: 'Help article not found.'
})
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name : "Harish Murikinati",
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})