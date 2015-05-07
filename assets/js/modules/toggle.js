var toggle = toggle || {};
    toggle = {
      
      JS_DN: 'js-dn',
      TGL: '.js-tgl',
      TGL_OPEN: 'js-tgl--open',
      TGL_CLOSE: 'js-tgl--close',
      TGL_BLOCK: '.js-tgl__block',
      TGL_HANDLE: '.js-tgl__handle',

      tglInit: function(self){
        var _ = this,
            $scope = $(self).parents(_.TGL);

        if ($scope.hasClass(_.TGL_OPEN)){
          _.close($scope);
        } else {
          _.open($scope);
        }
      },

      open: function($scope){
        var _ = this;
        $scope.addClass(_.TGL_OPEN).removeClass(_.TGL_CLOSE);
        $scope.find(_.TGL_BLOCK).removeClass(_.JS_DN);
      },

      close: function($scope){
        var _ = this;
        $scope.addClass(_.TGL_CLOSE).removeClass(_.TGL_OPEN);
        $scope.find(_.TGL_BLOCK).addClass(_.JS_DN);
      },

      events: function(){
        var _ = this;
        $(_.TGL_HANDLE).on('click', function(){
          _.tglInit(this);
        });
      }
    };

module.exports = toggle;