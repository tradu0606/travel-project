const mongoose =require("mongoose")
mongoose.Promise = Promise
let mongoURI = ''

  
  if (process.env.NODE_ENV === "production") {
    mongoURI = process.env.DB_URL;
  } else {
    mongoURI = "mongodb://localhost/travel";
  }
mongoose.connect('mongodb://localhost/travel', {useNewUrlParser: false})
module.exports = mongoose

