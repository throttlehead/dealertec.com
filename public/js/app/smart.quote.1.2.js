/*This script handles all our Smart-Quote processing

-- Ver 1.1 Update --
+Line ~460+ Added Paint Repair system
+Line ~564+ Added Total/Submit bar that's fixed to the bottom of the screen, then to relative at the bottom of smart quote when the user scrolls down past the footer.

-- Ver 1.2 Update --
+Line ~586+ Additional code to handle the vehical details section that has been added. Also updated the submission code to handle this data.
++ Updated behavior of popup for a close button to prevent accidental closing of window by clicking outside. Also added window scroll to the top on open.
+Line ~600+ Added functions that show smart quote sections 1 by 1 as they are completed. Step 1 on window load, step 2 once required step 1 fields are selected, and step 3 on the first service added.
++ Added functionality for Interior Details.

End Comments*/

//Set Vars

var row_counter = 0;
var sub_disable = true;
var step2_shown = false; //Flag to show step 2 the first time a user has selected required fields.
var step3_shown = false; //Flag to show step 3 the first time a service is added.
var offscreen = $(window).width() - $(".step_wrap").width();
var addon_discount = 10; //This is the value of the discount applied to addon services

//These vars ensure certian functionality within adding and removing services

var selected_detail = null; //This var is used to set the function in motion
var detail_selected = false; //This var will ensure only one detail service is selected
var selected_intdetail = null; //This var is used to set the function in motion
var intdetail_selected = false; //This var will ensure only one detail service is selected
var selected_radio = null
var selected_wind = null
var wind_selected = false;
var selected_plastic = null; //This var is used to set the function in motion
var plastic_selected = false; //This var will ensure only one plastic service is selected
var select_complete = false; //This var is used to set the function in motion
var selected_paint = null;

//End Set Vars

$(document).ready(function(){
	//Initialize tinyScroll on .sub_menu's and other panes
	$('#quote_sub').children('.sub_menu').each(function(){
		$(this).tinyscrollbar({ size: 508 });
	});
	//Initilize UploadFive
	$(function() {
		$('#file_upload').uploadifive({
			'method' : 'post',
			'uploadScript' : '/scripts/php/app/quote_img_upload.php',
			'fileSizeLimit' : '1.5mb',
			'fileTypeExts' : '*.gif; *.jpg; *.png',
			'queueSizeLimit' : 8,
			'queueID' : 'upload_queue',
			'uploadLimit' : 8,
			'onSelect' : function(){
				queue_scroll.tinyscrollbar_update();
			},
			'onCancel' : function(){
				queue_scroll.tinyscrollbar_update();
			},
			'onUploadSuccess' : function(data) {
				alert(response);
			},
			'onUploadError' : function(file, errorCode, errorMsg, errorString) {
				alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
			}
		});
	});
});

function scroll_window(elementID, buffer){
	$('html, body').animate({
		scrollTop: $("#"+elementID).offset().top - buffer
	}, 600);
}
	
//This block handles the catagory selection
var selected_li = "";
var selected_sub = "";
$('#quote_list').children('.quote_li').each(function() {
	var data_match = $(this).attr('data-match');
	if($(this).hasClass('quote_selected')){
		selected_li = $(this).attr('id');
	}
	$(this).bind('click', function() {
		$('#' + selected_li).removeClass('quote_selected');
		$(this).addClass('quote_selected');
		selected_li = $(this).attr('id');
		
		$('#quote_sub').children('.sub_menu').each(function() {
			if ($(this).hasClass('sub_selected')){
				$(this).removeClass('sub_selected');
			}
			if ($(this).attr('data-match') == data_match){
				$(this).addClass('sub_selected');
				$(this).tinyscrollbar_update();
			}
		});
	});							
});

//Function sets CSS for popup
function setPopPosition(){
	//Set width$height vars
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var popHeight = $("#popup").height();
	var popWidth = $("#popup").width();
	//Set CSS style
	$('#popup').css({
		'position': 'absolute',
		'top': '632px',
		"left": windowWidth/2-popWidth/2
	});
}

