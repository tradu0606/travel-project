const express = require("express")
const router = express.Router()

const News = require("../db/models/News.js")

//Find all news, shows first 5
router.get("/", (req, res) => {
    let limit = 5
    let start = 0
    if (req.query.limit) {
        limit = parseInt(req.query.limit, 10)
    }
    if (req.query.page) {
        start = parseInt(req.query.page, 10)
    }

    News.find({}, null, { limit: limit, skip: start }).then(news => {
        return res.json(news)
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

    News.find({title: req.params.title}, null, { limit: limit, skip: start }).then(news => {
        return res.json(news)
    })
})

// Add new newspaper
router.post("/add/", (req, res) => {
    News.create(req.body).then(news => res.json(news))
})

//Update field in newspaper

router.put("/update/:title", (req, res) => {
    News.findOneAndUpdate({ title: req.params.name }, req.body).then(updated => res.json(updated))
})

//Remove newspaper

router.delete("/delete/:title", (req, res) => {
    News.findOneAndDelete({ title: req.params.title }).then(deleted => 
        res.json(deleted))
})
module.exports = router