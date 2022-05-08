function newShortenURL(Length) {
  const CHAR = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let shortUrl = ""

  for (let i = 0; i < Length; i++) {
    const index = Math.floor(Math.random() * (61 + 1))
    const chooseChar = CHAR[index]
    shortUrl += chooseChar
  }
  return shortUrl
}

module.exports = newShortenURL