@extends('wrappers.home')

@section('content')    
<div id="slideshow">
	<div class="slider-wrapper theme-deleartec">
    <div class="ribbon"></div>
    <div id="slider" class="nivoSlider">
      <!--<img src="images/main_slides/smart_quote_slide1.png" alt="" title="<h1>Smart-Quote System</h1> Quickly create a quote while exploring the services and pricing options we offer. <a href='/quote/smart_quote.html'>Start one now</a>" />-->
      <img src="images/main_slides/dealership_slide1.png" alt="" title="<h1>Dealership Services</h1> Save time and money by outsourcing to the pros! <a href='/dealerships.html'>Learn more here</a>" />
      <img src="images/main_slides/profile_slide1.png" alt="" title="<h1>Robust and Easy-to-use Web Interface</h1> Our web application is what sets us apart. Quickly manage your account and quotes to maximize your business." />
    </div>
	</div>               
</div>
	<script type="text/javascript">
	$(window).load(function() {
		$('#slider').nivoSlider({
			animSpeed:500,
			pauseTime:8000,
			directionNavHide:false,
			captionOpacity:.95						
		});
	});
	</script>
	<div class="content_span c_span_1 gradiant_1 box_shadow_2" style="margin:0px 0px 48px 0px;">
	<div class="content_subwrap welcome hasFloats">
    <h1 class="titleSpan">Welcome to <em>DealerTec!</em></h1>
    <p class="subtitleSpan welcome_sub" style="float:none; width:auto">We excel in providing you with top-notch, quality detailing services and cosmetic auto repairs. Our service is completely mobile and offers the most convenience and pizzazz of anyone else out there.</p>
    <!--<span class="start_button">
        <a class="button large_button" id="start_now" href="/quote/smart_quote.html">
        <span class="btn_text">
          <small>Click here to get started with our</small> Smart-Quote System
        </span>                        
        </a>
    </span>-->
	</div>
	</div>
	<div class="content_span c_span_2" id="index_sect_1">
		<ul id="services_list" class="hasFloats">
	    <h1 class="serv_title">A full line of<br /><em>Services</em><br /><small>Click on one to get the low-down!</small></h1>
	    <span id="services_row_a">
	      <li class="services_li" id="detail" title="detail"><div class="serv_icon" id="detail_icon"></div>Auto Conditioning</li>
	      <li class="services_li" id="wind" title="wind"><div class="serv_icon" id="wind_icon"></div>Windshield Repair</li>
	      <li class="services_li" id="plastic" title="plastic"><div class="serv_icon" id="plastic_icon"></div>Plastics Restoration</li>
	    </span>
	    <span id="services_row_b">
	      <li class="services_li" id="headlight" title="headlight"><div class="serv_icon" id="headlight_icon"></div>Headlight Restoration</li>
	      <li class="services_li" id="paint" title="paint"><div class="serv_icon" id="paint_icon"></div>Paint Touchup</li>
	    </span>
		</ul>
	</div>
	<div id="service_box" class="gradiant_3">
		<div id="service_desc" style="display:none">
			<div class="ajax_loader"></div>
		</div>
	</div>
	<div id="desc_btn_wrap">
		<div id="desc_btn"></div>
	</div>
	<!--<div class="content_span c_span_3 box_shadow_2" id="index_sect_2">
	<div class="content_subwrap welcome hasFloats">
	<div id="serv_opts" class="gradiant_1 box_border_1 box_shadow_2">Mobile <b>or</b> Fixed</div>
		<p>In addition to our mobile services, we have partnered with Performance Motors and have our garage ready for customers who cannot have, or do not want, us to come to them. <b>The choice is yours!</b></p>
		<div id="loc_map">
	    	<a href="https://maps.google.com/maps/ms?msa=0&amp;msid=206651175954024500772.0004c36b59e0d2eb1dd1e&amp;hl=en&amp;ie=UTF8&amp;t=m&amp;ll=42.256475,-88.286648&amp;spn=0.022234,0.036478&amp;z=14&amp;source=embed" style="" target='_blank'>5206 Illinois 31, Crystal Lake, IL 60012<br /><small>Click for directions.</small></a>
	        <iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps/ms?msa=0&amp;msid=206651175954024500772.0004c36b59e0d2eb1dd1e&amp;hl=en&amp;ie=UTF8&amp;t=m&amp;ll=42.256475,-88.286648&amp;spn=0.022234,0.036478&amp;z=14&amp;output=embed"></iframe><br />                        
	    </div>
	</div>
	</div>-->


@stop