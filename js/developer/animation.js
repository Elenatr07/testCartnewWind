

let clickOnButton = true;

 function scroling (){
    let height = $(window).scrollTop();
    console.log(height)
    if($(window).width() > 1000 && height>500 && height<1500){
        $('#blocks_1').removeClass('hidden_block_1');
        $('.service_central_item').removeClass('hidden')
        
    } else if ($(window).width() <= 1000 && height>600 && height<1950){
        $('#blocks_1').removeClass('hidden_block_1');
        $('.service_central_item').removeClass('hidden')
    }
    else if ($(window).width() <= 769 && height>950 && height<2100){
        $('#blocks_1').removeClass('hidden_block_1');
        $('.service_central_item').removeClass('hidden')
    }
    else if ($(window).width() <= 600 && height>1400 && height<2700){
        $('#blocks_1').removeClass('hidden_block_1');
        $('.service_central_item').removeClass('hidden')
    }else {
         $('#blocks_1').addClass('hidden_block_1');
         
    }
    if (height >= 1700 && clickOnButton == true){
    
    
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
	
$(document).ready(function(){ 
	scroling();
    

});

