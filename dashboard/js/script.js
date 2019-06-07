//var baseUrl = "http://localhost:8080";
var baseUrl = "http://192.168.1.181:8080";

var url = baseUrl + "/sections/boardClass/1.json";
var mainData;
var showMainItems = function showMainItems(moduleId, thumbnailUrl, moduleName,contentUrl){
   return "<div class='dataItem'><div class='dataimgContainer'><img onClick='contentUrl(\""+contentUrl+"\","+moduleId+")'  id="+ moduleId +" alt='' src=" + "'" + baseUrl + "/dic/media/app/"+moduleId +"/" + thumbnailUrl + "'" + " /></div><p>" + moduleName + "</p></div>";
}

//display the data video mp4 flv 
function contentUrl(contentUrl,moduleId){
    
            $('.playerContainer .videoContainer button').show();
            
    
    var documentUrl = baseUrl + "/dic/media/app/"+ moduleId +"" +contentUrl; // get the full url of content
    console.log("file url : "+ documentUrl);
   if (contentUrl.split(".").pop().toLowerCase() == "ppt" || contentUrl.split(".").pop().toLowerCase() == "pdf" || contentUrl.split(".").pop().toLowerCase() == "html" || contentUrl.split(".").pop().toLowerCase() == "doc" || contentUrl.split(".").pop().toLowerCase() == "docx" || contentUrl.split(".").pop().toLowerCase() == "flv") // to support/open .pdf,.doc,.docx file type in new tab
    {
                 
                    window.open(documentUrl, '_blank'); // open the pdf in a new window/tab
                  
    }
    //mp4 and m4v file 
    if (contentUrl.split(".").pop().toLowerCase() == "mp4" || contentUrl.split(".").pop().toLowerCase() == "m4v") // to support .m4v,.mp4 file type
    {
        console.log(documentUrl);
                $('.playerContainer').fadeIn(1000);
                $('.playerContainer .videoContainer img').hide().attr('src','');
                $('.playerContainer .videoContainer object').hide().attr('data','');
                $('.playerContainer .videoContainer video').attr('src',documentUrl).show();
                


    }
    //swf file
    if (contentUrl.split(".").pop() == "swf"){    
//                console.log("i am swf");
                $('.playerContainer').fadeIn(1000);
                $('.playerContainer .videoContainer img').hide().attr('src','');
                $('.playerContainer .videoContainer video').hide().attr('src','');
                $('.playerContainer .videoContainer object').show().attr('data',documentUrl);

    }
    
//    jpg image and png image

if(contentUrl.split(".").pop().toLowerCase() == "png" || contentUrl.split(".").pop().toLowerCase() == "jpg" || contentUrl.split(".").pop().toLowerCase() == "jpeg"){
                console.log(documentUrl);        
                $('.playerContainer').fadeIn(1000);
                $('.playerContainer .videoContainer video').hide().attr('src','');
                $('.playerContainer .videoContainer object').hide().attr('data','');
                $('.playerContainer .videoContainer img').show().attr('src',documentUrl);
}
  
}  //end function to play content


//show the activity on first load
function showActivity(){
        var items = mainData.Activity;
      
        var ActText = '';
        if(typeof items !=="undefined"){
            console.log("inside loop :: "+items);
            for (var j = 0; j < items.length; j++) {
            ActText = ActText + showMainItems(items[j].moduleId,items[j].thumbnailUrl,items[j].moduleName,items[j].contentUrl);
            }
            $('.dataCollection').html(ActText); 
        }else if(typeof items =="undefined"){
            $('.dataCollection').empty();
        }
       
           
        
    
        
//       if(items==undefined){
//           $('.dataCollection').empty();  
//       }
        
   
}

var allExpItem = [];


