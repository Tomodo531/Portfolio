var head = document.getElementsByTagName('HEAD')[0];
var link = document.createElement('link');

/* Sample function that returns boolean in case the browser is Internet Explorer*/
function isIE() {
  ua = navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

  return is_ie;
}
/* Create an alert to show if the browser is IE or not */
if (isIE()){
    console.log('It is InternetExplorer');
    $(".DarkMode, .DarkmodeLabel").hide();

    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/index.css';

    head.appendChild(link);
}else{
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/indexSass.css';

    head.appendChild(link);
}
