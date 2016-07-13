// Script for our facebook and contact sidebars slideout functionality

function setSidebarPosition(){
	//Set width$height vars
	var fbheight = $("#facebook_wrap").height();
	var fb_top = ($(window).height() - $("#facebook_wrap").outerHeight()) / 2;
	var contact_top = ($(window).height() - $("#contact_wrap").outerHeight()) / 2;
	//Set CSS style
	$('#facebook_wrap').css({
		'position': 'fixed',
		'top': fb_top,
	});
	$('#contact_wrap').css({
		'position': 'fixed',
		'top': contact_top,
	});
}

$(window).resize(function() {
	setSidebarPosition();
});

$(document).ready(function(e) {	
	var fb_sidebar = false;	
	var contact_sidebar = false;	
	setSidebarPosition();
		
	$("#fb_sideicon").bind('click', function() {
		if(fb_sidebar == false){
			$("#facebook").addClass('box_shadow_1');
			$("#fb_sideicon").addClass('sidebar_selected');
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
				$("#fb_sideicon").removeClass('sidebar_selected');
			});
			fb_sidebar = false;
		}
	});
	$("#contact_sideicon").bind('click', function() {
		if(contact_sidebar == false){
			$("#contact_form").addClass('box_shadow_1');
			$("#contact_sideicon").addClass('sidebar_selected');
			$("#contact_wrap").animate({
				right:'-1px',
				easing: 'easeOutBack'
			},650, function() {
				//Animation complete	
			});
			contact_sidebar = true;
		}else{
			$("#contact_wrap").animate({
				right:'-512px',
				easing: 'easeInBack'
			},650, function() {
				//Animation complete
				$("#contact_form").removeClass('box_shadow_1');
				$("#contact_sideicon").removeClass('sidebar_selected');
			});
			contact_sidebar = false;
		}
	});
	
	if(urlVar['contact'] == 'true'){
		if(contact_sidebar == false){
			$("#contact_form").addClass('box_shadow_1');
			$("#contact_sideicon").addClass('sidebar_selected');
			$("#contact_wrap").animate({
				right:'-1px',
				easing: 'easeOutBack'
			},650, function() {
				//Animation complete	
			});
			contact_sidebar = true;
		}else{
			$("#contact_wrap").animate({
				right:'-512px',
				easing: 'easeInBack'
			},650, function() {
				//Animation complete
				$("#contact_form").removeClass('box_shadow_1');
				$("#contact_sideicon").removeClass('sidebar_selected');
			});
			contact_sidebar = false;
		}
	}
	
	//This section handles all contact form validation and submission
	
	var sub_disable = false;
	$.validator.addMethod("accept", function(value, element, param) {
	  return value.match(new RegExp("." + param + "$"));
	});
	var validator = $("#c_form").validate({
		rules: {
			fullname: {
				required: true,
				maxlength:24,
				minlength:2,
				accept: "[a-zA-Z ]+"
			},
			email: {
				email: true,
				required: true,
				maxlength:48
			},
			subject: {
				required: true,
				maxlength:64
			},
			message: {
				required: true,
				maxlength:500
			},
		},
		messages: {
			fullname: {
				required: "We'd like to know your full name for courtesy's sake.",
				maxlength:"Your name seems a little long. The ,=max length is 32 characters.",
				maxlength:"Your name seems a bit short. The minimum length is 2 characters",
				accept:"Letters only please."
			},
			email: {
				email: "This does not appear to be a valid email.",
				required: "Leave an email so we can get back to you.",
				maxlength: "Emails should not be more than 48 characters."
			},
			subject: {
				required: "Let us know what it is you want us to know about.",
				maxlength: "Just a brief description will do. The max is 64 characters."
			},
			message: {
				required: "We'd love to hear from you, just type your message right here.",
				maxlength:"Please widdle your message down a bit. The max is 500 characters."
			},
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.siblings('.input_error'));
		},
		errorElement: "em",
		submitHandler: function(form) {
			$('#form_ajax').show();
			sub_disable = true;
			$("#contact_submit").addClass('sub_disable');
			$("#server_val span").html('');
			var fullname = $('#fullname').val();
			var email = $('#email').val();
			var subject = $('#subject').val();
			var message = $('#message').val();
			
			var dataSet = 'fullname='+fullname+'&email='+email+'&subject='+subject+'&message='+message;
			alert(dataSet);
			$.ajax({
				type: 'POST',
				url: "/scripts/php/app/contact_submit.php",
				data: dataSet,
				success: function(msg){
					$('#form_ajax').hide();
					if(msg == "Success"){
						$("#server_val span").removeClass('val_error');
						$("#server_val span").addClass('val_success');
						$("#server_val").show();
						$("#server_val span").append("Thanks! We'll get back to you soon.");
						var t = setTimeout(function(){
							redirect();
						},3000);
					}else if(msg == "Error"){
						$("#server_val span").addClass('val_error');
						$("#server_val span").removeClass('val_success');
						$("#server_val").show();						
						$("#server_val span").append("We are experiencing technical difficulties right now. Please try again in a bit.");
						sub_disable = false;
						$("#contact_submit").removeClass('sub_disable');
					}else{
						$("#server_val span").addClass('val_error');
						$("#server_val span").removeClass('val_success');
						$("#server_val").show();
						$("#server_val span").append(msg);
						sub_disable = false;
						$("#contact_submit").removeClass('sub_disable');
					}
				}
			});	
		}
	});
	var is_validated = false;
	$('#c_form').find('.user_input').each(function(){
		var id = $(this).attr('id');
			$('#'+id).bind("focusout",function() {
				validator.element('#'+id);
				if($(this).hasClass('valid')){
					if($(this).val() == '' && $(this).hasClass('not_req')){
						//Empty but not required, don't show check.
						$(this).siblings('.input_success').hide();
					}else{
						$(this).siblings('.input_error em').html('');
						$(this).siblings('.input_success').show();
					}
				}else if($(this).hasClass('error')){
					$(this).siblings('.input_success').hide();
					$(this).siblings('.input_error').show();
				}else{
					$(this).siblings('.input_success').hide();
				}
			});
	})
	$("#contact_submit").bind('click', function() {
		is_validated = true;
		$('#c_form').find('.user_input').each(function(){
			validator.form("#c_form");
			if($(this).hasClass('valid')){
					$(this).siblings('.input_error em').html('');
				$(this).siblings('.input_success').show();
			}else if($(this).hasClass('error')){
				$(this).siblings('.input_success').hide();
				$(this).siblings('.input_error').show();
			}else{
				$(this).siblings('.input_success').hide();
			}
		});
		if(sub_disable == false){
			$("#c_form").submit();
		}
	});
});
