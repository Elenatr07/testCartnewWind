

let clickOnButton = true;

 function scroling (){
    let height = $(window).scrollTop();
    if(height>500 && height<1500){
        $('#blocks_1').removeClass('hidden_block_1')
    } else {
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
