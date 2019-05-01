const mongoose = require("../connections")
const fetch = require("node-fetch")
const Parks = require("./models/Parks")
const News = require("./models/News")
const Alerts = require("./models/Alerts")


const dataCollections = {
    parks: {
        models: Parks,
        url: "https://developer.nps.gov/api/v1/parks?api_key=f0H2gKxcfyIecZWotcugQVUzRBAXQi8RNQRKd6wI&limit=496"
    },
    news: {
        models: News,
        url: "https://developer.nps.gov/api/v1/newsreleases?api_key=f0H2gKxcfyIecZWotcugQVUzRBAXQi8RNQRKd6wI&limit=100"
    },
    alerts: {
        models: Alerts,
        url: "https://developer.nps.gov/api/v1/alerts?api_key=f0H2gKxcfyIecZWotcugQVUzRBAXQi8RNQRKd6wI&limit=100"
    }
}




function getJson(url, modelName) {
    modelName.deleteMany({}).then(
    fetch(url)
        .then(res => {
            return res.json()
        }).then(json => {
            console.log(json)
            modelName.create(json.data)
        }))
}

function buitDB() {
    for (var model in dataCollections) {
        getJson(dataCollections[model].url, dataCollections[model].models)
    }
}

buitDB()

