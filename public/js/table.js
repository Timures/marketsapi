$(document).ready(function () {
		simpleTabs();
		initTable();
});

var simpleTabs = function () {
		$('.js_tabs').each(function () {
				var allLinks = $(this).find('a[href^="#"]');
				var allContent = [];

				$(this).find('.active').each(function () {
						$('*[data-id="' + $(this).attr('href') + '"]').addClass('visible');
				});

				allLinks.each(function () {
						allContent.push($('*[data-id="' + $(this).attr('href') + '"]'));

						var link = $(this);
						var text = $('*[data-id="' + link.attr('href') + '"]');

						link.on('click', function () {
								if (!link.hasClass('active')) {
										allLinks.removeClass('active');
										$.each(allContent, function () {
												this.removeClass('visible');
										});

										link.addClass('active');
										text.addClass('visible');
								}

								return false;
						});
				});


		});
};

var initTable = function () {
		$('.table').each(function () {
				var hold = $(this);
				var swiperTable;
				var breakpoint = window.matchMedia('(min-width:1000px)');
				var version = hold.find('.table-version');


				var _destroy = function () {
						hold.removeClass('mobile desktop slide1 slide2');

						if ($('.table-resizeable-left').resizable()) {
								$('.table-resizeable-left').resizable('destroy');
						}
						if ($('.table-resizeable-right').resizable()) {
								$('.table-resizeable-right').resizable('destroy');
						}

						if (swiperTable !== undefined) {
								swiperTable.destroy(true, true);
						}
				};

				var _runMobile = function () {
						hold.addClass('mobile');
						version.prependTo(hold.find('.table-resizeable-left > .table-content'));
						swiperTable = new Swiper('.slider-table', {
								slidesPerView: 1,
								speed: 300,
								navigation: {
										nextEl: '.slider-table-next',
										prevEl: '.slider-table-prev',
								},
								focusableElements: 'input, select, option, textarea, button, video, label, a, .jcf-select-text',
								on: {
										slidePrevTransitionStart: function () {
												hold.removeClass('slide' + (swiperTable.activeIndex + 1));
										},
										slideNextTransitionStart: function () {
												hold.addClass('slide' + swiperTable.activeIndex);
										}
								}
						});

						$('.slider-table-start').off().on('click', function () {
								swiperTable.slideTo(0);
								hold.removeClass('slide1 slide2');
						});
				};

				var _runDesktop = function () {
						hold.addClass('desktop');
						version.prependTo(hold);
						$('.table-resizeable-left').resizable({
								handles: 'e'
						});
						$('.table-resizeable-right').resizable({
								handles: 'w'
						});
				};

				var breakpointChecker = function () {
						if (breakpoint.matches === false) {
								_destroy();
								_runMobile();
						} else if (breakpoint.matches === true) {
								_destroy();
								_runDesktop();
						}
				};

				breakpoint.addListener(breakpointChecker);
				breakpointChecker();

		});

		$('.table-folded').each(function () {
				var el = $(this);
				var link = el.find('.head');
				var text = el.find('.inner');

				link.on('click', function () {
						text.slideToggle(300, function () {
								el.toggleClass('open');
						});
				});
		});

		$('.table-code').find('li').has('ul').each(function () {
				var el = $(this);
				var link = el.find('> *:not(ul)');

				link.on('click', function () {
						el.toggleClass('open');
				});
		});

		tippy(document.querySelectorAll('.js_copy-table-code'), {
				theme: 'small',
				maxWidth: 442,
				trigger: 'click',
				onShow(instance) {
						setTimeout(() => {
								instance.hide();
						}, 2000);
				}
		});

		$('.js_copy-table-code').on('click', function () {
				var text = $('.table-tab-content.visible > * > * > pre.table-code').html();

				var $temp = $("<textarea>");
				$("body").append($temp);
				$temp.val(text).select();
				document.execCommand("copy");
				$temp.remove();
		});
};
