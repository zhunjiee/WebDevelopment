function animate(element, target) {
	clearInterval(element.timeId);
	element.timeId = setInterval(function() {
		var step = 20;
		var current = element.offsetLeft;
		step = current > target ? -step : step;
		current += step;
		if(Math.abs(current - target) > Math.abs(step)) {
			element.style.left = current + 'px';
		} else {
			clearInterval(element.timeId);
			element.style.left = target + 'px';
		}
	}, 10);
}