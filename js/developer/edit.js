$(document).ready(function() {
  $('#edit_container').css('display', 'none');
  $('#sumViewOneWay').css('display', 'none');
  $('#sumViewReternWay').css('display', 'none')
  $('#orderPreview').css('display', 'none')
        $('#edit_trip').click(function(){ 
         
            $('#order').toggle(); //включает/выключает элемент id="text"
            $('#order_distance').toggle();
          //  $('.jqcart-layout').remove()
            $('#edit_container').toggle()
         
        });
        $('#close').on("click", function() {
            $('#edit_container').toggle();
            $('#order_distance').toggle();
            $('#order').toggle();
          
        })

    $('#open').on("click", function(){

        $('#edit_container').css('display', 'none');
        $('#order').toggle(); //включает/выключает элемент id="text"
       $('#order_distance').toggle();
       location.reload();
    });
    $('#order_distance').one("click", function(){
      $('#orderPreview').toggle();
      $('#costViewOneWay').toggle();
      $('#sumViewOneWay').toggle();
      $('#costViewReternWay').toggle();
      $('#sumViewReternWay').toggle();
      $('#order_distance').css('cursor', 'default')
      


    })
    });
