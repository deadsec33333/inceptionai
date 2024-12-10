let tooltip = document.getElementById('tooltip');

var followCursor = (
	function () {
		var s = tooltip;
		s.style.position = 'fixed';

		return {
			init: function () {
				document.body.appendChild(s);
			},

			run: function (e) {
				var e = e || window.event;
				s.style.left = (e.clientX + 10) + 'px';
				s.style.top = (e.clientY + 15) + 'px';
				// s.innerText = (e.clientX);
			}
		};
	}());

window.onload = function () {
	followCursor.init();
	document.body.onmousemove = followCursor.run;
}


// divine coding right here I know.
function showTooltip(desc) {
    tooltip.style.visibility = "visible";
    tooltip.innerText = desc;
}
function hideTooltip() {
    tooltip.style.visibility = "hidden";
}


var cells = document.querySelectorAll('.cell')
cells.forEach((cell) => {
    var desc = cell.getAttribute('data-desc');
    cell.addEventListener('mouseover', () => {showTooltip(desc)});
    cell.addEventListener('mouseout', hideTooltip)
})