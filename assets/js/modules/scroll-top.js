module.exports = {
  scrollTop: function(){
    $('html, body').stop().animate({
      scrollTop: 0
    }, 300);
  }
};
