function toggleGallery(){
	gal = document.getElementById("gallery")
	gal.classList.contains('active') ? gal.classList.remove('active') : gal.classList.add('active');
}