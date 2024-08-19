$(window).scroll(function(){
    let height = $(window).scrollTop();
    if(height>500 && height<1500){
        $('#blocks_1').removeClass('hidden_block_1')
    } else{
        $('#blocks_1').addClass('hidden_block_1')
    }
  if(height>1400) {
 
    setTimeout(function() {
       $('.vehicle3').css('display', 'block');
   
       
     }, 1200);
      setTimeout(function() {
        $('.vehicle2').css('display', 'block')
      }, 600);
      setTimeout(function() {
        $('.vehicle1').css('display', 'block');
      
      }, 100);
          
      

  } 
      
  
     
    
})

$(document).ready(function() {
    animateSequence();
    
});

function animateSequence() {
    $('.sequence').each(function() {
        var letter = $(this).html();
        letter = letter.trim();
        var str = '';
        var delay = 50;
        for (var l = 0; l < letter.length; l++) {
            if (letter[l] !== ' ') {
                str += '<span style="animation-delay:' + delay + 'ms;">' + letter[l] + '</span>';
                delay += 50;
            } else {
                str += letter[l];
            }
        }
        $(this).html(str);
    });
}



