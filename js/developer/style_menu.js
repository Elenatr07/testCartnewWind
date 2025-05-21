//var input = document.querySelector('#side-menu')
//input.addEventListener('click', f)
//function f() {
//    document.body.classList.toggle('nav_shadow')
//}

var elem = document.querySelector('#nav_shadow');
var input = document.querySelector('#side-menu')
input.addEventListener('click', function() {
    elem.classList.toggle("shadow");
})

$('#link_about').on('click', function(){
    $('#nav_shadow').removeClass('shadow');
    $('#side-menu').prop('checked', false)
})


