//$(document).ready(function(){
   $('nav').load('../components/navbar/navbar.html');
   $('header').load('../components/header/header.html');
   $('footer').load('../components/footer/footer.html');
//});


$('.homeSidebar li').click(function(){
    $('.homeSidebar li').removeClass('homeActive');
    $(this).addClass('homeActive'); 
    var id = $(this).data('module'); 
    console.log(id);
    if(id=="calendar"){
        $('.homeData').hide();
        $('#calendar').slideDown(500);
    }
    
   if(id=="viewModule"){
        $('.homeData').hide();
        $('#viewModule').slideDown(500);
    }
    
       if(id=="favourites"){
        $('.homeData').hide();
        $('#favourites').slideDown(500);
    }
         if(id=="library"){
        $('.homeData').hide();
        $('#favourites').slideDown(500);
    }

});
