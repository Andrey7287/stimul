(function onResize(func) {

	func();

	$(window).resize(()=>{

		if ( !timing ) {
			timing = setTimeout(onResize, 200);
		}

	});

})(func, $, window);
