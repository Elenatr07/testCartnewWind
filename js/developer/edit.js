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
    $('#toyotaCommuter').one("click", function(){
      $('#orderPreview').toggle();
      $('#costViewOneWay').toggle();
      $('#sumViewOneWay').toggle();
      $('#costViewReternWay').toggle();
      $('#sumViewReternWay').toggle();
      $('#order_list').css('cursor', 'default');
      $('#toyotaHiAce').css('display', 'none');
      $('#toyotaInnova').css('display', 'none');
      $('#toyotaCommuter').css({'borderRadius': '30px 30px 0 0', 'margin': '30px auto 0 auto', 'border': '0'});
      $('#orderPreview').css({'margin':'0 auto'});
      $('.blockTrip').css({'background-image': 'none', 'padding-bottom': '0'});
      


    })
    $('#toyotaHiAce').one("click", function(){
      $('#orderPreview').toggle();
      $('#costViewOneWay').toggle();
      $('#sumViewOneWay').toggle();
      $('#costViewReternWay').toggle();
      $('#sumViewReternWay').toggle();
      $('#order_list').css('cursor', 'default');
      $('#toyotaCommuter').css('display', 'none');
      $('#toyotaInnova').css('display', 'none');
      $('#toyotaHiAce').css({'borderRadius': '30px 30px 0 0', 'margin': '30px auto 0 auto', 'border': '0'});
      $('#orderPreview').css({'margin':'0 auto'});
      $('.blockTrip').css({'background-image': 'none', 'padding-bottom': '0'});
   
      


    })
    $('#toyotaInnova').one("click", function(){
      $('#orderPreview').toggle();
      $('#costViewOneWay').toggle();
      $('#sumViewOneWay').toggle();
      $('#costViewReternWay').toggle();
      $('#sumViewReternWay').toggle();
      $('#order_list').css('cursor', 'default');
      $('#toyotaCommuter').css('display', 'none');
      $('#toyotaHiAce').css('display', 'none');
      $('#toyotaInnova').css({'borderRadius': '30px 30px 0 0', 'margin': '30px auto 0 auto', 'border': '0'});
      $('#orderPreview').css({'margin':'0 auto'});
      $('.blockTrip').css({'background-image': 'none', 'padding-bottom': '0'});
  


    })

    
    });

/*
    $("input[type='text'],input[type='email'],input[type='tel'], textarea").on("keyup", function(){
        var empty = false;
      $('input, textarea').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });
        if (empty) {
              $("input[type='submit']").attr('disabled', 'disabled');
              $("input[type='submit']").css('opacity', '0.5');
          } else {
              $("input[type='submit']").removeAttr('disabled');
              $("input[type='submit']").css('opacity', '1');
              $("input[type='submit']").css('cursor', 'pointer');
          }

     
  });
  */
  $(function () {
    $("input[type='tel']").on("input propertychange", function () {
      if ($(this).val().indexOf("+") === -1) {
        $(this).val("+" + $(this).val());
      }
    });
  });

  
        
        
  
  