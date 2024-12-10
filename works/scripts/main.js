let mainImg = document.getElementById('THEIMAGE');
let imgContainer = document.getElementById('display')
let desc = document.getElementById('desc');
let currentInfo;

mainImg.onload = () => {
	console.log("Image Loaded")		
	imgContainer.setAttribute('data-state', '');
	desc.innerHTML = `<h1>${currentInfo.name}</h1> ${(currentInfo.version) ? "version: " + currentInfo.version + "<br>": ""} date: ${currentInfo.date}`;
}


function viewImg(source, info) {
	mainImg.src = "https://omnipresence.neocities.org/works/ALL/" + source;
	imgContainer.setAttribute('data-state', 'loading...')
	currentInfo = info;
}

