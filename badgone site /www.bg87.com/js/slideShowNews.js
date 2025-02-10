$(document).ready(function(){
	// Configuration
		  var retour = true;
		  var tempsTransition = 600;
		  var tempsAttente = 6000;	
		  var currentPosition = 0;
		  var slideWidth = 940;
		  var slides = $('#slide_show_news > div.news_slide');
		  var numberOfSlides = slides.length;
		  var interval;
		  var lectureEnCours = true;
		  
  // Supprime la scrollbar en JS
  $('#slide_show_news').css('overflow', 'hidden');

  // Attribue  #slideInner  à toutes les div .slide
  slides
    .wrapAll('<div id="slideInnerNews" ></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Longueur de #slideInner égale au total de la longueur de tous les slides
  $('#slideInnerNews').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slide_show_news')
    .prepend('<span class="controlNews" id="leftControlNews">Précédent</span><span class="controlNews" id="pauseControlNews">Pause</span><span class="controlNews" id="playControlNews">Play</span>')
    .append('<span class="controlNews" id="rightControlNews">Suivant</span>');


  
  // Hide left arrow control on first load
  manageControls(currentPosition);
  
  //On lance l'animation du slideshow
  start();

  //Crée un écouteur d'évènement de type clic sur les classes .control
  $('.controlNews')
    .bind('click', function(){
		
    // Determine la nouvelle position
	currentPosition = ($(this).attr('id')=='rightControlNews') ? currentPosition+1 : (($(this).attr('id')=='leftControlNews') ? currentPosition-1 : currentPosition);
    
	if(($(this).attr('id')=='pauseControlNews') || ($(this).attr('id')=='playControlNews'))
	{
		pause();	
	}
	
	if(currentPosition == numberOfSlides && retour == false ){
		currentPosition--;
		pause();
	}
	
	// Cache ou montre les controles
    manageControls(currentPosition);
    // Fais bouger le slide
    if(lectureEnCours == true){
	    $('#slideInnerNews').animate({
	      'marginLeft' : slideWidth*(-currentPosition)
	    },tempsTransition);
    }
  });

  // manageControls: Cache ou montre les flêches de controle en fonction de la position courante
  function manageControls(position){
    // Cache la fleche "précédent" si on est sur le premier slide
	if(position==0){ $('#leftControlNews').hide() } else{ $('#leftControlNews').show() }
	// Cache la fleche "suivant" si on est sur le dernier slide (et que le retour automatique n'est pas activé)
    if(position==numberOfSlides-1 && retour == false){
		$('#rightControlNews').hide();
	} else {
		$('#rightControlNews').show();
	}
	if(position == numberOfSlides && retour == true){
		currentPosition = 0;
		 $('#leftControlNews').hide();
	}
	
	if(lectureEnCours == true)
	{
	  $('#playControlNews').hide();
	  $('#pauseControlNews').show();
	}
	else
	{
	  $('#playControlNews').show();
	  $('#pauseControlNews').hide();
	}
  }
  function suivant(){
	$('#rightControlNews').click();
	}
  function start() {
  	lectureEnCours = true;
    interval = setInterval(suivant, tempsAttente );
  }
  function pause() {
	if(lectureEnCours == true)
    {
	  lectureEnCours = false;
	  clearInterval(interval);
    }
	else
	{
	  lectureEnCours = true;
	  interval = setInterval(suivant, tempsAttente );
	}
  }

});
