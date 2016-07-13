<!doctype html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Dealertec Auto Detailing</title>

	<link rel="shortcut icon" href="http://www.dealertec.com/images/icons/favicon.ico"/>

	<!-- CSS -->
	<link href="/js/placeholderRX/placeholderRX.css" rel="stylesheet" type="text/css" />
	<link href="/css/main.css" rel="stylesheet" type="text/css" />
	<link href="/css/services.css" rel="stylesheet" type="text/css" />
	<link href="/css/sidebars.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="/js/nivo-slider/nivo-slider.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="/js/nivo-slider/themes/dealertec/dealertec.css" type="text/css" />

	<!-- JS -->
	<script src="/js/jquery.1.7.1.min.js" type="text/javascript"></script>
	<script src="/js/placeholderRX/jquery.placeholderRX.js" type="text/javascript"></script>
	<script src="/js/nivo-slider/jquery.nivo.slider.js" type="text/javascript"></script>
	<script src="/js/jquery.easing.1.3.js" type="text/javascript"></script>
	<script src="/js/validate/jquery.validate.min.js" type="text/javascript"></script>

</head>

<body>
	<div id="wrapper">
		@include('elements.header')
		<div id="content">
			@yield('content')
		</div>
		@include('elements.footer')
		@include('elements.facebook_module')
	</div>
</body>

<script src="/js/app/services.1.1.js" type="text/javascript" ></script>
<script src="/js/app/sidebars.js" type="text/javascript"></script>	

</html>