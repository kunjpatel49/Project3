var myGamePiece;
var gameObj;
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var cWidth =  canvas.width;
var cHeight = canvas.height;
var objWidth = canvas.width;
var objHeight = 0;
var leftObjArray = [];
var rightObjArray = [];
myGamePiece = new component(30, 30, "red", cWidth / 2, cHeight / 2);

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.dX = 0;
    this.dY = 0;
    this.x = x;
    this.y = y;
    c.fillStyle = color;
    c.fillRect(this.x, this.y, this.width, this.height);
    this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

}

function startGame() {
    
    leftObjArray.push(new component(200, 10, "pink", 0, objHeight));
    rightObjArray.push( new component(200, 10, "green", cWidth - 200, objHeight));
}

console.log(rightObjArray);

// Buffer Control
updateGameArea();
function updateGameArea() {
    requestAnimationFrame(updateGameArea);
    c .clearRect(0, 0,canvas.width, canvas.height);
    myGamePiece = new component(30, 30, "red", cWidth / 2, cHeight / 2);
    startGame();
    objHeight += 1;   // Moving Obstacles thorugh the canvas
    console.log("buffer");
}
