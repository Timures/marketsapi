$(document).ready(function () {
		initModal();
});

var initModal = function () {
		if (!$('.modal-fader').length) {
				$('body').append('<div class="modal-fader"></div>')
		}

		var _closeModal = function () {
				$('.modal').removeClass('open');
				$('html').removeClass('open-modal');
		};

		$('.js_modal').on('click', function () {

				$('html').addClass('open-modal');
				$($(this).attr('href')).addClass('open');

				return false
		});

		$('.modal-fader, .modal .close').off().on('click', function () {
				_closeModal();
		});

		$(document).keyup(function (e) {
				if (e.keyCode === 27) {
						_closeModal();
				}
		})
};
