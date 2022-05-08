function testurl (longURL) {
  const re = /http:\/\/|https:\/\//
  return re.test(longURL)
}
//test()用於檢測一個字符串是否匹配某個模式.
module.exports = testurl