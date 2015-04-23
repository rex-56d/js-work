function Modal ( modal, trigger ) {
  var _ = this;
      _.$window = $(window);
      _.$modal = $(modal);
      _.$modalbtn = $(trigger);
      _.modalWidth = 600;
      _.modalHeight = 500;
      _.$overlay = $('.js-modal-overlay');
      _.events();
}

Modal.prototype.modalpos = function () {
  var _ = this;
    _.windowWidth = $(window).width();
    _.windowHeight = $(window).height();
    _.modalPosX = ( _.windowWidth / 2 ) - (_.modalWidth / 2);
    _.modalPosY = ( _.windowHeight / 2 ) - (_.modalHeight / 2);
    _.$modal.css({
      'top': _.modalPosY,
      'left': _.modalPosX
    });
};

Modal.prototype.show = function () {
  var _ = this;
  _.$overlay.fadeIn('fast', function(){
    _.$modal.fadeIn('fast');
  });
};

Modal.prototype.hide = function () {
  var _ = this;
  _.$modal.fadeOut('fast');
  _.$overlay.fadeOut('fast');
};

Modal.prototype.events = function () {
  var _ = this;
  _.$window.on('load resize', function() {
    _.modalpos();
  });
  _.$modalbtn.on('click', function (e) {
    e.preventDefault();
    _.show();
  });
  _.$overlay.on('click', function(){
    _.hide();
  });
};

module.exports = Modal;