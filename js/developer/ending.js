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
console.log(num1)

var result2;
var result3;
var string1 = num1.toString();
var lastChar1 = string1.charAt(string1.length-1);

if (isNaN(num1)) {
    result = "Ввод не состоит из цифр.";
}
else if (lastChar1 == "1" && !(num1 == 11)) {
    result2 = num1 + " seat";
    result3 = num1 + " seat";
}  

else {
    result2 = num1 + " Seats";
    result3 = num1 + " Seats";
}
document.getElementById("sumViewOneWayspan").innerHTML = result2; 
document.getElementById("sumViewReternWayspan").innerHTML = result3; 


let trip_order = document.getElementById('trip_order')
let line_vert = document.getElementById('verticalLine');
let order_distance = document.getElementById('order_distance');
let line_horizont = document.getElementById('horizontalline');
let return_trip = document.getElementById('two_way_part');
let return_trip_view = document.getElementById('return_trip_order_select')
let hide = document.getElementById('hide_return_trip').getAttribute('data-return');
if (hide !== '1') {
    return_trip.style.display = 'block'
    return_trip_view.style.display = 'block'
    line_vert.style.display = 'block'
    line_horizont.style.display = 'block'

} else {
    return_trip.style.display = 'none'
    return_trip_view.style.display = 'none'
    line_vert.style.display = 'none'
    line_horizont.style.display = 'none';
    order_distance.style.height = '191px';
    trip_order.style.width = '608px'
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