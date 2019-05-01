const mongoose = require("../../connections")


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


  module.exports = mongoose.model("News", NewsSchema)
