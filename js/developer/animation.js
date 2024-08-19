$(window).scroll(function(){
    let height = $(window).scrollTop();
    if(height>500 && height<1500){
        $('#blocks_1').removeClass('hidden_block_1')
    } else{
        $('#blocks_1').addClass('hidden_block_1')
    }
  if(height>1400) {
    animateSequence();
    animateRandom();
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

function animateSequence() {
    $('.sequence').each(function() {
        var letter = $(this).html();
        letter = letter.trim();
        var str = '';
        var delay = 100;
        for (var l = 0; l < letter.length; l++) {
            if (letter[l] != ' ') {
                str += '<span style="animation-delay:' + delay + 'ms;">' + letter[l] + '</span>';
                delay += 150;
            } else {
                str += letter[l];
            }
        }
        $(this).html(str);
    });
}

function animateRandom() {
    $('.random').each(function() {
        var letter = $(this).html();
        letter = letter.trim();
        var delay = 70;
        var delayArray = new Array;
        var randLetter = new Array;
        for (var j = 0; j < letter.length; j++) {
            while (1) {
                var random = getRandomInt(0, letter.length - 1);
                if ($.inArray(random, delayArray) == -1) {
                    break;
                }
            }
            delayArray[j] = random;
        }
        for (var l = 0; l < delayArray.length; l++) {
            var str = '';
            var index = delayArray[l];
            if (letter[index] != ' ') {
                str = '<span style="animation-delay:' + delay + 'ms;">' + letter[index] + '</span>';
                randLetter[index] = str;
            } else {
                randLetter[index] = letter[index];
            }
            delay += 80;
        }
        randLetter = randLetter.join('');
        $(this).html(randLetter);
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
