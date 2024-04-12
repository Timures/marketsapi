$(document).ready(function () {
		initHero();
});

var initHero = function () {
		$('.hero').find('.link-choose').each(function () {
				var el = $(this);
				el.html(el.html().replace(/(.)/g, '<span>$1</span>'));
				el.html('<div>' + el.html() + '</div><div>' + el.html() + '</div>');
				el.addClass('ready');
		});
};
