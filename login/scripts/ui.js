window.addEventListener('load', function() {
	var uiAud = document.getElementById('uiAud');

	var btns = document.getElementsByClassName('btn');


	function playUISound() {
		uiAud.play();
	}


	for(button of btns) { 
		button.addEventListener('mouseover', playUISound)
	}

	/*this.document.getElementById('username').addEventListener('mouseover', playUISound)
	this.document.getElementById('password').addEventListener('mouseover', playUISound) */

})