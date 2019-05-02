const mongoose = require("../../connections")
var mongoosePaginate = require('mongoose-paginate');

const NewsSchema = new mongoose.Schema(
    {
        abstract: String,
        id: Number,
        image: [
            {
                credit: String,
                altText: String,
                title: String,
                description: String,
                caption: String,
                url: String
            }
        ],
        parkCode: String,
        releaseDate: String,
        title: String,
        url: String
    })

NewsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("News", NewsSchema)
