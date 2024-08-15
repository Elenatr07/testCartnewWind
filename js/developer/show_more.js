$(document).ready(function() {
  let hide = $('#hide_type_car').attr('data-typecar'); 
  let car1 = $('#toyotaCommuter');
  let car2 = $('#toyotaHiAce');
  let car3 = $('#toyotaInnova');

  if(hide === '1') {
    car3.css('display', 'flex');
    car2.css('display', 'none');
    car1.css('display', 'none');

  }  else if (hide === '2') {
    car1.css('display', 'none');
    car2.css('display', 'flex');
    car3.css('display', 'none');
  } else if (hide === '3') {
    car3.css('display', 'none');
    car2.css('display', 'none');
    car1.css('display', 'flex');
  } else if (hide ==='4'){
    
  }
  else {
    car1.css('display', 'flex');
    car2.css('display', 'flex');
    car3.css('display', 'flex');
  }
})






