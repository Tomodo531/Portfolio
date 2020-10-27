var darkMode = false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

if (isMobile) {

  $(".konami-code", "#DarkMode", ".DarkmodeLabel").css({"display":"none"});

}else {
  var xMousePos = 0;
  var yMousePos = 0;
  var lastScrolledLeft = 0;
  var lastScrolledTop = 0;

  var body = document.body,
    html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );

  document.addEventListener('mousemove', e => {
    xMousePos = e.pageX;
    yMousePos = e.pageY;

    $(".Cursor").css({left:xMousePos - 20, top:yMousePos -20});
    $(".Dot").css({left:xMousePos - 5, top:yMousePos - 5});
    $(".hover-image").css({left:xMousePos + 5, top:yMousePos + 5});
  });

      document.addEventListener('scroll', function(event){
          if(lastScrolledLeft != $(document).scrollLeft()){
              xMousePos -= lastScrolledLeft;
              lastScrolledLeft = $(document).scrollLeft();
              xMousePos += lastScrolledLeft;
          }
          if(lastScrolledTop != $(document).scrollTop()){
              yMousePos -= lastScrolledTop;
              lastScrolledTop = $(document).scrollTop();
              yMousePos += lastScrolledTop;
          }

          $(".hover-image").css({left:xMousePos + 5, top:yMousePos + 5});
      });

    $(".hover-image-act").mouseenter(function(){
      $(".hover-image").show();
    });
    $(".hover-image-act").mouseleave(function(){
      $(".hover-image").hide();
    });
}

var checkbox = document.querySelector('input[name=mode]');

checkbox.addEventListener('change', function() {
    if(this.checked) {
        trans();
        document.documentElement.setAttribute('data-theme', 'dark');
        $(".DarkmodeLabel").css({"filter":"grayscale(0%)"});
        darkMode = true;
    } else {
        trans();
        document.documentElement.setAttribute('data-theme', 'light');
        $(".DarkmodeLabel").css({"filter":"grayscale(100%)"});
        darkMode = false;
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 1000)
}

var keyArray = [];
var checkArray = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a", "Enter"];
let lastKeyTime = Date.now();
let firstKeyTime = null;


document.addEventListener('keydown', e =>{
  keyArray.push(e.key);
  
  if (firstKeyTime === null){
    firstKeyTime = Date.now();
  }

  lastKeyTime = Date.now();

    var equal = true;

    for (let index = 0; index < keyArray.length; index++) {

      if (keyArray[index] != checkArray[index]) {
        equal = false;
        firstKeyTime = null;
        keyArray = [];
      }
    }

    if (equal == true && keyArray.length == checkArray.length) {
      keyArray = [];
      console.log("Konami Code!");

      window.open('Game.html','name','width=815,height=420');
    }

  if (lastKeyTime - firstKeyTime > 5000){
    keyArray = [];
  }
});
