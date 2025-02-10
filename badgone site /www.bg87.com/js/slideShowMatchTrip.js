$(document).ready(function(){
	// Configuration
		  var retour = true;
		  var tempsTransition = 600;
		  var currentPosition = 0;
		  var slideWidth = 150;
		  var slides = $('.slideMatchTrip');
		  var numberOfSlides = slides.length;
		  var interval;
  // Supprime la scrollbar en JS
  $('#slideShowMatchTrip').css('overflow', 'hidden');

  // Attribue  #slideInner  à toutes les div .slide
  slides
    .wrapAll('<div id="slideInnerMatchTrip" ></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Longueur de #slideInner égale au total de la longueur de tous les slides
  $('#slideInnerMatchTrip').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slideShowMatchTrip')
    .prepend('<span class="controlMatchTrip" id="leftControlMatchTrip">Précédent</span>')
    .append('<span class="controlMatchTrip" id="rightControlMatchTrip">Suivant</span>');


  
  // Hide left arrow control on first load
  manageControls(currentPosition);

  //Crée un écouteur d'évènement de type clic sur les classes .control
  $('.controlMatchTrip')
    .bind('click', function(){
		
    // Determine la nouvelle position
	currentPosition = ($(this).attr('id')=='rightControlMatchTrip') ? currentPosition+1 : currentPosition-1;
    
	if(currentPosition == numberOfSlides && retour == false ){
		currentPosition--;
		pause();
	}
	
	// Cache ou montre les controles
    manageControls(currentPosition);
    // Fais bouger le slide
    $('#slideInnerMatchTrip').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    },tempsTransition);
  });

  // manageControls: Cache ou montre les flêches de controle en fonction de la position courante
  function manageControls(position){
    // Cache la fleche "précédent" si on est sur le premier slide
	if(position==0){ $('#leftControlMatchTrip').hide() } else{ $('#leftControlMatchTrip').show() }
	// Cache la fleche "suivant" si on est sur le dernier slide (et que le retour automatique n'est pas activé)
    if(position==numberOfSlides-1 && retour == false){
		$('#rightControlMatchTrip').hide();
	} else {
		$('#rightControlMatchTrip').show();
	}
	if(position == numberOfSlides && retour == true){
		currentPosition = 0;
		 $('#leftControlMatchTrip').hide();
	}
  }
  function suivant(){
	$('#rightControlMatchTrip').click();
	}

});
