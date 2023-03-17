const express = require('express')
const router = express.Router()
const shortenURL = require('../../public/javascripts/shortenURL')
const testurl = require('../../public/javascripts/testurl')
const URL = require('../../models/url')

router.get("/", (req, res) => {
  res.render("index")
})

router.post("/", (req, res) => {
  const shortURL = shortenURL(5)
  const fullURL = req.body.fullURL
  const longURL = req.body.fullURL.trim()
  if (!longURL || !testurl(longURL)) {
    return res.render('index', { isError: true })
  }
  URL.findOne({ fullURL: fullURL })
    .then(data =>
      data ? data : URL.create({ fullURL: req.body.fullURL, shortURL })
    )
    .then(data => {
      res.redirect(`/shortURL/${data.shortURL}`)
    })
    .catch(error => console.error(error))
})

router.get("/shortURL/:shortURL", (req, res) => {
  const hostname = req.get('host')
  const shortURL = req.params.shortURL
  URL.findOne({ shortURL: shortURL })
    .then(data => {
      if (!data) {
        res.render('notFound', { inputURL: shortURL, hostname })
      } else {
        res.render("shortener", { fullURL: data.fullURL, hostname, shortURL: data.shortURL })
      }
    })
    .catch(error => console.error(error))
})

router.get("/:shortURL", (req, res) => {
  const hostname = req.get('host')
  const shortURL = req.params.shortURL
  URL.findOne({ shortURL: shortURL })
    .then(url => {
      if (!url) {
        res.render('notFound', { inputURL: shortURL, hostname })
      } else {
        res.redirect(url.fullURL)
      }
    })
    .catch(error => console.error(error))
})
module.exports = router
