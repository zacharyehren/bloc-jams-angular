(function() {
  function seekBar($document) {
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      //Walkthrough this code
      return offsetXPercent;
    };
    
    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;
        
        var seekBar = $(element);
        
        var percentString = function () {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };
        
        scope.fillStyle = function() {
          return {width: percentString()};
        };
        //Is fillstyle a custom method we are creating on the scope? And is the "scope.fillStyle" syntax the way we declare it?
        
        scope.thumbStyle = function() {
          return {width: percentString()};
        };
        //Same question for thumbStyle as fillStyle
        
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };
        //Walkthrough this code through line 59
      
        
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event){
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
            });
          });
          
          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mousemove.thumb');
          });
        };
      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();