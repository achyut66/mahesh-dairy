(function ($) {

	$(window).on('elementor/frontend/init', function () {

		//Time range condition cookie.
		var localTimeZone = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1],
			isSecured = (document.location.protocol === 'https:') ? 'secure' : '';

		if (-1 != localTimeZone.indexOf("(")) {
			localTimeZone = localTimeZone.split('(')[0];
		}

		document.cookie = "localTimeZone=" + localTimeZone + ";SameSite=Strict;" + isSecured;

		var premiumDisplayConditionsHandler = function ($scope) {

			if (!$scope.hasClass('pa-display-conditions-yes'))
				return;

			var isEditMode = elementorFrontend.isEditMode();

			if (isEditMode) {

				$scope.append('<div class="pa-display-conditions-label">DC</div>');

				$scope.find('.pa-display-conditions-label').on('click', function (e) {

					window.PAWidgetsEditor.activateControlsTab('section_pa_display_conditions', 'advanced');

				});

			} else {

				var action = $scope.data('returning-condition');

				if (!action)
					return;

				// If cookie exists, then a returning visitor.
				var isReturningVisitor = cookieExists('isReturningVisitor' + elementorFrontend.config.post.id);

				// If returning visitor and action is hide.
				if (isReturningVisitor) {

					if ('hide' === action) {
						$scope.hide();
					} else {
						$scope.removeClass('elementor-hidden');
					}

				} else {
					$scope.removeClass('elementor-hidden');
				}


				// Returning User condition cookie.
				if (elementorFrontend.config.post.id && action)
					document.cookie = "isReturningVisitor" + elementorFrontend.config.post.id + "=true;expires=Fri, 31 Dec 2030 23:59:59 GMT;SameSite=Strict;" + isSecured;


				function cookieExists(name) {
					return document.cookie.split(';').some(function (cookie) {
						return cookie.trim().startsWith(name + '=');
					});

				}

			}

		};

		elementorFrontend.hooks.addAction("frontend/element_ready/global", premiumDisplayConditionsHandler);

	});

})(jQuery);
