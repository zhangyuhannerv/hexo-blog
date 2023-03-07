'use strict'
const cheerio = require('cheerio')

/**
 * 在页面插入新顶部图
 * @param {cheerio.Root} $ Root
 */
function insertTopImg($) {
  let header = $('#page-header')
  if (header.length === 0) return
  let background = header.css('background-image')
  if (!background) return
  $('#post, #page, #archive, #tag, #category').prepend(
    `<div class="top-img" style="background-image: ${background};"></div>`
  )
}

hexo.extend.filter.register('after_render:html', function (str, data) {
  let $ = cheerio.load(str, {
    decodeEntities: false
  })
  insertTopImg($)
  return $.html()
})
