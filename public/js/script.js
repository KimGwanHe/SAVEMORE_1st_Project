
$(function () {
    //fullpage 
    $('#fullpage').fullpage({

        //options
        anchors: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'],
        sectionsColor: ['#eeeae8', '#d5cecb', '#ebe2d9', '#d5cecb', '#eeeae8', '#ebe2d9'],
        navigation: false,
        normalScrollElements: '.modal', // 추가했음

        //top버튼 
        onLeave: function(index, nextIndex, direction) {
            if (nextIndex >= 2) {
              $('#topBtn').fadeIn('slow');
            } else  {
              $('#topBtn').fadeOut('slow');
            }
          }
      
    });
});
