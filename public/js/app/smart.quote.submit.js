//Script handles validation and submission of quote_submit.
var sub_disable = false;
var mobile_select = false;
var static_select = false;

$('#mobile').bind('click', function(){
	static_select = false;
	$('#static').removeClass('service_btn_selected');
	if(mobile_select == false){
		mobile_select = true;
		$(this).addClass('service_btn_selected');
		$('#add_form').show();
		$('#save_info').show();
		$('#save_info_label').show();
	}else{
	}
});

$('#static').bind('click', function(){
	mobile_select = false;
	$('#mobile').removeClass('service_btn_selected');
	$('#add_form').hide();
	if(static_select == false){
		static_select = true;
		$(this).addClass('service_btn_selected');
		$('#save_info').attr('checked',false).hide();
		$('#save_info_label').hide();
	}else{
	}
});

$(document).ready(function(){
	$.validator.addMethod("noSpace", function(value, element) { 
	return value.indexOf(" ") < 0 && value != ""; 
	}, "Cannot contain any spaces");
	$.validator.addMethod("accept", function(value, element, param) {
	  return value.match(new RegExp("." + param + "$"));
	});
	
	var validator = $("#user_data").validate({
		rules: {
			fname: {
				required: true,
				maxlength:24,
				noSpace: true,
				accept: "[a-zA-Z]+"
			},
			lname: {
				required: true,
				maxlength:24,
				noSpace: true,
			},
			phone: {
				required: true,
				maxlength:24,
				phoneUS:true
			},
			email: {
				email: true,
				required: true,
				maxlength: 32
			},
			street: {
				required: function(){
					return mobile_select;
				},
				maxlength:32,
				minlength:4
			},
			city: {
				required: function(){
					return mobile_select;
				},
				maxlength:32,
				minlength:2
			},
			zipcode: {
				required: function(){
					return mobile_select;
				},
				digits:true,
				maxlength:5,
				minlength:5
			},
			state: {
				required: function(){
					return mobile_select;
				},
				maxlength:2,
				minlength:2
			}
		},
		messages: {
			fname: {
				required: "First name is required.",
				maxlength:"Your name seems excessivly long. Max length is 24 charcters.",
				noSpace: "Your name cannot contain any spaces."
			},
			lname: {
				required: "Last name is required.",
				maxlength:"Your name seems excessivly long. Max length is 24 charcters.",
				noSpace:"Your name cannot contain any spaces."
			},
			phone: {
				required: "A phone number is required so we can get in touch with you to discuss details and scheduling.",
				maxlength: "A phone number should not exceed 13 characters.",
				phoneUS: "This phone number does not appear to be valid. Please ensure you've entered it accurately."
			},
			email: {
				email: "This does not appear to be a valid email. Please ensure you've entered it accurately.",
				required: "An email is required so we can get in touch with you to discuss details and scheduling.",
				maxlength: "Your email seems excessivly long. Max length is 24 charcters."
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
			$("#quote_submit").addClass('sub_disable').removeClass('quote_submit_h');
			$("#server_val span").html('');
			var fname = $('#fname').val();
			var lname = $('#lname').val();
			var phone = $('#phone').val();
			var email = $('#email').val();
			var cemail = $('#cemail').val();
			var street = $('#street').val();
			var city = $('#city').val();
			var zipcode = $('#zipcode').val();
			var state = $('#state').val();
			var save_info = $('#save_info').val();
			
			var dataSet = 'fname='+fname+'&lname='+lname+'&email='+email+'&cemail='+cemail+'&phone='+phone+'&street='+street+'&city='+city+'&zipcode='+zipcode+'&state='+state+'&save_info='+save_info;
			$.ajax({
				type: 'POST',
				url: "/scripts/php/app/quote_submit.php",
				data: dataSet,
				success: function(msg){
					$('#form_ajax').hide();
					if(msg == "Success"){
						$("#server_val span").removeClass('val_success');
						$("#server_val span").addClass('val_success');
						$("#server_val").show();
						$("#server_val span").append("Quote generated successfully. Redirecting now.");
						var t = setTimeout(function(){
							quote_redirect();
						},3000);
					}else if(msg == "We are experiencing technical difficulties right now. Please try again in a bit."){
						$("#server_val span").addClass('val_error');
						$("#server_val span").removeClass('val_success');
						$("#server_val").show();						
						$("#server_val span").append(msg);
						sub_disable = false;
						$("#quote_submit").removeClass('sub_disable').addClass('quote_submit_h');;
					}else{
						$("#server_val span").addClass('error');
						$("#server_val span").removeClass('val_success');
						$("#server_val").show();
						$("#server_val span").append(msg);
						sub_disable = false;
						$("#quote_submit").removeClass('sub_disable').addClass('quote_submit_h');;
					}
				}
			});	
		}
	});	
	$('#user_data').find('.user_input').each(function(){
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
	$("#quote_submit").bind('click', function() {
		if(mobile_select == false && static_select == false){
			$('#serv_type_err span').html("You must select either 'Mobile' or 'In-Shop' service!");
			$('#serv_type_err span').show();
		}else{
			$('#serv_type_err span').hide();
			$('#quote_form').find('.user_input').each(function(){
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
				$("#user_data").submit();
			}
		}
	});
});