$(document).ready(function(){
    $("header").on('click','.quickLinks .advanceTools', function(){
       $(this).find('ul').slideToggle();
    })
});