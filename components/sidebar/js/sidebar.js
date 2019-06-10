$(document).ready(function () {


    $('body').on('click', 'aside .accordianContainer', function () {
//        if($(this).next('ul').is(':empty')){
//           $(this).attr("disabled", "disabled").off('click');
//        }else{
//          $(this).attr("disabled", false).off('on');
//        }
//        $(this).attr("disabled", "disabled").off('click');

        if($(".subj_container").css('display')=='none'){
            return false;
        }
        
        $('.accordianContainer').removeClass('Activeopen');
        $('.accordianContainer').addClass('DeactiveOpen');
        $(this).addClass('Activeopen');
        $(this).removeClass('DeactiveOpen');

        $('.DeactiveOpen').next().slideUp();
        $('.DeactiveOpen').find('.accordianIcon').removeClass('rotateArrow');

        if ($(this).hasClass('Activeopen')) {
            $(this).next().slideToggle();
            $(this).find('.accordianIcon').toggleClass('rotateArrow');
        }

    });
});