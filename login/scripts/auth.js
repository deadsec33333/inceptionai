// go ahead, ruin the magic...
// this actually does go somewhere though :^)



function failure() {
	let root = document.documentElement;
	let con = document.getElementById('con')
	con.classList.add('incorrect'); // trigger animation.

	root.style.setProperty('--overlaycolor', 'var(--fail)');
	document.getElementById('pain').classList.add('acc');
	document.getElementById('pain').classList.add('fire');

	document.getElementById('AOU').play();
	setTimeout(() => {reset()}, 1800); // hard timeout to wait for animation lol.
}

function success(username, password) {
	document.getElementById('AIN').play();
	document.getElementById('pain').classList.add('acc');
	setTimeout(() => {window.open(`https://omnipresence.neocities.org/sibylshade/${username}/${password}`, "_self")}, 1500);
}

function reset() {
	/* was originally gonna do other stuff but a hard refresh is easier and prevents people from spamming neocities with passwords */
	location.reload();
}

// prevent authlocking
window.onpageshow = function(event) { if (event.persisted) {window.location.reload();}}



function auth(username, password) {

	var req = new XMLHttpRequest(), ctx = `//omnipresence.neocities.org/sibylshade/${username}/${password}`

	// note: this be async lol
	req.open('get', ctx, true);

	req.onreadystatechange = verify;

	function verify() {
		if (req.readyState === 4) {
			if((req.status == 200) || (req.status == 0)) {
				success(username, password);
			} else {
				failure();
			}
		}
	}

	req.send(null);
}
