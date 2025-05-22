 
 //get full date
let fullDateOneTtip;
let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
let months_id = ["Januari", 'Februari', 'Berbaris', 'April', 'Mungkin', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
document.getElementById("one_way_calendar_from").addEventListener("change", function() {
  var input = this.value;
  let date = new Date(input).getDate();
  let month = new Date(input).getMonth();
  let year = new Date(input).getFullYear();
  let month1 = months[month]
  let monthId = months_id[month]

  let lang = $('.dropbtn').text()
  console.log(lang)
  if(lang ==="IDID"){
    fullDateOneTtip = `${date} ${monthId} ${year}`
  } else {fullDateOneTtip = `${date} ${month1} ${year}`}
  
 // console.log(month);
  //console.log(fullDateOneTtip)
  let season1 = 6; //6-july
  let season2 = 7; //7- Aug
  let season3 = 11; //11 -Dec
  let season4 = 0; //0- Jan
  let priceRebornLow = 80000;
  let priceRebornHigh = 96000;
  let priceCommuterLow = 104000;
  let priceCommuterHigh = 112500;
  let pricePremioLow = 125000;
  let pricePremioHigh = 150000;
  if(month===season1 || month===season2 || month===season3 || month ===season4){
    $('#open').attr("data-priceReborn", priceRebornHigh);
    $('#open').attr("data-priceCommuter", priceCommuterHigh);
    $('#open').attr("data-pricePremio", pricePremioHigh);
  //  console.log('season high')
  } else {
    $('#open').attr("data-priceReborn", priceRebornLow);
    $('#open').attr("data-priceCommuter", priceCommuterLow);
    $('#open').attr("data-pricePremio", pricePremioLow);
   // console.log('low season')
  }
      

});

  //end of get full date


$(".sum").on("change", function (event) {
   let hasDisabledAttr = $('#open').prop('disabled');
   if(hasDisabledAttr===false){
    $('#open').css({"pointer-events": 'auto'});

  } 

 // console.log(fullDateOneTtip)
      $(event.target).closest(".sum").find("select").change(sum);
      $(event.target).closest(".sum").find("input").change(sum);
      $(event.target).closest(".sum").find("select").change(changeDetected);
      $(event.target).closest(".sum").find("input").change(changeDetected);
      //$(event.target).closest(".sum").find("#pass").click(changeCars);
  

    function sum() {

      let result = 0;
      
        //data 
      
        let price = $(event.target).closest(".sum").find("#cars").find(":selected").data("price");
        let from = $(event.target).closest(".sum").find("#from").find(":selected").data("from");
        let hours = $(event.target).closest(".sum").find("#hours").find(":selected").data("hours");
        let infocar= $(event.target).closest(".sum").find("#cars").find(":selected").data("value");
        let type = $(event.target).closest(".sum").find('#cars').find(":selected").data('type');
        let pass = $(event.target).closest(".sum").find('#pass').find(":selected").data('pass');
        let date = fullDateOneTtip;
      
        let time_from = $(event.target).closest(".sum").find('#time_departure').find(":selected").data("timefrom");
        
      // console.log(from, to)
        
        result = price * hours
        
        //$(event.target).closest(".sum").find(".itog").val("£" + result1);

        
          //атрибуты

        $(event.target).closest(".sum").find(".add_item").attr("data-price", price); //setter
        $(event.target).closest(".sum").find(".add_item").attr("data-infoValue", infocar);
        $(event.target).closest(".sum").find(".add_item").attr("data-from", from);
        //$(event.target).closest(".sum").find(".add_item").attr("data-cost", result);
        $(event.target).closest(".sum").find(".add_item").attr("data-date", date);
        $(event.target).closest(".sum").find(".add_item").attr("data-hours", hours);
        $(event.target).closest(".sum").find(".add_item").attr("data-timeDeparture", time_from);
        $(event.target).closest(".sum").find(".add_item").attr("data-type", type);
        $(event.target).closest(".sum").find(".add_item").attr("data-pass", pass);

      


        
     }
    //----select car------
    

  //--------select---------//
   
var cars;
var from;
var date_one_way
var time_from

    function changeDetected(){

       cars = $('#cars').find(":selected").val();   
        from = $("#from").find(":selected").val();
        time_from = $('#time_departure').find(":selected").val();
       
        
      let date1 = document.getElementById("one_way_calendar_from");
            date1.oninput = () => {
                   new Date(date1.value)
        }

      date_one_way = date1.value


      //console.log(passengers)
        if ( (cars.length > 0) && (from.length > 0) && (date_one_way.length > 0) && (time_from.length > 0)) { 
          $('#open').removeAttr('disabled');
          $('#open').css({"opacity" : '1'});
        
        } else {
          $('#open').attr('disabled','disable');

        }
    }
        
     

})
let all_cars=[];
    all_cars[0]=["Innova Reborn", "HiAce Premio", "HiAce Commuter"];
    all_cars[1]=['HiAce Premio', 'HiAce Commuter'];
  
  
    let cars_status = document.getElementById('cars');

 
    function changeCars(){
   
    cars_status.disabled = false;
    cars_status.innerHTML="<option class='option_for_select'  value='0' data-value='0' data-price='1' selected  data-car='Any' >Any Vehicle</option>"
    mycar=this.value-1;
   // console.log(mycar)
   
    if(mycar!=-1){
      for(let i=0; i<all_cars[mycar].length; i++){
        cars_status.innerHTML+='<option class="option_for_select" value="'+(i+1)+'" data-value="'+(i+1)+'" data-price="1" data-car="'+all_cars[mycar][i]+'">'+all_cars[mycar][i]+'</option>'
      }
      }  else {
      cars_status.disabled=true;
    }
if(all_cars[mycar].length <3){
  $(event.target).closest(".sum").find(".add_item").attr("data-select", '1');
  }
  
  }

$('#pass').on("change", changeCars)
  



  
 
/*
$(".sum").on("click", function (event){

  $(event.target).closest(".trip_order").find("#edit_trip").on(edit);

  function edit(){

  }

})*/
$(function(){
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if(month < 10)
      month = '0' + month.toString();
  if(day < 10)
      day = '0' + day.toString();

  var minDate= year + '-' + month + '-' + day;

  $('#one_way_calendar_from').attr('min', minDate);
  
});