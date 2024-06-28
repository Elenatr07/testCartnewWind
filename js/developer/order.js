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
    let cost= $(event.target).closest(".sum").find("#from").find(":selected").data("cost");
    let pass = $(event.target).closest(".sum").find("#passengers").find(":selected").data("pass");
    let val = document.querySelector('input[name="rate"]:checked').value;
    let from = $(event.target).closest(".sum").find("#from").find(":selected").data("from");
    let to = $(event.target).closest(".sum").find("#to").find(":selected").data("to");
    let date_one_way = fullDateOneTtip;
    let date_return_way = fullDateTwoTtip
    let time_from = $(event.target).closest(".sum").find('#time_departure').find(":selected").data("timefrom");
    let time_return = $(event.target).closest(".sum").find('#time_return').find(":selected").data("timereturn");
   // console.log(from, to)
    
    $(event.target) .closest(".sum").find("select").each(function () {
        let value = 0;
        if (typeof $(this).val() == "object") {
          $.each($(this).val(), function (index, val) {
            value += val * 1;
          });
        } else {
          value = $(this).val();
        }
        result += value * 1;
        result1 = result * pass * val;
        
        
      });
     
    //$(event.target).closest(".sum").find(".itog").val("£" + result1);

    
       //атрибуты

    $(event.target).closest(".sum").find(".add_item").attr("data-price", result1); //setter
    $(event.target).closest(".sum").find(".add_item").attr("data-pass", pass);
    $(event.target).closest(".sum").find(".add_item").attr("data-from", from);
    $(event.target).closest(".sum").find(".add_item").attr("data-to", to);
    $(event.target).closest(".sum").find(".add_item").attr("data-date-one-way", date_one_way);
    $(event.target).closest(".sum").find(".add_item").attr("data-date-return-way", date_return_way);
    $(event.target).closest(".sum").find(".add_item").attr("data-return", val);
    $(event.target).closest(".sum").find(".add_item").attr("data-cost", cost);
    $(event.target).closest(".sum").find(".add_item").attr("data-timeDeparture", time_from);
    $(event.target).closest(".sum").find(".add_item").attr("data-timeReturn", time_return);
  


    
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
   
var passengers;
var from;
var to;
var date_one_way
var date_return
var check_return
var time_from
var time_return
    function changeDetected(){

   check_return = document.getElementById('round_trip');
   let jj = check_return.getAttribute('data-check')
  /*   if( jj === '2') {
       console.log('yes2')
     } else {
        console.log('no1')
     }*/
    
    // console.log(jj)
     passengers = $('#passengers').find(":selected").val();   
        from = $("#from").find(":selected").val();
        to = $('#to').find(":selected").val();
        time_from = $('#time_departure').find(":selected").val();
        time_return = $('#time_return').find(":selected").val();
        
    let date1 = document.getElementById("one_way_calendar_from");
            date1.oninput = () => {
                   new Date(date1.value)
        }

    date_one_way = date1.value

    let date2 = document.getElementById("two_ways_calendar_from");
    date2.oninput = () => {
           new Date(date2.value)
}

    date_return = date2.value
//console.log(date_return)

//console.log(passengers)
        if ((jj==='1') && (passengers.length > 0) && 
            (from.length > 0) && 
            (to.length > 0) &&
            (date_one_way.length > 0) &&
          (time_from.length > 0)  ) 
                        { 
        $('#open').removeAttr('disabled');
        $('#open').css({"opacity" : '1'});
        } else if ((jj==='2') && (date_return === '') ){
 //         console.log ('скрыть')
          $('#open').attr('disabled', 'disabled');
          $('#open').css({"opacity" : '0.7'})

        } else if ((jj==='2') && (passengers.length > 0) && 
            (from.length > 0) && 
            (to.length > 0) &&
            (date_one_way.length > 0) &&
            (date_return.length > 0) &&
          (time_from.length >0) &&
        (time_return.length > 0))
                        { 
        $('#open').removeAttr('disabled');
        $('#open').css({"opacity" : '1'})
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
  $('#two_ways_calendar_from').attr('min', minDate);
});