//This script will handle all JS on the profile page
var prfl_sub_disable = false;
var addr_sub_disable = false;
var is_valid = false;

//Init bday-picker
$("#bday").birthdaypicker({
	
});

//This handles the address why statement
var runWhyAnim = false;
$("#h1_why").hover(function(){
	runWhyAnim = true;
	setTimeout(function() {
		if(runWhyAnim == true){
			$("#addr_why").animate({
				top:"-12px",
				opacity:"1"
			},500,function(){
				
			});
		}
	}, 300);
},function(){
	runWhyAnim = false;
	$("#addr_why").animate({
		top:"-26px",
		opacity:"0"
	},500,function(){
		$(this).css("top","0");
	});
});

//This block handles the edit buttons and the submenus hide/show
$("#edit_prfl_btn").bind('click',function() {
	$("#edit_prfl_btn").hide();
	$("#edit_profile").show();
});
$("#edit_addr_btn").bind('click',function() {
	$("#edit_addr_btn").hide();
	$("#edit_address").show();
});
$('#prfl_cancel').bind('click', function(){
	$("#edit_prfl_btn").show();
	$("#edit_profile").hide();
});
$('#addr_cancel').bind('click', function(){
	$("#edit_addr_btn").show();
	$("#edit_address").hide();
});

//This function handles email resend
$("#send_email_btn").bind('click', function(){
	$("#send_email_btn").addClass('disable_btn');
	var email = $(this).attr('data-email');
	var dataSet = 'email='+email;
	$.ajax({
		type: 'GET',
		url: "/scripts/php/app/send_email.php",
		data: dataSet,
		success: function(msg){
			if(msg == "Success"){
				$(".profile_action").append("<span>The email has been resent. Check your inbox now.</span>");
			}else if(msg == "Error"){
				$(".profile_action").append("<span>We are experiencing technical difficulties right now. Please try again in a bit.</span>");
			}else{
				$(".profile_action").append("<span>We are experiencing technical difficulties right now. Please try again in a bit.</span>");
			}
		}
	})
})

