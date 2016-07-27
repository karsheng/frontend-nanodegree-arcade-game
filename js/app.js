// Global variables
// Initialize speed, score, level and no collectible in the first level.
var speed = 500;
var score = 0;
var level = 1;
var collectibleExist = false;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = randomY();
};

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
    this.y = 490;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
      startLevel();
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
    else if (d === 'down' && this.y < 450) {
      this.y += 83;
    }
};

// The collectible class
var Collectible = function() {
    this.sprite = 'images/star.png';
    //collectible is hidden from canvas initially
    hide(this);
};

// Draw the collectible on the screen
Collectible.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

// Check for collision between player and enemies
function checkCollisions() {
  allEnemies.forEach(function(enemy) {
      // if collided
      if(Math.abs(enemy.x - player.x) < 50 && Math.abs(enemy.y - player.y) < 40) {
        // resets the game
        startLevel();
      }
  });
}

// Check if player gets collectible by colliding with it.
function checkCollectible() {
      // if collided increase score by 50
      if(Math.abs(collectible.x - player.x) < 50 && Math.abs(collectible.y - player.y) < 40) {
        score += 50;
        // hide the collectible once it's taken
        hide(collectible);
      }
}

// to randomly assign x coordinate to a stone block row and return the value
function randomX() {
  var randomNumber = Math.random();
  var x;

  switch (true) {
    case (randomNumber < 0.2):
      x = 0;
      break;
    case (0.2 <= randomNumber && randomNumber < 0.4):
      x = 101;
      break;
    case (0.4 <= randomNumber && randomNumber < 0.6):
      x = 202;
      break;
    case (0.6 <= randomNumber && randomNumber < 0.8):
      x = 303;
      break;
    default:
      x = 404;
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
      y = 145 + 83;
      break;
    default:
      y = 145 + 83 + 83;
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

// reset the game by moving player to the middle of the bottom row.
function startLevel() {
  player.x = 202;
  player.y = 490;
}

// hide an element/object
function hide(e) {
  e.x = 9999;
  e.y = 9999;
}
