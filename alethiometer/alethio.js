var eye = document.getElementById("eye");
var hex1 = document.getElementById("hex1")
var hex2 = document.getElementById("hex2")
var diamond = document.getElementById("diamond")
var runes = document.getElementById("outerRunes");
var tooltip = document.getElementById('tooltip');

// stupid damned tracking var used to swap between animation states.
var rt = false;


// do this for the initial animation
eye.classList.add("noclick")
setTimeout(() => { eye.classList.remove("noclick") }, 5000)

// Based on https://www.wisdomportal.com/IChing/IChing-Wilhelm.html (Wilhelm/Baynes) translation
const hexagrams = [
	{ symbol: '\u4DC0', name: 'The Creative' },
	{ symbol: '\u4DC1', name: 'The Receptive' },
	{ symbol: '\u4DC2', name: 'Difficulty at the Beginning' },
	{ symbol: '\u4DC3', name: 'Youthful Folly' },
	{ symbol: '\u4DC4', name: 'Waiting (Nourishment)' },
	{ symbol: '\u4DC5', name: 'Conflict' },
	{ symbol: '\u4DC6', name: 'The Army' },
	{ symbol: '\u4DC7', name: 'Holding Together [union]' },
	{ symbol: '\u4DC8', name: 'The Taming Power of the Small' },
	{ symbol: '\u4DC9', name: 'Treading [conduct]' },
	{ symbol: '\u4DCA', name: 'Peace' },
	{ symbol: '\u4DCB', name: 'Standstill [Stagnation]' },
	{ symbol: '\u4DCC', name: 'Fellowship with Men' },
	{ symbol: '\u4DCD', name: 'Possession in Great Measure' },
	{ symbol: '\u4DCE', name: 'Modesty' },
	{ symbol: '\u4DCF', name: 'Enthusiasm' },
	{ symbol: '\u4DD0', name: 'Following' },
	{ symbol: '\u4DD1', name: 'Work on what has been spoiled [ Decay ]' },
	{ symbol: '\u4DD2', name: 'Approach' },
	{ symbol: '\u4DD3', name: 'Contemplation (View)' },
	{ symbol: '\u4DD4', name: 'Biting Through' },
	{ symbol: '\u4DD5', name: 'Grace' },
	{ symbol: '\u4DD6', name: 'Splitting Apart' },
	{ symbol: '\u4DD7', name: 'Return (The Turning Point)' },
	{ symbol: '\u4DD8', name: 'Innocence (The Unexpected)' },
	{ symbol: '\u4DD9', name: 'The Taming Power of the Great' },
	{ symbol: '\u4DDA', name: 'Corners of the Mouth (Providing Nourishment)' },
	{ symbol: '\u4DDB', name: 'Preponderance of the Great' },
	{ symbol: '\u4DDC', name: 'The Abysmal (Water)' },
	{ symbol: '\u4DDD', name: 'The Clinging, Fire' },
	{ symbol: '\u4DDE', name: 'Influence (Wooing)' },
	{ symbol: '\u4DDF', name: 'Duration' },
	{ symbol: '\u4DE0', name: 'Retreat' },
	{ symbol: '\u4DE1', name: 'The Power of the Great' },
	{ symbol: '\u4DE2', name: 'Progress' },
	{ symbol: '\u4DE3', name: 'Darkening of the light' },
	{ symbol: '\u4DE4', name: 'The Family [The Clan]' },
	{ symbol: '\u4DE5', name: 'Opposition' },
	{ symbol: '\u4DE6', name: 'Obstruction' },
	{ symbol: '\u4DE7', name: 'Deliverance' },
	{ symbol: '\u4DE8', name: 'Decrease' },
	{ symbol: '\u4DE9', name: 'Increase' },
	{ symbol: '\u4DEA', name: 'Break-through (Resoluteness)' },
	{ symbol: '\u4DEB', name: 'Coming to Meet' },
	{ symbol: '\u4DEC', name: 'Gathering Together [Massing]' },
	{ symbol: '\u4DED', name: 'Pushing Upward' },
	{ symbol: '\u4DEE', name: 'Oppression (Exhaustion)' },
	{ symbol: '\u4DEF', name: 'The Well' },
	{ symbol: '\u4DF0', name: 'Revolution (Molting)' },
	{ symbol: '\u4DF1', name: 'The Cauldron' },
	{ symbol: '\u4DF2', name: 'The Arousing (Shock, Thunder)' },
	{ symbol: '\u4DF3', name: 'Keeping Still, Mountain' },
	{ symbol: '\u4DF4', name: 'Development (Gradual Progress)' },
	{ symbol: '\u4DF5', name: 'The Marrying Maiden' },
	{ symbol: '\u4DF6', name: 'Abundance [Fullness]' },
	{ symbol: '\u4DF7', name: 'The Wanderer' },
	{ symbol: '\u4DF8', name: 'The Gentle (The Penetrating, Wind)' },
	{ symbol: '\u4DF9', name: 'The Joyous, Lake' },
	{ symbol: '\u4DFA', name: 'Dispersion [Dissolution]' },
	{ symbol: '\u4DFB', name: 'Limitation' },
	{ symbol: '\u4DFC', name: 'Inner Truth' },
	{ symbol: '\u4DFD', name: 'Preponderance of the Small' },
	{ symbol: '\u4DFE', name: 'After Completion' },
	{ symbol: '\u4DFF', name: 'Before Completion' }	
]

