$(document).ready(function(){
	
	function changeValues()
	{
		var selected = parseInt($('#contact_dest').val())
		
		$.ajax({
            url: 'contact/render_text/'+selected,
            async: false,
            type: "POST",
            success: function(text){ 
            	document.getElementById("contact_text").value=unescapeHtml(text).trimLeft()
            }
        });
        
        $.ajax({
            url: 'contact/render_object/'+selected,
            async: false,
            type: "POST",
            success: function(text){ 
            	document.getElementById("contact_subject").value=unescapeHtml(text).trimLeft()
            }
        });
	}
	
	changeValues();

	$('#contact_dest').change(function() {
		changeValues();
    });

});

function unescapeHtml(safe) {
    return safe.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}
