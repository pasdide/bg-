$(document).ready(function(){
	// Configuration
		  var retour = true;
		  var tempsTransition = 600;
		  var tempsAttente = 3000;	
		  var currentPosition = 0;
		  var slideWidth = 160;
		  var slides = $('#slide_show_product > div');
		  var numberOfSlides = slides.length;
		  var interval;
		  var lectureEnCours = true;
  // Supprime la scrollbar en JS
  $('#slide_show_product').css('overflow', 'hidden');

  // Attribue  #slideInner  à toutes les div .slide
  slides
    .wrapAll('<div id="slideInnerProduct" ></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Longueur de #slideInner égale au total de la longueur de tous les slides
  $('#slideInnerProduct').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slide_show_product')
    .prepend('<span class="controlProduct" id="leftControlProduct">Précédent</span>')
    .append('<span class="controlProduct" id="rightControlProduct">Suivant</span>');


  
  // Hide left arrow control on first load
  manageControls(currentPosition);

  //Crée un écouteur d'évènement de type clic sur les classes .control
  $('.controlProduct')
    .bind('click', function(){
		
    // Determine la nouvelle position
	currentPosition = ($(this).attr('id')=='rightControlProduct') ? currentPosition+1 : currentPosition-1;
    
	if(currentPosition == numberOfSlides && retour == false ){
		currentPosition--;
		pause();
	}
	
	// Cache ou montre les controles
    manageControls(currentPosition);
    // Fais bouger le slide
    if(lectureEnCours == true){
	    $('#slideInnerProduct').animate({
	      'marginLeft' : slideWidth*(-currentPosition)
	    },tempsTransition);
    }
  });

  // manageControls: Cache ou montre les flêches de controle en fonction de la position courante
  function manageControls(position){
    // Cache la fleche "précédent" si on est sur le premier slide
	if(position==0){ $('#leftControlProduct').hide() } else{ $('#leftControlProduct').show() }
	// Cache la fleche "suivant" si on est sur le dernier slide (et que le retour automatique n'est pas activé)
    if(position==numberOfSlides-1 && retour == false){
		$('#rightControlProduct').hide();
	} else {
		$('#rightControlProduct').show();
	}
	if(position == numberOfSlides && retour == true){
		currentPosition = 0;
		 $('#leftControlProduct').hide();
	}
  }
  function suivant(){
	$('#rightControlProduct').click();
	}
  function start() {
  	lectureEnCours = true;
    interval = setInterval(suivant, tempsAttente );
  }
  function pause() {
  	lectureEnCours = false;
   clearInterval(interval);
  }

});
