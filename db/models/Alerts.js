const mongoose = require("../../connections")
const AlertSchema = new mongoose.Schema({
        category: String,
        description: String,
        id: String,
        parkCode: String,
        title: String,
        url: String
    })

    let alerts = mongoose.model("Alerts", AlertSchema)
    module.exports = alerts
