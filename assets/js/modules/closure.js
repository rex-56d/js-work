module.exports = {
  
  closure: function() {  
    function closureWraper() {
      var i = 0;

      function closureInner() {
        i++;
        return i;
      }

      return closureInner;

    }

    var counter = closureWraper();
    
    $('.js-closure').on('click', function(){
      $('.js-closure-txt').html(counter);
    });
    
  }()

};