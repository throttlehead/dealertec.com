<div id="facebook_wrap" style="position: fixed; top: 169.5px;">
  <div id="facebook">
    <div class="fb-like-box fb_iframe_widget" data-border-color="#777"
    data-colorscheme="dark" data-header="true" data-height="640" data-href=
    "http://www.facebook.com/DealerTec" data-show-faces="true" data-stream=
    "true" data-width="292">
      <span style=
      "vertical-align: bottom; width: 292px; height: 640px;"><iframe class=""
      frameborder="0" height="640px" id="f26d4651dc" name="f26d4651dc"
      scrolling="no" src=
      "http://www.facebook.com/plugins/like_box.php?app_id=368870199817802&amp;channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2FQjK2hWv6uak.js%3Fversion%3D41%23cb%3Dfb61a0e7c%26domain%3Dwww.dealertec.com%26origin%3Dhttp%253A%252F%252Fwww.dealertec.com%252Ff3851ce70c%26relation%3Dparent.parent&amp;color_scheme=dark&amp;header=true&amp;height=640&amp;href=http%3A%2F%2Fwww.facebook.com%2FDealerTec&amp;locale=en_US&amp;sdk=joey&amp;show_faces=true&amp;stream=true&amp;width=292"
      style="border: none; visibility: visible; width: 292px; height: 640px;"
      title="fb:like_box Facebook Social Plugin" width="292px"><span style=
      "vertical-align: bottom; width: 292px; height: 640px;"></span></iframe></span>
    </div>

    <div class="box_shadow_1" id="fb_sideicon"></div>
  </div>
</div>

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '368870199817802', // App ID
      channelUrl : 'http://www.dealertec.com/scripts/javascript/facebook/channel.php', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

		FB.getLoginStatus(function(response) {
		  if (response.status === 'connected') {
			// the user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token 
			// and signed request each expire
			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;
		  } else if (response.status === 'not_authorized') {
			// the user is logged in to Facebook, 
			// but has not authenticated your app
		  } else {
			// the user isn't logged in to Facebook.
		  }
	  });		
  };

  // Load the SDK Asynchronously
  (function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
  }(document));
</script>