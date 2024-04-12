$(document).ready(function () {
		initMenu();
});

var initMenu = function () {
		$('.toggle-menu').on('click', function () {
				$('html').toggleClass('open-menu');
		});
		$('.menu-fader').on('click', function () {
				$('html').removeClass('open-menu');
		});
		$(document).keyup(function (e) {
				if (e.keyCode === 27) {
						$('html').removeClass('open-menu');
				}
		});
};
