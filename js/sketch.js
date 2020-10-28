var enemy = [];
var y;
var vy = 0;
var gravity = 0.9;
var speed = 6;
var score = 0;
var mImgload;
var bgImg;
var enemyImg;
var bitFont;
var death = new Audio('Portfolio/images/Game/Death.mp3');
var deathPlayed = false;
var gameMusic = new Audio('Portfolio/images/Game/GameMusic.mp3');

gameMusic.addEventListener(
	'ended',
	function() {
		this.currentTime = 0;
		this.play();
	},
	false
);
gameMusic.play();

function preload() {
	mImgload = createImg('Portfolio/images/Game/pModel.gif');
	bgImg = loadImage('Portfolio/images/Game/GameBG.png');
	enemyImg = loadImage('Portfolio/images/Game/enemyModel.jpg');
	bitFont = loadFont('Portfolio/css/fonts/8-BIT WONDER.TTF');
}

function setup() {
	createCanvas(800, 400);
	y = height - 185;
	newEnemy();
}

function draw() {
	background(bgImg);
	textFont(bitFont);
	noStroke();
	textSize(16);
	textAlign(CENTER, TOP);
	fill(255);
	text('SCORE ' + score, 0, 23, width);

	if (score % 5000 == 0 && speed < 14) {
		speed += 0.5;
		console.log(speed);
	}

	mImgload.position(10, y - 60);
	noFill();
	ellipse(50, y, 50, 50);

	y += vy;
	vy += gravity;
	y = constrain(y, 0, height - 185);

	if (keyIsDown(32) && y == height - 185 && speed != 0) {
		vy = -15;
	}

	for (let jump of enemy) {
		jump.move();
		jump.display();
		jump.x = constrain(-500, jump.x, 20);

		if (speed != 0) {
			score += 10;
		}

		var d = dist(50, y, jump.x + 25, height - 185);

		if (d < 50) {
			if (deathPlayed == false) {
				death.play();
				deathPlayed = true;
			}

			fill(255);
			textSize(42);
			textAlign(CENTER);
			text('GAME OVER', 0, height / 2, width);

			textSize(18);
			textAlign(CENTER);
			text('Press SPACE to restart', 0, height / 2 + 50, width);

			speed = 0;
		} else {
			if (
				(dist(-500, height - 185, jump.x + 25, height - 185) < 50 && enemy.length <= 2) ||
				(dist(-50, height - 185, jump.x + 25, height - 185) < 50 && enemy.length <= 1)
			) {
				enemy = [];
				newEnemy();
			}
		}
	}
}

function keyPressed() {
	if (key == ' ' && speed == 0) {
		enemy = [];
		speed = 6;
		score = 0;
		deathPlayed = false;
		newEnemy();
	}
}

function newEnemy() {
	var ran = random(180, 400);
	var ranHeight1 = random(0, 20);

	if (random(0, 2) > 1) {
		enemy.push({
			x: 800 + ran,

			display: function() {
				image(enemyImg, this.x, height - 210 - ranHeight1, 50, 50 + ranHeight1);
				ellipse(this.x + 25, height - 185, 50, 50);
			},
			move: function() {
				this.x = this.x - speed;
			}
		});
	}

	enemy.push({
		x: 800,

		display: function() {
			image(enemyImg, this.x, height - 210 - ranHeight1, 50, 50 + ranHeight1);
			ellipse(this.x + 25, height - ranHeight1 / 2 - 185, 50, 50 + ranHeight1);
		},
		move: function() {
			this.x = this.x - speed;
		}
	});
}
