$(document).ready(function() {
  let cars = $('.typecar').data('value'); 
  let block1 = $('#toyotaCommuter');
  let block2 = $('#toyotaHiAce');
  let block3 = $('#toyotaInnova');
  if(cars === 1) {
    block1.css('display', 'flex');
    block2.css('display', 'none');
    block3.css('display', 'none');

  }  else if (cars === 2) {
    block1.css('display', 'none');
    block2.css('display', 'flex');
    block3.css('display', 'none');
  } else if (cars === 3) {
    block1.css('display', 'none');
    block2.css('display', 'none');
    block3.css('display', 'flex');
  } else {
    block1.css('display', 'flex');
    block2.css('display', 'flex');
    block3.css('display', 'flex');
  }
})






