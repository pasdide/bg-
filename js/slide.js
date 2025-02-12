var slideIndex = 1;
showDivs(slideIndex);

// Fonction pour changer de slide
function plusDivs(n) {
    showDivs(slideIndex += n);
}

// Affichage des cartes
function showDivs(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex-1].style.display = "block";
}