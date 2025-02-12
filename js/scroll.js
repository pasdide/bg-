window.addEventListener("scroll", function() {
    var navbar = document.querySelector(".boutons_pages");
    if (window.scrollY > 50) { // Si l'utilisateur scroll de plus de 50px
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
