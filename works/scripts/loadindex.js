var OMNI // the one thats gonna be filtered.
var OMNIBASE // backup that is reset to;
let loaded = false;
let viewindex = 0;
var glry = document.getElementById("gallery");
var thumbnailDir = "https://omnipresence.neocities.org/works/thumbnails/"


function prepImage(img, index, element) {
	// all thumbnails are the same name but jpg.
	thumbnailString = element["file"].replace("png", "jpg");
	thumbnailString = thumbnailString.replace("gif", "jpg");
	thumbnailString = thumbnailDir + thumbnailString;
	img.setAttribute("src", thumbnailString); 
	img.setAttribute("width", "256px");
	img.setAttribute("height", "256px");
	img.setAttribute("loading", "lazy");
	img.setAttribute("data-index", index);
	img.setAttribute("onclick", `viewImg(\"${element.file}\", ${JSON.stringify(element)}); setIndex(${index})`);
}


function renderThumbnails() {

	const startTime = performance.now();

	for(const[index, element] of OMNI.entries()) {
		var img = document.createElement("img");
		prepImage(img, index, element);
		glry.appendChild(img);
	}

	const endTime = performance.now();

	const elapsedTime = endTime - startTime;

	document.getElementById('perf').innerText = `${OMNI.length} image${OMNI.length != 1 ? "s" : ""} indexed in ${elapsedTime.toFixed(2)} milliseconds.`

}

//fetch('http://127.0.0.1:5500/works/index.json')
fetch('https://omnipresence.neocities.org/works/index.json')
	.then(res => res.json())
	.then((data) => {
		console.log("index.json loaded")
		OMNIBASE = data;
		OMNI = data;
		OMNI.reverse();
		loaded = true;
		renderThumbnails();
	}).catch(err => console.error(err));




function openIndex(i) {
	// viewImg defined in main.js
	viewImg(OMNI[i].file, OMNI[i]);
}

// step being +/- 1 or whatever for how much you want to jump the index
function indexCycle(step) {
	setIndex(viewindex + step)
	openIndex(viewindex);

	// also scroll into view the associated image;
	if(checkRes()) {return}   	// but Dont scroll on the nightmare res as this pushes the gallery over the viewport perm
	var element = document.querySelector(`[data-index="${viewindex}"]`);
	element.scrollIntoView({behavior: "smooth", block: "center"});

}

function setIndex(newIndex) {
	if(newIndex < 0) {
		newIndex = OMNI.length - 1;
	} else if (newIndex > OMNI.length - 1) {
		newIndex = 0;
	}
	viewindex = newIndex;
} 


function checkRes() {
  return window.matchMedia("(max-width: 1350px) and (orientation: landscape)").matches	  
}




/* put all the search code here too because I suck lol */

function wipeImages() {
	imgChildren = glry.querySelectorAll('img');
	imgChildren.forEach(function(img) {
		img.parentNode.removeChild(img);
	});
}

function resetOMNI() {
	OMNI = OMNIBASE;
}

function resetRender() {
	wipeImages();
	resetOMNI();
	renderThumbnails();
}

function nameFilter(term) {
	resetOMNI();
	wipeImages();
	try {
		OMNI = OMNI.filter((element) => {
			//return element.file.toLowerCase().match(term.toLowerCase());
			return element.file.toLowerCase().match(new RegExp(term.toLowerCase(), 'g'))
		})
	} catch (error) {
		console.error(error);
		document.getElementById('perf').innerText = `invalid string or regex query, please try again`
		return;
	}
	
	renderThumbnails();
}

function searchReset() {
	resetRender();
	document.getElementById('query').value = "";
}