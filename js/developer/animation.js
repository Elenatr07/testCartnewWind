$(window).scroll(function(){
    let height = $(window).scrollTop();
    if(height>500 && height<1500){
        $('#blocks_1').removeClass('hidden_block_1')
    } else{
        $('#blocks_1').addClass('hidden_block_1')
    }
    setTimeout(function() {
       $('.vehicle3').css('display', 'block')
     }, 500);
     setTimeout(function() {
        $('.vehicle2').css('display', 'block')
      }, 1000);
      setTimeout(function() {
        $('.vehicle1').css('display', 'block')
      }, 1500);
      

     
    
})