//Script handles everything for signup form

//Set up form validation

function redirect(){
	window.location = '/index.html';
}

var sub_disable = false;

$.validator.addMethod("noSpace", function(value, element) { 
return value.indexOf(" ") < 0 && value != ""; 
}, "Cannot contain any spaces");
$.validator.addMethod("accept", function(value, element, param) {
  return value.match(new RegExp("." + param + "$"));
});

var validator = $("#password_form").validate({
	debug:true,
	rules: {
		pass: {
			required: true,
			maxlength:24,
			minlength:8,
			noSpace: true,
			password:true
		},
		cpass: {
			equalTo:'#pass',
			required: true,
			password:false
		},
	},
	messages: {
		pass: {
			required: "Please enter a password",
			maxlength:"Max length is 24 characters.",
			noSpace: "Your password cannot contain any spaces.",
			minlength:"Mimimum length is 8 characters.",
			password:"Your password must be at least 8 characters long and should consist of capitals, lowercases, and numbers."
		},
		cpass: {
			equalTo:"Your passwords do not match.",
			required:"Please confirm your password",
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
		$("#password_submit").addClass('sub_disable').removeClass('quote_submit_h');
		$("#server_val span").html('');
		var pass = $('#pass').val();
		var cpass = $('#cpass').val();
		
		var dataSet = 'pass='+pass+'&cpass='+cpass+'&email='+php_email+'&ver='+php_ver;
		$.ajax({
			type: 'POST',
			url: "/scripts/php/app/password_exec.php?email="+php_email+"&ver",
			data: dataSet,
			success: function(msg){
				$('#form_ajax').hide();
				if(msg == "Success"){
					$("#server_val span").removeClass('val_error');
					$("#server_val span").addClass('val_success');
					$("#server_val").show();
					$("#server_val span").append("Password selection complete! You will now be redirected.");
					var t = setTimeout(function(){
						redirect();
					},3000);
				}else{
					$("#server_val span").addClass('val_error');
					$("#server_val span").removeClass('val_success');
					$("#server_val").show();
					$("#server_val span").append(msg);
					sub_disable = false;
					$("#password_submit").removeClass('sub_disable').addClass('quote_submit_h');;
				}
			}
		});	
	}
});
$('#password_form').find('.user_input').each(function(){
	var id = $(this).attr('id');
	$('#'+id).bind("focusout",function() {
		validator.element('#'+id);
		if($(this).hasClass('valid')){
			$(this).siblings('.input_error').hide();
			$(this).siblings('.input_success').show();
		}else if($(this).hasClass('error')){
			$(this).siblings('.input_success').hide();
			$(this).siblings('.input_error').show();
		}else{
			$(this).siblings('.input_success').hide();
		}
	});
})
$("#password_submit").bind('click', function() {
	$('#password_form').find('.user_input').each(function(){
		validator.form("#signup_form");
		if($(this).hasClass('valid')){
			$(this).siblings('.input_error').hide();
			$(this).siblings('.input_success').show();
		}else if($(this).hasClass('error')){
			$(this).siblings('.input_success').hide();
			$(this).siblings('.input_error').show();
		}else{
			$(this).siblings('.input_success').hide();
		}
	});
	if(sub_disable == false){
		$("#password_form").submit()
	}
});
