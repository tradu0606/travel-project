const mongoose =require("mongoose")
mongoose.Promise = Promise
let mongoURI = ''

// set the uri for connecting to our local mongodb
if(process.env.NODE_ENV === 'production') {
  mongoURI = process.env.DB_URL
} 
else {
  mongoURI = 'mongodb://localhost/travel'
}

mongoose.connect(mongoURI, {useNewUrlParser: true})
module.exports = mongoose