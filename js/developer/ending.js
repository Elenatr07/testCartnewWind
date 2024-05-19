$(document).ready(function() {

	 var num, result;
    num = Number(document.getElementById("pass_ending").getAttribute('data-value'));
  
    var string = num.toString();
    var lastChar = string.charAt(string.length-1);

    if (isNaN(num)) {
        result = "Ввод не состоит из цифр.";
    }
    else if (lastChar == "1" && !(num == 11)) {
        result = num + " seat";
    }  
   
    else {
        result = num + " seats";
    }
document.getElementById("pass_ending").innerHTML = result; 

var num1, result1;
num1 = Number(document.getElementById("pass_ending1").getAttribute('data-value'));
console.log(num1)

var string1 = num1.toString();
var lastChar1 = string1.charAt(string1.length-1);

if (isNaN(num1)) {
    result = "Ввод не состоит из цифр.";
}
else if (lastChar1 == "1" && !(num1 == 11)) {
    result1 = num1 + " seat";
}  

else {
    result1 = num1 + " seats";
}
document.getElementById("pass_ending1").innerHTML = result1; 


let return_trip = document.getElementById('two_way_part');
let hide = document.getElementById('hide_return_trip').getAttribute('data-return');
if (hide !== '1') {
    return_trip.style.display = 'block'

} else {
    return_trip.style.display = 'none'
}

});
    
    
    
   

/*
const total = 1;
const totalWord = 'seat';

const newTotalWord =
	totalWord +
	(total.toString().slice(-1) === '1' && total.toString().slice(-2) !== '11'
		? ''
		: 's');
        const newTotal = + total + ' ' + newTotalWord;
        document.getElementById("pass_ending").innerHTML = newTotal; 
*/