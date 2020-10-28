var darkMode = false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

var ua = window.navigator.userAgent;
var msie = ua.indexOf('MSIE ');

if (isMobile) {
	$('.konami-code', '#DarkMode', '.DarkmodeLabel').css({ display: 'none' });
} else {
	var xMousePos = 0;
	var yMousePos = 0;
	var lastScrolledLeft = 0;
	var lastScrolledTop = 0;

	document.addEventListener('mousemove', (e) => {
		xMousePos = e.pageX;
		yMousePos = e.pageY;

		$('.hover__image').css({ left: xMousePos + 5, top: yMousePos + 5 });
	});

	document.addEventListener('scroll', function(event) {
		if (lastScrolledLeft != $(document).scrollLeft()) {
			xMousePos -= lastScrolledLeft;
			lastScrolledLeft = $(document).scrollLeft();
			xMousePos += lastScrolledLeft;
		}
		if (lastScrolledTop != $(document).scrollTop()) {
			yMousePos -= lastScrolledTop;
			lastScrolledTop = $(document).scrollTop();
			yMousePos += lastScrolledTop;
		}

		$('.hover__image').css({ left: xMousePos + 5, top: yMousePos + 5 });
	});

	$('.hover__image_active').mouseenter(function() {
		$('.hover__image').show();
	});
	$('.hover__image_active').mouseleave(function() {
		$('.hover__image').hide();
	});
}

var keyArray = [];
var checkArray = [
	'ArrowUp',
	'ArrowUp',
	'ArrowDown',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowLeft',
	'ArrowRight',
	'b',
	'a',
	'Enter'
];
let lastKeyTime = Date.now();
let firstKeyTime = null;

document.addEventListener('keydown', (e) => {
	console.log(e.key);
	keyArray.push(e.key);

	if (firstKeyTime === null) {
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
		console.log('Konami Code!');

		window.open('Game.html', 'name', 'width=815,height=420');
	}

	if (lastKeyTime - firstKeyTime > 5000) {
		keyArray = [];
	}
});