//Function displays popup and loads passed data via AJAX
function displayPopup(url){
	setPopPosition();
	$('#popup_content').html('');
	$('#popup_content').hide();
	$('#popupBG').fadeIn('400');
	$('#popup').fadeIn('400', function(){
		scroll_window('popup', 20);
		$('#closeBtn').bind("click", function() {
			$('#popupBG').fadeOut('200');
			$('#popup').fadeOut('200');
		});
		$('#body').click(function(event){
			event.stopPropagation();
		})						
		$('.ajax_loader').show();
		//Now we perform quick jquery HTML ajax load
		$('#popup_content').load(url, function(response) {
			$('.ajax_loader').hide();
			$('#popup_content').ajaxError(function(){
				$('#popup_content').html('Failed to load '+html+'.');	
			});
			//Set box height to the descriptions height before showing it.
			var set_height = $('#popup_content').height();
			var set_width = $('#popup_content').width();
			if($('#popup').height() != set_height){
				$('#popup_content').fadeIn(250);
			}else{
				$('#popup').height(set_height);
				$('#popup_content').fadeIn(250);
			}
		});
	});
}

window.onresize = function(){
	setPopPosition();	
}

//Function adds passed data as a new table row. Pass it a service name and price in floating point int format. Function will add the button with click event so the item can also be removed.
function add_service(name, price, desc, type){
	row_counter++;
	form_name = name.replace(/ /g,'_');
	form_desc = desc.replace(/ /g,'_');
	form_type = type.replace(/ /g,'_');
	var the_row = new String("item_row" + row_counter);
	append_string = "<tr class='quote_tbl_tr' id='"+the_row+"' data-type="+form_type+" data-name="+form_name+" data-price="+price+" data-desc="+form_desc+"><td class='tbl_service_name'><div class='tbl_remove'>X</div>"+name+"</td><td class=tbl_service_price>$"+price+"</td></tr>";
	$('#quote_tbl').append(append_string);
	$('#'+the_row).attr('onclick', "remove_row('"+the_row+"')");
	update_price(add_price());
	if(step3_shown == false){
		step3_shown = true;
		show_step('step_3');
		scroll_window('step_3', 128)
		$("#qte_sect3_wrap").fadeIn(500, function(){
			var queue_scroll = $('#upload_queue_wrap');
			queue_scroll.tinyscrollbar({ size: 80 });
			$("#selected_services").tinyscrollbar({ size: 178 });
		});
	}else{
		$("#selected_services").tinyscrollbar_update();
	}
	if(type == 'detail'){
		apply_discount();
	}
}

//This function adds addon discount to any service with the data-addon attr
function apply_discount(){
	$("#quote_sub").find('.sub_btn1').each(function(){
		if($(this).attr('data-addon') == 'true'){
			var price = parseInt($(this).attr('data-price'));
			price = price - addon_discount;
			$(this).attr('data-price', cent(price));
			$(this).find(".sub_btn_price").append('<div class="addon_discount">Addon Discount -$10.00</div>');
		}
	});	
	$("#quote_tbl").find('.quote_tbl_tr').each(function(){
		if($(this).attr('data-type') != 'detail'){
			var price = $(this).attr('data-price');
			price = price - addon_discount;
			$(this).attr('data-price', cent(price));
			$(this).children('.tbl_service_price').html('$'+cent(price));
		}
	});
}

//This function removes addon discount to any service with the data-addon attr. It also checks the services already added and adjusts those prices.
function remove_discount(){
	$("#quote_sub").find('.sub_btn1').each(function(){
		if($(this).attr('data-addon') == 'true'){
			var price = parseFloat($(this).attr('data-price'));
			price = price + addon_discount
			$(this).attr('data-price', cent(price));
			$(this).find('.addon_discount').remove();
		}
	});
	$("#quote_tbl").find('.quote_tbl_tr').each(function(){
		if($(this).attr('data-type') != 'detail'){
			var price = parseFloat($(this).attr('data-price'));
			price = price + addon_discount;
			$(this).attr('data-price', cent(price));
			$(this).children('.tbl_service_price').html('$'+cent(price));
		}
	});
}

//Function removes the item via its row count. Make sure the row count is passed as a string!!!
function remove_row(row){
	if($('#'+row).attr('data-type') == 'detail'){
		detail_selected = false;
		remove_discount();
	}else if($('#'+row).attr('data-type') == 'wind'){
		wind_selected = false;
	}else if($('#'+row).attr('data-type') == 'plastic'){
		plastic_selected = false;
	}else if($('#'+row).attr('data-type') == 'headlights'){
		headlights_selected = false;
	}else if($('#'+row).attr('data-type') == 'intdetail'){
		intdetail_selected = false;
	}
	$('#'+row).animate({
		opacity: 0,
		}, 400, function() {
			// Animation complete.
			$('#'+row).remove();
			update_price(add_price());
			$("#selected_services").tinyscrollbar_update();
	});
}

