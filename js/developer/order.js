 //get full date
let fullDateOneTtip;
let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
document.getElementById("one_way_calendar_from").addEventListener("change", function() {
  var input = this.value;
    let date = new Date(input).getDate();
  let month = new Date(input).getMonth();
  let year = new Date(input).getFullYear();
  let month1 = months[month]
  fullDateOneTtip = `${date} ${month1} ${year}`

});

  //end of get full date


$(".sum").on("change", function (event) {
 // console.log(fullDateOneTtip)
  $(event.target).closest(".sum").find("select").change(sum);
  $(event.target).closest(".sum").find("input").change(sum);
  $(event.target).closest(".sum").find("select").change(changeDetected);
  $(event.target).closest(".sum").find("input").change(changeDetected);

  function sum() {

   let result = 0;
   
    //data 
  
    let price = $(event.target).closest(".sum").find("#cars").find(":selected").data("price");
    let from = $(event.target).closest(".sum").find("#from").find(":selected").data("from");
    let hours = $(event.target).closest(".sum").find("#hours").find(":selected").data("hours");
    let infocar= $(event.target).closest(".sum").find("#cars").find(":selected").data("info");
    let type = $(event.target).closest(".sum").find('#cars').find(":selected").data('type');
    let date = fullDateOneTtip;
   
    let time_from = $(event.target).closest(".sum").find('#time_departure').find(":selected").data("timefrom");
    
   // console.log(from, to)
    
    result = price * hours
     
    //$(event.target).closest(".sum").find(".itog").val("£" + result1);

    
       //атрибуты

    $(event.target).closest(".sum").find(".add_item").attr("data-price", price); //setter
    $(event.target).closest(".sum").find(".add_item").attr("data-info", infocar);
    $(event.target).closest(".sum").find(".add_item").attr("data-from", from);
    $(event.target).closest(".sum").find(".add_item").attr("data-cost", result);
    $(event.target).closest(".sum").find(".add_item").attr("data-date", date);
    $(event.target).closest(".sum").find(".add_item").attr("data-hours", hours);
    $(event.target).closest(".sum").find(".add_item").attr("data-timeDeparture", time_from);
    $(event.target).closest(".sum").find(".add_item").attr("data-type", type);

  


    
    /* var id = $(event.target).closest(".sum").find(".add_item").data("id");
      console.log(id)*/
    // var idoption = $(event.target).closest(".sum").find(':selected').data('id');
    //console.log(idoption)
    //  var idtotal = `${result}` + `${idoption}`;
    //console.log(idtotal)
    //  $(event.target).closest(".sum").find(".add_item").attr("data-id", (idtotal));

    /*function item() {
    for (key in getItem) {
  if (getItem.hasOwnProperty(key)) {
  
   //getItem[key].id += 100;
   localStorage.setItem('jqcart', JSON.stringify(getItem));
  }}
  }*/
  }

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
        if ( (cars.length > 0) && 
            (from.length > 0) && 
           (date_one_way.length > 0) &&
          (time_from.length > 0)  ) 
                        { 
        $('#open').removeAttr('disabled');
        $('#open').css({"opacity" : '1'});
        } 
        }
        

});
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