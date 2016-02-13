/* Template: FlatBook | Author: eriktailor | Version: 1.0 */
/*--------------------------------------------------------*/

/*--------------------------------------------------------*/
/* # TABLE OF CONTENTS */
/*--------------------------------------------------------*/
/*
   # Js Check
*/

var availableHeight;
var animationOffset;

function updateHeightAndOffset (height) {
	availableHeight = height;
	animationOffset = availableHeight - 100;
}

function setupSizes() {
	var windowHeight = $(window).height(),
			windowWidth = $(window).width();
		  navBarHeight = $(".top-header").outerHeight()+1,
			availHeight = windowHeight-navBarHeight+1,
			homeHeight = $('#home-container').height(),
			heroHeight = $('#hero-block').height();
			updateHeightAndOffset(availHeight);
}

// function setupSizes() {
// 	if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
// 		var windowHeight = $(window).height(),
// 				windowWidth = $(window).width();
// 			  navBarHeight = $(".top-header").outerHeight()+1,
// 				availHeight = windowHeight-navBarHeight+1,
// 				homeHeight = $('#home-container').height(),
// 				heroHeight = $('#hero-block').height();
// 				updateHeightAndOffset(availHeight);
// 		if ((windowHeight/windowWidth<=1.0)&&(availHeight >= heroHeight+(heroHeight*0.05))) {
// 			$('#home').css({'height':(availHeight)+'px'});
// 			$('#home-container').css({'height':(availHeight)+'px'});
// 			$('.home .container .contents').css({'position':'relative','top':'50%','transform':'translateY(-50%)','-webkit-transform':'translateY(-50%)','-ms-transform':'translateY(-50%)'});
// 		} 
// 		else if ((windowHeight/windowWidth>1.0)) {
// 			programHeight = $('#program').height();
// 			$('#home').css({'height':(availHeight-programHeight)+'px'});
// 			$('#home-container').css({'height':(availHeight-programHeight)+'px'});
// 			$('.home .container .contents').css({'position':'relative','top':'50%','transform':'translateY(-50%)','-webkit-transform':'translateY(-50%)','-ms-transform':'translateY(-50%)'});
// 		}
// 		else {
// 			updateHeightAndOffset(availHeight);
// 		}
// 		var programHeight= $('#program').height();
// 	}
// }


