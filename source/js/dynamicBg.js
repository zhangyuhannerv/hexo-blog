function dynamicBg() {
  let img = new Image()
  setInterval(() => {
    let url = 'https://www.loliapi.com/acg/?number=' + Math.random()
    img.src = url
    img.addEventListener('load', function () {
      $('#web_bg').fadeOut(3000, function () {
        document.getElementById('web_bg').style.backgroundImage = `url(${url})`
        $('#web_bg').fadeIn(3000)
      })
    })
  }, 60000)
}
dynamicBg()
