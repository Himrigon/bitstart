import './scss/app.scss'
import video from './video/BSClub_low2.mp4'
import scrollMonitor from "scrollmonitor"

const PERCENT = 216

function scrollToId(element) {
  var target = (typeof(element) != 'number') ? ( document.getElementById(element).offsetTop - 65) : 0
  $('html, body').animate({
    scrollTop: target
  }, 500);
  setTimeout(function () {
    flag = true;
    changeSlogan();
   },2000);
}

function animateNumber( number, duration, elem){
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
  var financeWatcher = scrollMonitor.create( document.getElementById("finance"), -140 )
  var infoBlockWather = scrollMonitor.create( document.getElementById("info-block"), -140 )
  var infoBlock = $('.info-block')
  var solutions = $('.solutions')
  var question = $('.question')
  var questionContent = $('.question__content')
  var logo = $('#logo')
  var videoEl = $('#video')
  var navItem = $('.nav__list li')
  var flag = false

  animateNumber(PERCENT, 1000 ,'header-percent')
  videoEl.append(`<source src="${video}" type="video/mp4">`)
  navItem.click(function(){scrollToId($(this).data('target'))})
  logo.click(function(){scrollToId(0, 700)})
  question.click(function(){
    if(!$(this).hasClass('active')){
      questionContent.slideUp('slow')
      question.removeClass('active')
      $(this)
        .addClass('active')
        .find('.question__content').slideDown("slow");
    } else {
      $(this)
        .removeClass('active')
        .find('.question__content').slideUp("slow");
    }
  })
  financeWatcher.enterViewport(function() {
    if(!flag){
      animateNumber(50, 1200, 'invest')
      animateNumber(250, 1200, 'buisnes')
      animateNumber(1000, 1200, 'premium')
      flag = true
    }
    solutions.addClass('solutions--animated')
  });
  infoBlockWather.enterViewport(function() {
      infoBlock.addClass('info-block--animated')
  });
})


