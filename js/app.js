// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 60 + 165 * Math.random();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += Math.random() * 750 * dt;
    }
    else{
        this.x = 0;
        this.y = 60 + 165 * Math.random();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// the Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    //initial location set to center of the bottom row
    this.x = 202;
    this.y = 400;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if the player wins the game by reaching to the water-block
Player.prototype.update = function() {
    // reset the player's location if it reaches the top
    if (this.y < 0) {
      // one second delay before resetting
      setTimeout(function() {
        player.x = 202;
        player.y = 400;
      }, 1000);
    }
};
// Change player's position based on user handleInput and make sure
// it doesn't go off the screen
Player.prototype.handleInput = function(d) {
    if (d === 'up' && this.y > 0) {
      this.y -= 83;
    }
    else if (d === 'left' && this.x > 0) {
      this.x -= 101;
    }
    else if (d === 'right' && this.x < 404) {
      this.x += 101;
    }
    else if (d === 'down' && this.y < 400) {
      this.y += 83;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
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

// Check for collision between player and enemies
function checkCollisions() {
  allEnemies.forEach(function(enemy) {
      // if collided
      if(Math.abs(enemy.x - player.x) < 50 && Math.abs(enemy.y - player.y) < 85) {
        // reset the game
        player.x = 202;
        player.y = 400;
      }
  });
}
