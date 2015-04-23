var scrollTopViewModel = require('./modules/scroll-top'),
    Carousel = require('./modules/carousel'),
    closure = require('./modules/closure'),
    Modal = require('./modules/modal');


var carousel = new Carousel('#js-carousel');
var modal = new Modal('#js-modal-01', '#js-medal-open-01');
var modal2 = new Modal('#js-modal-02', '#js-medal-open-02');
