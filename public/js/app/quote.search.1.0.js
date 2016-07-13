
//Function sets CSS for popup
function setPopPosition(){
	//Set width$height vars
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var popHeight = $("#popup").height();
	var popWidth = $("#popup").width();
	//Set CSS style
	$('#popup').css({
		'position': 'fixed',
		'top': windowHeight/2 - popHeight/2,
		"left": windowWidth/2-popWidth/2
	});
}

//Function displays popup and loads passed data via AJAX
function displayPopup(){
	setPopPosition();
	$('#popupBG').fadeIn('400');
	$('#popup').fadeIn('400', function(){
		$('#popupBG').bind("click", function() {
			hidePopup();
		});
		$('#body').click(function(event){
			event.stopPropagation();
		})						
	});
}

function hidePopup(){
	$('#popupBG').fadeOut('200');
	$('#popup').fadeOut('200');
}
			
function ask_delete(id){
	var qte_id = $('#row_'+id).children('.qte_id').html();
	$("#popup").html("<div id='delete_pop' class='hasFloats'><h1>Are you sure you want to delete<br />Quote "+qte_id+"?</h1><button id='dlt_yes' onclick=delete_quote('"+qte_id+"','"+id+"')>Yes</button><button id='dlt_no' onclick='hidePopup()'>No</button></div>")
	displayPopup();						
}

function remove_row(id){
	//Fade row out, delete on animation success
	$("#row_" + id).animate({
		opacity:'0'
	}, 1000, function(){
		$(this).remove();
	});
}					

function delete_quote(id, row){
	var dataSet = "quoteId="+id;
	$.ajax({
		type: 'POST',
		url: "/scripts/php/app/delete_quote.php",
		data: dataSet,
		success: function(msg){
			if(msg == "Success"){
				hidePopup();
				remove_row(row);
			}else if (msg == "Error"){
				
			}
		}
	});
	
}

//This block handles delete yes/no
$('#dlt_yes').bind('click', function(){
	
});
$('#dlt_no').bind('click', function(){
	alert('click');
});

$(document).ready(function() {
	$( "#startdate" ).datepicker();
	$( "#enddate" ).datepicker();
	//$('.page_links').clone().prependTo('#result');
	
});	
				