//This block handles validation and submission of the profile form
$.validator.addMethod("accept", function(value, element, param) {
	if (value == ''){
		return true;
	}else{
		return value.match(new RegExp("." + param + "$"));
	}
});
$.validator.addMethod("valueNotEquals", function(value, element, arg){
	return arg != value;
}, "Value must not equal arg.");
var validator = $("#profile_form").validate({
	rules: {
		fname: {
			maxlength:24,
			minlength:2,
			accept: "[a-zA-Z]+"
		},
		lname: {
			maxlength:24,
			minlength:2,
			accept: "[a-zA-Z]+"
		},
		email: {
			email: true,
			maxlength:48
		},
		gender: {
			
		},
		birthdate: {
			valueNotEquals: ""
		},
	},
	messages: {
		fname: {
			maxlength:"The maximum length is 32 characters.",
			minlength:"The minimum length is 2 characters",
			accept:"Letters only please."
		},
		lname: {
			maxlength:"The maximum length is 32 characters.",
			minlength:"The minimum length is 2 characters",
			accept:"Letters only please."
		},
		email: {
			email: "This does not appear to be a valid email.",
			maxlength: "Emails should not be more than 48 characters."
		},
		gender: {
			
		},
		birthdate: {
			valueNotEquals:"Required."
		},
	},
	errorPlacement: function(error, element) {
		error.appendTo(element.siblings('.input_error'));
	},
	errorElement: "em",
	submitHandler: function(form) {
		$('#prfl_ajax').show();
		$('#prfl_val').hide();
		prfl_sub_disable = true;
		$("#prfl_submit").addClass('sub_disable');
		$("#server_val span").html('');
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		var email = $('#email').val();
		var gender = $('#gender').val();
		var bday = $('#birthdate').val();
		
		var dataSet = 'fname='+fname+'&lname='+lname+'&email='+email+'&gender='+gender+'&bday='+bday;
		$.ajax({
			type: 'POST',
			url: "/scripts/php/app/update_profile.php",
			data: dataSet,
			success: function(msg){
				$('#prfl_ajax').fadeOut(500, function(){
					if(msg == "Success"){
						$("#prfl_val span").removeClass('val_error');
						$("#prfl_val span").addClass('val_success');
						$("#prfl_val").show();
						$("#prfl_val span").html("Profile has been updated! The page will now refresh.");
						var t = setTimeout("window.location.reload()", 3000)
					}else if(msg == "Error"){
						$("#prfl_val span").addClass('val_error');
						$("#prfl_val span").removeClass('val_success');
						$("#prfl_val").show();						
						$("#prfl_val span").html("We are experiencing technical difficulties right now. Please try again in a bit.");
						sub_disable = false;
						$("#prfl_submit").removeClass('sub_disable');
					}else{
						$("#prfl_val span").addClass('val_error');
						$("#prfl_val span").removeClass('val_success');
						$("#prfl_val").show();
						$("#prfl_val span").html(msg);
						prfl_sub_disable = false;
						$("#prfl_submit").removeClass('sub_disable');
					}
				});
			},
			error:function(response){
				$('#prfl_ajax').fadeOut(500, function(){
					$("#prfl_val span").addClass('val_error');
					$("#prfl_val span").removeClass('val_success');
					$("#prfl_val").show();						
					$("#prfl_val span").html("We are experiencing technical difficulties right now. Please try again in a bit.");
					prfl_sub_disable = false;
					$("#prfl_submit").removeClass('sub_disable');
				});
			}
		});
	}
});
var is_validated = false;
$('#profile_form').find('.user_input').each(function(){
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
$("#prfl_submit").bind('click', function() {
	$('#profile_form').find('.user_input').each(function(){
		var is_valid = $("#profile_form").validate().form();
		if($(this).hasClass('valid')){
				$(this).siblings('.input_error em').html('');
			$(this).siblings('.input_success').show();
			$(this).siblings('.input_error').hide();
		}else if($(this).hasClass('error')){
			$(this).siblings('.input_success').hide();
			$(this).siblings('.input_error').show();
		}else{
			$(this).siblings('.input_success').hide();
		}
	});
	if(prfl_sub_disable == false){
		$("#profile_form").submit();
	}
});

//This block handles validation and submission of the address form
var addr_validator = $("#address_form").validate({
	rules: {
		street: {
			required:true,
			maxlength:32,
			minlength:2,
		},
		city: {
			required:true,
			maxlength:32,
			minlength:2,
		},
		state: {
			required:true,
			maxlength:2,
			minlength:2
		},
		zipcode: {
			required:true,
			digits:true,
			maxlength:5,
			minlength:5
		}
	},
	messages: {
		street: {
			required:"Please complete all fields to update your address.",
			maxlength:"The maximum length is 32 characters.",
			minlength:"The minimum length is 2 characters",
		},
		city: {
			required:"Please complete all fields to update your address.",
			maxlength:"The maximum length is 32 characters.",
			minlength:"The minimum length is 2 characters",
		},
		state: {
			required:"Please complete all fields to update your address.",
			minlength:"Please enter your 2-letter state abbreviation.",
			maxlength:"Please enter your 2-letter state abbreviation.",
		},
		zipcode: {
			required:"Please complete all fields to update your address.",
			digits:"Zipcodes should consist of numbers only.",
			minlength:"Please only enter your five digit zipcode.",
			maxlength:"Please only enter your five digit zipcode."
		},
	},
	errorPlacement: function(error, element) {
		error.appendTo(element.siblings('.input_error'));
	},
	errorElement: "em",
	submitHandler: function(form) {
		$('#addr_ajax').show();
		$('#addr_val').hide();
		sub_disable = true;
		$("#addr_submit").addClass('sub_disable');
		$("#server_val span").html('');
		var street = $('#street').val();
		var city = $('#city').val();
		var state = $('#state').val();
		var zipcode = $('#zipcode').val();
		
		var dataSet = 'street='+street+'&city='+city+'&state='+state+'&zipcode='+zipcode;
		$.ajax({
			type: 'POST',
			url: "/scripts/php/app/update_profile.php",
			data: dataSet,
			success: function(msg){
				$('#addr_ajax').fadeOut(500, function(){
					if(msg == "Success"){
						$("#addr_val span").removeClass('val_error');
						$("#addr_val span").addClass('val_success');
						$("#addr_val").show();
						$("#addr_val span").html("Address has been updated! The page will now refresh.");
						var t = setTimeout("window.location.reload()", 3000)
					}else if(msg == "Error"){
						$("#addr_val span").addClass('val_error');
						$("#addr_val span").removeClass('val_success');
						$("#addr_val").show();						
						$("#addr_val span").html("We are experiencing technical difficulties right now. Please try again in a bit.");
						addr_sub_disable = false;
						$("#addr_submit").removeClass('sub_disable');
					}else{
						$("#addr_val span").addClass('val_error');
						$("#addr_val span").removeClass('val_success');
						$("#addr_val").show();
						$("#addr_val span").html(msg);
						addr_sub_disable = false;
						$("#addr_submit").removeClass('sub_disable');
					}
				});
			},
			error:function(response){
				$('#addr_ajax').fadeOut(500, function(){
					$("#addr_val span").addClass('val_error');
					$("#addr_val span").removeClass('val_success');
					$("#addr_val").show();						
					$("#addr_val span").html("We are experiencing technical difficulties right now. Please try again in a bit.");
					addr_sub_disable = false;
					$("#addr_submit").removeClass('sub_disable');
				});
			}
		});
	}
});
var is_validated = false;
$('#address_form').find('.user_input').each(function(){
	var id = $(this).attr('id');
	$('#'+id).bind("focusout",function() {
		addr_validator.element('#'+id);
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
$("#addr_submit").bind('click', function() {
	$('#address_form').find('.user_input').each(function(){
		if($(this).hasClass('valid')){
			$(this).siblings('.input_error em').html('');
			$(this).siblings('.input_success').show();
			$(this).siblings('.input_error').hide();
		}else if($(this).hasClass('error')){
			$(this).siblings('.input_success').hide();
			$(this).siblings('.input_error').show();
		}else{
			$(this).siblings('.input_success').hide();
		}
	});
	if(addr_sub_disable == false){
		$("#address_form").submit();
	}
});
					
//Image Upload functionality

var img_out = true;
var ajax_loading = false;
var img_menu = false;

$('#img_btn').click(function() {
	if(img_menu == false){
		$('#img_menu').slideDown(500, function(){
			img_menu = true;
		});
		$('#prfl_img').addClass('menu_down')
	}else{
		$("#file_upl").click();
	}
});

$('#img_btn').hover(function(){
	$("#upl_img").addClass('btn_hack');
},function(){
	$("#upl_img").removeClass('btn_hack');
});

$("#upl_img").click(function(){
	$("#file_upl").click();
})

$("#file_upl").change(function(){
	ajax_loading = true;
	$("#imgAjax").show();
	$("#upl_img").hide();
	$("#img_menu").submit();
});

$("#prfl_img").mouseenter(function(){
	img_out = false;
});
$("#prfl_img").mouseleave(function(){
	img_out = true;
	setTimeout(function() {
		if(img_out != false && ajax_loading == false){
		$('#prfl_img').removeClass('menu_down')
			$('#img_menu').slideUp(500, function(){
				img_menu = false;
			});
		}
	}, 2000);
});

$("#img_upload_frame").load(function() {
	var response = $.parseJSON($('#img_upload_frame').contents().find('body').html());
	if(response.status == "Success"){
		ajax_loading = false;
		$("#imgAjax").hide();
		$("#img_menu").addClass('upload_complete')
		$("#upl_response").addClass('upl_success').html('Profile Image Updated!').show();
		var t = setTimeout(function(){
			window.location.reload();
		},1000);
	}else{
		ajax_loading = false;
		$("#imgAjax").hide();
		$("#img_menu").addClass('upload_complete')
		$("#upl_response").addClass('upl_fail').html('The image upload failed.').show();
	}
});

//This will adjust img to fit in the container
$(window).load(function(){
	resize($('#prfl_img').attr('id'), $('#img_act').attr('id'));
	$('#img_act').css({visibility: 'visible'});
});



