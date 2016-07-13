//This script handles all our navbar programming
					
$('#services, #services_links').mouseover( function() {
	$('#services_links').show();
	$('#services').addClass('servicesHover');
});
$('#services, #services_links').mouseleave( function() {
	$('#services_links').hide();
	$('#services').removeClass('servicesHover');
});

$(document).ready(function() {
   var pathname = window.location.pathname;
   
   $('.navLink').each(function(){
       var test = $(this).attr('href');
       if (test == pathname){
           $(this).addClass('active_link');
       }
   });
});