//$(document).ready(function(){
   $('nav').load('../components/navbar/navbar.html');
   $('header').load('../components/header/header.html');
   $('footer').load('../components/footer/footer.html');
//});


$('.homeSidebar li').click(function(){
    $('.homeSidebar li').removeClass('homeActive');
    $(this).addClass('homeActive'); 
});