$(document).ready(function () {

    //  navigation slide animation
    //function slideAnimation(){
    $('.owl-carousel').owlCarousel({
        nav: true,
        //items:4,
        dots: false,
        //  	loop:true,
        lazyLoad: true,
        autoWidth: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });

    //   $('.owl-nav').removeClass('disabled');
    //   $('.owl-nav').click(function(){
    //       $('.owl-nav').removeClass('disabled');
    //   });
    //}

    //slideAnimation();




    //class click function to show the all chapters and subjects


    //ajax call for fetching first data

    $.ajax({
        url: url,
        dataType: 'json',
        error: function () {
            console.log('JSON Failed to load data...');
        },
        success: function (result) {
            var classContainer = $('.allClassList');
            var text = '';
            var items = result.options;
            for (var i = 0; i < items.length; i++) {
                text = text + "<li id=" + items[i].value + " class=" + (((items.length > 0) && (items[0].value === items[i].value)) ? "selectedLiField" : "") + "><a href='javascript:void(0)'>" + items[i].name + "</a></li>";
            }
            classContainer.html(text);
            getClass(items[0].value);
        } // end of success function

    });




    // function to update subject and topics
    function getClass(x) {
        //        class id
        //        console.log("class id: " + x);

        //  default text for sidebar menu
        $('.subj_container .accordianHeader').text("Subject");
        $('.chapt_container .accordianHeader').text("Chapter");
        $('.topic_container .accordianHeader').text("Topic");
//        $('.sub_topic_container .accordianHeader').text("Sub Topic");
        $("#ulchapters, #ultopic, #ulsubtopic").empty();
        var url = baseUrl + "/subjects/boardClassSubjects/" + x + ".json";
        $(document).ready(function () {
            $.ajax({
                url: url,
                dataType: 'json',
                error: function () {
                    console.log('JSON FAILED for data');
                },
                success: function (results) {
                    var mainDiv = $(".ulsubjects");
                    var items = results.options;
                    var text = '';
                    for (var i = 0; i < items.length; i++) {
                        text = text + "<li data-mainsubid=" + x + " data-subid=" + items[i].value + " data-subname=" + items[i].name + ">" + items[i].name + "</li>";
                    }
                    mainDiv.html(text);
                } // end of success fn
            }); // end of Ajax call
        }); // end document ready function
    }
    // end function to update subject and topics

    $("nav").on("click", ".navbarContiner .allClassList li", function () {
        $('.dataCollection').empty();
        
        $('#slideContainer').empty();
        //to select the nav item
        $('.navbarContiner .allClassList li').removeClass('selectedLiField');
        $(this).addClass('selectedLiField');
        //subject drop down code
        $('.subj_container').find('.accordianIcon').addClass('rotateArrow');
        $('.ulsubjects').slideDown();
        //function to update subject and topics
        getClass(this.id);
    });


    //select the chapter
    function subjectchapterfunction(mainsubid, subid, subname) {
        //console.log("class id: "+mainsubid +"<br>subid :"+subid+"<br>sub name :"+ subname); 
        $('.subj_container .accordianHeader').text(subname);
        $('.chapt_container .accordianHeader').text("Chapter");
        $('.topic_container .accordianHeader').text("Topic");
        $('.sub_topic_container .accordianHeader').text("Sub Topic");
        $("#ultopic, #ulsubtopic").empty();
        var url = baseUrl + "/topics/getChapters/" + mainsubid + "/" + subid + ".json";
        $(document).ready(function () {
            $.ajax({
                url: url,
                dataType: 'json',
                error: function () {
                    console.log('JSON FAILED for data');
                },
                success: function (results) {
                    var mainDiv = $("#ulchapters");
                    var items = results.options;
                    var text = '';
                    for (var i = 0; i < items.length; i++) {
                        text = text + "<li data-mainsubid=" + subid + " data-subid=" + items[i].value + " data-subname=" + items[i].name + ">" + items[i].name + "</li>";
                    }
                    mainDiv.html(text);
                } // end of success fn
            }); // end of Ajax call
        }); // end document ready function


    }


    // subject 

    $("aside").on("click", ".accordinaBox .ulsubjects li", function () {
        var subname = $(this).text();
        var subid = $(this).data('subid');
        var mainsubid = $(this).data('mainsubid');
        $('.subj_container').find('.accordianIcon').removeClass('rotateArrow');
        $('.ulsubjects').slideUp();
        $('.chapt_container').find('.accordianIcon').addClass('rotateArrow');
        $('#ulchapters').slideDown();
        //console.log("subName :"+subname+", subid : "+ subid+ ",mainsubid: "+mainsubid);
        subjectchapterfunction(mainsubid, subid, subname);
    });


    // slect topic function
    function subjecttopicfunction(mainsubid, subid, subname) {
        // console.log("class id: "+mainsubid +"<br>subid :"+subid+"<br>sub name :"+ subname); 
        //$('.subj_container .accordianHeader').text(subname);
        $('.chapt_container .accordianHeader').text(subname);
        $('.topic_container .accordianHeader').text("Topic");
        $('.sub_topic_container .accordianHeader').text("Sub Topic");
        $("#ulsubtopic").empty();
        var url = baseUrl + "/topics/getTopics/" + mainsubid + "/" + subid + ".json";
        $(document).ready(function () {
            $.ajax({
                url: url,
                dataType: 'json',
                error: function () {
                    console.log('JSON FAILED for data');
                },
                success: function (results) {
                    var mainDiv = $("#ultopic");
                    var items = results.options;
                    var text = '';
                    for (var i = 0; i < items.length; i++) {
                        text = text + "<li data-mainsubid=" + mainsubid + " data-subid=" + items[i].value + " data-subname=" + items[i].name + ">" + items[i].name + "</li>";
                    }
                    mainDiv.html(text);
                    // console.log(text);
                } // end of success fn
            }); // end of Ajax call
        }); // end document ready function
    }

    //chapter 

    $("aside").on("click", ".accordinaBox #ulchapters li", function () {
        var subname = $(this).text();
        var subid = $(this).data('subid');
        var mainsubid = $(this).data('mainsubid');
        $('.chapt_container').find('.accordianIcon').removeClass('rotateArrow');
        $('#ulchapters').slideUp();
        $('.topic_container').find('.accordianIcon').addClass('rotateArrow');
        $('#ultopic').slideDown();
        //console.log("subName :"+subname+", subid : "+ subid+ ",mainsubid: "+mainsubid);
        subjecttopicfunction(mainsubid, subid, subname);
    });


    // function merge in explation and arrange the nav sequence
    //function arrangeSequence(){
    //    
    //}


    // get modules 
    function getModule(module) {
        //console.log("module id: " +module);
        var url = baseUrl + "/topics/getlModulesOfTopic/" + module + ".json";
        var mainDiv = $('#slideContainer');
        //json
        console.log("url :" + url);
        $.ajax({
            url: url,
            dataType: 'json',
            error: function () {
                console.log("JSON failed to load modules");
            },
            success: function (results) {
                mainData = results;
                $(".owl-carousel").owlCarousel('destroy');
                var items = mainData.nameList;

                if (items == undefined) {
                    $('#slideContainer').empty();
                    $('.dataCollection').html("<h3>Data not available...</h3>");
                    return false;
                }
                console.log("all name list data :" + items);
                //        navigation bar  
                var navIndex = [];
                var expArry = [];
                

                var text = '';
                for (var i = 0; i < items.length; i++) {
                    // Explanation already exist or not 
                    if (items[i] === "Explanation" || items[i] === "Comprehensive" || items[i] === "AdvanceResource" || items[i] === "Content" || items[i] === "Example") {
                        if (expArry.length <= 1) {
                            expArry[0] = "Explanation";
                        }
                        
                    } else if (items[i] !== "Explanation" || items[i] !== "Comprehensive" || items[i] !== "AdvanceResource" || items[i] !== "Content" || items[i] !== "Example") {
                        if (items[i] == "Simulation") {
                            navIndex.unshift("Simulation");
                        }
                        if (items[i] == "Activity") {
                            navIndex.unshift("Activity");
                        }
                        if (items[i] == "Games") {
                            navIndex.unshift("Games");
                        }
                        if (items[i] == "Worksheet") {
                            navIndex.unshift("Worksheet");
                        }
                        if (items[i] == "Mindmap") {
                            navIndex.unshift("Mindmap");
                        }
                        if (items[i] == "Assessment") {
                            navIndex.unshift("Assessment");
                        }
                        if (items[i] == "Practice Paper") {
                            navIndex.unshift("Practice Paper");
                        }
                        if (items[i] == "Revision Notes") {
                            navIndex.unshift("Revision Notes");
                        }
                        if (items[i] == "DigitalLibrary") {
                            navIndex.unshift("DigitalLibrary");
                        }

                    }  //if condition // explanation is available





                } // end main loop
               // console.log("all expItems ::  "+allExpItem);

                var mainNavIndex = expArry.concat(navIndex);
                //console.log("main array to print html  ::" + mainNavIndex);

                // Ask Aruna ma'am if navIndex is empty()
                if (mainNavIndex.length > 0) {
                    for (var i = 0; i < mainNavIndex.length; i++) {
                        text = text + "<div class='item " + ((mainNavIndex[i] === "Activity") ? 'item owlItemActive' : ' ') + "' data-module=" + module + ">" + mainNavIndex[i] + "</div>";
//                
                    }

                }
                
                
               //show the active inner data
                      
              showActivity();
//                console.log(navIndex);

                //  to add navitem
                mainDiv.html(text);
                // call owl carousel after appending the data
                $('.owl-carousel').owlCarousel({
                    nav: true,
                    // items:6,
                    dots: false,
                    loop: false,
                    lazyLoad: true,
                    autoWidth: true,
                    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
                });


            } // end success function

        }) // ajax method call
    }


    //get the all navitems

    $('body').on('click', '.owl-item .item', function () {
        var getText = $(this).text();
        var mainContiner = $('.dataCollection');
        var text = '';
        $('.owl-item .item').removeClass('owlItemActive');
        $(this).addClass('owlItemActive');
        //   console.log(mainData[getText]);
        var items = mainData[getText];

//        show all explanation items
        if (getText == "Explanation") {
            console.log("inside explanation :"+getText);
            mainContiner.empty();
            var items2 = mainData.nameList;
            console.log(items2);
           for (var i = 0; i < items2.length; i++) {
               
               
//               check for content 
               if(items2[i]=="Content" ){
                   var t1='';
                  items = mainData["Content"];
                  for(var j=0; j<items.length; j++){
                    t1 = t1 + showMainItems(items[j].moduleId,items[j].thumbnailUrl,items[j].moduleName,items[j].contentUrl);
                  }
                  mainContiner.append(t1);
               }
//               check for explanation
            else  if(items2[i]=="Explanation" ){
                  var t2='';
                  items = mainData["Explanation"];
                  for(var j=0; j<items.length; j++){
                    t2 = t2 + showMainItems(items[j].moduleId,items[j].thumbnailUrl,items[j].moduleName,items[j].contentUrl);
                 }
                 mainContiner.append(t2);
              }
//              check for comprehensive
             else   if(items2[i]=="Comprehensive" ){
                   var t3='';
                  items = mainData["Comprehensive"];
                  for(var j=0; j<items.length; j++){
                    t3 = t3 + showMainItems(items[j].moduleId,items[j].thumbnailUrl,items[j].moduleName,items[j].contentUrl);
                 }
                 mainContiner.append(t3);
              }
              
//              check for AdvanceResource
              else   if(items2[i]=="AdvanceResource" ){
                   var t4='';
                  items = mainData["AdvanceResource"];
                  for(var j=0; j<items.length; j++){
                    t4 = t4 + showMainItems(items[j].moduleId,items[j].thumbnailUrl,items[j].moduleName,items[j].contentUrl);
                 }
                 mainContiner.append(t4);
              }
//              check for example
              else   if(items2[i]=="Example" ){
                   var t5='';
                  items = mainData["Example"];
                  for(var j=0; j<items.length; j++){
                    t5 = t5 + showMainItems(items[j].moduleId,items[j].thumbnailUrl,items[j].moduleName,items[j].contentUrl);
                 }
                 mainContiner.append(t5);
              }
               
            }
//     
        }
        else {
            for (var j = 0; j < items.length; j++) {
                text = text + showMainItems(items[j].moduleId,items[j].thumbnailUrl,items[j].moduleName,items[j].contentUrl);
            }
            mainContiner.empty();
            mainContiner.html(text);
            }
             console.log(mainData);
    });

    //subtopic function
    function subjectsubtopicfunction(mainsubid, subid, subname) {
        $('.topic_container .accordianHeader').text(subname);
        //console.log("class id: "+mainsubid +"<br>subid :"+subid+"<br>sub name :"+ subname); 
        //$('.subj_container .accordianHeader').text(subname);
        //$('.chapt_container .accordianHeader').text(subname);
        //$('.topic_container .accordianHeader').text("Topic");
        $('.sub_topic_container .accordianHeader').text("Sub Topic");
        //$("#ulsubtopic").empty();
        var url = baseUrl + "/topics/getTopics/" + mainsubid + "/" + subid + ".json";
        //console.log(url);
        $(document).ready(function () {
            $.ajax({
                url: url,
                dataType: 'json',
                error: function () {
                    console.log('JSON FAILED for data');
                },
                success: function (results) {
                    var mainDiv = $("#ulsubtopic");
                    var items = results.options;
                    if (items.length > 0) {
                        var text = '';
                        for (var i = 0; i < items.length; i++) {
                            text = text + "<li data-mainsubid=" + mainsubid + " data-subid=" + items[i].value + " data-subname=" + items[i].name + ">" + items[i].name + "</li>";
                        }
                        mainDiv.html(text);
                        // slideAnimation();
                    } else {
                        getModule(subid);
                        $("#ulsubtopic").empty();
                        $('#ulsubtopic').slideUp();
                    }

                    // console.log(text);
                } // end of success fn
            }); // end of Ajax call
        }); // end document ready function

    }

    // topic

    $("aside").on("click", ".accordinaBox #ultopic li", function () {
        $("#slideContainer").show();
        var subname = $(this).text();
        var subid = $(this).data('subid');
        var mainsubid = $(this).data('mainsubid');
        $('.topic_container').find('.accordianIcon').removeClass('rotateArrow');
//        $('#ultopic').slideUp();
        $('.sub_topic_container').find('.accordianIcon').addClass('rotateArrow');
//        $('#ulsubtopic').slideDown();
        //console.log("subName :"+subname+", subid : "+ subid+ ",mainsubid: "+mainsubid);
        subjectsubtopicfunction(mainsubid, subid, subname);
    });




    //subjectsubtopicgetModulefunction function

    function subjectsubtopicgetModulefunction(mainsubid, subid, subname) {
        $('.sub_topic_container .accordianHeader').text(subname);
        var url = baseUrl + "/topics/getTopics/" + mainsubid + "/" + subid + ".json";
        //console.log(url);
        $(document).ready(function () {
            $.ajax({
                url: url,
                dataType: 'json',
                error: function () {
                    console.log('JSON FAILED for data');
                },
                success: function (results) {
                    var mainDiv = $("#ulsubtopic");
                    var items = results.options;
                    if (items.length > 0) {
                        var text = '';
                        for (var i = 0; i < items.length; i++) {
                            text = text + "<li data-mainsubid=" + mainsubid + " data-subid=" + items[i].value + " data-subname=" + items[i].name + ">" + items[i].name + "</li>";
                        }
                        mainDiv.html(text);
                        // slideAnimation();
                    } else {
                        getModule(subid);
                    }

                    // console.log(text);
                } // end of success fn
            }); // end of Ajax call
        }); // end document ready function
    }

    // sub topic

    $("aside").on("click", ".accordinaBox #ulsubtopic li", function () {
        var subname = $(this).text();
        var subid = $(this).data('subid');
        var mainsubid = $(this).data('mainsubid');
        //$('.topic_container').find('.accordianIcon').removeClass('rotateArrow');
        $('#ulsubtopic').slideUp();
        $('.sub_topic_container').find('.accordianIcon').removeClass('rotateArrow');
        //    $('#ulsubtopic').slideDown();
        //console.log("subName :"+subname+", subid : "+ subid+ ",mainsubid: "+mainsubid);
        subjectsubtopicgetModulefunction(mainsubid, subid, subname);
    });
    
    
    
//    video player control

$('.videoContainer button').click(function(){
        $('.playerContainer .videoContainer button').hide();
        $('.playerContainer .videoContainer video').hide().attr('src','');
        $('.playerContainer .videoContainer img').hide().attr('src','');
        $('.playerContainer .videoContainer object').hide().attr('data','');
         $('.playerContainer').fadeOut();

   
})


}); // document ready function