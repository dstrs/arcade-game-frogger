// Enemies our player must avoid
/*var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/

let isGameOver = false;
let collectedGems = 0;
let playCallbackFunc;

class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 150 + speed);
    this.sprite = "images/enemy-bug.png";
  }

  update(dt) {
    this.x += this.speed * dt;

    if (this.x > 501) {
      this.x = -100;
      this.speed = Math.floor(Math.random() * 200 + 100);
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //handle collision
  collision() {
    if (
      player.x < this.x + 75 &&
      player.x + 75 > this.x &&
      player.y < this.y + 25 &&
      player.y + 25 > this.y
    ) {
      player.resetPosition();
      player.lives === 0 ? (isGameOver = true) : player.lives--;
    }
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.lives = 3;
    this.sprite = "images/char-boy.png";
  }

  update(dt) {
    //prevent going off screen
    if (this.x < 100) {
      this.x = 0;
    }
    if (this.x > 400) {
      this.x = 400;
    }
    if (this.y > 400) {
      this.y = 400;
    }
    if (this.y < 0) {
      this.y = 400;
      this.x = 200;
      this.score++;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyCode) {
    switch (keyCode) {
      case "left":
        this.x -= 100;
        break;
      case "up":
        this.y -= 85;
        break;
      case "right":
        this.x += 100;
        break;
      case "down":
        this.y += 85;
        break;
    }
  }

  //get back to starting position
  resetPosition() {
    this.x = 200;
    this.y = 400;
  }
}

//a class to draw and update a scoreboard
class ScoreBoard {
  constructor() {
    this.score = player.score;
  }

  render() {
    ctx.font = "36pt Impact";
    ctx.textAlign = "start";
    ctx.fillStyle = "orange";
    ctx.fillText(`SCORE: ${this.score}`, 0, 50);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeText(`SCORE: ${this.score}`, 0, 50);
  }

  update() {
    this.score = player.score;
  }
}

//a class to draw and update lives
class Lives {
  constructor() {
    this.number = player.lives;
    this.sprite = "images/Heart1.png";
    this.y = -30;
    this.width = 70;
    this.height = 90;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), 440, this.y);
    ctx.drawImage(Resources.get(this.sprite), 370, this.y);
    ctx.drawImage(Resources.get(this.sprite), 300, this.y);
  }

  update() {
    switch (player.lives) {
      case 3:
        ctx.drawImage(Resources.get(lives.sprite), 440, this.y);
        ctx.drawImage(Resources.get(lives.sprite), 370, this.y);
        ctx.drawImage(Resources.get(lives.sprite), 300, this.y);
        break;
      case 2:
        ctx.clearRect(300, this.y, this.width, this.height);
        break;
      case 1:
        ctx.clearRect(300, this.y, this.width, this.height);
        ctx.clearRect(370, this.y, this.width, this.height);
        break;
      case 0:
        ctx.clearRect(300, this.y, this.width, this.height);
        ctx.clearRect(370, this.y, this.width, this.height);
        ctx.clearRect(440, this.y, this.width, this.height);
        break;
    }
  }
}

//game modal class to handle "Game Over" and "You Won" modals
class GameModal {
  constructor(text, color) {
    this.text = text;
    this.playAgainText = "Press ENTER to play again";
    this.color = color;
  }

  render() {
    //painting modal
    ctx.fillStyle = this.color;
    ctx.fillRect(50, 150, 400, 300);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 150, 400, 300);

    //Text message
    ctx.font = "36pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(this.text, 250, 300);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeText(this.text, 250, 300);

    //Play Again instruction
    ctx.font = "24pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(this.playAgainText, 250, 380);
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 0.1;
    ctx.strokeText(this.playAgainText, 250, 380);
  }

  //handle Enter to play again
  playAian() {
    document.addEventListener("keyup", enterKeyHandler);
  }
}

class Gem {
  constructor(y, spriteNumber) {
    this.spriteArr = [
      "images/Gem Blue1.png",
      "images/Gem Orange1.png",
      "images/Gem Green1.png",
    ];
    this.sprite = this.spriteArr[spriteNumber];
    this.x = randomNumber(80, 450);
    this.y = y;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //updates score and collected gems data
  update() {
    collectedGems++;
    player.score += 10;
  }

  collect() {
    //check if the player collides with the gem
    if (
      player.x < this.x + 55 &&
      player.x + 55 > this.x &&
      player.y < this.y + 25 &&
      player.y + 55 > this.y
    ) {
      //remove collected gem to the bottom of the canvas
      switch (collectedGems) {
        case 0:
          console.log("0");
          this.y = 480;
          this.x = 420;
          this.update();
          break;
        case 1:
          console.log("1");
          this.y = 480;
          this.x = 340;
          this.update();
          break;
        case 2:
          console.log("2");
          this.y = 480;
          this.x = 260;
          this.update();
          break;
      }
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(-100, 230, 180);
const enemy2 = new Enemy(-100, 145, 90);
const enemy3 = new Enemy(-100, 60, 150);

const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player(200, 400);
const scoreBoard = new ScoreBoard();
const lives = new Lives();
const gameOverModal = new GameModal("GAME OVER!", "red");
const youWonModal = new GameModal("YOU WON!", "green");

const gemBlue = new Gem(190, 0);
const gemOrange = new Gem(100, 1);
const gemGreen = new Gem(270, 2);

const allGems = [gemBlue, gemOrange, gemGreen];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function resetGame() {
  isGameOver = false;
  player.lives = 3;
  player.score = 0;
  collectedGems = 0;
  player.resetPosition();

  allGems.forEach(function (gem) {
    gem.x = randomNumber(50, 430);
    gem.y = randomNumber(90, 290);
  });

  document.removeEventListener("keyup", enterKeyHandler);
}

//function to reset the game, declared here to be reusable
//for removing event listener
function enterKeyHandler(e) {
  if (e.keyCode == 13) {
    resetGame();
  }
}

//random number generator
function randomNumber(min, max) {
  const number = Math.random() * (max - min) + min;
  return Math.floor(number / 10) * 10;
}

// function choosePlayer() {

// }

//setSpeed to a function
