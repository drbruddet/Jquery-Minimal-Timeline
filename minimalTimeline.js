(function($) {
    $.fn.minimalTimeline=function(data) {

      var defauts = {
        'LineBackgroundColor': "#000",
        'LineThickness': 5,
        'ArrowBackgroundColor': "#000",
        'ArrowSize': 8,
        'MarkerSize': 48,
        'MarkerOffset': 20,
        'MarkerHoverArrowDifference': 2,
        'MarkerImagePath': './images/marker.png',
        'MarkerHovertransitionTime': 0.5
      };

      var parameters = $.extend(defauts, data);

       return this.each(function() {

          $( "<div>" ).addClass('mt').addClass('1305936000').css('position', 'relative').appendTo("#timeline");
          $( "<div>" ).addClass('mtStraight').css({
            'background': parameters.LineBackgroundColor,
            'height': parameters.LineThickness
          }).appendTo(".mt");

          $.each(parameters.data, function(index, value) {

            $("<span>").addClass("mtArrowUp").css({
              'border-bottom': parameters.ArrowSize + "px solid" + parameters.ArrowBackgroundColor,
              'border-right': parameters.ArrowSize + "px solid transparent",
              'border-left': parameters.ArrowSize + "px solid transparent",
              'top': "-" + parameters.ArrowSize + "px",
              'height': 0,
              'width': 0,
              'position': 'absolute'
            }).addClass(value[1]).appendTo('.mt');

            $("<span>").addClass("mtMarkerUp").css({
              'width': parameters.MarkerSize + 'px',
              'height': parameters.MarkerSize + 'px',
              'margin-left': "-" + parameters.MarkerSize / 3 + "px",
              'background': "url(" + parameters.MarkerImagePath + ")",
              'transition': "top " + parameters.MarkerHovertransitionTime  + "s",
              '-webkit-transition': "top " + parameters.MarkerHovertransitionTime  + "s",
              '-moz-transition': "top " + parameters.MarkerHovertransitionTime  + "s",
              '-o-transition': "top " + parameters.MarkerHovertransitionTime  + "s",
              '-ms-transition': "top " + parameters.MarkerHovertransitionTime  + "s",
              'top': "-" + (parameters.MarkerSize  + parameters.MarkerOffset) + "px",
              'position': 'absolute'
            }).addClass(value[1]).appendTo('.mt');

            $('.mt .mtMarkerUp').hover(function(e) {
              $(this).css('top', "-" + (parameters.ArrowSize + parameters.MarkerHoverArrowDifference + parameters.MarkerSize) + "px");
            }, function () {
              $(this).css('top', "-" + (parameters.MarkerSize  + parameters.MarkerOffset) + "px");
            });
          });

          var mtTimeStart = $('.mt').attr('class').split(' ')[1];
          var mtTimeStop = Math.round((new Date()).getTime() / 1000);
          var mtTotalTime = mtTimeStop - mtTimeStart;

          $.each($( ".mt" ).children(), function(index) {
            if (index != 0 || index != 1 || index != 2) {
              var mtPercentage = ((($(this).attr('class').split(' ')[1]) - mtTimeStart) / mtTotalTime) * 100;
              $(this).css('left', mtPercentage + '%');
            }
          });
       });
    };
})(jQuery);