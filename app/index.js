import './scss/app.scss'
import video from './video/BSClub_low2.mp4'
const PERCENT = 216
import scrollMonitor from "scrollmonitor"

const scrollToElement = (elementY, duration) => {
  var targetY = document.getElementById(elementY).offsetTop - 88
  var startingY = window.pageYOffset
  var diff = targetY - startingY
  var start

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    var time = timestamp - start
    var percent =  Math.pow(time / duration, 3)

    window.scrollTo(0, startingY + diff * percent)
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

const animateNumber = ( number, duration, elem) => {
  var startNumber = 0
  var diff = number - startNumber
  var start

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    var time = timestamp - start
    var percent = (time / duration)

    startNumber =  Math.floor(percent*number)
    if(startNumber > number){ $('#' + elem).html(number); return}
    $('#' + elem).html(startNumber)
    if (time < duration) {

      window.requestAnimationFrame(step)
    }
  })
}

$(function(){
  $('#video').append(`<source src="${video}" type="video/mp4">`)
  var finance = document.getElementById("finance")
  $('.nav__list li').click(function(){scrollToElement($(this).data('target'), 500)})


  animateNumber(PERCENT, 1000 ,'header-percent')




var elementWatcher = scrollMonitor.create( finance );

elementWatcher.enterViewport(function() {
    animateNumber(50, 1000, 'invest')
    animateNumber(250, 1000, 'buisnes')
    animateNumber(1000, 1000, 'premium')
});
elementWatcher.exitViewport(function() {
    console.log( 'I have left the viewport' );
});
})


