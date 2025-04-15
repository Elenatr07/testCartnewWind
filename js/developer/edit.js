$(document).ready(function() {
  $('#edit_container').css('display', 'none');
  $('#sumViewOneWay').css('display', 'none');
  $('#sumViewReternWay').css('display', 'none')
  $('#orderPreview').css('display', 'none')
        $('#edit_trip').click(function(){ 
         
            $('#order').toggle(); //включает/выключает элемент id="text"
            $('#order_distance').toggle();
          //  $('.jqcart-layout').remove()
            $('#edit_container').toggle();
            $('.main_top_order').addClass('height_top');
         
        });
        $('#close').on("click", function() {
            $('#edit_container').toggle();
            $('#order_distance').toggle();
            $('#order').toggle();
            $('.main_top_order').removeClass('height_top');
          
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
      $('.order_list').css('cursor', 'default');
      $('#toyotaHiAce').css('display', 'none');
      $('#toyotaInnova').css('display', 'none');
      $('#toyotaCommuter').css({'borderRadius': '30px 30px 0 0', 'margin': '30px auto 0 auto', 'border': '0'});
      $('#orderPreview').css({'margin':'0 auto'});
      $('.blockTrip').css({'background-image': 'none', 'padding-bottom': '0'});
      $('.order_list').addClass("no-hover");
      $('#total_sum').val($('#costViewCommuter').html())
    //  console.log($('#total_sum').val())
      $('#type_auto').val($('.type_commuter').html())
      //console.log($('#type_auto').val())
      



    })
    $('#toyotaHiAce').one("click", function(){
      $('#orderPreview').toggle();
      $('#costViewOneWay').toggle();
      $('#sumViewOneWay').toggle();
      $('#costViewReternWay').toggle();
      $('#sumViewReternWay').toggle();
      $('.order_list').css('cursor', 'default');
      $('#toyotaCommuter').css('display', 'none');
      $('#toyotaInnova').css('display', 'none');
      $('#toyotaHiAce').css({'borderRadius': '30px 30px 0 0', 'margin': '30px auto 0 auto', 'border': '0'});
      $('#orderPreview').css({'margin':'0 auto'});
      $('.blockTrip').css({'background-image': 'none', 'padding-bottom': '0'});
      $('.order_list').addClass("no-hover")
      $('#total_sum').val($('#costViewHiAce').html())
    //  console.log($('#total_sum').val())
      $('#type_auto').val($('.type_premio').html())
     // console.log($('#type_auto').val())
      


    })
    $('#toyotaInnova').one("click", function(){
      $('#orderPreview').toggle();
      $('#costViewOneWay').toggle();
      $('#sumViewOneWay').toggle();
      $('#costViewReternWay').toggle();
      $('#sumViewReternWay').toggle();
      $('.order_list').css('cursor', 'default');
      $('#toyotaCommuter').css('display', 'none');
      $('#toyotaHiAce').css('display', 'none');
      $('#toyotaInnova').css({'borderRadius': '30px 30px 0 0', 'margin': '30px auto 0 auto', 'border': '0'});
      $('#orderPreview').css({'margin':'0 auto'});
      $('.blockTrip').css({'background-image': 'none', 'padding-bottom': '0'});
      $('.order_list').addClass("no-hover");
      $('#total_sum').val($('#costViewInnova').html())
    //  console.log($('#total_sum').val())
      $('#type_auto').val($('.type_reborn').html())
     // console.log($('#type_auto').val())


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

  
        
        
  
  