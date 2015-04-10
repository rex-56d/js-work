function Carousel (el) {
  console.log(this);
  this.$carousel = $(el);
  this.$mainArea = this.$carousel.find('.js-carousel__item');
  this.$carouselItem = this.$mainArea.find('li');
  this.$carouselImg = this.$carouselItem.find('img');
  this.$btnPrev = this.$carousel.find('.js-carousel-prev');
  this.$btnNext = this.$carousel.find('.js-carousel-next');
  this.$carousItemPositelCurrent = $('.is-carousel-current');

  this.itemLength = this.$carouselItem.length;
  this.imgWidth = this.$carouselImg.width();
  this.carouselItemPosX = [];
  this.initialSetup();
  this.controler();
}

Carousel.prototype.initialSetup = function () {
  var self = this,
      mainAreaWidth = this.itemLength * this.imgWidth;

  this.$carouselItem.eq(0).addClass('is-carousel-current');
  this.$btnPrev.attr('disabled', 'disabled');

  this.$mainArea.css({
    width: mainAreaWidth
  });

  for ( var i = 0; self.itemLength > i; i++ ) {
    self.carouselItemPosX [i] = (-(self.imgWidth * i));
  }

};

Carousel.prototype.controler = function () {
  var self = this;

  this.$btnPrev.on('click', function (e) {
    e.preventDefault();
    self.prev();
  });

  this.$btnNext.on('click', function (e) {
    e.preventDefault();
    self.next();
  });
};

Carousel.prototype.prev = function () {
  this.$btnNext.removeAttr('disabled');
  var currentIndex = this.$carouselItem.index($('.is-carousel-current')),
      prevIndex = currentIndex - 1;

  if ( currentIndex >= 0 ){
    this.$carouselItem.eq( currentIndex ).removeClass('is-carousel-current');
    this.$carouselItem.eq( prevIndex ).addClass('is-carousel-current');

    var firstchild = this.$carouselItem.first().hasClass('is-carousel-current');
    if (firstchild) {
      this.$btnPrev.attr('disabled', 'disabled');
    }
  }
  this.move( prevIndex );
};

Carousel.prototype.next = function () {
  this.$btnPrev.removeAttr('disabled');
  var currentIndex = this.$carouselItem.index($('.is-carousel-current')),
      nextIndex = currentIndex + 1;

  if ( this.itemLength >= nextIndex ){
    this.$carouselItem.eq( currentIndex ).removeClass('is-carousel-current');
    this.$carouselItem.eq( nextIndex ).addClass('is-carousel-current');

    var lastchild = this.$carouselItem.last().hasClass('is-carousel-current');
    if (lastchild) {
      this.$btnNext.attr('disabled', 'disabled');
    }
  }
  this.move( nextIndex );
};

Carousel.prototype.move = function (nextIndex) {
  this.$mainArea.css({
    left: this.carouselItemPosX[nextIndex]
  });
};

module.exports = Carousel;