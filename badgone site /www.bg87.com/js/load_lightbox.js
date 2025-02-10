$(document).ready(function(){
  $('.menu_element .lightbox > a').lightBox();
  $('.picasa_album .lightbox > a').lightBox();
  $('.products_by_category a').lightBox();
  $('table.data .lightbox > a').lightBox();
  $('a.picasa_accueil').click(function(event){
    event.preventDefault();
    $('.picasa_album > li.lightbox > a').lightBox();
    $('.picasa_album > li.lightbox > a:first').click();
  });
});
