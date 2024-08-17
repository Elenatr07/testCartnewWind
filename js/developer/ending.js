  
  $(document).ready(function(){ 
    //---- разивка на разряды в числе ---
    let str = $('#costViewInnova').text();
    let str1 = $('#costViewCommuter').text();
    let str2 =$('#costViewHiAce').text();
    let num = +str;
    let num1 = +str1;
    let num2 = +str2;
    let result = num.toLocaleString("en");
    let result1 = num1.toLocaleString("en");
    let result2 = num2.toLocaleString("en");
    $('#costViewInnova').text(result);
    $('#costViewCommuter').text(result1);
    $('#costViewHiAce').text(result2);

  
 

  })
    
    
    
   

