;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#32c6fe',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());
(function() {
  var $activeWidth, $defaultMarginLeft, $defaultPaddingLeft, $firstChild, $line, $navListItem;

  $line = $('#line');

  $navListItem = $('.nav-li');

  $activeWidth = $('.active-nav').width();

  $firstChild = $('.nav-li:first-child');

  $defaultMarginLeft = parseInt($('.nav-li:first-child').next().css('marginLeft').replace(/\D/g, ''));

  $defaultPaddingLeft = parseInt($('#nav-container > ul').css('padding-left').replace(/\D/g, ''));

  $line.width($activeWidth + 'px');

  $line.css('marginLeft', $defaultPaddingLeft + 'px');

  $navListItem.click(function() {
    var $activeNav, $currentIndex, $currentOffset, $currentWidth, $initWidth, $marginLeftToSet, $this;
    $this = $(this);
    $activeNav = $('.active-nav');
    $currentWidth = $activeNav.width();
    $currentOffset = $activeNav.position().left;
    $currentIndex = $activeNav.index();
    $activeNav.removeClass('active-nav');
    $this.addClass('active-nav');
    if ($this.is($activeNav)) {
      return 0;
    } else {
      if ($this.index() > $currentIndex) {
        if ($activeNav.is($firstChild)) {
          $initWidth = $defaultMarginLeft + $this.width() + $this.position().left - $defaultPaddingLeft;
        } else {
          $initWidth = $this.position().left + $this.width() - $currentOffset;
        }
        $marginLeftToSet = $this.position().left + $defaultMarginLeft + 'px';
        $line.width($initWidth + 'px');
        return setTimeout(function() {
          $line.css('marginLeft', $marginLeftToSet);
          return $line.width($this.width() + 'px');
        }, 175);
      } else {
        if ($this.is($firstChild)) {
          $initWidth = $currentOffset - $defaultPaddingLeft + $defaultMarginLeft + $currentWidth;
          $marginLeftToSet = $this.position().left;
        } else {
          $initWidth = $currentWidth + $currentOffset - $this.position().left;
          $marginLeftToSet = $this.position().left + $defaultMarginLeft;
        }
        $line.css('marginLeft', $marginLeftToSet);
        $line.width($initWidth + 'px');
        return setTimeout(function() {
          return $line.width($this.width() + 'px');
        }, 175);
      }
    }
  });

}).call(this);