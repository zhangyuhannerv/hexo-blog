function dynamicBg() {
  let img = new Image()
  const timer = '0'
  let imgUrl = 'https://www.loliapi.com/acg/'
  setInterval(() => {
    let remainder = new Date().getSeconds().toString()
    if (remainder !== timer) {
      return
    }
    let url = imgUrl + '?number=' + Math.random()
    img.src = url
    img.addEventListener('load', function () {
      $('#web_bg').fadeOut(3000, function () {
        document.getElementById('web_bg').style.backgroundImage = `url(${url})`
        $('#web_bg').fadeIn(3000)
      })
    })
  }, 1000)
}
dynamicBg()
