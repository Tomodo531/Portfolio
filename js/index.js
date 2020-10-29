/* ----------------------------------------------------------------
	Custom cursor
----------------------------------------------------------------*/

/* ----------------------------------------------------------------
	Smooth-Scrollbar*/

var Scrollbar = window.Scrollbar;

const scrollbar = Scrollbar.init(document.querySelector('#my-scrollbar'), {
	syncCallbacks: true
});

function scrollFunc(id) {
	let top = document.querySelector(`.${id}`).getBoundingClientRect().top;

	$({ top: 0 }).animate(
		{ top: top },
		{
			duration: 500,
			easing: 'swing',
			step(value) {
				scrollbar.setPosition(0, value);
			}
		}
	);
}

/*----------------------------------------------------------------*/

var darkMode = false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
	$('.Konami', 'hover__image').css({ display: 'none' });
} else {
	var xMousePos = 0;
	var yMousePos = 0;
	var xScroll = 0;
	var yScroll = 0;

	document.addEventListener('mousemove', (e) => {
		xMousePos = e.pageX;
		yMousePos = e.pageY;

		$('.hover__image').css({ left: xMousePos + 5 + xScroll, top: yMousePos + 5 + yScroll });
	});

	scrollbar.addListener(({ offset }) => {
		xScroll = offset.x;
		yScroll = offset.y;

		$('.hover__image').css({ left: xMousePos + 5 + xScroll, top: yMousePos + 5 + yScroll });
	});

	$('.hover__image_active').mouseenter(function() {
		$('.hover__image').show();
	});
	$('.hover__image_active').mouseleave(function() {
		$('.hover__image').hide();
	});
}

/* ----------------------------------------------------------------
	Darkmode
----------------------------------------------------------------*/

const setMode = () => {
	if (checkbox.checked) {
		trans();
		document.documentElement.setAttribute('data-theme', 'dark');
	} else {
		trans();
		document.documentElement.setAttribute('data-theme', 'light');
	}
};

let trans = () => {
	document.documentElement.classList.add('transition');
	window.setTimeout(() => {
		document.documentElement.classList.remove('transition');
	}, 1000);
};

var checkbox = document.querySelector('input[name=mode]');
checkbox.addEventListener('change', () => setMode());

if (new Date().getHours() > 18) {
	checkbox.checked = true;
	setMode();
}

/* ----------------------------------------------------------------
	Konami code
----------------------------------------------------------------*/

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

/* ----------------------------------------------------------------
	onblur title change
----------------------------------------------------------------*/

window.onblur = () => {
	document.title = "Martin H. Olesen | Andy's gone!";
};
