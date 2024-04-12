$(document).ready(function () {
		initPersonal();
});

var initPersonal = function () {
		const swiper = new Swiper('.prolong-slider', {
				slidesPerView: 1,
				speed: 300,
				initialSlide: 2,
				navigation: {
						nextEl: '.prolong-slider-plus',
						prevEl: '.prolong-slider-minus',
				},
		});
};
