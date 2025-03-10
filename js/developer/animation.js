

let clickOnButton = true;

 function scroling (){
    let height = $(window).scrollTop();
    let width = $(window).width()
  //  console.log("height", height)
  //  console.log("width", width)
    if((width <600)) {
        $('.vehicle_central_wrapper.commuter.premio img').attr("src", 'img/seat_map14_1.png' )
        $('.vehicle_central_wrapper.reborn img').attr("src", 'img/seat_map6_1.png' )
    } 
   if(((width > 1400)) && height>300 && height<700){
        $('.service_central_item').removeClass('hidden')
       
    } else if(((width > 1025) &&(width <=1400)) && height>200){
        $('.service_central_item').removeClass('hidden')
        
    }  else if(((width > 700) &&(width <=1024)) ){
        $('.service_central_item').removeClass('hidden')
    }
    else if(((width >= 320) &&(width <=700)) && height>300){
        $('.service_central_item').removeClass('hidden')
    }

    if(((width > 1000)) && height>500 && height<1500){
            $('#blocks_1').removeClass('hidden_block_1');
    }
   
   else if (((width >=769 ) &&(width <=1024))){
        $('#blocks_1').removeClass('hidden_block_1');
       
    }
    else if (((width >=600) && (width <=768)) && height>700 && height<2100){
        $('#blocks_1').removeClass('hidden_block_1');
       
    }
    else if (((width >=376)&&(width <=599)) && height>750 && height<2200){
        $('#blocks_1').removeClass('hidden_block_1');
        
    }
    else if (((width >=320)&&(width <=375)) && height>600 && height<2100){
        $('#blocks_1').removeClass('hidden_block_1');
        
    }else {
         $('#blocks_1').addClass('hidden_block_1');
        // $('.service_central_item').addClass('hidden')
         
    }
    if ((width <=1024) && clickOnButton == true){
    
    
        $('.vehicle3').css('display', 'block');
        $('.vehicle2').css('display', 'block')
        $('.vehicle1').css('display', 'block');
        $('.cssanimation').css('display', 'block')
    } 
    if ((width >1025) && height >= 1700 && clickOnButton == true){
    
    
        setTimeout(function() {
            $('.vehicle3').css('display', 'block');
            clickOnButton = false;  
         
          }, 1200);
           setTimeout(function() {
             $('.vehicle2').css('display', 'block')
           }, 600);
           setTimeout(function() {
             $('.vehicle1').css('display', 'block');
           
           }, 200);
            animateSequence()
            
        } 
}

function animateSequence() {
    $('.sequence').each(function() {
        var letter = $(this).text();
       // console.log(letter)
        letter = letter.trim();
        var str = '';
        var delay = 1000;
        for (var l = 0; l < letter.length; l++) {
            if (letter[l] !== ' ') {
                str += '<span style="animation-delay:' + delay + 'ms;">' + letter[l] + '</span>';
                delay += 20;
            } else {
                str += letter[l];
            }
        }
        $(this).html(str);
        $('.cssanimation').css('display', 'block')
        
        
    });
}

$(window).scroll(function(){
	scroling();
});

function lang(){
    let dropbtnText = $('.dropbtn').text();
    console.log(dropbtnText)
    if(dropbtnText ==="IDID"){
        $('.dropbtn').css('background', 'url(img/flag_indonesia.png)no-repeat left center');
        $('.main_block_img img').attr('src', 'img/map_id.png');
        $('.about_us_info h3').css({
            'background': 'linear-gradient(91.15deg, #F7D788 49.6%, #E3BC78 99.02%)',
            '-webkit-text-fill-color': 'transparent',
            '-webkit-background-clip':'text'
        })
        $('.about_us_info h3 span').css({
            'color': 'rgba(255, 255, 255, 1)',
            'background': 'rgba(255, 255, 255, 1)',
             '-webkit-text-fill-color': 'transparent',
            '-webkit-background-clip':'text'
        })
        $('.our_vehicles_block h3').css({
            'background': 'linear-gradient(91.15deg, #F7D788 49.6%, #E3BC78 99.02%)',
            '-webkit-text-fill-color': 'transparent',
            '-webkit-background-clip':'text'
        })
        $(".our_vehicles_block h3 span").css({
            'color': 'rgba(255, 255, 255, 1)',
            'background': 'rgba(255, 255, 255, 1)',
             '-webkit-text-fill-color': 'transparent',
            '-webkit-background-clip':'text'
        })
        $(".why_choose_us_block h2").css({
            'background': 'linear-gradient(91.15deg, #F7D788 49.6%, #E3BC78 99.02%)',
            '-webkit-text-fill-color': 'transparent',
            '-webkit-background-clip':'text'
        })
        $(".why_choose_us_block h2 span").css({
            'color': 'rgba(255, 255, 255, 1)',
            'background': 'rgba(255, 255, 255, 1)',
             '-webkit-text-fill-color': 'transparent',
            '-webkit-background-clip':'text'
        })
        $("#slider_testimoni h3").css({
            'background': 'linear-gradient(91.15deg, #F7D788 49.6%, #E3BC78 99.02%)',
            '-webkit-text-fill-color': 'transparent',
            '-webkit-background-clip':'text'
        })
        $("#slider_testimoni h3 span").css({
            'color': 'rgba(255, 255, 255, 1)',
            'background': 'rgba(255, 255, 255, 1)',
             '-webkit-text-fill-color': 'transparent',
            '-webkit-background-clip':'text'
        })
        $('.way_pass h4').text('Penumpang: ');
        $('#trip_hours h4').text('Durasi: ');
        $('.trip_order_distance_from span').text('Lokasi Anda di ');
        $('.trip_order_distance_to h4').text('Lokasi yang Anda Inginkan ');
        $('.note').text('* Harga yang disebutkan adalah perkiraan, karena harga sebenarnya akan diinformasikan setelah menghubungi Anda. ');
        $('#trip_hours .h').text('j')
        $('.time_trip .h').text('j')
        $('.way_info .from_time').text('mulai pukul')
        $('.way_info').text(function(index, text) {
            return text.replace('January', 'Januari').
            replace('February', 'Februari').
            replace('March', 'Berbaris').
            replace('April', 'April').
            replace('May', 'Mungkin').
            replace('June', 'Juni').
            replace('July', 'Juli').
            replace('August', 'Agustus').
            replace('September', 'September').
            replace('October', 'Oktober').
            replace('November', 'November').
            replace('December', 'Desember')
        })
        $('#location_details_wrapper span').text('Lokasi');
   
        
      
    }
    else {
        $('.dropbtn').css('background', 'url(img/flag_en.png)no-repeat left center')
        $('.way_info').text(function(index, text) {
            return text.replace('Januari', 'January').
            replace('Februari', 'February').
            replace('Berbaris', 'March').
            replace('April', 'April').
            replace('Mungkin', 'May').
            replace('Juni', 'June').
            replace('Juli', 'July').
            replace('Agustus', 'August').
            replace('September', 'September').
            replace('Oktober', 'October').
            replace('November', 'November').
            replace('Desember', 'December')
        })
}}

	
$(document).ready(function(){ 
	scroling();
    lang();

});

