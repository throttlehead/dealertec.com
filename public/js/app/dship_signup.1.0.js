// This will handle all our dealship signup functioning

var sub_disable = false;

//This handles show/hide of hints
$('.form_span').each(function(){
	if($(this).hasClass('hasInfo')){
		var $question = $(this).children('.field_question');
		var $info = $(this).children('.field_info');
		var total = $(this).children('.form_label').outerWidth() + $(this).children('.user_input').outerWidth() + $(this).children('.field_question').outerWidth();
		$info.css({left: total + 70});
		$question.bind('click', function(){
			$info.animate({
				top:"4px",
				opacity:"1"
			},500,function(){
				setTimeout(function() {						
					$info.animate({
						top:"-16px",
						opacity:"0"
					},500, function(){
						$info.css({top:'20px'});
					})
				}, 8000);
			});
		})
	}
})

$(document).ready(function(){
	$.validator.addMethod("noSpace", function(value, element) { 
	return value.indexOf(" ") < 0 && value != ""; 
	}, "Cannot contain any spaces");
	$.validator.addMethod("accept", function(value, element, param) {
	  return value.match(new RegExp("." + param + "$"));
	});
	
	var validator = $("#dealership_form").validate({
		rules: {
			dname: {
				required: true,
				maxlength:48,
				accept: "[a-zA-Z]+"
			},
			bname: {
				required: true,
				maxlength:48,
			},
			phone: {
				required: true,
				maxlength:24,
				phoneUS:true
			},
			email: {
				required: true,
				maxlength:48,
				email:true
			},
			street: {
				required: true,
				maxlength:32,
				minlength:4
			},
			city: {
				required: true,
				maxlength:32,
				minlength:2
			},
			zipcode: {
				required: true,
				digits:true,
				maxlength:5,
				minlength:5
			},
			state: {
				required: true,
				maxlength:2,
				minlength:2
			},
			lotsize: {
				required: true,
				maxlength:4,
				minlength:1,
				number:true,
			},
			usedcars: {
				required: true,
				maxlength:4,
				minlength:1,
				number:true
			},
			newcars: {
				required: true,
				maxlength:4,
				minlength:1,
				number:true
			}
		},
		messages: {
			dname: {
				required: "First name is required.",
				maxlength:"Your name seems excessivly long. Max length is 24 charcters.",
			},
			bname: {
				required: "Last name is required.",
				maxlength:"Your name seems excessivly long. Max length is 24 charcters.",
			},
			phone: {
				required: "A phone number is required so we can get in touch with you to discuss details and scheduling.",
				maxlength: "A phone number should not exceed 13 characters.",
				phoneUS: "This phone number does not appear to be valid. Please ensure you've entered it accurately."
			},
			email: {
				required: "Email address is required.",
				maxlength:"Your email seems excessivly long. Max length is 48 charcters.",
				email:"This doesn't appear to be a valid email address."
			},
			street: {
				required: "A street address is required.",
				maxlength:"Street names cannot exceed 32 characters.",
				minlength:"Street names must be at least 4 characters.",
			},
			city: {
				required: "A city is required.",
				maxlength:"City names cannot exceed 32 characters.",
				minlength:"City names must be at least 2 characters."
			},
			zipcode: {
				required: "A zipcode is required.",				
				digits:"Your zipcode should consist only of numbers.",
				maxlength:"Your zipcode should only be 5 digits.",
				maxlength:"Your zipcode should only be 5 digits."
			},
			state: {
				required: "A state is required.",
				maxlength:"Your state abbreviation should only be 2 letters.",
				minlength:"Your state abbreviation should only be 2 letters."
			},
			lotsize: {
				required: "Your lot size is required",
				maxlength:"Your lot size should be between 1 and 9999",
				noSpace: "Lot size cannot contain any spaces.",
				minlength:"Your lot size should be between 1 and 9999",
				number:"Lot size must contain only numbers"
			},
			newcars: {
				required: "Your number or new cars is required",
				maxlength:"The number or new cars should be between 1 and 9999",
				noSpace: "Number of new cars cannot contain any spaces.",
				minlength:"The number or new cars should be between 1 and 9999",
				number:"Number of new cars must contain only numbers"
			},
			usedcars: {
				required: "Your number or used cars is required",
				maxlength:"The number or used cars should be between 1 and 9999",
				noSpace: "Number of used cars cannot contain any spaces.",
				minlength:"The number or used cars should be between 1 and 9999",
				number:"Number of used cars must contain only numbers"
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.siblings('.input_error'));
		},
		errorElement: "em",
		debug: true,
		submitHandler: function(form) {
			$("#server_val").hide();
			$('#form_ajax').show();
			sub_disable = true;
			$("#signup_submit").addClass('sub_disable').removeClass('quote_submit_h');
			$("#server_val span").html('');
			var dname = $('#dname').val();
			var bname = $('#bname').val();
			var phone = $('#phone').val();
			var email = $('#email').val();
			var street = $('#street').val();
			var city = $('#city').val();
			var zipcode = $('#zipcode').val();
			var state = $('#state').val();
			var lotsize = $('#lotsize').val();
			var usedcars = $('#usedcars').val();
			var newcars = $('#newcars').val();
			var dataSet = 'dname='+dname+'&bname='+bname+'&phone='+phone+'&email='+email+'&street='+street+'&city='+city+'&zipcode='+zipcode+'&state='+state+'&lotsize='+lotsize+'&usedcars='+usedcars+'&newcars='+newcars;
			$.ajax({
				type: 'POST',
				url: "/scripts/php/app/dealership_register.php",
				data: dataSet,
				dataType: 'json',
				success: function(msg){
					$('#form_ajax').hide();
					var success = msg.success;
					var redirect = msg.redirect
					if(success == 'true'){
						$("#server_val span").removeClass('val_error');
						$("#server_val span").addClass('val_success');
						$("#server_val").show();
						$("#server_val span").append("Quote generated successfully. Redirecting now.");
						var t = setTimeout(function(){
							window.location = redirect;
						},3000);					
					}else{
						$("#server_val span").addClass('val_error');
						$("#server_val span").removeClass('val_success');
						$("#server_val").show();
						$("#server_val span").append(msg.error);
						sub_disable = false;
						$("#signup_submit").removeClass('sub_disable').addClass('quote_submit_h');;
					}
				}
			});	
		}
	});	
	$('#dealership_form').find('.user_input').each(function(){
		var id = $(this).attr('id');
		$('#'+id).bind("focusout",function() {
			validator.element('#'+id);
			if($(this).hasClass('valid')){
				if($(this).val() == '' && $(this).hasClass('not_req')){
					//Empty but not required, don't show check.
					$(this).siblings('.input_success').hide();
				}else{
					$(this).siblings('.input_error').hide();
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
	$("#signup_submit").bind('click', function() {
			$('#serv_type_err span').hide();
			$('#dealership_form').find('.user_input').each(function(){
				validator.form("#quote_form");
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
				$("#dealership_form").submit();
			}
	});
});