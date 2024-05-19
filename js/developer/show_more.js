function two_trip(){
  let check1 = document.getElementById('one_trip')
  let check2= document.getElementById('round_trip')
    let els = document.getElementsByClassName("two_ways");
   //var arrow = document.getElementById("load_btn_block_one");
 //  let bottom = document.getElementById("bottom_menu");
  //bottom.classList.toggle('bottom_menu');
  
   // arrow.classList.toggle('up');

   var styleElem = document.head.appendChild(document.createElement("style"));
   var rt1 = document.getElementById('round_trip');
   
   if (rt1.checked) {
     
     styleElem.innerHTML = ".switch:before {background: rgba(56, 62, 94, 1);}";
    $(check1).attr('data-check', ('1'))
    $(check2).attr('data-check', ('2'))
     
         }
  
    
    for (var i = 0, el; el = els[i]; i++){
      if (getComputedStyle(el).display == 'none') {
        el.style.display = 'block';
        
        
        
      } /*else {
       el.style.display = "none";
       
      }*/
   //console.log(els);
  } }

  
  function one_way_trip(){
    let check1 = document.getElementById('one_trip')
    let check2 = document.getElementById('round_trip')
    let els = document.getElementsByClassName("two_ways");
    //var arrow = document.getElementById("load_btn_block_one");
  //  let bottom = document.getElementById("bottom_menu");
   //bottom.classList.toggle('bottom_menu');
   
    // arrow.classList.toggle('up');
    
  
    var styleElem = document.head.appendChild(document.createElement("style"));
    var rt1 = document.getElementById('one_trip');
    if (rt1.checked) {
      
      styleElem.innerHTML = ".switch:before {background: rgba(216, 216, 216, 1);}"
      $(check1).attr('data-check', ('1'))
      $(check2).attr('data-check', ('1'))
      
          }
      
     
     for (var i = 0, el; el = els[i]; i++){
       if (getComputedStyle(el).display == 'block') {
         el.style.display = 'none';
         
         
         
       }}
  }





//выбор даты
document.getElementById("one_way_calendar_from").addEventListener("change", function() {
    var input = this.value;
    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
   
    let date = new Date(input).getDate();
    let month = new Date(input).getMonth();
    let year = new Date(input).getFullYear();
    let month1 = months[month]
    let fullDate = `${date} ${month1} ${year}`
  
  //console.log(date, month, year); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
  //console.log(fullDate)
});

document.getElementById("two_ways_calendar_from").addEventListener("change", function() {
    var input = this.value;
    var dateEntered = new Date(input);
//    console.log(input); //e.g. 2015-11-13
//    console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
});
//---------------





