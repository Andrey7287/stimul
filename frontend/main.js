'use strict';

/* Make jQuery available in global */
console.log(`jQuery ${$.fn.jquery} is loaded`);
window.$ = $;
window.jQuery = $;

/* Import project styles and components */
import '../sass/css.scss';
import Menu from './modules/menu';
import Footer from './modules/footer';

/* Define project components and variables */
var menu = new Menu(),
		footer = new Footer(),
		isMap = $('#map').is('#map'),
		isSlider = $('.slider').is('.slider'),
		scrollTiming = 0;

/***********************
********* MENU *********
************************/


(function adaptiveMenu () {

	var mobileView = window.matchMedia("(max-width: 768px)").matches,
			timing = 0;

	if ( mobileView ) {
		menu.initBurger();
		menu.initMobile();
	} else {
		menu.destructMobile();
	}

	$(window).resize(()=>{

		if ( !timing ) {
			timing = setTimeout(adaptiveMenu, 200);
		}

	});

})();

/***********************
******** FOOTER ********
************************/

$(window).on('load', function(){
	footer.fixFooter();
});


/**********************
********* MAP *********
***********************/

if ( isMap ) {

	require.ensure([], (require) => {
		require('./modules/map');
	});

}

/***********************
******** SLIDER ********
************************/


if ( isSlider ) {

	require.ensure([], (require) => {
		require('script!../node_modules/slick-carousel/slick/slick.js');
		$('.slider').slick({
			prevArrow: $('.left'),
			nextArrow: $('.right'),
			dots: true,
			appendDots: $('.slider-dots')
		});
	});

}

/************************
******* Scroll Up *******
*************************/

$(document).scroll(function(){

	if ( !scrollTiming ) {

		scrollTiming = setTimeout(function(){

			var scroll = $('body').scrollTop() ? $('body').scrollTop() : $('html').scrollTop();
			scroll >= 300 ? $('.scrollup').addClass('act') : $('.scrollup').removeClass('act');
			scrollTiming = 0;

		},300);

	}

});

import scrollup from './modules/scrollup';
$('.scrollup').scrollUp();

/*******************************
***** Align blocks on main *****
********************************/

function alignMainGreed(){

	var baseHeight = $('.general').outerHeight(true),
			feedLinkHeight = $('.news-feed__link').outerHeight(true),
			feedItemHeight = ( baseHeight - feedLinkHeight - 45 ) / 3;

	$('.news-feed__item').height(feedItemHeight);

}

$(window).on('load', alignMainGreed);

/*(function adaptiveAlignGreed () {

	alignMainGreed();
	var timing = 0;

	$(window).resize(()=>{

		if ( !timing ) {
			timing = setTimeout(adaptiveAlignGreed, 200);
		}

	});

})();*/

