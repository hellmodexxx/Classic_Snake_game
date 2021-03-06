
var gameStart = null,
gameSpeed = null,
gameArea = null,
gameAreaContext = null,
gameAreaWidth = 0,
gameAreaHeight = 0,
cellWidth = 0,
playerScore = 0,
snake = null,
snakeFood = null,
snakeDirection = null,
speedSize = 0,
timer = null,
fruits = ["images/apple.png", "images/mango.png", "images/pear.png"],
randomFruit = null,
fruitEaten = false,
imageIndex = Math.floor(Math.random() * 1000) % 3;




function initialize() {
gameStart = document.querySelector('#gameStart');
gameSpeed = document.querySelector('#gameSpeed');
gameArea = document.querySelector('#gameArea');
gameAreaContext = gameArea.getContext('2d');
gameAreaWidth = 600;
gameAreaHeight = 400;
cellWidth = 20;
gameArea.width = gameAreaWidth;
gameArea.height = gameAreaHeight;

gameStart.onclick = function () {
    this.disabled = true;
    startGame()
}
}

function startGame() {
playerScore = 0;
snakeDirection = 'right'
speedSize = parseInt(gameSpeed.value);

if (speedSize > 9) speedSize = 9
else if (speedSize < 0) speedSize = 1

snake = [{ x: 0, y: cellWidth - 1 }]

gameAreaContext.fillStyle = "#fff"
gameAreaContext.fillRect(0, 0, gameAreaWidth, gameAreaHeight)
gameAreaContext.strokeStyle = '#CCC'
gameAreaContext.strokeRect(0, 0, gameAreaWidth, gameAreaHeight)
createFood()
createFruit(snakeFood.x, snakeFood.y)
clearInterval(timer)
timer = setInterval(createGameArea, 500 / speedSize)
}

function createFood() {
snakeFood = {
    x: Math.round((Math.random() * (gameAreaWidth - cellWidth)) / cellWidth),
    y: Math.round((Math.random() * (gameAreaHeight - cellWidth)) / cellWidth),
};
}

function createGameArea() {

var snakeX = snake[0].x;
var snakeY = snake[0].y;


if (snakeDirection == "right") snakeX++
else if (snakeDirection == "left") snakeX--
else if (snakeDirection == "down") snakeY++
else if (snakeDirection == "up") snakeY--


if (
    snakeX == -1 ||
    snakeX == gameAreaWidth / cellWidth ||
    snakeY == -1 ||
    snakeY == gameAreaHeight / cellWidth ||
    Control(snakeX, snakeY, snake)
) {
    writeScore()
    clearInterval(timer)
    gameStart.disabled = false;
    return;
}


if (snakeX == snakeFood.x && snakeY == snakeFood.y) {
    var newHead = { x: snakeX, y: snakeY }
    playerScore += speedSize
    createFood();
    fruitEaten = true;
    createFruit(snakeFood.x, snakeFood.y)
} else {

    var newHead = snake.pop();
    createWhite(newHead.x, newHead.y);
    newHead.x = snakeX; 
    newHead.y = snakeY  
}
snake.unshift(newHead)
for (var i = 0; i < snake.length; i++) {
    createSquare(snake[i].x, snake[i].y)
}

}

function createWhite(x, y) {
gameAreaContext.fillStyle = "#fff";
gameAreaContext.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth)
gameAreaContext.strokeStyle = '#fff'
gameAreaContext.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth)
}

function Control(x, y, array) {
for (var i = 0; i < array.length; i++) {
    if (array[i].x == x && array[i].y == y) return true;
}
return false;
}

function writeScore() {
gameAreaContext.font = "50px sans-serif";
gameAreaContext.fillStyle = "#FFF333";
gameAreaContext.fillText(
    "Score " + playerScore,
    gameAreaWidth / 2 - 100,
    gameAreaHeight / 2
)

}


function createSquare(x, y) {
gameAreaContext.fillStyle = "#568000";
gameAreaContext.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth)
}

function createFruit(x, y) {
var img1 = new Image();

img1.onload = function () {
    gameAreaContext.drawImage(img1, x * cellWidth, y * cellWidth);
};
img1.src = fruits[imageIndex]
if (fruitEaten) {
    imageIndex = Math.floor(Math.random() * 1000) % 3;
    fruitEaten = false;
}
}

function changeDirection(e) {
var keys = e.which;
if (keys == '40' && snakeDirection != 'up') snakeDirection = 'down';
else if (keys == '39' && snakeDirection != 'left') snakeDirection = 'right';
else if (keys == '38' && snakeDirection != 'down') snakeDirection = 'up';
else if (keys == '37' && snakeDirection != 'right') snakeDirection = 'left';

}
window.onkeydown = changeDirection;
window.onload = initialize



