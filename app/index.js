import './scss/app.scss'
import video from './video/BSClub_low2.mp4'
const PERCENT = 216

$(function(){
  $('#video').append(`<source src="${video}" type="video/mp4">`)

  function animateNumber(curNumber,int){
    var start = 0
    var interval = setInterval(()=>{
      start < curNumber ? (start = start + 1) : clearInterval(interval)
      $('#header-percent').html(start)
    },int)
  }
  animateNumber(PERCENT, 5)
})


