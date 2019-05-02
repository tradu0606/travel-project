const mongoose = require("../../connections")
var mongoosePaginate = require('mongoose-paginate');
const AlertSchema = new mongoose.Schema({
    category: String,
    description: String,
    id: String,
    parkCode: String,
    title: String,
    url: String
})
AlertSchema.plugin(mongoosePaginate);
let alerts = mongoose.model("Alerts", AlertSchema)
module.exports = alerts

