const express = require('express')
const router = express.Router()
const shortenURL = require("../../public/javascripts/shortenURL")
const URL = require('../../models/url')

router.get("/", (req, res) => {
  res.render("index")
})

router.post("/", (req, res) => {
  const shortURL = shortenURL(5)
  const fullURL = req.body.fullURL
  //if (!req.body.url) return res.redirect("/")
  URL.findOne({ fullURL: fullURL })
    .then(data =>
      data ? data : URL.create({ fullURL: req.body.fullURL, shortURL })
    )
    .then(data => {
      res.redirect(`/${data.shortURL}`)
    })
    .catch(error => console.error(error))

})

router.get("/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL
  URL.findOne({ shortURL: shortURL })
    .then(data => {
      res.render("shortener", { fullURL: data.fullURL, shortURL: data.shortURL })
    })
    .catch(error => console.error(error))
})
module.exports = router
