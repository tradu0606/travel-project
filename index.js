const express = require('express')
const parser = require('body-parser')
const cors = require('cors')



const parksController = require('./controllers/ParksController.js')
const newsController = require('./controllers/NewsControllers.js')
const alertsController = require('./controllers/AlertsControllers.js')

const app = express()

app.use(parser.urlencoded({extended: true})) 

app.use(parser.json()) 


app.use(cors())


app.use('/', express.static("static"))
app.use('/parks/', parksController)
app.use('/news/', newsController)
app.use('/alerts/', alertsController)

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), () => console.log(`They see me rollin...on port ${app.get('port')}`))