//Function ensures data is returned in cent format
function cent(amount) {
// returns the amount in the .99 format
    amount -= 0;
    return (amount == Math.floor(amount)) ? amount + '.00' : (  (amount*10 == Math.floor(amount*10)) ? amount + '0' : amount);
}

//Function updates the price element
function update_price(price){
	var total = $("#quote_total").addClass('quote_glow')
	t = setTimeout(function(){
		total.removeClass('quote_glow');
	},500);
	$('#quote_total span').animate({
		opacity: 0,
		}, 300, function() {
			// Animation complete.
			$(this).html("$" + cent(add_price()))
			$(this).animate({
				opacity: 1,
			}, 300);
	});
	
}

//Function adds up the price cells for estimate cost
function add_price(){
	var price_ary = new Array();
	var total = parseFloat(0);
	$("#quote_tbl").find('.quote_tbl_tr').each(function(){
		var price = (cent($(this).attr('data-price')));
		price_ary.push(price);
	});	
							
	for(var i = 0; i < price_ary.length; i++){
		total = total + parseFloat(price_ary[i]);
	}
	//This will unlock the submit button as long as something is selected
	if (total > 0){
		sub_disable = false;
		$("#quote_submit").removeClass('sub_disable').addClass('quote_submit_h');;
	}else{
		sub_disable = true;
		$("#quote_submit").addClass('sub_disable').removeClass('quote_submit_h');
	}
	return total;
}


//This block handles execution of adding detail services

$("#detail_sub").find(".sub_btn1").each(function() {
	$(this).bind('click', function() {
		//scroll_window();
			if(selected_detail != null){
				if($(this).attr('id') == selected_detail){
					$('#' + selected_detail).removeClass('sub_btn1_selected');
					selected_detail = null;
				}else{
					$('#' + selected_detail).removeClass('sub_btn1_selected');
					selected_detail = $(this).attr('id');
					$(this).addClass('sub_btn1_selected');
				}
			}else{
				selected_detail = $(this).attr('id');
				$(this).addClass('sub_btn1_selected');
			}
	});
});
$('#detail_sub').find('.sub_add_btn').bind('click', function() {
	//scroll_window();
	if(selected_detail != null){
		var price = $('#' + selected_detail).attr('data-price');
		var service = $('#' + selected_detail).attr('data-service');
		var desc = $('#' + selected_detail).attr('data-desc');
		var type = $('#' + selected_detail).attr('data-type');
		if(detail_selected == true){
			var row
			$(".quote_tbl_tr").each(function(){
				if($(this).attr('data-type') == 'detail'){
					row = $(this).attr('id');
					remove_row(row);
					add_service(service, price, desc, type);
					detail_selected = true;
				}
			});
		}else{
			detail_selected = true;
			add_service(service, price, desc, type);
		}
	}else if(selected_detail == null){
		$("#detail_sub").find(".add_error span").html("Please select a service from the list above.").fadeIn(500).delay(3500).fadeOut(500);
		$("#detail_sub").find(".sub_btn1").each(function() {			
			var button = $(this).addClass('sub_btn1_selected')
			t = setTimeout(function(){
				button.removeClass('sub_btn1_selected');
			},300);
		});
	}else if(detail_selected == true){
		$("#quote_tbl_row").each(function() {
			if($(this).attr('data-type') == 'detail'){
				$(this).remove();	
			}
		});
	}
});	

//This block handles execution of adding interior detail services

