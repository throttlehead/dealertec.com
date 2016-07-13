// Script for our facebook sidebar slideout functionality

function setFbPosition(){
	//Set width$height vars
	var fbheight = $("#facebook_wrap").height();
	var top = ($(window).height() - $("#facebook_wrap").outerHeight()) / 2;
	//Set CSS style
	$('#facebook_wrap').css({
		'position': 'fixed',
		'top': top,
	});
}

$(window).resize(function() {
	setFbPosition();
});

$(document).ready(function(e) {	
	var fb_sidebar = false;	
	
	setFbPosition();
		
	$("#fb_sideicon").bind('click', function() {
		if(fb_sidebar == false){
			$("#facebook").addClass('box_shadow_1');
			$("#facebook_wrap").animate({
				left:'-1px',
				easing: 'easeOutBack'
			},500, function() {
				//Animation complete	
			});
			fb_sidebar = true;
		}else{
			$("#facebook_wrap").animate({
				left:'-292px',
				easing: 'easeInBack'
			},500, function() {
				//Animation complete
			$("#facebook").removeClass('box_shadow_1');
			});
			fb_sidebar = false;
		}
	});
});
