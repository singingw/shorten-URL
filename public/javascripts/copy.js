function copyEvent() {
  const URL = document.getElementById("copyText")
  navigator.clipboard.writeText(URL.innerText)
    .then(() => alert('已複製連結！'))
    .catch(error => console.log(error))
}
//Clipboard 指的是瀏覽器中的系統剪貼簿
//要取得瀏覽器的 Clipboard 物件，只要訪問 navigator 底下的 clipboard 屬性
module.exports = copyEvent