$("#intdetail_sub").find(".sub_btn1").each(function() {
	$(this).bind('click', function() {
		//scroll_window();
			if(selected_intdetail != null){
				if($(this).attr('id') == selected_intdetail){
					$('#' + selected_intdetail).removeClass('sub_btn1_selected');
					selected_intdetail = null;
				}else{
					$('#' + selected_intdetail).removeClass('sub_btn1_selected');
					selected_intdetail = $(this).attr('id');
					$(this).addClass('sub_btn1_selected');
				}
			}else{
				selected_intdetail = $(this).attr('id');
				$(this).addClass('sub_btn1_selected');
			}
	});
});
$('#intdetail_sub').find('.sub_add_btn').bind('click', function() {
	//scroll_window();
	if(selected_intdetail != null){
		var price = $('#' + selected_intdetail).attr('data-price');
		var service = $('#' + selected_intdetail).attr('data-service');
		var desc = $('#' + selected_intdetail).attr('data-desc');
		var type = $('#' + selected_intdetail).attr('data-type');
		if(intdetail_selected == true){
			var row
			$(".quote_tbl_tr").each(function(){
				if($(this).attr('data-type') == 'intdetail'){
					row = $(this).attr('id');
					remove_row(row);
					add_service(service, price, desc, type);
					intdetail_selected = true;
				}
			});
		}else{
			intdetail_selected = true;
			add_service(service, price, desc, type);
		}
	}else if(selected_intdetail == null){
		$("#intdetail_sub").find(".add_error span").html("Please select a service from the list above.").fadeIn(500).delay(3500).fadeOut(500);
		$("#intdetail_sub").find(".sub_btn1").each(function() {			
			var button = $(this).addClass('sub_btn1_selected')
			t = setTimeout(function(){
				button.removeClass('sub_btn1_selected');
			},300);
		});
	}else if(intdetail_selected == true){
		$("#quote_tbl_row").each(function() {
			if($(this).attr('data-type') == 'intdetail'){
				$(this).remove();	
			}
		});
	}
});						

//This block handles execution of adding windshield service

$("#windshield_sub").find(".sub_btn1").each(function() {
	$(this).bind('click', function() {
		//scroll_window();
		if(selected_wind != null){
			if($(this).attr('id') == selected_wind){
				$('#' + selected_wind).removeClass('sub_btn1_selected');
				selected_wind = null;
			}else{
				$('#' + selected_wind).removeClass('sub_btn1_selected');
				selected_wind = $(this).attr('id');
				$(this).addClass('sub_btn1_selected');
			}
		}else{
			selected_wind = $(this).attr('id');
			$(this).addClass('sub_btn1_selected');
		}
	});
});
$("#windshield_sub").find(".radio_span").each(function() {
	$(this).bind('click', function() {
		//scroll_window();
		if(selected_radio != null){
			$("#"+selected_radio).children('.radio_btn').removeClass('radio_btn_selected');
		}
		selected_radio = $(this).attr('id');
		$(this).children('.radio_btn').addClass('radio_btn_selected');
		if($("#"+selected_radio).attr('data-value') == 'yes'){
			$("#wind_repair_1").addClass('sub_btn1_selected');
			$("#wind_repair_1").show();
			$("#windshield_sub").find(".wind_warning").hide()
			selected_wind = 'wind_repair_1';
			$("#windshield_sub").tinyscrollbar_update();
		}else{
			$("#wind_repair_1").removeClass('sub_btn1_selected');
			$("#wind_repair_1").show();
			$("#windshield_sub").find(".wind_warning").show()
			selected_wind = null;
			$("#windshield_sub").tinyscrollbar_update();
		}
	});	
});
$('#windshield_sub').find('.sub_add_btn').bind('click', function() {
	//scroll_window();
	if(selected_wind != null){
		if(wind_selected == false){
			var price = $('#' + selected_wind).attr('data-price');
			var service = $('#' + selected_wind).attr('data-service');
			var desc = $('#' + selected_wind).attr('data-desc');
			var type = $('#' + selected_wind).attr('data-type');
			add_service(service, price, desc, type);
			wind_selected = true;
		}else{
			
		}
	}else{
		$("#windshield_sub").find(".add_error span").html("Please select a service from the list above.").fadeIn(500).delay(3500).fadeOut(500);
		$("#windshield_sub").find(".sub_btn1").each(function() {			
			var button = $(this).addClass('sub_btn1_selected')
			t = setTimeout(function(){
				button.removeClass('sub_btn1_selected');
			},300);
		});
	}
});						

//This block handles plastics service select

