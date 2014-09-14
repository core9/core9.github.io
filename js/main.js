// When ready...
window.addEventListener("load", function() {
	// Set a timeout...
	setTimeout(function() {
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);
});

var Core9Plugins = {

}

var Core9 = {

	body : document.querySelector('body'),
	center : document.querySelector('.center'),
	header : document.querySelector('header'),
	footer : document.querySelector('footer'),

	init : function() {
		Core9.loadCss();
		Core9.setEvents();
		Core9.setStage();
	},

	loadCss : function() {

	},

	setEvents : function() {
		window.onresize = function() {
			Core9.setStage();
		};
	},

	setStage : function() {
		Core9._setBodyBackground();
		Core9._resizeCenter();
	},

	_resizeCenter : function() {
/*		Core9.center.style.setProperty('top', Core9.header.clientHeight - 85
				+ 'px');*/
		Core9.center.style.setProperty('min-height', (Core9.body.clientHeight - Core9.footer.clientHeight + 85)
				+ 'px');
	},

	_setBodyBackground : function() {
		document.querySelector('body').style.setProperty('background',
				'url("assets/images/mountain-2.jpg") no-repeat bottom left');
		document.querySelector('body').style.setProperty('background-size',
				'100% 100%');
	}

}

Core9.init();