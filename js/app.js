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
$(document).ready(function() {
	if(isMobile.any()){
		$('#bgvid').remove();
		$('.main-sect').addClass('video-off');
	}
	sectionHeight();
	$('.tech-slide').click(function(e) {
		$('.tech-slide').removeClass('active');
		$(this).addClass('active');
		$('.tech-slider-img').hide();
		if ($(this).hasClass('tech-slide-1')) {
			$('.tech-slider-img-1').fadeIn();
		} else if ($(this).hasClass('tech-slide-2')) {
			$('.tech-slider-img-2').fadeIn();
		} else if ($(this).hasClass('tech-slide-3')) {
			$('.tech-slider-img-3').fadeIn();
		}
	});
    var nav = $('.fluid_header');
	$('#main_menu li a').click(function(e) {
		$('#main_menu li').removeClass('active');
		$(this).parents('li').addClass('active');
		e.preventDefault();

		var TarUrl = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(TarUrl).offset().top - 51
		}, 1000);

	});
	$('a.scroll-down').click(function(e) {
		$('html, body').animate({
			scrollTop: $('#about_sect').offset().top -1
		}, 1000);
	});
});
$(window).on('resize', function() {
	sectionHeight();
});

// Section Height

function sectionHeight() {
  var windowHeight = $(window).height();
  var lastSectHeight = $(window).height() - $('footer').outerHeight() ;
  $("section.main-sect").css('min-height', windowHeight + 'px');
  $('header').data('offset-top', windowHeight);
  /* $("section.join-sect").css('min-height', lastSectHeight + 'px'); */

}
// Main Section resize

function mainSectionResize() {
  var imgHeight = $('.outer-div').outerHeight() / 2;
  var imgWidth = $('section.main-sect .section-header img').outerWidth() / 2;
  $("section.main-sect .section-header").css({
    'margin-left': '-' + imgWidth + 'px',
    'margin-top': '-' + imgHeight + 'px',

  });
}

// JCaraousel

(function($) {
    $(function() {
        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var carousel = $(this),
                    width = carousel.innerWidth();

                if (width >= 1000) {
                    width = width / 4;
                }	else if (width >= 700) {
                    width = width / 3;
				}	else if (width >= 350) {
                    width = width / 2;
                }

                carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
            })
            .jcarousel({
				transitions: true,
				animation: 'slow',
                wrap: 'circular'
            });



        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
    });
})(jQuery);

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}
