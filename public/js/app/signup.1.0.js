//Script handles everything for signup form

$(document).ready(function(){
	$('#login_click').bind('click', function(){
		$('html, body').animate({
			scrollTop: $("#login").offset()
		}, 100);
		$('#loginemail').focus();	
	});
});

//Set up form validation

var sub_disable = false;

$.validator.addMethod("noSpace", function(value, element) { 
return value.indexOf(" ") < 0 && value != ""; 
}, "Cannot contain any spaces");
$.validator.addMethod("accept", function(value, element, param) {
  return value.match(new RegExp("." + param + "$"));
});

var validator = $("#signup_form").validate({
	debug:true,
	rules: {
		fname: {
			required: true,
			maxlength:24,
			minlength:2,
			noSpace: true,
			accept: "[a-zA-Z]+",
		},
		lname: {
			required: true,
			maxlength:24,
			minlength:2,
			noSpace: true,
			accept: "[a-zA-Z]+",
		},
		email: {
			email: true,
			required: true,
			maxlength: 32
		},
		cemail: {
			required:true,
			maxlength:32,
			equalTo:'#email'
		},
		pass: {
			required: true,
			maxlength:24,
			minlength:8,
			noSpace: true,
			password:true
		},
	},
	messages: {
		fname: {
			required: "First name is required.",
			maxlength:"Max length is 24 characters.",
			noSpace: "Your name cannot contain any spaces.",
			accept:"Names can only consist of letters.",
			minlength:"Mimimum length is 2 characters."
		},
		lname: {
			required: "Last name is required.",
			maxlength:"Max length is 24 characters.",
			noSpace:"Your name cannot contain any spaces.",
			accept:"Names can only consist of letters.",
			minlength:"Mimimum length is 2 characters."
		},
		email: {
			email: "This does not appear to be a valid email.",
			required: "An email is required.",
			maxlength: "Max length is 24 charcters."
		},
		cemail: {
			required:"Please confirm your email address.",
			equalTo:"The emails do not match."
		},
		pass: {
			required: "Please enter a password",
			maxlength:"Max length is 24 characters.",
			noSpace: "Your password cannot contain any spaces.",
			minlength:"Mimimum length is 8 characters.",
			password:"Your password must be at least 8 characters long and should consist of capitals, lowercases, and numbers."
		},
	},
	errorPlacement: function(error, element) {
		error.appendTo(element.siblings('.input_error'));
	},
	errorElement: "em",
	submitHandler: function(form) {
		$("#server_val").hide();
		$('#form_ajax').show();
		sub_disable = true;
		$("#signup_submit").addClass('sub_disable').removeClass('quote_submit_h');
		$("#server_val span").html('');
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		var email = $('#email').val();
		var cemail = $('#cemail').val();
		var pass = $('#pass').val();
		
		var dataSet = 'fname='+fname+'&lname='+lname+'&email='+email+'&cemail='+cemail+'&pass='+pass;
		$.ajax({
			type: 'POST',
			url: "/scripts/php/app/signup_exec.php",
			data: dataSet,
			success: function(msg){
				$('#form_ajax').hide();
				if(msg == "Success"){
					$("#server_val span").removeClass('val_error');
					$("#server_val span").addClass('val_success');
					$("#signup_submit").addClass('sub_disable').removeClass('quote_submit_h');;
					$("#server_val").show();
					$("#server_val span").append("Registration complete! You will now be redirected.");
					var t = setTimeout(function(){
						redirect();
					},3000);
				}else if(msg == "We are experiencing technical difficulties right now. Please try again in a bit."){
					$("#server_val span").addClass('val_error');
					$("#server_val span").removeClass('val_success');
					$("#server_val").show();						
					$("#server_val span").append(msg);
				}else{
					$("#server_val span").addClass('val_error');
					$("#server_val span").removeClass('val_success');
					$("#server_val").show();
					$("#server_val span").append(msg);
					sub_disable = false;
					$("#signup_submit").removeClass('sub_disable').addClass('quote_submit_h');;
				}
			}
		});	
	}
});
$('#signup_form').find('.user_input').each(function(){
	var id = $(this).attr('id');
	$('#'+id).bind("focusout",function() {
		validator.element('#'+id);
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
})
$("#signup_submit").bind('click', function() {
	$('#signup_form').find('.user_input').each(function(){
		validator.form("#signup_form");
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
		$("#signup_form").submit()
	}
});
