const mongoose = require("mongoose")

const Parks = require("./models/Parks.js")
const News = require("./models/News.js")

const dataCollections = {
    parks = [Parks, "https://developer.nps.gov/api/v1/parks?api_key=f0H2gKxcfyIecZWotcugQVUzRBAXQi8RNQRKd6wI"],
    news = [News, "https://developer.nps.gov/api/v1/newsreleases?api_key=f0H2gKxcfyIecZWotcugQVUzRBAXQi8RNQRKd6wI"]
}



function getJson(url, modelName) {
    fetch(url)
        .then(res =>{
            return res.json
        }).then(json =>{
            modelName.create(json)
        })
}

function buitDB(){
    
}

