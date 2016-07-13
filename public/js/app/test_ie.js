// Script checks for IE explorer version 9. If not at least 9, alert user to upgrade their browser.

function getInternetExplorerVersion()
// Returns the version of Windows Internet Explorer or a -1
// (indicating the use of another browser).
{
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer')
{
	var ua = navigator.userAgent;
	var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if (re.exec(ua) != null)
		rv = parseFloat( RegExp.$1 );
	}
	return rv;
}
function checkVersion()
{
	var msg = "You're not using Windows Internet Explorer.";
	var ver = getInternetExplorerVersion();
	if ( ver> -1 )
	{
	if ( ver <= 9.0 )
		alert("<b>This website does not support older versions of Internet Explore!<b><br />It will likely not work properly in your browser. Please consider upgrading to IE 9 or using an alternative such as Firefox of Google Chrome.")
	}
}