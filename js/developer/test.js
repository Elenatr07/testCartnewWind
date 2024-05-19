
    
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
    /*passengers = document.getElementById('#passengers').value
    from = document.getElementById('#from').value
    to = document.getElementById('#to').value*/
        
    let date = document.getElementById("one_way_calendar_from");
            date.oninput = () => {
                   new Date(date.value)
        }

    let date_one_way = date.value
//console.log(passengers)
        if ((jj==='1') && (passengers.length > 0) && 
            (from.length > 0) && 
            (to.length > 0) &&
            (date_one_way.length > 0)  ){ 
        $('#open').removeAttr('disabled');
        } 



        
}

        

//if( $('.classname').getAttribute('aria-expanded') === 'true') {}

//if ($('.classname').attr('aria-expanded') === 'true') {}