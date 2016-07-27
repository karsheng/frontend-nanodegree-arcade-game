// Global constants
var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// Global variables
// Initialize speed, score, level and no collectible in the first level.
var speed = 500,
    score = 0,
    level = 1,
    collectibleExist = false;

// A character superclass
var Character = function() {
};

Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // Make Enemy a subclass of Character
    Character.call(this);

    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = randomY();
};

// Delegate Character.prototype to the Enemy subclass
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy is within canvas, assign enemy with specific speed
    if (this.x < 505) {
      this.x += Math.random() * speed * dt;
    }
    else{
      // if enemy is outside canvas, randomly assign it's y position.
      this.x = 0;
      this.y = randomY();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// the Player class
var Player = function() {
    // Make Player a subclass of Character
    Character.call(this);

    this.sprite = 'images/char-boy.png';
    //initial location set to center of the bottom row
    this.x = 202;
    this.y = 490;
};

// Delegate Character.prototype to the Player subclass
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

// Check if the player wins the game by reaching to the water-block
Player.prototype.update = function() {
    // if player reaches water-block
    if (this.y < 80) {
      //increase base speed of game, update scores and increase level by 1.
      speed += 50;
      level += 1;
      //score increases with level as it gets more difficult.
      score += level * 10;

      // 40% chance of having collectible in the next game
      collectibleExist = getCollectible();
      collectible.update();

      //move player to starting position for new level
      player.startLevel();
    }
};

// Change player's position based on user handleInput and make sure
// it doesn't go off the screen
Player.prototype.handleInput = function(d) {
    if (d === 'up' && this.y > 0) {
      this.y -= TILE_HEIGHT;
    }
    else if (d === 'left' && this.x > 0) {
      this.x -= TILE_WIDTH;
    }
    else if (d === 'right' && this.x < 404) {
      this.x += TILE_WIDTH;
    }
    else if (d === 'down' && this.y < 450) {
      this.y += TILE_HEIGHT;
    }
};

// reset the game by moving player to the middle of the bottom row.
Player.prototype.startLevel = function() {
    player.x = 202;
    player.y = 490;
};

// The collectible class
var Collectible = function() {
    // Make Collectible a subclass of Character
    Character.call(this);

    this.sprite = 'images/star.png';
    //collectible is hidden from canvas initially
    hide(this);
};

// Delegate Character.prototype to the Collectible subclass
Collectible.prototype = Object.create(Character.prototype);
Collectible.prototype.constructor = Collectible;


// Update position of collectibles
Collectible.prototype.update = function() {
    // if the collectible exist in the game
    if (collectibleExist) {
      // randomly assigning position for the collectible
      this.x = randomX();
      this.y = randomY();
    } else {
      // hide it if it doesn't exist in this level
      hide(this);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// instantiate the collectible object called collectible
var collectible = new Collectible();


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

// to randomly assign x coordinate to a stone block row and return the value
function randomX() {
    var randomNumber = Math.random();
    var x;

    switch (true) {
      case (randomNumber < 0.2):
        x = 0 * TILE_WIDTH;
        break;
      case (0.2 <= randomNumber && randomNumber < 0.4):
        x = 1 * TILE_WIDTH;
        break;
      case (0.4 <= randomNumber && randomNumber < 0.6):
        x = 2 * TILE_WIDTH;
        break;
      case (0.6 <= randomNumber && randomNumber < 0.8):
        x = 3 * TILE_WIDTH;
        break;
      default:
        x = 4 * TILE_WIDTH;
    }
    return x;
}

// to randomly assign y coordinate to a stone block row and return the value
function randomY() {
    var randomNumber = Math.random();
    var y;

    switch (true) {
      case (randomNumber < 0.333):
        y = 145;
        break;
      case (0.333 <= randomNumber && randomNumber < 0.666):
        y = 145 + TILE_HEIGHT;
        break;
      default:
        y = 145 + TILE_HEIGHT * 2;
    }

    return y;
}

// 40% chance of having collectible in game
function getCollectible() {
    var chance = Math.random();
     if (chance < 0.4) {
       return true;
     }
     return false;
}

// hide an element/object
function hide(e) {
    e.x = 9999;
    e.y = 9999;
}
