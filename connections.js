const mongoose =require("mongoose")
mongoose.Promise = Promise
let mongoURI = ''

  mongoURI = "mongodb://tanyasmongo:a2VdQTL2YqQpHSSzMTLKnAFiRfjBsKwH0nrtlrmjduvvYNBS3Sd21Jqi2JExjYCRpYQCgC4KOtXR3XkOHrmOug%3D%3D@tanyasmongo.documents.azure.com:10255/?ssl=true"


mongoose.connect(mongoURI, {useNewUrlParser: false})
module.exports = mongoose