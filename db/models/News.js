const mongoose = require('mongoose')


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
  },
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

  module.export = mongoose.model("Parks", ParksSchema)