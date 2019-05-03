const express = require("express")
const router = express.Router()

const Parks = require("../db/models/Parks.js")


//Find all allerts

router.get("/", (req, res) => {
    let limit = 5
    let start = 0
    if (req.query.limit) {
        limit = parseInt(req.query.limit, 10)
    }
    if (req.query.page) {
        start = parseInt(req.query.page, 10)
    }

    Parks.find({}, null, { limit: limit, skip: start }).then(parks => {
        return res.json(parks)
    })
})

// ruter using lookup: added fiels news and alerts to model Parks + find park by name 
router.get("/name/:name", (req, res) => {

    let limit = 5
    let start = 0
    if (req.query.limit) {
        limit = parseInt(req.query.limit, 10)
    }
    if (req.query.page) {
        start = parseInt(req.query.page, 10)
    }
    Parks.aggregate([{
        $lookup: {
            from: "news",
            localField: "parkCode",
            foreignField: "parkCode",
            as: "news"
        }
    },
    {
        $lookup: {
            from: "alerts",
            localField: "parkCode",
            foreignField: "parkCode",
            as: "alerts"
        }
    },
    { $match: { name: req.params.name } },
    { $skip: start },
    { $limit: limit }
    
    ]).then(park => res.json(park))

})
// router using lookup: added fields news and alerts to model Parks + find parks by state

router.get("/state/:state", (req, res) => {
    var state = req.params.state.toUpperCase()
    let limit = 5
    let start = 0
    if (req.query.limit) {
        limit = parseInt(req.query.limit, 10)
    }
    if (req.query.page) {
        start = parseInt(req.query.page, 10)
    }
    Parks.aggregate([{
        $lookup: {
            from: "news",
            localField: "parkCode",
            foreignField: "parkCode",
            as: "news"
        }
    },
    {
        $lookup: {
            from: "alerts",
            localField: "parkCode",
            foreignField: "parkCode",
            as: "alerts"
        }
    },
    { $match: { states: state } },
    { $skip: start },
    { $limit: limit }
    
    ]).then(park => res.json(park))
})

module.exports = router