const express = require("express")
const router = express.Router()
const url = require("url")
const query = require("querystring")
const Alerts = require("../db/models/Alerts.js")

//Find all allerts, shows first 5
router.get("/", (req, res)=>{
    Alerts.find({}).then(alerts => {
        // console.log(alerts.json())
        var array = alerts.slice(0, 5)
        return res.json(array)
    })
})

//Find alerts by category

router.get("/category/:type", (req, res)=>{
    Alerts.find({category: req.params.type}).then(alerts => {
        var array = alerts.slice(0, 5)
        return res.json(array)
    })
})

// Find alerts using query
router.get("/query/", (req, res)=>{  
    let limit = parseInt(req.query.limit)
    let start = req.query.page
    Alerts.paginate({}, {limit: limit, page: start}).then(alerts => {
        return res.json(alerts)
    })
})

// Add new alert
router.post("/add/", (req, res)=>{
    Alerts.create(req.body).then(news => res.news)
})

//Update any field in Alerts, find by name

router.put("/update/:name/", (req, res) => {
    Alerts.findOneAndUpdate({name: req.param.name}, req.body).then(updated => res.updated)
})

module.exports = router