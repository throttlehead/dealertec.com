// This script handles all our homepage login form scripting
$(window).load(function() {
	$(".loginInput").removeAttr('disabled');
	$('#loginForm').placeholderRX({textColor: '#BCBEC0', hoverColor: '#FBFBFB', addClass: 'login_placeholder'});
	$("#loginForm").submit(function() {					
	var pass = $("#loginpassword").val();
	var email = $("#loginemail").val();
	var dataString = "password=" + pass + "&email=" + email;
	$('#login_results').hide('fast');
	$(".ajax_loader_24").show();
	$.ajax({
		type: "POST",
		url: "/scripts/php/app/login.php",
		data: dataString,
		success: function(result) {
			if(result != "Success"){
				if(result == "Heat"){
					$(".ajax_loader_24").hide();
					window.location = "/users/signin_captcha.php";
				}else{								
					setTimeout(function() {
						$(".ajax_loader_24").hide();
						$('#login_mes').html(result);
						$('#login_results').show('fast');
					},750);
				}
			}else{
				$(".ajax_loader_24").hide();
				redirect();
			}
		}
	});
	return false;
	e.preventDefault();
	});
	$('.dialog_close').mousedown(function() {
		$('#login_results').hide('fast');
	});
});
