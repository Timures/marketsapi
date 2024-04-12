$(document).ready(function () {
		initFAQ();
});

var initFAQ = function () {
		$('.faq').find('.el').each(function () {
				var el = $(this);
				var link = el.find('.h3');
				var text = el.find('.inner');

				link.on('click', function () {
						text.slideToggle(300, function () {
								el.toggleClass('open');
						});
				});
		});
};
