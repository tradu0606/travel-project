const mongoose = require("../../connections")
const KeySchema = new mongoose.Schema({
    key: String
})

let alerts = mongoose.model("Keys", KeySchema)
module.exports = alerts