/* for(hexagram of hexagrams) {
	console.log(hexagram.symbol + " " + hexagram.name);
} */

const changeRunes = () => {
	for (const child of runes.children) {
		var select = Math.floor(Math.random() * 64);
		child.innerHTML = hexagrams[select].symbol // innerText doesnt work
		child.dataset.rune = select;
	}
}

const fadeRunes = () => {
	runes.classList.remove("fadeIn");
	runes.classList.remove("fadeOut");
	runes.classList.remove("delayedFade");
	runes.classList.add("fadeOut");
	setTimeout(() => {
		changeRunes();
		runes.classList.remove("fadeOut");
		runes.classList.add("fadeIn");
	}, 1500)
}

// Used by the tooltip
const printRune = (rune) => {
	var runeIndex = rune.dataset.rune;
	//console.log(`${runeIndex} : ${hexagramNames[runeIndex]}`);
	tooltip.style.display = "block";
	tooltip.innerText = hexagrams[runeIndex].name;
}

const hideRuneTooltip = () => {
	tooltip.style.display = "none";
}

const openHex = (rune) => {
	window.open(`https://www.wisdomportal.com/IChing/IChing-Wilhelm.html#${parseInt(rune.dataset.rune) + 1}`);
}


// this is potentially the worst fucking thing ive ever done.
const rotSwap = () => {

	eye.classList.add("noclick")
	setTimeout(() => { eye.classList.remove("noclick") }, 2500)

	if (!rt) {
		hex2.classList.remove("hexout")
		hex1.classList.remove("hexreturn")


		hex1.classList.add("hexout")
		hex2.classList.add("hexreturn")

		diamond.classList.remove("inspin")
		diamond.classList.add("basicspin")

		rt = true;
	} else {
		hex1.classList.remove("hexout")
		hex2.classList.remove("hexreturn")

		hex2.classList.add("hexout")
		hex1.classList.add("hexreturn")

		diamond.classList.remove("basicspin")
		diamond.classList.add("inspin")


		rt = false;
	}

	fadeRunes();

}

eye.addEventListener("click", rotSwap)

changeRunes(); // random runes on init

// add event listeners to the hexagrams that will call the name tooltip
for (const child of runes.children) {
	//child.addEventListener("mouseover", function () {printRune(child)});
	child.onmouseover = function () { printRune(child) }
	child.onmouseleave = hideRuneTooltip;
	child.addEventListener("click", function () {openHex(child)})
}


// shamelessly stolen from https://gist.github.com/RichardMcCaulskyClarke/0838e9e667f11684463728469e124896
// used for the tooltip

var followCursor = (
	function () {
		var s = tooltip;
		s.style.position = 'absolute';

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

/* 
document.addEventListener('mousemove', function(event) {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    var cursorX = event.clientX;
    var cursorY = event.clientY;

    var distanceXFromCenter = Math.abs(cursorX - screenWidth / 2);
    var distanceYFromCenter = Math.abs(cursorY - screenHeight / 2);

    // Calculate the maximum distance from the center (from one corner of the screen to the center)
    var maxDistance = Math.sqrt(Math.pow(screenWidth / 2, 2) + Math.pow(screenHeight / 2, 2));

    // Calculate the percentage
    var percentageFromCenterX = (1 - distanceXFromCenter / (screenWidth / 2)) * 100;
    var percentageFromCenterY = (1 - distanceYFromCenter / (screenHeight / 2)) * 100;

    // Average out the percentage from X and Y axes
    var overallPercentageFromCenter = (percentageFromCenterX + percentageFromCenterY) / 2;

    console.log("Percentage from center: " + overallPercentageFromCenter + "%");


	var eye = document.getElementById("eyeball");

	var scaleAmount = 1 + (overallPercentageFromCenter / 432)

	eye.style.transform = `scale(${scaleAmount})`;


}); */