$("#plastic_sub").find(".sub_btn1").each(function() {
	$(this).bind('click', function() {
		//scroll_window();
		if(selected_plastic != null){
			if($(this).attr('id') == selected_plastic){
				$('#' + selected_plastic).removeClass('sub_btn1_selected');
				selected_plastic = null;
			}else{
				$('#' + selected_plastic).removeClass('sub_btn1_selected');
				selected_plastic = $(this).attr('id');
				$(this).addClass('sub_btn1_selected');
			}
		}else{
			selected_plastic = $(this).attr('id');
			$(this).addClass('sub_btn1_selected');
		}
	});
});
$('#plastic_sub').find('.sub_add_btn').bind('click', function() {
	//scroll_window();
	if(selected_plastic != null){
		var price = $('#' + selected_plastic).attr('data-price');
		var service = $('#' + selected_plastic).attr('data-service');
		var desc = $('#' + selected_plastic).attr('data-desc');
		var type = $('#' + selected_plastic).attr('data-type');
		if(plastic_selected == true){
			var row
			$(".quote_tbl_tr").each(function(){
				if($(this).attr('data-type') == 'plastic'){
					row = $(this).attr('id');
					remove_row(row);
					add_service(service, price, desc, type);
					plastic_selected = true;
				}
			});
		}else{
			plastic_selected = true;
			add_service(service, price, desc, type);
		}
	}else if(selected_plastic == null){
		$("#plastic_sub").find(".add_error span").html("Please select a service from the list above.").fadeIn(500).delay(3500).fadeOut(500);
		$("#plastic_sub").find(".sub_btn1").each(function() {			
			var button = $(this).addClass('sub_btn1_selected')
			t = setTimeout(function(){
				button.removeClass('sub_btn1_selected');
			},300);
		});
	}else if(plastic_selected == true){
		$("#quote_tbl_row").each(function() {
			if($(this).attr('data-type') == 'plastic'){
				$(this).remove();	
			}
		});
	}
});						

//This block handles headlights service select
var selected_headlights = null; //This var is used to set the function in motion
var headlights_selected = false; //This var will ensure only one headlights service is selected

$("#headlights_sub").find(".sub_btn1").each(function() {
	$(this).bind('click', function() {
		//scroll_window();
		if(selected_headlights != null){
			if($(this).attr('id') == selected_headlights){
				$('#' + selected_headlights).removeClass('sub_btn1_selected');
				selected_headlights = null;
			}else{
				$('#' + selected_headlights).removeClass('sub_btn1_selected');
				selected_headlights = $(this).attr('id');
				$(this).addClass('sub_btn1_selected');
			}
		}else{
			selected_headlights = $(this).attr('id');
			$(this).addClass('sub_btn1_selected');
		}
	});
});
$('#headlights_sub').find('.sub_add_btn').bind('click', function() {
	//scroll_window();
	if(selected_headlights != null){
		var price = $('#' + selected_headlights).attr('data-price');
		var service = $('#' + selected_headlights).attr('data-service');
		var desc = $('#' + selected_headlights).attr('data-desc');
		var type = $('#' + selected_headlights).attr('data-type');
		if(headlights_selected == true){
			$(".quote_tbl_tr").each(function(){
				if($(this).attr('data-type') == 'headlights'){
					row = $(this).attr('id');
					remove_row(row);
					add_service(service, price, desc, type);
					headlights_selected = true;
				}
			});
		}else{
			headlights_selected = true;
			add_service(service, price, desc, type);
		}
	}else if(selected_headlights == null){
		$("#headlights_sub").find(".add_error span").html("Please select a service from the list above.").fadeIn(500).delay(3500).fadeOut(500);
		$("#headlights_sub").find(".sub_btn1").each(function() {			
			var button = $(this).addClass('sub_btn1_selected')
			t = setTimeout(function(){
				button.removeClass('sub_btn1_selected');
			},300);
		});
	}else if(headlights_selected == true){
		$("#quote_tbl_row").each(function() {
			if($(this).attr('data-type') == 'headlights'){
				$(this).remove();	
			}
		});
	}
});

//This block handles paint repair selection

