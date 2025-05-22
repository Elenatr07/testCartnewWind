$(document).ready(function() {
    $('.button_filter.commuter').addClass('active');
    $('.filter_main_block_text.commuter').css('display', 'flex');
    $('.vehicle_central_wrapper.commuter.premio').css('display', 'flex');
    $('.service_slider_wrapper_filter.commuter').css('display', 'flex')

    
    $(".filter .button_filter").on('click', function() {
        let category = $(this).attr("data-filter");
        $(".filter .button_filter").removeClass("active");
        $(this).addClass("active");
      /*  if ($(this).hasClass('loadbtn')) {
            $(".load_btn").show("slow");
            $(".load_btn").text($(".load_btn").text() == "See more" ? "See less" : "See less")
        } else {
            $(".load_btn").hide();
        }*/
        let item = $(".vehicle_type .filter_main_block_text");
        let item1 = $('.vehicle_central .vehicle_central_wrapper');
        let item2 = $('.service_slider_wrapper_filter')
       item.css('display', 'none');
       item1.css('display', 'none');
       item2.css('display', 'none')
      

       
        item.each(function() {
            if ($(this).hasClass(category)) {
               $(this).css('display', 'flex')
            } 

        });
        item1.each(function() {
            if ($(this).hasClass(category)) {
               $(this).css('display', 'flex')
            } 

        });
        item2.each(function() {
            if ($(this).hasClass(category)) {
               $(this).css('display', 'flex')
            } 

        });
    });
    var myHash = location.hash; //получаем значение хеша
   // console.log(myHash)
  if(myHash === '#reborn'){
    $('.button_filter.reborn').addClass('active');
    $('.button_filter.commuter').removeClass('active');
    $('.filter_main_block_text.reborn').css('display', 'flex');
    $('.filter_main_block_text.commuter').css('display', 'none');
    $('.vehicle_central_wrapper.commuter.premio').css('display', 'none');
    $('.vehicle_central_wrapper.reborn').css('display', 'flex');
    $('.service_slider_wrapper_filter.reborn').css('display', 'flex')
    $('.service_slider_wrapper_filter.commuter').css('display', 'none')
  }
  if(myHash === '#premio'){
    $('.button_filter.premio').addClass('active');
    $('.button_filter.commuter').removeClass('active');
    $('.filter_main_block_text.premio').css('display', 'flex');
    $('.filter_main_block_text.commuter').css('display', 'none');
    $('.vehicle_central_wrapper.commuter.premio').css('display', 'flex');
    $('.service_slider_wrapper_filter.premio').css('display', 'flex')
    $('.service_slider_wrapper_filter.commuter').css('display', 'none')
  }

});