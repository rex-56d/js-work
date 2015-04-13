function Carousel (el) {
  var _ = this;
  _.$carousel = $(el);
  _.$mainArea = _.$carousel.find('.js-carousel__item');
  _.$carouselItem = _.$mainArea.find('li');
  _.$carouselImg = _.$carouselItem.find('img');
  _.$btnPrev = _.$carousel.find('.js-carousel-prev');
  _.$btnNext = _.$carousel.find('.js-carousel-next');
  _.$carouselCurrentClass = $('.is-carousel-current');
  _.carouselCurrentClass = 'is-carousel-current';
  _.itemLength = _.$carouselItem.length;
  _.imgWidth = _.$carouselImg.width();
  _.carouselItemPosX = [];
  _.initialSetup();
  _.controler();
}

Carousel.prototype.initialSetup = function () {
  var _ = this,
      mainAreaWidth = _.itemLength * _.imgWidth;

  _.$carouselItem.eq(0).addClass(_.carouselCurrentClass);
  _.$btnPrev.attr('disabled', 'disabled');
  _.$mainArea.css({ width: mainAreaWidth });

  for ( var i = 0; _.itemLength > i; i++ ) {
    _.carouselItemPosX [i] = (-(_.imgWidth * i));
  }

};

Carousel.prototype.controler = function () {
  var _ = this;

  _.$btnPrev.on('click', function (e) {
    e.preventDefault();
    _.prev(this);
  });

  _.$btnNext.on('click', function (e) {
    e.preventDefault();
    _.next(this);
  });

};

Carousel.prototype.prev = function () {
  var _ = this,
      currentIndex = _.$carouselItem.index($('.is-carousel-current')),
      prevIndex = currentIndex - 1;

  _.$btnNext.removeAttr('disabled');

  if ( currentIndex >= 0 ){
    _.$carouselItem.eq( currentIndex ).removeClass(_.carouselCurrentClass);
    _.$carouselItem.eq( prevIndex ).addClass(_.carouselCurrentClass);

    var firstchild = _.$carouselItem.first().hasClass(_.carouselCurrentClass);
    if (firstchild) {
      _.$btnPrev.attr('disabled', 'disabled');
    }
  }
  _.move( prevIndex );
};


Carousel.prototype.next = function () {
  var _ = this,
      currentIndex = _.$carouselItem.index($('.is-carousel-current')),
      nextIndex = currentIndex + 1;

  _.$btnPrev.removeAttr('disabled');
  

  if ( _.itemLength >= nextIndex ){
    _.$carouselItem.eq( currentIndex ).removeClass(_.carouselCurrentClass);
    _.$carouselItem.eq( nextIndex ).addClass(_.carouselCurrentClass);

    var lastchild = _.$carouselItem.last().hasClass(_.carouselCurrentClass);
    if (lastchild) {
      _.$btnNext.attr('disabled', 'disabled');
    }
  }
  _.move( nextIndex );
};

Carousel.prototype.move = function (nextIndex) {
  var _ = this;
  _.$mainArea.css({
    left: this.carouselItemPosX[nextIndex]
  });
};

module.exports = Carousel;