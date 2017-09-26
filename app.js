	var PLAYER_START_X = 202; //Initial position of player (x-axis)
	var PLAYER_START_Y = 402; //Initial position of player (y-axis)
	var wins = 0; //Set initial win to 0, this will be used to keep track of number of wins
	var lives = 5; //Initially start player with 5 lives

	// Enemies our player must avoid
	var Enemy = function(y, speed) {
		this.sprite = 'images/enemy-bug.png';
		this.x = -100; //hides the enemy in the x-axis that isnt visible
		this.y = y;
		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.speed = speed;
	};

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	Enemy.prototype.update = function(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.	
		this.x += this.speed * dt;
		//if the enemy is off the screen, relocate it back to its initial starting point.
		if (this.x > 505) {
			this.x = -100;
			this.speed = Math.random() * (300 - 100) + 10;
		}
	};

	// Draw the enemy on the screen, required method for game
	Enemy.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

	// Now write your own player class
	var Player = function() {
		this.sprite = 'images/char-pink-girl.png';
		this.x = PLAYER_START_X;
		this.y = PLAYER_START_Y;
	};

	// Update function
	Player.prototype.update = function(dt) {
		// The player reached the water! Send them back to their initial starting point
		if (this.y < 15) {
			this.x = PLAYER_START_X;
			this.y = PLAYER_START_Y;
			var displayWins = parseInt(document.getElementById('displayWins').innerHTML);
			wins += 1; // if they win, display a counter totalling their number of wins
			document.getElementById('displayWins').innerHTML = wins;
			// If the player wins 5 times, display a message letting them know they won
			if (wins == 5) {
				alert("Congratulations! You've reached the water 5 times, you WIN!");
				wins = ""; // set wins back to 0
				lives = 5; // set lives back to 5
				document.getElementById('displayWins').innerHTML = wins;
				document.getElementById('displayLives').innerHTML = lives;
			}
		}

		// Keep player within the screen
		if (this.x <= 0) {
			this.x = 0;
		}
		if (this.x >= 405) {
			this.x = 405;
		}
		if (this.y >= 420) {
			this.y = 420;
		}

		// number of spaces moved during keyboard movements
		Player.prototype.moveLeft = function() {
			this.x -= 101;
		};
		Player.prototype.moveRight = function() {
			this.x += 101;
		};
		Player.prototype.moveUp = function() {
			this.y -= 83;
		};
		Player.prototype.moveDown = function() {
			this.y += 83;
		};

		//Collision detection, if players collide with enemies - send player back to initial starting position and decrease number of lives by 1 
		for (var i = 0; i < allEnemies.length; i++) {
			if (player.x < allEnemies[i].x + 75 && player.x + 65 > allEnemies[i].x && player.y < allEnemies[i].y + 50 && 70 + player.y > allEnemies[i].y) {
				console.log(allEnemies[i].x);
				var displayLives = parseInt(document.getElementById('displayLives').innerHTML);
				lives -= 1;
				document.getElementById('displayLives').innerHTML = lives;
				if (lives == 0) {
					alert("Maybe next time!");
					wins = "";
					lives = 5;
					document.getElementById('displayLives').innerHTML = lives;
					document.getElementById('displayWins').innerHTML = wins;
				}
				this.x = PLAYER_START_X;
				this.y = PLAYER_START_Y;
			}
		}
	};

	Player.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

	// this function should handle where the sprite moves dependent on which keycode is clicked
	Player.prototype.handleInput = function(key) {
		if (event.keyCode == 37) {
			//Player.prototype.moveLeft();
			this.moveLeft();
		}
		if (event.keyCode == 38) {
			//Player.prototype.moveRight();
			this.moveUp();
		}
		if (event.keyCode == 39) {
			//Player.prototype.moveUp();
			this.moveRight();
		}
		if (event.keyCode == 40) {
			//Player.prototype.moveDown();
			this.moveDown();
		}
	};

	// Place all enemy objects in an array called allEnemies
	// Create 3 enemies with their y-axis values
	var enemy1 = new Enemy(55, Math.random() * (400 - 100) + 10);
	var enemy2 = new Enemy(140, Math.random() * (400 - 100) + 10);
	var enemy3 = new Enemy(225, Math.random() * (400 - 100) + 10);
	var allEnemies = [enemy1, enemy2, enemy3];
	allEnemies.push;

	// Place the player object in a variable called player
	var player = new Player();

	// This listens for key presses and sends the keys to your
	// Player.handleInput() method. You don't need to modify this.
	document.addEventListener('keyup', function(e) {
		var allowedKeys = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
		};
		player.handleInput(allowedKeys[e.keyCode]);
	});