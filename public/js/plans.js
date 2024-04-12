$(document).ready(function () {
		initPlans();
});

var initPlans = function () {
		var swiperPlans = new Swiper('.plans-slider', {
				slidesPerView: 'auto',
				freeMode: true,
				speed: 200,
				focusableElements: 'input, select, option, textarea, button, video, label, a, .pic-help'
		});

		swiperPlans.on('slideChange', function () {
				tippy.hideAll();
		});

		$('.plans').find('.trigger').on('click', function () {
				$(this).closest('.plans').toggleClass('yearly');
		});
};
