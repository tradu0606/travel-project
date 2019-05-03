const express = require("express")
const router = express.Router()
const url = require("url")
const query = require("querystring")
const Alerts = require("../db/models/Alerts.js")
const Key = require("../db/models/Key.js")

//Find all allerts, shows first 5
router.get("/", (req, res)=>{
    let limit = 5
    let start = 0
    if (req.query.limit){
        limit = parseInt(req.query.limit, 10)
    }
    if (req.query.page){
        start = parseInt(req.query.page, 10)
    }

    Alerts.find({}, null, { limit: limit, page: start }).then(alerts => {
        return res.json(alerts)
    })
})

//Find alerts by category

router.get("/category/:type", (req, res)=>{
    let limit = 5
    let start = 0
    if (req.query.limit){
        limit = parseInt(req.query.limit, 10)
    }
    if (req.query.page){
        start = parseInt(req.query.page, 10)
    }

    Alerts.find({category: req.params.type}, null, { limit: limit, page: start }).then(alerts => {
        var array = alerts.slice(0, 5)
        return res.json(array)
    })
})

// Find news by title

router.get("/title/:title", (req, res) => {
    let limit = 5
    let start = 0
    if (req.query.limit) {
        limit = parseInt(req.query.limit, 10)
    }
    if (req.query.page) {
        start = parseInt(req.query.page, 10)
    }

    Alerts.find({title: req.params.title}, null, { limit: limit, skip: start }).then(alerts => {
        return res.json(alerts)
    })
})

// Add new alert
router.post("/add/", (req, res)=>{
    Key.find({ key: req.query.key }).then(keys => {
        if (keys.length > 0) {
            Alerts.create(req.body).then(news => res.json(news))
        }
        else {
            res.status(403).end()
        }
    })
})

//Update any field in Alerts, find by name

router.put("/update/:title", (req, res) => {
    Key.find({ key: req.query.key }).then(keys => {
        if (keys.length > 0) {
            Alerts.findOneAndUpdate({title: req.params.title}, req.body).then(updated => res.json(updated))
        }
        else {
            res.status(403).end()
        }
    })
})

//Remove alert

router.delete("/delete/:title", (req, res) => {
    Key.find({ key: req.query.key }).then(keys => {
        if (keys.length > 0) {
            Alerts.findOneAndDelete({ title: req.params.title }).then(deleted => 
                res.json(deleted))
        }
        else {
            res.status(403).end()
        }
    })
})

module.exports = router