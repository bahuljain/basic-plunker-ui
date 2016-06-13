angular.module('mc.resizer', []).directive('resizer', function($document) {
	
	return function($scope, $element, $attrs) {
		$element.on('mousedown', function(event) {
			event.preventDefault();

			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		});

		function perToPx(percentage) {
			return (percentage / 100 * $($attrs.resizerBody).width());
		}

		// Handle mouse movements
		function mousemove(event) {
			var max = perToPx(parseInt($attrs.resizerMax));
			var min = perToPx(parseInt($attrs.resizerMin));

			if ($attrs.resizer == 'vertical') {
				// Handle vertical resizer
				var x = event.pageX;
				
				if ($attrs.resizerMax && x > max) {
					x = max;
				}

				if ($attrs.resizerMin && x < min) {
					x = min;		
				}

				$element.css({
					left: x + 'px'
				});

				$($attrs.resizerLeft).css({
					width: x + 'px'
				});
			} else {
				// Handle horizontal resizer
				var y = window.innerHeight - event.pageY;

				$element.css({
					bottom: y + 'px'
				});

				$($attrs.resizerTop).css({
					bottom: (y + parseInt($attrs.resizerHeight)) + 'px'
				});
				$($attrs.resizerBottom).css({
					height: y + 'px'
				});
			}
		}

		function mouseup() {
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
		}
	};
});
