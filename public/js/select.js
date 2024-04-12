$(document).ready(function () {
		initSelect();
});

var initSelect = function () {
		jcf.setOptions('Select', {
				wrapNative: false,
				wrapNativeOnMobile: true,
				maxVisibleItems: 10
		});

		jcf.replaceAll();
};
