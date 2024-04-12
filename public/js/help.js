$(document).ready(function () {
		initHelp();
});

var initHelp = function () {
		var instance = tippy(document.querySelectorAll('.pic-help'), {
				theme: 'light',
				maxWidth: 442
		});
};
