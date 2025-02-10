$(document).ready(function(){
	// Configuration
		  var retour = true;
		  var tempsTransition = 600;
		  var affichePlayPause = true;
		  var lectureAutomatique = false;
		  var tempsAttente = 3000;
		  var currentPosition = 0;
		  var slideWidth = 150;
		  var slides = $('.slidePerm');
		  var numberOfSlides = slides.length;
		  var interval;
		  var lectureEnCours = false;
  // Supprime la scrollbar en JS
  $('#slideShowPerm').css('overflow', 'hidden');

  // Attribue  #slideInner  à toutes les div .slide
  slides
    .wrapAll('<div id="slideInnerPerm" ></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Longueur de #slideInner égale au total de la longueur de tous les slides
  $('#slideInnerPerm').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slideShowPerm')
    .prepend('<span class="controlPerm" id="leftControlPerm">Précédent</span>')
    .append('<span class="controlPerm" id="rightControlPerm">Suivant</span>');


  
  // Hide left arrow control on first load
  manageControls(currentPosition);

  // Crée un écouteur d'évènement de type clic sur les classes .control
  $('.controlPerm')
    .bind('click', function(){
		
    // Determine la nouvelle position
	currentPosition = ($(this).attr('id')=='rightControlPerm') ? currentPosition+1 : currentPosition-1;
    
	if(currentPosition == numberOfSlides && retour == false ){
		currentPosition--;
		pause();
	}
	
	// Cache ou montre les controles
    manageControls(currentPosition);
    // Fais bouger le slide
    $('#slideInnerPerm').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    },tempsTransition);
  });

  // manageControls: Cache ou montre les flêches de controle en fonction de la position courante
  function manageControls(position){
    // Cache la fleche "précédent" si on est sur le premier slide
	if(position==0){ $('#leftControlPerm').hide() } else{ $('#leftControlPerm').show() }
	// Cache la fleche "suivant" si on est sur le dernier slide (et que le retour automatique n'est pas activé)
    if(position==numberOfSlides-1 && retour == false){
		$('#rightControlPerm').hide();
	} else {
		$('#rightControlPerm').show();
	}
	if(position == numberOfSlides && retour == true){
		currentPosition = 0;
		 $('#leftControlPerm').hide();
	}
  }
  function suivant(){
	$('#rightControlPerm').click();
	}

});
