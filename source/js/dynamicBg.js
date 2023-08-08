function dynamicBg() {
  setInterval(() => {
    document.getElementById('web_bg').style.backgroundImage =
      'url(https://www.loliapi.com/acg/?number=' + Math.random() + ')'
  }, 60000)
}

dynamicBg()
