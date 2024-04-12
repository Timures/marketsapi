$(document).ready(function () {
		initCopy();
});

var initCopy = function () {
		tippy(document.querySelectorAll('.js_copy'), {
				theme: 'small',
				maxWidth: 442,
				trigger: 'click',
				onShow(instance) {
						setTimeout(() => {
								instance.hide();
						}, 2000);
				}
		});

		$('.js_copy').on('click', function () {
				var el = $(this);
				var dest = $($(this).data('href'));
				var text;

				if (dest.prop("tagName") === 'INPUT' || dest.prop("tagName") === 'TEXTAREA') {
						text = dest.val();
				} else {
						text = dest.html();
				}

				var $temp = $("<textarea>");
				$("body").append($temp);
				$temp.val(text).select();
				document.execCommand("copy");
				$temp.remove();
		});


};
