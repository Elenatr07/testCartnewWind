$(document).ready(function() {
   

	

/*
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

*/
var num = $('#costViewCommuter').text();;
var cnt = 0; // temp counter. 
var s = String(num).split('').
                    reverse().
                    map(function(v) { 
                        if (cnt < 2) {
                            cnt += 1; 
                            return v;
                        } else {
                            cnt = 0; 
                            return ',' + v;
                        }
                    }).
                    reverse().
                    join('');
$('#costViewCommuter').text(s);
                  
});
$(document).ready(function(){
    var num = $('#costViewHiAce').text();;
    var cnt = 0; // temp counter. 
    var s = String(num).split('').
                        reverse().
                        map(function(v) { 
                            if (cnt < 2) {
                                cnt += 1; 
                                return v;
                            } else {
                                cnt = 0; 
                                return ',' + v;
                            }
                        }).
                        reverse().
                        join('');
    $('#costViewHiAce').text(s);
})
$(document).ready(function(){
    var num = $('#costViewInnova').text();;
    var cnt = 0; // temp counter. 
    var s = String(num).split('').
                        reverse().
                        map(function(v) { 
                            if (cnt < 2) {
                                cnt += 1; 
                                return v;
                            } else {
                                cnt = 0; 
                                return ',' + v;
                            }
                        }).
                        reverse().
                        join('');
    $('#costViewInnova').text(s);
})
    
    
    
   

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