$(document).ready(function() {
  let hide = $('#hide_type_car').attr('data-typecar'); 
  let select = $('#hide_type_car').attr('data-select');
  let car1 = $('#toyotaCommuter');
  let car2 = $('#toyotaHiAce');
  let car3 = $('#toyotaInnova');

  if(hide === '1' && select==='0') {
    car3.css('display', 'flex');
    car2.css('display', 'none');
    car1.css('display', 'none');

  }  else if (hide === '2' && select==='0') {
    car1.css('display', 'none');
    car2.css('display', 'flex');
    car3.css('display', 'none');
  } else if (hide === '3' && select ==='0') {
    car3.css('display', 'none');
    car2.css('display', 'none'); 
    car1.css('display', 'flex');
  }   else if(hide === '0' && select === '1') {
    car2.css('display', 'flex');
    car1.css('display', 'flex');
    car3.css('display', 'none');
  } else if(hide==='1' && select ==='1'){
    car2.css('display', 'flex');
    car3.css('display', 'none');
    car1.css('display', 'none');

  } else if(hide==='2' && select ==='1'){
    car1.css('display', 'flex');
    car3.css('display', 'none');
    car2.css('display', 'none'); 
  }
  else {
    car1.css('display', 'flex');
    car2.css('display', 'flex');
    car3.css('display', 'flex');
  }
})






