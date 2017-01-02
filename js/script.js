$( document ).ready(function() {
  /************************
    TESTIMONIALS CAROUSEL
  ************************/
  var owl = $('.testimonials');
  
  owl.owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 8000,
    nav: false,
    dots: true,
    smartSpeed: 500,
    itemClass: 'testimonials__slider-item',
    stageOuterClass: 'testimonials__slider',
    stageClass: 'testimonials__slider-list'
  });



  /*******************
    SMOOTH SCROLLING
  *******************/
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });



  /*********************
    REQUEST FORM POPUP
  *********************/
  var form = new Form();
  var showFormBtn = $('.js-show-form');
  var body = $('body');

  showFormBtn.on('click', form.show);
  $(window).on('keydown', function(e) {
    if (e.keyCode === 27) {
      form.close(e);
    }
  });

  function Form() {
    var self = this;

    this.show = function(e) {
      e.preventDefault();

      var form = document.querySelector('.request-form-wrapper');

      if ( form ) { return; }

      var target = e.target;
      var formWrap = '<div class="request-form-wrapper">' +
                       '<a href="#" id="request-form-close" class="request-form-close"></a>' +
                       '<form action="/" class="request-form">' +
                         '<h2 class="request-form__title">Leave a request</h2>' +
                         '<label for="userName">Your name:</label>' +
                         '<input id="userName" type="text" placeholder="John" required/>' +                    
                         '<label for="email">Your email:</label>' +
                         '<input id="email" type="email" placeholder="your-email@mail.com" required/>' +                    
                         '<span class="btn  request-form__submit">Send</span>' +
                       '</form></div>';

      target.insertAdjacentHTML('beforeBegin', formWrap);
      $('#userName').focus();
      $('#request-form-close').on('click', self.close);
    };

    this.close = function(e) {
      var form = $('.request-form-wrapper');

      if ( !form ) { return; }

      if (e.type === 'click') { e.preventDefault(); }
      
      form.remove();
    };
  }



  /**************************************
    YOUTUBE PLAYER IN PORTFOLIO SECTION
  **************************************/ 
  var player = new Player();
  
  $('.portfolio__list-item').on('click', player.show);
  $(window).on('keydown', function(e) {
    if (e.keyCode === 27) {
      player.close(e);//передаем event, т.к. проверяем (e.type === 'click')
    }
  });

  function Player() {
    var self = this;

    this.show = function(e) {
      e.preventDefault();

      /*
        вставляем ссылку на видео с ютуба, которая находится в атрибутах href у
        portfolio__item-link'ов
      */
      var iframe = '<iframe class="player" src="' + e.target.href + '" frameborder="0"></iframe>';
      var player = '<div id="portfolio-video" class="portfolio-video">' +
                      iframe +
                      '<a href="#" id="player-close" class="player-close"></a>' +
                   '</div>';
      
      $('#portfolio-outer').append(player);
      $('#player-close').on('click', self.close);
    };

    this.close = function(e) {
      var player = $('#portfolio-video');

      if ( !player ) { return; }

      if (e.type === 'click') { e.preventDefault(); }
      
      player.remove();
    };
  }
});