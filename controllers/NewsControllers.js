const express = require("express")
const router = express.Router()

const News = require("../db/models/News.js")

//Find all news, shows first 5
router.get("/", (req, res)=>{
    News.find({}).then(news => {
        var array = news.slice(0, 5)
        return res.json(array)
    })
})

// Add new newspaper
router.post("/add/", (req, res)=>{
    News.create(req.body).then(news => res.news)
})

//Update field in newspaper

router.put("/update/:name/", (req, res) => {
    News.findOneAndUpdate({name: req.param.name}, req.body).then(updated => res.updated)
})

module.exports = router