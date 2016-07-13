// JavaScript Document
// This script will do all the handling of our fancy services bar

//Define some animation flags
var anim_running = false;
var is_down = false;
//This array stores information about the currently selected service. Set to detail for default.
var service = new Array();

//get the GET
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

//These are our animation functions for the drop down. They return true upon completion
function menu_down(){
	if (anim_running == false){
		anim_running = true
		$('#service_box').animate(
			{'min-height': '368px'},
			{			
			duration: 750,
			easing: 'easeOutBack',
			complete: function(){
				anim_running = false;
				is_down = true;
				//Test if any service has been set, if not set to default and load ajax
				if(typeof service['title']  == 'undefined'){
					$('#service_desc').html('<h1>Select a service above.</h1>');
					$('#service_desc').fadeIn(500);
				}else{
					load_ajax(service['title']);
				}
			}
		});
		scroll_window();
	}
}

function menu_up(){
	$('#service_desc').fadeOut(250, function(){
		if (anim_running == false){
			anim_running = true
			$('#service_box').animate(
				{'min-height': '0px'},
				{			
				duration: 750,
				easing: 'easeInBack',
				complete: function(){
					anim_running = false
					is_down = false;
				}								
			});
		}
	});
}

function scroll_window(){
	$('html, body').animate({
		scrollTop: $("#services_list").offset().top - 24
	}, 500);
}

//Function handles dropdown button clicks
$('#desc_btn').bind('click touchstart', function() {
	if (is_down == false){
		menu_down();
	}else{
		menu_up();
	}
});

//This function unsets our previously active link by reverting the styles using our service array
function unset_active(title_ary){
	$('#services_list').find('.services_li').each(function() {
		if($(this).data('title') == title_ary['title']){
			//Current LI is the set previous title, unset BG/txt
			$(this).children('.serv_icon').css('background-position', title_ary['bg_pos']);
			$(this).css('color', title_ary['txt_color']);
		}else{
			//Do nothing
		}
	});
}

function set_service(title, bg_pos, txt_color) {
	service['title'] = title;
	service['bg_pos'] = bg_pos;
	service['txt_color'] = txt_color;
}

//Recursive function needed to set active styles if link from top nav is clicked
function set_active(li) {
	var title = li.data('title');
	var this_icon = li.children('.serv_icon');
	var bg_pos = this_icon.css('background-position');
	var bg_ary = bg_pos.split(' ');
	var txt_color = li.css('color');
	
	this_icon.css('background-position', '-1px ' + bg_ary[1]);	
	li.css('color', '#fff');
	
	set_service(title, bg_pos, txt_color);							
}

//Define AJAX function
function load_ajax(title){
	var html = 'services/'+title;
		//First we clear the description div and show the AJAX loading GIF
		$('#service_desc').fadeOut(250, function(){
			$('#service_desc').html('');
			$('#service_desc').hide();
			$('.ajax_loader').show();
			//Now we perform quick jquery HTML ajax load
			$('#service_desc').load(html, function(response) {
				$('.ajax_loader').hide();
				$('#service_desc').ajaxError(function(){
					$('#service_desc').html('Failed to load '+html+'.');	
				});
				//Set box height to the descriptions height before showing it.
				var set_height = $('#service_desc').height();
				scroll_window();
				if($('#service_box').height() != set_height){
					anim_running = true;
					$('#service_box').animate(
						{'min-height': set_height},
						{			
						duration: 750,
						easing: 'easeInOutBack',
						complete: function(){
							$('#service_desc').fadeIn(250);
							anim_running = false;
						}
					});
				}else{
					$('#service_desc').fadeIn(250);
				}
			});
		});
}

//Function when one of the lower links is clicked
$('#services_list').find('.services_li').each(function() {
	var li = $(this);
	var this_icon = li.children('.serv_icon');
	var bg_pos = this_icon.css('background-position');
	var bg_ary = bg_pos.split(' ');
	var txt_color = li.css('color');
	
	//Scrub the html of the title attributs and store in the data
	li.data('title',li.attr('title'));
    li.removeAttr('title');
	
	li.hover(
		function(){									
			this_icon.css('background-position', '-1px ' + bg_ary[1]);	
			li.css('color', '#fff');							
		},function(){
			if(li.data('title') != service['title']){
				this_icon.css('background-position', bg_pos);
				li.css('color', txt_color);
			}
		}
	);
	li.bind('click touchstart', function() {
		if(anim_running == false){
			if(li.data('title') != service['title']){
				//Unset current active
				unset_active(service);
				//Set service ary to data
				service['title'] = li.data('title');
				service['bg_pos'] = bg_pos;
				service['txt_color'] = txt_color;
				
				if(is_down == false){
					//Menu is not down, run animation before ajax
					menu_down();	
				}else{
					//Menu is down, proceed to ajax
					load_ajax(service['title']);
				}
			}else{
				if(is_down == false){
					//Menu is not down, run animation before ajax
					menu_down();	
				}
			}
		}
	});
});


//Next block sets service to the URL var
var urlVar = getUrlVars();

if(typeof urlVar['service']  == 'undefined'){
	
}else{
	$('#services_list').find('.services_li').each(function() {
		var li = $(this);
		if(li.attr('id') == urlVar['service']){
			set_active(li);
			var t = setTimeout('menu_down()', 250);
		}
	});
}

//This block is the function for the top links. Pass it the service name and run it when the link is clicked.
function run_service(this_service) {
	if(anim_running == false){
		if(this_service != service['title']){
				//Unset current active
				unset_active(service);
				//Set service ary to data
				if(is_down == false){
					//Menu is not down, run animation before ajax
					$('#services_list').find('.services_li').each(function() {
						var li = $(this);
						if(li.attr('id') == this_service){
							set_active(li);
							menu_down();
						}
					});
				}else{
					//Menu is down, proceed to ajax
					load_ajax(this_service);
				}
		}else{
			if(is_down == false){
				//Menu is not down, run animation before ajax
				menu_down();	
			}
		}
	}
}
