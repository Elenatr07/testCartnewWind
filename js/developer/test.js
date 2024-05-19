
$(document).on('click', '.someclass', function() {
    doStuff();
  });



  
var passengers;
var from;
var to;
var date_one_way
var date_return
var check_return
    function changeDetected(){

   check_return = document.getElementById('round_trip');
   let jj = check_return.getAttribute('data-check')
     if( jj === '2') {
       console.log('yes2')
     } else {
        console.log('no1')
     }
    
     console.log(jj)
     passengers = $('#passengers').find(":selected").val();   
        from = $("#from").find(":selected").val();
        to = $('#to').find(":selected").val();

        
    let date1 = document.getElementById("one_way_calendar_from");
            date1.oninput = () => {
                   new Date(date1.value)
        }

    let date_one_way = date1.value

    let date2 = document.getElementById("two_ways_calendar_from");
    date2.oninput = () => {
           new Date(date2.value)
}

let date_return = date2.value


//console.log(passengers)
        if ((jj==='1') && (passengers.length > 0) && 
            (from.length > 0) && 
            (to.length > 0) &&
            (date_one_way.length > 0)   ) 
                        { 
        $('#open').removeAttr('disabled');
        }  else if ((jj==='2') && (passengers.length > 0) && 
            (from.length > 0) && 
            (to.length > 0) &&
            (date_one_way.length > 0) &&
            (date_return.length > 0))
                        { 
        $('#open').removeAttr('disabled');
        }

        }



        


        

//if( $('.classname').getAttribute('aria-expanded') === 'true') {}

//if ($('.classname').attr('aria-expanded') === 'true') {}
