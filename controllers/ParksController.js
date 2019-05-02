const express = require("express")
const router = express.Router()

const Parks = require("../db/models/Parks.js")
const News = require("../db/models/News.js")

//Find all allerts

router.get("/", (req, res) => {
    let limit = parseInt(req.query.limit)
    let start = req.query.page
    Parks.paginate({}, { limit: limit, page: start }).then(parks => {
        return res.json(parks)
    })
})

// doesnt work
// router.get("/", (req, res)=>{  
//     let limit = 5
//     let start = 0
//     if (req.query.limit){
//         limit = parseInt(req.query.limit)
//     }
//     if (req.query.page){
//         start = req.query.page
//     }

//     Parks.paginate({}, {limit: limit, page: start}).then(parks => {
//         return res.json(parks)
//     })
// })

// ruter using lookup: added fiels news and alerts to model Parks + find park by name 
router.get("/name/:name", (req, res) => {

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
    { $match: { name: req.params.name } }
    ]).then(park => res.json(park))

})
// ruter using lookup: added fiels news and alerts to model Parks + find parks by state

router.get("/state/:state", (req, res) => {
    var state = req.params.state.toUpperCase()
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
    { $match: { states: state } }
    ]).then(park => res.json(park))

})
// -------------try
router.get("/pag/:state", (req, res) => {
    var state = req.params.state.toUpperCase()
    let limit = parseInt(req.query.limit)
    let start = parseInt(req.query.page)
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
    {$limit: limit},
    { $skip : start }
    ]).then(park => res.json(park))


})

module.exports = router