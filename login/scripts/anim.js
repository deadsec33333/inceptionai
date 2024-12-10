window.addEventListener('load', function() {
	var portal = document.getElementById('portal');
	var music = document.getElementById('music');
	var con = document.getElementById('con');


	/* you could tab into the form before even seeing it so we need to disable it b4 animation */
	usrIN = document.getElementById('username');
	pwIN = document.getElementById('password');
	loginButton = document.getElementById('login');

	usrIN.disabled = true;
	pwIN.disabled = true;
	loginButton.disabled = true;


	function startup() {
		con.classList.remove('hiddencon');
		music.play();
		usrIN.disabled = false;
		pwIN.disabled = false;
		loginButton.disabled = false;
	}

	
	portal.addEventListener('mousedown', () => {
		startup();
	})



	document.addEventListener('keydown', function(event) {
		if (event.key === 'Enter' || event.key === ' ' || event.key === 'Tab') {
			startup();
		}
	});


})


