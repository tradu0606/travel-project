const mongoose = require("../connections")
const fetch = require("node-fetch")
const Parks = require("./models/Parks")
const News = require("./models/News")
const Alerts = require("./models/Alerts")
const Key = require("./models/Key.js")


const dataCollections = {
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

var parks = {
    models: Parks,
    url: "https://developer.nps.gov/api/v1/parks?api_key=f0H2gKxcfyIecZWotcugQVUzRBAXQi8RNQRKd6wI&limit=50&start="
}
function getJsonParks(url, modelName) {
    let arrayPark = []
    let promises = []
    modelName.deleteMany({}).then(() => {
        for (var i = 0; i <= 500; i += 50) {
            var urlStart = i
            console.log(`${url}${urlStart}`)
            promises.push(
                fetch(`${url}${urlStart}`).then(res => {
                    return res.json()
                }).then(json => {
                    console.log(json.data.length)
                    return json.data
                })
            )
        }  
      Promise.all(promises).then(value =>{
        for (var i=0; i<value.length; i++){
            arrayPark = arrayPark.concat(value[i])
        }
        modelName.create(arrayPark)
    }).catch(e => {console.log(e)})
    })

}

getJsonParks(parks.url, parks.models)
buitDB()

Key.deleteMany({}).then(()=>{
    Key.create({key: "6529sxs89cdvhjf2432521"}, {key: "jsd6876cnscn928392scas"})
})