$(document).ready(function(){
/*--------------------------------------------------------*/
/* # GENERAL */
/*--------------------------------------------------------*/

$(function(){

// Loading
	function show() {
		$('#loading').hide();
		$('#content').fadeIn();
	};
	$(window).load(function() {
		show();
	});

// Js Check
	$("html").removeClass("no-js").addClass("js");

	if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		setupSizes();
		$(window).on("throttledresize", function (event) {
		});
		// Titles
		$('section').waypoint(function(){
			$(this).find('.section-title > h1').addClass('animated fadeInDown');
			$(this).find('.head-title > h1').addClass('animated fadeInDown');
			$(this).find('.section-title > p').addClass('animated fadeInUp');
		}, {offset: animationOffset+200});

	} else {
		availableHeight = $( window ).height();
		animationOffset = availableHeight - 100;
		$('head').append('<meta name="viewport" content="width=device-width, minimal-ui" />');
		$('#hero-block').css({'width':'100%'});	
		$('#images-slideshow').css({'width':'100%','height':'100%','margin':'0','position':'relative'});	
		$('.modal-dialog').css({'width':'90%','margin':'10% 5%'});
		$('.top-header').css({'height':'auto'});
		$('#alert-bar').css({'padding':'20px 55px 10px 5px'});
		$('.section-title > h1').css({'font-size':'2em'});
		$('.section-title > p').css({'font-size':'1.25em'});
		$('.testimonial > p').css({'font-size':'1.0675em'});
		$('.program-description').css({'padding':'2em'});
		$('.avatar').css({'margin-bottom':'1em'});
		$('.team-member').css({'height':'auto'});
		$('#program-text').css({'margin':'0','width':'auto','font-size':'1.25em','line-height':'1.5em','text-align':'left'});
		$('#contact').css({'height':'auto'});
		$('section').waypoint(function(){
			$(this).find('.section-title > h1').css({'opacity':'1'});
			$(this).find('.head-title > h1').css({'opacity':'1'});
			$(this).find('.section-title > p').css({'opacity':'1'});
		}, {offset: animationOffset+200});
	}


	var elFrame = $('#frame')[0];
  $(elFrame.contentWindow).resize(function() {
      $(window).trigger('zoom');
  });
  $(window).on('zoom', function() {
      // console.log('zoom', window.devicePixelRatio);
		var programHeight= $('#program').height();
		$('#pinterest-feed').height(programHeight);
  });



// Back Top
	$(window).scroll(function () {
		if ($(this).scrollTop() > 600) {
			$('.back-top-btn').removeClass('downscaled');
		} else {
			$('.back-top-btn').addClass('downscaled');
		}
	});	
	$('.back-top-btn').click(function(){
			$('body,html').animate({ scrollTop: 0 }, animationOffset);
			return false;
	});

/*--------------------------------------------------------*/
/* # NAVIGATION */
/*--------------------------------------------------------*/

// Sticky Nav
	$(window).scroll(function () {
		if ($(this).scrollTop() > 250) {
			$('#nav').addClass('hidden');
			$('.top-header .socials').hide();
			$('.menu').appendTo('.top-header .container');
		} else {
			$('#nav').removeClass('hidden');		
			$('.top-header .socials').fadeIn(600);
			$('.menu').appendTo('#nav .container');
		}
	});	

// Mobile Menu
	$('.top-header .mobile-menu').click(function(){
		$('#nav').toggleClass('hidden');
	});			

// Nav Links
	var menu = $(".menu"),
		navBar = $("#header"),
		navBarHeight = navBar.outerHeight()+1,
		menuItems = $(".menu li a");

	menuItems.click(function(e){		
		var href = $(this).attr("href"),
				offsetTop = href === "#" ? 0 : $(href).offset().top-navBarHeight;
		$('html, body').stop().animate({ 
				scrollTop: offsetTop
		}, animationOffset);					
		e.preventDefault();

	});	

// Offsite Nav
	if($('body').hasClass('offsite-nav')){
		$('#nav ul.menu').appendTo('#bt-menu').removeClass('menu');
		$('.top-header ul.socials').appendTo('#bt-menu').removeClass('socials');	
	} else {
		$('#header').waypoint('sticky', { offset: -1 });
	}

/*--------------------------------------------------------*/
/* # SLIDER */
/*--------------------------------------------------------*/

// Controls
	$('.slider-prev').addClass('animated fadeInLeftBig');
	$('.slider-next').addClass('animated fadeInRightBig');

// Basic Slider	
  $('#the-slider').cycle({
      fx: 'fade',
      speed: 450,
      slides: "> li",
	next: '.slider-next',
	prev: '.slider-prev',
	timeout: 0
  });

// Animations
	var slide01model = $('.slide.01 .model').data('effect'),
		slide02model = $('.slide.02 .model').data('effect'),
		slide03model = $('.slide.03 .model').data('effect');
	var slide01content = $('.slide.01 .contents').data('effect'),
		slide02content = $('.slide.02 .contents').data('effect'),
		slide03content = $('.slide.03 .contents').data('effect');
	$('.slide.01 .model').addClass('animated ' + slide01model);
	$('.slide.01 .contents').addClass('animated ' + slide01content);
	var effects = 'animated flash bounce shake tada swing wobble pulse flip flipInX flipOutX flipInY flipOutY fadeIn fadeInUp fadeInDown fadeInLeft	fadeInRight fadeInUpBig fadeInDownBig fadeInLeftBig fadeInRightBig bounceIn bounceInDown bounceInUp bounceInLeft bounceInRight rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight lightSpeedIn lightSpeedOut hinge rollIn rollOut';	
	$('.slider-next').click(function(){
		$('.slide').children().removeClass(effects);
		  if( $('.slide.01').hasClass('cycle-slide-active')){
			$('.slide.02 .model').removeClass().addClass('model animated ' + slide02model);
			$('.slide.02 .contents').removeClass().addClass('contents animated ' + slide02content);		
		} if( $('.slide.02').hasClass('cycle-slide-active')){
			$('.slide.03 .model').removeClass().addClass('model animated ' + slide03model);
			$('.slide.03 .contents').removeClass().addClass('contents animated ' + slide03content);		
		} if( $('.slide:last').hasClass('cycle-slide-active')){
			$('.slide.01 .model').removeClass().addClass('model animated ' + slide01model);
			$('.slide.01 .contents').removeClass().addClass('contents animated ' + slide01content);
		}
	});
	$('.slider-prev').click(function(){
		$('.slide').children().removeClass(effects);
		  if( $('.slide.01').hasClass('cycle-slide-active')){
			$('.slide:last .model').removeClass().addClass('model animated ' + slide03model);
			$('.slide:last .contents').removeClass().addClass('contents animated ' + slide03content);		
		} if( $('.slide.03').hasClass('cycle-slide-active')){
			$('.slide.02 .model').removeClass().addClass('model animated ' + slide02model);
			$('.slide.02 .contents').removeClass().addClass('contents animated ' + slide02content);		
		} if( $('.slide.02').hasClass('cycle-slide-active')){
			$('.slide.01 .model').removeClass().addClass('model animated ' + slide01model);
			$('.slide.01 .contents').removeClass().addClass('contents animated ' + slide01content);
		}
	});	

/*--------------------------------------------------------*/
/* # ABOUT */
/*--------------------------------------------------------*/

	$('.team-member').css('transform','scale(0.2)');
	$('#webcast-videos').waypoint(function(){
		$('.team-member').css('transform','scale(1.0)');
	}, {offset: animationOffset});
	$('.team-member').css('transform','scale(0.2)');
	$('#about').waypoint(function(){
		$('.team-member').css('transform','scale(1.0)');
	}, {offset: animationOffset});

// Testimonials
  $('#testimonial-slider').cycle({
      fx: 'scrollHorz',
      speed: 300,
      slides: "> li",
	next: '#quote-next',
	prev: '#quote-prev'
  });
  $('#quote-prev').click(function() {
    $('#testimonial-slider').cycle('pause');
    $('#quote-play').show();
    $('#quote-pause').hide();
  });
  $('#quote-next').click(function() {
    $('#testimonial-slider').cycle('pause');
    $('#quote-play').show();
    $('#quote-pause').hide();
  });
  $('#quote-pause').click(function() {
    $('#testimonial-slider').cycle('pause');
    $('#quote-play').show();
    $('#quote-pause').hide();
  });
  $('#quote-play').click(function() {
    $('#testimonial-slider').cycle('resume');
    $('#quote-play').hide();
    $('#quote-pause').show();
  });

// Tooltips
	$('.tip').tooltipsy({
		delay: 50
	});

});
/*--- END DOCUMENT ---------------------------------------*/
});




