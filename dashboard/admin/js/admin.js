   $('nav').load('../../components/navbar/navbar.html');
   $('header').load('header/header.html');
   $('footer').load('../../components/footer/footer.html');
   
   
   $(document).ready(function(){
      $('.myClass').click(function(){
        $('.myClassDetail').slideToggle();  
      })
      
      $('.adminAccountInfo').click(function(){
        $('.adminAccount').slideToggle();  
      })
      
      $('.changPass').click(function(){
        $('.loginPop').fadeIn();  
      })
      
      $('.crossChangePass').click(function(){
        $('.loginPop').fadeOut();  
      })
      
      
   })

