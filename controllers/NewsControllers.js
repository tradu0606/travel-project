const express = require("express")
const router = express.Router()

const News = require("../db/models/News.js")
const Key = require("../db/models/Key.js")

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

    News.find({ title: req.params.title }, null, { limit: limit, skip: start }).then(news => {
        return res.json(news)
    })
})

// Add new newspaper
router.post("/add/", (req, res) => {
    Key.find({ key: req.query.key }).then(keys => {
        if (keys.length > 0) {
            News.create(req.body).then(news => res.json(news))
        }
        else {
            res.status(403).end()
        }
    })
})

//Update field in newspaper

router.put("/update/:title", (req, res) => {
    Key.find({ key: req.query.key }).then(keys => {
        if (keys.length > 0) {
            News.findOneAndUpdate({ title: req.params.name }, req.body).then(updated => res.json(updated))

        }
        else {
            res.status(403).end()
        }
    })
})

//Remove newspaper

router.delete("/delete/:title", (req, res) => {
    Key.find({ key: req.query.key }).then(keys => {
        if (keys.length > 0) {
            News.findOneAndDelete({ title: req.params.title }).then(deleted =>
                res.json(deleted))
        }
        else {
            res.status(403).end()
        }
    })
})
module.exports = router