$("#paint_sub").find(".sub_btn1").each(function() {
	$(this).bind('click', function() {
		//scroll_window();
		if(selected_paint != null){
			if($(this).attr('id') == selected_paint){
				$('#' + selected_paint).removeClass('sub_btn1_selected');
				selected_paint = null;
			}else{
				$('#' + selected_paint).removeClass('sub_btn1_selected');
				selected_paint = $(this).attr('id');
				$(this).addClass('sub_btn1_selected');
			}
		}else{
			selected_paint = $(this).attr('id');
			$(this).addClass('sub_btn1_selected');
		}
	});
});
$("#paint_sub").find("#vehicle_sel_btn").each(function() {
	$(this).bind('click', function() {
		var selection = $("#auto_type_sel").val();
		if(selection == 'sedan'){
			displayPopup('/vehicle_templates/sedan/sedan_800_600.html');
		}else if(selection == 'pickup'){
			displayPopup('/vehicle_templates/pickup/pickup_truck_800_600.html');
		}else if(selection == 'van'){
			displayPopup('/vehicle_templates/van/van_800_600.html');
		}else if(selection == 'suv'){
			displayPopup('/vehicle_templates/suv/suv_800_600.html');
		}
	});	
});
$('#paint_sub').find('.sub_add_btn').bind('click', function() {
	if(select_complete == true){
		var price = $('#' + selected_paint).attr('data-price');
		var service = $('#' + selected_paint).attr('data-service');
		var desc = $('#' + selected_paint).attr('data-desc');
		var type = $('#' + selected_paint).attr('data-type');
		if(selected_paint != null){
			headlights_selected = true;
			add_service(service, price, desc, type);
		}else{
		$("#paint_sub").find(".add_error span").html("Please select a service from the list above.").fadeIn(500).delay(3500).fadeOut(500);
		$("#paint_sub").find(".sub_btn1").each(function() {			
			var button = $(this).addClass('sub_btn1_selected')
			t = setTimeout(function(){
				button.removeClass('sub_btn1_selected');
			},300);
		});
		}
	}else{
		$("#paint_sub").find(".add_error span").html("You must first select a vehical type and panel from the popup.").fadeIn(500).delay(3500).fadeOut(500);
	}
});						

//This block handles preparing out selected services as JSON data for transfer to server
$("#quote_submit").bind('click', function(){
	if(sub_disable == true){
		//Do nothing		
	}else{
		//Check for required fields
		if($("#car-years").val() != '' && $("#car-makes").val() != '' && $("#car-models").val() != ''){
			var blank_trim = '';
			if($("#car-model-trims option:selected").text() != '---'){
				blank_trim = $("#car-model-trims option:selected").text();
			}
			var servicesJSON = '{"auto" : [ { "year":"'+$("#car-years").val()+'","make":"'+$("#car-makes").val()+'","model":"'+$("#car-models").val()+'","trim":"'+blank_trim+'","vin":"'+$("#vin").val()+'" } ], "services" : [';
			$("#quote_tbl").find('.quote_tbl_tr').each(function(){
				servicesJSON = servicesJSON + '{';
				$.each($(this).data(), function(i, e) {
					if(i == "price"){
						servicesJSON = servicesJSON + '"'+i+'":"'+cent(e)+'",';
					}else{
						servicesJSON = servicesJSON + '"'+i+'":"'+e+'",';
					}
				});
				servicesJSON = servicesJSON + '},';
			});
			servicesJSON = servicesJSON + ']}';
			servicesJSON = servicesJSON.replace(/,]/g,']');
			servicesJSON = servicesJSON.replace(/,}/g,'}');
			servicesJSON = servicesJSON.replace(/_/g,' ');
			servicesJSON = escape(servicesJSON);
			//Post by creating a hidden form		
			function post(path, name, value) {
				var form = $('<form></form>');
			
				form.attr("method", "post");
				form.attr("action", path);
				form.css('display', 'none');
				
					var field = $('<input></input>');
			
					field.attr("type", "hidden");
					field.attr("name", name);
					field.attr("value", value);
			
					form.append(field);
			
				// The form needs to be apart of the document in
				// order for us to be able to submit it.
				$(document.body).append(form);
				form.submit();
			}
			post('/quote/quote_submit.html', 'servicesJSON', servicesJSON);
		}else{
			//Fields left blank, display error
			
		}
	}
});


$(document).ready(function(){
	show_step('step_1');
	$(".cquery_select").change(function(){
		if($("#car-years").val() != '' && $("#car-makes").val() != '' && $("#car-models").val() != '' && step2_shown == false){
			step2_shown = true;	
			show_step('step_2');
			$('#quote_bottom').fadeIn(500);
			scroll_window('step_2', 144)
			$("#qte_sect2_wrap").fadeIn(500, function(){
				$("#detail_sub").tinyscrollbar_update();
			});
		}
	});
	//Step 3 will be shown on the first service added
});

function show_step(stepId){
	$("#"+stepId).fadeIn(500);
	$("#"+stepId).find(".step_num").css({
		'left' : "-"+offscreen+'px'
	});
	$("#"+stepId).find(".step_num").show(function(){
		$(this).animate(
		{ 'left' : '32'	}, 
		{
			duration: 1000, 
			easing : 'easeOutQuad',
			complete: function(){
				$("#"+stepId).find("h1").fadeIn(500);
			}
		});
	});
}
