var myGamePiece;
var gameObj;
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var cWidth =  canvas.width;
var cHeight = canvas.height;
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    c.fillStyle = color;
    c.fillRect(this.x, this.y, this.width, this.height);

}

function startGame() {
    
    myGamePiece = new component(30, 30, "red", cWidth / 2, cHeight / 2);
    gameObj = new component(200, 10, "green", canvas.width - 200, 0);
    gameobj = new component(200, 10, "green", 0, 0);

}

// Buffer Control
updateGameArea();
function updateGameArea() {
    requestAnimationFrame(updateGameArea);
    c .clearRect(0, 0,canvas.width, canvas.height);
    startGame();
    cHeight -= 1;
    console.log("buffer");
}