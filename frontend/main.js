'use strict';

console.log(`jQuery ${$.fn.jquery} is loaded`);
window.$ = $;
window.jQuery = $;

import '../sass/css.scss';
import Menu from './modules/menu';

var menu = new Menu(),
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

import Footer from './modules/footer';
var footer = new Footer();
footer.fixFooter();


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

/***********************
******** REACT ********
************************/

import React from 'react';
import ReactDOM from 'react-dom';
import NewComponent from './modules/react/new'

class StoryBox extends React.Component {

	constructor() {

		super();
		this.state = {
			timer: 0
		};
	}


	componentWillMount() {

		setInterval( () => {
			var date = new Date;
			this.setState({ timer: date.getSeconds() });
		}, 1000);

	}

	render() {
		return (
			<div>
				<h1>App component</h1>
				<NewComponent text="lorem -"/>
				<p>{ this.state.timer }</p>
			</div>
		);
	}
}
var targetEl = document.getElementById('box');
if ( targetEl ) {

	ReactDOM.render(<StoryBox />, targetEl);

}
